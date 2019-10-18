const express = require('express');
const app = express();
app.set('secret', '123sadhgvh12fvyt')
app.use(require('cors')())
app.use(express.json())

// 通过 /uploads 路由可以访问到静态文件（图片）
app.use('/uploads', express.static(__dirname + '/uploads'))

require('./routes/admin')(app)
require('./plugins/db')(app)
app.listen(3000, () => {
    console.log('server success!!!')
})