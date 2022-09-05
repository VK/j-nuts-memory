<script>
import AppHeader from "./../components/AppHeader";
import { loadDeck } from "../main.js";

export default {
  name: "Levels",
  components: {
    AppHeader,
  },
  setup() {
    let levels = JSON.parse(localStorage.getItem("levels"));

    levels = levels.map(l => {

      let addon = JSON.parse(localStorage.getItem(l.id));
      return { ...l, games: addon.games };
    });

    return {
      levels,
    };
  },

  methods: {
    levelstyle(level, idx, gidx) {

      if (level.active && level.gidx === gidx) {
        return ["level", "level-active"];
      }
      if (idx % 2 === 0) {
        return ["level", "level-odd"];
      }
      return ["level"];
    },

    ac(level, game, gidx) {

      let levels = JSON.parse(localStorage.getItem("levels"));
      levels.forEach((el) => {
        if(el.id == level.id)
        {
          el.active = true;
          el.game = game;
          el.gidx = gidx;
        } else {
          el.active = false;
          el.game = null;
          el.gidx = null;
        }
        
      });
      localStorage.setItem("levels", JSON.stringify(levels));



      window.location = window.location.pathname.replace("levels", "");
    },

    del(level) {
      let levels = JSON.parse(localStorage.getItem("levels"));
      levels = levels.filter((el) => el.id != level.id);
      localStorage.setItem("levels", JSON.stringify(levels));
      localStorage.removeItem(level.id);


      if (levels.length === 0) {
        localStorage.removeItem("levels");
      }

      window.location = window.location.pathname.replace("levels", "");
    },

    reload(url) {
      loadDeck(url);
    }
  },
};
</script>

<template>
  <AppHeader subtitle="Levels" />

  <div class="appcenter">
    <div :class="levelstyle(level, idx, 0)" v-for="(level, idx) in levels" v-bind:key="level.id" class="container">
      <div class="contentbox" @click="ac(level, level.games[0], 0)">
        {{  idx + 1  }}. {{  level.title  }}
      </div>
      <div class="rightbox">
        <img src="images/restart.svg" alt="Reload" @click="reload(level.update)" width="42" v-if="'update' in level" />
        <img @click="del(level)" src="images/delete.svg" alt="Delete" width="40" />
      </div>

      <div v-for="(game, gidx) in level.games" v-bind:key="level.id + gidx" 
      
      :class="[...levelstyle(level, idx, gidx), 'extra']" v-show="gidx !== 0"
        @click="ac(level, game, gidx)">
        {{  game.name  }}

      </div>
    </div>
  </div>
</template>

<style>
.contentbox {
  padding: 20px 20px;
  flex: 1 auto;
  float: left;
  text-align: left;
  font-size: 20px;
  font-weight: 700;
}

.contentbox a {
  text-decoration: none;
}
</style>
<style scoped>
.level {
  width: 350px;
  background: rgb(22, 49, 22);
  display: flex;
  flex-flow: row;
  cursor: pointer;
}

.level-odd {
  background: rgb(41, 90, 41);
}

.level-active {
  background: #28a745;
}

.rightbox {
  float: right;
  height: 100%;
  margin-top: 14px;
  margin-right: 10px;
}

.container {
  display: flex;
  flex-wrap: wrap;
}



.extra {
  flex-basis: 100%;
  height: 40px;
  text-align: left;
  padding-left: 40px;
  padding-top: 12px;
}
</style>
