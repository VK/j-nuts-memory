<script>
import Card from "./Card";

export default {
  components: {
    Card,
  },
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
    <Card
      v-for="card in cardList"
      :key="`${card.idx}-${card.variant}`"
      :matched="card.matched"
      :value="card"
      :visible="card.visible"
      :position="card.position"
      @select-card="selectCard"
    />
  </transition-group>
  <h2 class="status" v-if="newPlayer">Explore the tiles</h2>
  <h2 class="status" v-else>
    {{ status }} - Tries: {{ tries }} - Time:
    <span style="display: inline-block; width: 50px; text-align: right">{{
      countDown
    }}</span>
  </h2>
</template>

<style></style>
