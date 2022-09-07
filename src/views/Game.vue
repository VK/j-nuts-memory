<script>
import { ref, watch } from "vue";
import { cardDeck, createDeck, game } from "./../features/createDeck";
import createGame from "./../features/createGame";
import { launchConfetti } from "./../utilities/confetti";
import AppHeader from "./../components/AppHeader";
import GameBoard from "./../components/GameBoard";
import NewGameButton from "./../components/NewGameButton";
import nutsDeck from "./../data/nuts.json";

export default {
  name: "Game",
  components: {
    AppHeader,
    GameBoard,
    NewGameButton,
  },
  setup() {
    let active_level = { id: null };

    if (localStorage.getItem("levels") === null) {
      cardDeck.value = nutsDeck;
    } else {
      try {
        let levels = JSON.parse(localStorage.getItem("levels"));

        let all_active = levels.filter((el) => el.active);

        if (all_active.length  > 0) {
          active_level = all_active[0];
        } else {

          active_level = levels[0]
        }


        if(active_level !== active_level) {
          throw "No proper game selection";
        }
        game.value = active_level.game;


        cardDeck.value = JSON.parse(localStorage.getItem(active_level.id));
      } catch {
        cardDeck.value = nutsDeck;
        game.value = {"name": "all", "value": "name", "filter": true};
      }
    }

    let subtitle = cardDeck.value["title"];

    // localStorage.setItem("localDeck", JSON.stringify(nutsDeck));

    const { cardList, cardbg } = createDeck();


    const {
      newPlayer,
      startGame,
      restartGame,
      matchesFound,
      status,
      starttime,
      tries,
      updateHighscore,
    } = createGame(cardList, active_level);
    const userSelection = ref([]);
    const userCanFlipCard = ref(true);

    const startNewGame = () => {
      userSelection.value = [];
      if (newPlayer) {
        startGame();
      } else {
        restartGame();
      }
    };

    const flipCard = (payload) => {
      if (userCanFlipCard.value) {
        cardList.value[payload.position].visible = true;

        if (userSelection.value.length > 0) {
          if (
            userSelection.value[0].position === payload.position &&
            userSelection.value[0].faceValue === payload.faceValue
          ) {
            return;
          } else {
            userSelection.value.push(payload);
          }
        } else {
          userSelection.value.push(payload);
        }
      } else {
        return;
      }
    };

    watch(matchesFound, (currentValue) => {
      if (currentValue === cardList.value.length /2 && !newPlayer.value) {
        launchConfetti();
        updateHighscore();
      }
    });

    watch(
      userSelection,
      (currentValue) => {
        if (!newPlayer.value && currentValue.length >= 2) {
          const cardOne = currentValue[0];
          const cardTwo = currentValue[1];
          // Disable ability to flip cards
          userCanFlipCard.value = false;

          if (cardOne.faceValue === cardTwo.faceValue && cardOne.variant !== cardTwo.variant) {
            cardList.value[cardOne.position].matched = true;
            cardList.value[cardTwo.position].matched = true;
            userCanFlipCard.value = true;
          } else {
            setTimeout(() => {
              currentValue.forEach((el) => {
                cardList.value[el.position].visible = false;
              });
              userSelection.value = [];
              // Allow user to flip a new card
              userCanFlipCard.value = true;
            }, 1000);
          }

          userSelection.value = [];
          tries.value = tries.value + 1;
          //console.log(cardList.value)
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
      subtitle,
      cardbg
    };
  },
};
</script>

<template>
  <AppHeader :subtitle="subtitle" />

  <div class="appcenter" style="width: 100%">
    <NewGameButton :newPlayer="newPlayer" @start-new-game="startNewGame" />
    <GameBoard
      :cardList="cardList"
      :status="status"
      @flip-card="flipCard"
      :starttime="starttime"
      :tries="tries"
      :newPlayer="newPlayer"
      :cardbg="cardbg"
    />
  </div>
</template>

<style>
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

.status {
  font-family: "Titillium Web", sans-serif;
  font-size: 18px;
  /* text-transform: uppercase; */
}

.game-board {
  display: grid;
  grid-template-columns: repeat(4, 65px);
  grid-template-rows: repeat(4, 65px);
  grid-column-gap: 8px;
  grid-row-gap: 8px;
  justify-content: center;
  overflow: hidden;
  padding-bottom: 8px;
}

@media screen and (min-width: 390px) {
  .game-board {
    grid-template-columns: repeat(4, 80px);
    grid-template-rows: repeat(4, 80px);
    grid-column-gap: 10px;
    grid-row-gap: 10px;
  }
}

@media screen and (min-width: 500px) {
  .game-board {
    grid-template-columns: repeat(4, 90px);
    grid-template-rows: repeat(4, 90px);
    grid-column-gap: 15px;
    grid-row-gap: 15px;
  }

  .status {
    font-size: 22px;
  }
  .card {
    font-size: 22px;
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
