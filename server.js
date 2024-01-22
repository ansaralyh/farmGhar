const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const connectToDb = require('./utils/db')
const PORT = 4000
const userRouter = require('./Routes/user.routes')
const productRoutes = require('./Routes/product.routes')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/api/v1', userRouter)
app.use('/api/v1',productRoutes)

app.listen(PORT, (req, res) => {
    console.log(`server is running on ${PORT}`)
});
connectToDb()
