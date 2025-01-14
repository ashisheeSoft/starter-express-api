
const express = require('express')
const cors = require('cors');
const morgan = require('morgan')
const createError = require('http-errors')
require('dotenv').config()
require('./helpers/init_mongodb')
require('./helpers/init_mqtt')
const { verifyAccessToken } = require('./helpers/jwt_helper')

const AuthRoute = require('./Routes/Auth.route')
const DeviceRoute = require('./Routes/Device.route')
const MessageRoute = require('./Routes/Message.route');

const app = express()
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors());

app.get('/', verifyAccessToken, async (req, res, next) => {
    res.send('Hello from express.')
})


app.use('/api/v1/auth', AuthRoute)
app.use('/api/v1/device',DeviceRoute)
app.use('/api/v1/message',MessageRoute)

app.use(async (req, res, next) => {
    next(createError.NotFound())
})

app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
      error: {
        status: err.status || 500,
        message: err.message,
      },
    })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})