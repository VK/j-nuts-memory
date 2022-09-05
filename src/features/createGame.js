import _ from 'lodash'
import { computed, ref } from 'vue'
import { cardList, createDeck } from './createDeck'



export default function createGame(deck, level) {
  const newPlayer = ref(true)
  let tries = ref(0);
  let starttime = ref(Date.now());


  const startGame = () => {

    if (newPlayer.value) {
      restartGame()
      tries.value = 0;
      starttime.value = Date.now();
    } else {
      createDeck();
    }

    newPlayer.value = !newPlayer.value;
  }

  const restartGame = () => {
    deck.value = _.shuffle(deck.value)

    deck.value = deck.value.map((card, index) => {
      return {
        ...card,
        matched: false,
        position: index,
        visible: false
      }
    })
  }

  const status = computed(() => {
    if (matchesFound.value === cardList.value.length / 2) {
      return 'You win!'
    } else {
      return `Matches: ${matchesFound.value}`
    }
  })

  const matchesFound = computed(() => {
    const matchedCards = deck.value.filter(card => card.matched === true).length

    return matchedCards / 2
  })

  const updateHighscore = () => {
    let highscore = []
    try {
      highscore = JSON.parse(localStorage.getItem("highscore"));
      if (highscore === null) {
        highscore = []
      }
    } catch {
      console.log("First highscore")
    }

    let endtime = Date.now();

    if (!("gidx" in level) || level.gidx === 0) {
      highscore.push({
        level: level.id,
        tries: tries.value,
        starttime: starttime.value,
        endtime: endtime,
        duration: Math.round((endtime - starttime.value) / 100.0) / 10
      });
    }



    localStorage.setItem("highscore", JSON.stringify(highscore))

  }

  return {
    matchesFound,
    newPlayer,
    restartGame,
    startGame,
    status,
    starttime,
    tries,
    updateHighscore
  }
}
