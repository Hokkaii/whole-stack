module.exports = app => {
    const express = require('express')
    const router = express.Router({
        mergeParams: true
    });
    const Category = require('../../models/Category')
    router.post('/', async (req, res) => {
        const model = await req.Model.create(req.body);
        res.send(model);
    })
    router.get('/', async (req, res) => {
        // const items = await req.Model.find().populate('parent').limit(10);
        const options = {};
        if (req.Model.modelName === 'Category') {
            options.populate = 'parent'
        }
        const items = await req.Model.find().setOptions(options).limit(10);
        res.send(items);
    })
    router.get('/:id', async (req, res) => {
        const model = await req.Model.findById(req.params.id);
        res.send(model);
    })
    router.put('/:id', async (req, res) => {
        await req.Model.findByIdAndUpdate(req.params.id, req.body);
        res.send({
            success: true
        });
    })
    router.delete('/:id', async (req, res) => {
        await req.Model.findByIdAndDelete(req.params.id, req.body);
        res.send({
            success: true
        });
    })
    // app.use可以加多个守卫函数
    app.use('/admin/api/rest/:resource', async (req, res, next) => {
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

}