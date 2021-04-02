if (process.env.Node_ENV !== "production") {
    require('dotenv').config();
}
const apiKey = process.env.API_KEY;

const path = require('path');
const express = require('express');
const app = express()
const cors = require('cors');
const bodyParser = require('body-parser');
// const { request, response } = require('express');
const mockAPIResponse = require('./mockAPI.js');
const FormData = require('form-data');
const fetch = require("node-fetch");
const { response } = require('express');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.static('dist'));
app.use(bodyParser.json());

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
});

console.log(__dirname)

app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile('dist/index.html')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})
let projectData = {};
app.get('/analyse', function(req, res) {
    let projectData = data;
    res.send(projectData);
})

let data = [];
app.post('/analyse', getAnalysis);
async function getAnalysis(req, res){
    const formInput = req.body.formInput;
    let results = await getAnalysisData(formInput);
    let addData = {
        model: results.model,
        score_tag: results.score_tag,
        agreement: results.agreement,
        subjectivity: results.subjectivity,
        confidence: results.confidence,
        irony: results.irony
    }
    data.push(addData);
    res.send(data);
}

//Fetch API data
const getAnalysisData = async (formInput) => {
    const baseURL = "http://api.meaningcloud.com";
    const subURL = "/sentiment-2.1?key=" + apiKey + "&lang=auto&url=" + formInput;
    const url = baseURL + subURL;
    const res = await fetch(url) 
    try{
        const Data = await res.json();
        return Data;
    }
    catch(error){
        console.log('error', error);
    }
}