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
};

function handleSubmit(event) {
    event.preventDefault()
    const formInput = document.getElementById('url').value;
    if(Client.checkForUrl(formInput)) {
        postData('http://localhost:8081/analyse', { formInput });
        displayResults();
    } else {
        alert('Please enter a correct url.');
    }
}

//Display Analyed Results
const displayResults = async () => {
    const request = await fetch('http://localhost:8081/analyse');
    try{
        const allData = await request.json();
        let data = allData[allData.length - 1];
        console.log(data);
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
    } catch(error) {
        console.log('error', error);
    }
}


export { handleSubmit }
