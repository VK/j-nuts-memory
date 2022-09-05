import { ref } from 'vue'
import safeEval from 'safe-eval';

export var cardbg = ref(null);
export var cardList = ref([])
export var game = ref({"name": "all", "value": "name", "filter": true})


/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const getvalue = (item) => {
  return safeEval(game.value.value, item);
}

// const getvalue = (item) => {
//   return function(str) {
//     return eval(str);
//   }.call(game.value.value, item);

// }


const initDeck = () => {

  //extract the background
  if ("cardbg" in cardDeck.value) {
    cardbg.value = cardDeck.value.cardbg;
  } else {
    cardbg.value = null;
  }

  //apply the card filter
  let cards = cardDeck.value.data;
  
  if (game.value === undefined) {
    game.value = {"name": "all", "value": "name", "filter": true};
  }

  if (game && game.value && "filter" in game.value && game.value.filter) {
    cards = cards.filter(el => safeEval(game.value.filter, el));
  }

  // get indices for a shuffle
  let indices = Array.from(Array(cards.length).keys());
  indices = shuffle(indices);

  if (cardList.value.length == 0) {

    indices.slice(0, 8).forEach((idx, pos) => {
      const item = cards[idx];

      const v = getvalue(item);

      cardList.value.push({
        idx: pos,
        value: v,
        img: item.img,
        variant: 1,
        visible: false,
        position: null,
        matched: false
      })

      cardList.value.push({
        idx: pos,
        value: v,
        img: item.img,
        variant: 2,
        visible: true,
        position: null,
        matched: false
      })
    })
  } else {

    indices.slice(0, 8).forEach((idx, pos) => {
      let item = cards[idx];
      let cardA = cardList.value[2*pos];
      let cardB = cardList.value[2*pos+1];

      let v = getvalue(item);

      cardA.value = v;
      cardB.value = v;

      cardA.img = item.img;
      cardB.img = item.img;

      cardA.visible = false;
      cardB.visible = true;

      cardA.matched = false;
      cardB.matched = false;      


      cardA.variant = 1;
      cardB.variant = 2;    
      
      cardA.position = 2*pos;
      cardB.position = 2*pos+1;    
      cardA.idx = pos;
      cardB.idx = pos;         

    });

  }
}

const updateCardPosition = () => {
  cardList.value = cardList.value.map((card, index) => {
    return {
      ...card,
      position: index
    }
  })
}


export function createDeck() {

  if (cardList.value.length == 0) {
    initDeck()
    updateCardPosition()
  } else {
    initDeck()
    updateCardPosition()
  }


  return {
    cardList,
    cardbg
  }
}

export var cardDeck = ref([])
