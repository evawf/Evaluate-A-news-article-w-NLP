if (process.env.Node_ENV !== "production") {
    require('dotenv').config();
}
const apiKey = process.env.API_KEY;


const path = require('path');
const express = require('express');
const app = express()
const cors = require('cors');
const { request } = require('express');
const mockAPIResponse = require('./mockAPI.js');

console.log(apiKey);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.static('dist'));

// designates what port the app will listen to for incoming requests
app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});

console.log(__dirname)



app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile('dist/index.html')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})
