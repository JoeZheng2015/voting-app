const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongo = require('mongodb').MongoClient

const app = express()
const port = 8080


mongo.connect('mongodb://localhost:27017/learnyoumongo', (err, db) => {
    if (err) throw err
    const collection = db.collection('votes')

    app.use(bodyParser.json()); // for parsing application/json
    app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
    app.use('/public', express.static(`${__dirname}/public`))
    app.set('views', path.resolve(__dirname, './views'))
    app.set('view engine', 'pug')

    const vote = {
        _id: 0,
        title: '袁崇焕是民族英雄还是卖国贼',
        agree: 1,
        object: 2,
    }

    app.get('/', (req, res) => {
        res.render('index', {
            votes: [
                vote,
            ]
        })
    })

    app.get('/detail/:_id', (req, res) => {
        const { _id } = req.params

        res.render('detail', vote)
    })

    app.get('/admin', (req, res) => {
        res.render('admin')
    })

    app.post('/vote/add', (req, res) => {
        res.send({
            ret: 0,
        })
    })

    app.listen(port, () => {
        console.log(`server run at http://localhost:${port}`)
    })
})

