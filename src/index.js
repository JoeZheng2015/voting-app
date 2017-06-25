const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const { MongoClient: mongo, ObjectId } = require('mongodb')

const app = express()
const port = 8080


mongo.connect('mongodb://localhost:27017/voting-app', (err, db) => {
    if (err) throw err
    const collection = db.collection('votes')

    app.use(bodyParser.json()); // for parsing application/json
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
        collection.find({})
            .toArray((err, votes) => {
                if (err) throw err

                res.render('index', {
                    votes,
                })
            })
    })

    app.get('/detail/:_id', (req, res) => {
        const { _id } = req.params

        collection.findOne(ObjectId(_id))
            .then(document => {
                res.render('detail', document)
            })
            .catch(err => {
                res.send(err)
            })
    })

    app.get('/admin', (req, res) => {
        res.render('admin')
    })

    app.post('/vote/add', (req, res) => {
        const { title } = req.body
        const document = {
            title,
            agree: 0,
            object: 0,
        }

        collection.insertOne(document)
            .then(result => {
                const ret = result.result.ok === 1 ? 0 : 1

                res.send({
                    ret,
                    message: ret === 1 ? result.message : '',
                })
            })
    })

    app.post('/vote/:_id', (req, res) => {
        const { _id } = req.params
        const { type } = req.body

        collection.findOneAndUpdate({
            _id: ObjectId(_id),
        }, {
            $inc: {
                [type]: 1,
            }
        })
            .then(result => {
                const ret = result.ok === 1 ? 0 : 1
                res.send({
                    ret,
                    message: ret === 1 ? '数据库错误' : '',
                })
            })
    })

    app.listen(port, () => {
        console.log(`server run at http://localhost:${port}`)
    })
})

