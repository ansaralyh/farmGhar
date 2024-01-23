const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const connectToDb = require('./utils/db')
const cors = require('cors')
const dotenv = require('dotenv')
const userRouter = require('./Routes/user.routes')
const productRoutes = require('./Routes/product.routes');
dotenv.config()
const PORT=process.env.PORT;
app.use(cors("*"))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/api/v1', userRouter)
app.use('/api/v1',productRoutes)

app.listen(PORT, (req, res) => {
    console.log(`server is running on ${PORT}`)
});
connectToDb();
