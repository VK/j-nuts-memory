<script>
import AppHeader from "./../components/AppHeader";

export default {
  name: "HighScore",
  components: {
    AppHeader,
  },
  setup() {
    let levels = JSON.parse(localStorage.getItem("levels"));
    let highscore = JSON.parse(localStorage.getItem("highscore"));

    return {
      levels,
      highscore,
    };
  },

  methods: {

    levelstyle( idx) {
      if (idx % 2 === 0) {
        return ["level", "level-odd"];
      }
      return ["level"];
    },

    

    getlevelhigh(level) {
      let levelhigh = this.highscore.filter((el) => level.id === el.level);

      levelhigh.sort((a, b) => (a.duration > b.duration) ? 1 : -1)

      if (levelhigh.length == 0) {
        return "Not solved yet!"
      }  else {
        const best = levelhigh[0];
        return best.duration + "s for " + best.tries + " tries"
      }

    },
  },
};
</script>


<template>
  <AppHeader subtitle="Highscore" />

  <div class="appcenter">
    <div
      :class="levelstyle(idx)"
      v-for="(level, idx) in levels"
      v-bind:key="level.id"
    >
      <div class="contentbox">{{ idx + 1 }}. {{ level.title }}</div>
      <div class="bighscorebox">
        {{ getlevelhigh(level) }}
      </div>
    </div>
  </div>
</template>


<style scoped>
.level {
  width: 350px;
  background: rgb(22, 49, 22);
  display: flex;
  flex-flow: column;
  
}
.level-odd {
  background: rgb(41, 90, 41);
}
.contentbox {
  padding-bottom: 0;
}
.bighscorebox {
  text-align: left;
  padding: 25px 25px;
  padding-top: 10px;
}
</style>

