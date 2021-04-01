function handleSubmit(event) {
    event.preventDefault()
    
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

    const formInput = document.getElementById('url');


    if(Client.checkForUrl(formInput)){
        getAnalysis;
    }else{
        console.log("ERROR!")
    }

    const getAnalysis = async () => {
        let data = await postData('/analyse', {
            formInput: formInput.value
        });
        displayResults();
        console.log(data);
    }

    const displayResults = async () => {
        const request = await fetch('/analyse');
        try{
            const allData = await request.json();
            console.log(allData);
            const model = document.getElementById('model');
            const score_tag = document.getElementById('score_tag');
            const agreement = document.getElementById('agreement');
            const subjectivity = document.getElementById('subjectivity');
            const confidence = document.getElementById('confidence');
            const irony = document.getElementById('irony');
        } catch(error) {
            console.log('error', error);
        }
    }

}

export { handleSubmit }
