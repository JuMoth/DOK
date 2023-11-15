const express = require('express');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('../swagger-output.json');
const cors = require('cors');
require("dotenv").config();

const app = express(); 

mongoose
    .connect (process.env.MONGO_DB_URL)
    .then(() => {
        console.log('MongoDB에 연결되었습니다.');
    })
    .catch((error) => {
        console.error('MongoDB 연결 실패: ', error);
    });

app.use(cors());
app.use(express.json()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));



app.get('/', (req, res) => {
    res.send('Hello express !');
});


app.listen(process.env.PORT, () => {
    console.log(`Express server starting on port ${process.env.PORT}`);
  });