const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/voting-app')

const VoteSchema = new mongoose.Schema({
    title: String,
    agree: Number,
    object: Number,
})
const Vote = mongoose.model('Vote', VoteSchema)

const app = express()
const port = 8080

app.use(bodyParser.json()); // for parsing application/json
app.use('/public', express.static(`${__dirname}/public`))
app.set('views', path.resolve(__dirname, './views'))
app.set('view engine', 'pug')

app.get('/', (req, res) => {
    Vote.find()
        .then(votes => {
            res.render('index', {
                votes,
            })
        })
})

app.get('/detail/:_id', (req, res) => {
    const { _id } = req.params

    Vote.findOne(ObjectId(_id))
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

    Vote.create(document)
        .then(result => {
            res.send({
                ret: 0,
                message: '',
            })
        })
        .catch(err => {
            res.send({
                ret: 1,
                message: err.message,
            })
        })
})

app.post('/vote/:_id', (req, res) => {
    const { _id } = req.params
    const { type } = req.body

    Vote.findOneAndUpdate({
        _id: ObjectId(_id),
    }, {
            $inc: {
                [type]: 1,
            }
        })
        .then(result => {
            console.log('then', result)
            res.send({
                ret: 0,
                message: '',
            })
        })
        .catch(err => {
            res.send({
                ret: 1,
                message: err.message,
            })
        })
})

app.listen(port, () => {
    console.log(`server run at http://localhost:${port}`)
})

