import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'


async function loadDeck(url)
{
    try {
    const response = await fetch(url, {
        method: 'GET',
        headers: {
          accept: 'application/json',
        },
      });
    const newDeck = await response.json();

    localStorage.setItem("localDeck", JSON.stringify(newDeck));

    window.location = window.location.pathname;

    } catch {
        console.log("nothing loaded");
    }
}

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
if (urlParams.get('loadDeck') !== null) {

    let url = urlParams.get('loadDeck');

    loadDeck(url)
    
}


createApp(App).mount('#app')
