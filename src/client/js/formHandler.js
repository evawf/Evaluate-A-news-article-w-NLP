const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await response.json();
        return newData;
    } catch(error) {
        console.log('error', error);
    }
}

function init() {
    location.reload(1)
}

//PreLoader Handler
const preloader = document.getElementById('loader');
function showPreLoader(){
    preloader.style.display = 'block';
}
function hidePreLoader(){
    preloader.style.display = 'none';
}

//Post Form Input
async function handleSubmit(event) {
    event.preventDefault()
    const formInput = document.getElementById('url').value;
    const errorMsg = document.getElementById('errorMsg');
    if(Client.checkForUrl(formInput)) {
        showPreLoader();
        const data = await postData('http://localhost:8081/analyse', { formInput });
        displayResults(data);
    } else {
        errorMsg.innerHTML = "Please enter a valid URL!";
        errorMsg.style.color = "red";
        setTimeout(init, 3000);
    }
}

//Display Analyed Results
const displayResults = (data) => {
    console.log(data)
    hidePreLoader();
    const model = document.getElementById('model');
    const score_tag = document.getElementById('score_tag');
    const agreement = document.getElementById('agreement');
    const subjectivity = document.getElementById('subjectivity');
    const confidence = document.getElementById('confidence');
    const irony = document.getElementById('irony');
    model.innerHTML = "Model: " + data.model;
    score_tag.innerHTML = "Score Tag: " + data.score_tag;
    agreement.innerHTML = "Agreement: " + data.agreement;
    subjectivity.innerHTML = "Subjectivity: " + data.subjectivity;
    confidence.innerHTML = "Confidence: " + data.confidence;
    irony.innerHTML = "Irony: " + data.irony;
}

export { handleSubmit }
