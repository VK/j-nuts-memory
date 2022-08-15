import { ref } from 'vue'

var cardList = ref([])


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


const initDeck = () => {

  let indices = Array.from(Array(cardDeck.value.data.length).keys());
  indices = shuffle(indices);

  if (cardList.value.length == 0) {

    indices.slice(0, 8).forEach((idx, pos) => {
      let item = cardDeck.value.data[idx];

      cardList.value.push({
        idx: pos,
        value: item.name,
        img: item.img,
        variant: 1,
        visible: false,
        position: null,
        matched: false
      })

      cardList.value.push({
        idx: pos,
        value: item.name,
        img: item.img,
        variant: 2,
        visible: true,
        position: null,
        matched: false
      })
    })
  } else {

    indices.slice(0, 8).forEach((idx, pos) => {
      let item = cardDeck.value.data[idx];
      let cardA = cardList.value[2*pos];
      let cardB = cardList.value[2*pos+1];

      cardA.value = item.name;
      cardB.value = item.name;

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
    cardList
  }
}

export var cardDeck = ref([])
