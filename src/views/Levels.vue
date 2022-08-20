<script>
import AppHeader from "./../components/AppHeader";

export default {
  name: "Levels",
  components: {
    AppHeader,
  },
  setup() {
    let levels = JSON.parse(localStorage.getItem("levels"));

    return {
      levels,
    };
  },

  methods: {
    levelstyle(level, idx) {
      if (level.active) {
        return ["level", "level-active"];
      }
      if (idx % 2 === 0) {
        return ["level", "level-odd"];
      }
      return ["level"];
    },

    ac(level) {
      let levels = JSON.parse(localStorage.getItem("levels"));
      levels.forEach((el) => {
        el.active = el.id == level.id;
      });
      localStorage.setItem("levels", JSON.stringify(levels));

      window.location = window.location.pathname.replace("levels", "");
    },

    del(level) {
      let levels = JSON.parse(localStorage.getItem("levels"));
      levels = levels.filter((el) => el.id != level.id);
      localStorage.setItem("levels", JSON.stringify(levels));
      localStorage.removeItem(level.id);

      console.log(levels);
      console.log(levels.length);
      if (levels.length === 0) {
        localStorage.removeItem("levels");
      }

      window.location = window.location.pathname.replace("levels", "");
    },
  },
};
</script>

<template>
  <AppHeader subtitle="Levels" />

  <div class="appcenter">
    <div
      :class="levelstyle(level, idx)"
      v-for="(level, idx) in levels"
      v-bind:key="level.id"
    >
      <div class="contentbox" @click="ac(level)">
        {{ idx + 1 }}. {{ level.title }}
      </div>
      <div class="rightbox">
        <img
          @click="del(level)"
          src="images/delete.svg"
          alt="Delete"
          width="40"
        />
      </div>
    </div>
  </div>
</template>

<style>
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
