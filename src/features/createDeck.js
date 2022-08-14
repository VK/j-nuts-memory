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


  indices.slice(0, 8).forEach(idx => {
    let item = cardDeck.value.data[idx];

    cardList.value.push({
      value: item.name,
      img: item.img,
      variant: 1,
      visible: false,
      position: null,
      matched: false
    })

    cardList.value.push({
      value: item.name,
      img: item.img,
      variant: 2,
      visible: true,
      position: null,
      matched: false
    })
  })
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
  cardList.value = [];
  initDeck()
  updateCardPosition()

  return {
    cardList
  }
}

export var cardDeck = ref([])
