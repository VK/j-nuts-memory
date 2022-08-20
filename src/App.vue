<script>
import { ref, watch } from "vue";
import { cardDeck, createDeck } from "./features/createDeck";
import createGame from "./features/createGame";
import { launchConfetti } from "./utilities/confetti";
import AppHeader from "./components/AppHeader";
import GameBoard from "./components/GameBoard";
import NewGameButton from "./components/NewGameButton";
//import halloweenDeck from './data/halloweenDeck.json'
import nutsDeck from "./data/nuts.json";

export default {
  name: "App",
  components: {
    AppHeader,
    GameBoard,
    NewGameButton
  },
  setup() {
    if (localStorage.getItem("localDeck") === null) {
      cardDeck.value = nutsDeck;
    } else {
      try {
        cardDeck.value = JSON.parse(localStorage.getItem("localDeck"));
      } catch {
        cardDeck.value = nutsDeck;
      }
    }


    let subtitle = cardDeck.value["title"];



    // localStorage.setItem("localDeck", JSON.stringify(nutsDeck));

    const { cardList } = createDeck();

    const { newPlayer, startGame, restartGame, matchesFound, status, starttime, tries } = createGame(cardList);
    const userSelection = ref([]);
    const userCanFlipCard = ref(true);

    const startNewGame = () => {
      if (newPlayer) {
        startGame();
      } else {
        restartGame();
      }
    };

    const flipCard = (payload) => {
      if (userCanFlipCard.value) {
        cardList.value[payload.position].visible = true;

        if (userSelection.value[0]) {
          if (
            userSelection.value[0].position === payload.position &&
            userSelection.value[0].faceValue === payload.faceValue
          ) {
            return;
          } else {
            userSelection.value[1] = payload;
          }
        } else {
          userSelection.value[0] = payload;
        }
      } else {
        return;
      }
    };

    watch(matchesFound, (currentValue) => {
      if (currentValue === 8 && !newPlayer.value) {
        launchConfetti();
      }
    });

    watch(
      userSelection,
      (currentValue) => {
        if (newPlayer.value) {
          // cardList.value[cardOne.position].matched = true;
          userCanFlipCard.value = true;
          userSelection.value.length = 0;
        } else if (currentValue.length === 2) {
          const cardOne = currentValue[0];
          const cardTwo = currentValue[1];
          // Disable ability to flip cards
          userCanFlipCard.value = false;

          if (cardOne.faceValue === cardTwo.faceValue) {
            cardList.value[cardOne.position].matched = true;
            cardList.value[cardTwo.position].matched = true;
            userCanFlipCard.value = true;
          } else {
            setTimeout(() => {
              cardList.value[cardOne.position].visible = false;
              cardList.value[cardTwo.position].visible = false;
              // Allow user to flip a new card
              userCanFlipCard.value = true;
            }, 1000);
          }

          userSelection.value.length = 0;
          tries.value = tries.value + 1;
        }
      },
      { deep: true }
    );

    return {
      cardList,
      flipCard,
      userSelection,
      status,
      startNewGame,
      newPlayer,
      starttime,
      tries,
      subtitle
    };
  },
};
</script>

<template>
  <AppHeader :subtitle="subtitle" />
  <NewGameButton :newPlayer="newPlayer" @start-new-game="startNewGame" />
  <GameBoard :cardList="cardList" :status="status" @flip-card="flipCard" :starttime="starttime" :tries="tries" :newPlayer="newPlayer" />
  <AppFooter />
</template>

<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}

html {
  background-color: #000;
}

h1 {
  margin-top: 0;
}

a {
  color: white;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  color: #fff;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.status {
  font-family: "Titillium Web", sans-serif;
  font-size: 18px;
  text-transform: uppercase;
}

.game-board {
  display: grid;
  grid-template-columns: repeat(4, 80px);
  grid-template-rows: repeat(4, 80px);
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  justify-content: center;
}

@media screen and (min-width: 500px) {
  .game-board {
    grid-template-columns: repeat(4, 90px);
    grid-template-rows: repeat(4, 90px);
    grid-column-gap: 15px;
    grid-row-gap: 15px;
  }
}

@media screen and (min-width: 600px) {
  .game-board {
    grid-template-columns: repeat(4, 120px);
    grid-template-rows: repeat(4, 120px);
    grid-column-gap: 20px;
    grid-row-gap: 20px;
  }
}

.shuffle-card-move {
  transition: transform 0.5s ease-in;
}
</style>
