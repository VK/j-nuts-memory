<script>
import Card from "./Card";


export default {
  components: {
    Card,
  },
  emits: ["flipCard", "flip-card"],
  data() {
    return {
      countDown: 0,
    };
  },
  props: {
    cardList: {
      type: Array,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    tries: {
      type: Number,
      required: true,
    },
    starttime: {
      type: Number,
      required: true,
    },
    newPlayer: {
      type: Boolean,
      required: true,
    },
    cardbg: {
      required: false,
    },
  },
  created() {
    this.countDownTimer();
  },
  methods: {
    countDownTimer() {
      setTimeout(() => {
        if (this.status.startsWith("Matches")) {
          this.countDown =
            Math.round((Date.now() - this.starttime) / 100.0) / 10;
        }
        this.countDownTimer();
      }, 150);
    },
  },
  setup(props, ctx) {
    const selectCard = (payload) => {
      if ("faceValue" in payload)
        ctx.emit("flip-card", payload);
    };

    return {
      selectCard,
    };
  },
};
</script>

<template>
  <transition-group tag="section" class="game-board" name="shuffle-card">
    <Card v-for="card in cardList" :key="`${card.idx}-${card.variant}`" 
    :id="`${card.idx}-${card.variant}`" 
    :matched="card.matched" :value="card"
      :visible="card.visible" :position="card.position"
       @select-card="selectCard" :cardbg="cardbg" />
      </transition-group>

  <h3 class="status" v-if="newPlayer">Flip tiles and learn the the names.<br />
    Start the game to shuffle them.</h3>
  <h3 class="status" v-else>
    {{ status }}<br /> Tries: {{ tries }} - Time:
    <span style="display: inline-block; width: 50px; text-align: right">{{
        countDown
    }}</span>
  </h3>
</template>

<style>
</style>
