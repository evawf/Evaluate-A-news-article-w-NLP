import { handleSubmit } from './js/formHandler';
import { checkForUrl } from './js/urlChecker';

import './styles/resets.scss';
import './styles/base.scss';
import './styles/footer.scss';
import './styles/form.scss';
import './styles/header.scss';

export {
    checkForUrl,
    handleSubmit
}

// Check that service workers are supported
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "production") {
    if ('serviceWorker' in navigator) {
        // Use the window load event to keep the page load performant
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/service-worker.js');
        });
    }
} else {
    console.log("This is dev mode!");
}