import { createApp } from 'vue'
import app from './App'
import './registerServiceWorker'
import router from './router'
import nutsDeck from "./data/nuts.json";


function create_UUID() {
  var dt = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
}

async function loadDeck(url) {
  if (url.length < 4) {
    return;
  }
  try {

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    });
    const newDeck = await response.json();

    let new_uuid = create_UUID();
    let levels = JSON.parse(localStorage.getItem("levels"));


    //check if already known
    if ("update" in newDeck) {
      let matching_level = levels.filter(el => "update" in el && newDeck.update == el.update);
      if (matching_level.length > 0) {
        new_uuid = matching_level[0].id;
        localStorage.setItem(new_uuid, JSON.stringify(newDeck));
        window.location = window.location.pathname;
        return;

      }
    } else {

      levels.forEach(element => {
        element.active = false;
      });

      let new_entry = { title: newDeck.title, id: new_uuid, active: true };
      if ("update" in newDeck) {
        new_entry["update"] = newDeck["update"];
      }
      levels.push(
        new_entry
      )
      localStorage.setItem(new_uuid, JSON.stringify(newDeck));
      localStorage.setItem("levels", JSON.stringify(levels));

      window.location = window.location.pathname;
    }

  } catch {
    console.log("nothing loaded");
  }
}

const queryString = window.location.search;
if (queryString !== null) {
  try {
    let url = window.atob(queryString.replace("?", ""));
    loadDeck(url);
  } catch { console.log("no valid param") }
}


if (localStorage.getItem("levels") === null) {
  let new_uuid = create_UUID()
  localStorage.setItem("levels", JSON.stringify([
    { title: nutsDeck.title, id: new_uuid, active: true }
  ]));

  localStorage.setItem(new_uuid, JSON.stringify(nutsDeck))

}

createApp(app).use(router).mount('#app')

export { loadDeck };