module.exports = app => {
    const express = require('express')
    const assert = require('http-assert')
    const jwt = require('jsonwebtoken');
    const AdminUser = require('../../models/AdminUser')
    const router = express.Router({
        mergeParams: true
    });
    // const Category = require('../../models/Category')
    //创建资源
    router.post('/', async (req, res) => {
        const model = await req.Model.create(req.body);
        res.send(model);
    })
    //资源列表
    router.get('/',
        async (req, res) => {
            const options = {};
            if (req.Model.modelName === 'Category') {
                options.populate = 'parent'
                //建立关联，返回关联的数据
            }
            const items = await req.Model.find().setOptions(options).limit(10);
            res.send(items);
        })
    //资源详情
    router.get('/:id', async (req, res) => {
        const model = await req.Model.findById(req.params.id);
        res.send(model);
    })
    // 资源更改
    router.put('/:id', async (req, res) => {
        await req.Model.findByIdAndUpdate(req.params.id, req.body);
        res.send({
            success: true
        });
    })
    // 资源删除
    router.delete('/:id', async (req, res) => {
        await req.Model.findByIdAndDelete(req.params.id, req.body);
        res.send({
            success: true
        });
    })
    // app.use可以加多个守卫函数
    app.use('/admin/api/rest/:resource',
        async (req, res, next) => {
            const token = String(req.headers.authorization || '').split(' ').pop();
            assert(token, 401, '请先登录')
            const { id } = jwt.verify(token, app.get('secret'))
            assert(id, 401, '请先登录')
            req.user = await AdminUser.findById(id)
            assert(req.user, 401, '请先登录')
            await next()
        }, async (req, res, next) => {
            // 首字母大写，复数变单数
            const modelName = require('inflection').classify(req.params.resource)
            req.Model = require(`../../models/${modelName}`)
            next()
        }, router)

    const multer = require('multer');
    const upload = multer({ dest: __dirname + '/../../uploads' })
    app.post('/admin/api/upload', upload.single('file'), async (req, res) => {
        const file = req.file;
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })
    app.post('/admin/api/login', async (req, res) => {
        // 1.根据用户名查找用户
        const { name, password } = req.body;
        const AdminUser = require('../../models/AdminUser')
        const user = await AdminUser.findOne({ name }).select('+password')
        assert(user, 422, '用户不存在')//user为false时抛出错误

        // 2.校验密码
        const inVaild = require('bcryptjs').compareSync(password, user.password)
        assert(inVaild, 422, '密码错误')

        // 3.返回token
        const token = jwt.sign({ id: user._id }, app.get('secret'))
        res.send({ token })
    })
    // 错误处理函数
    app.use(async (err, req, res, next) => {
        res.status(err.statusCode || 500).send({
            message: err.message
        })
    })
}