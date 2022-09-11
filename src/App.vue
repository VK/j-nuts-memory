<script>
export default {
  name: "app",
  data() {
    return {
      refreshing: false,
      worker: null,
      updateExists: false,
    };
  },
  created() {
    // Listen for swUpdated event and display refresh snackbar as required.
    document.addEventListener("swUpdated", this.showRefreshUI, { once: true });
    // Refresh all open app tabs when a new service worker is installed.
    navigator.serviceWorker &&
      navigator.serviceWorker.addEventListener(
        //triggered by registration.claim
        "controllerchange",
        () => {
          if (this.refreshing) return;
          this.refreshing = true;
          console.log("controllerchange triggered, -> auto refresh!!");
          window.location.reload();
        }
      );
  },
  methods: {
    showRefreshUI(e) {
      // Display a button inviting the user to refresh/reload the app due
      // to an app update being available.
      // The new service worker is installed, but not yet active.
      // Store the ServiceWorkerRegistration instance for later use.
      if (e.detail) {
        this.worker = e.detail;
        this.updateExists = true;

        console.log(this.worker);
      } else {
        console.warn("No worker data found!");
      }
    },
    refreshApp() {
      console.log("skipWaiting started");
      console.log(this.worker);
      // Handle a user tap on the update app button.
      this.updateExists = false;
      // Protect against missing registration.waiting.
      if (!this.worker) {
        console.warn("No worker data found when trying to refresh!");
        return;
      }
      this.worker.postMessage({ type: "SKIP_WAITING" });
      console.log("skipWaiting finished");
    },
  },
};
</script>


<template>
  <nav id="bottom-nav">
    <router-link to="/" v-if="!updateExists">
      <img class="routericon" src="images/game.svg" /><p class="router-text">Game</p></router-link
    >
    <router-link to="/levels" v-if="!updateExists">
      <img class="routericon" src="images/levels.svg" /><p class="router-text">Levels</p></router-link>
    <router-link to="/score" v-if="!updateExists">
      <img class="routericon" src="images/highscore.svg" /><p class="router-text">Highscore</p></router-link>

    <a @click="refreshApp" v-if="updateExists">Update App</a>
  </nav>
  <router-view />
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

#app {
  font-family: "Titillium Web", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
}

.appcenter {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-height: 80vh;
  overflow-y: auto;
}

#bottom-nav a {
  font-size: 10px;
  display: inline-block;
  color: white;
  text-align: center;
  padding: 6px 15px;
  height: 100%;
  text-decoration: none;
  width: 100px;
}

@media only screen and (max-width: 375px) {
  #bottom-nav a {
    padding: 10px 2px;
    width: 80px;
  }
  #bottom-nav {
    height: 24px;
  }

  .routericon {
  height: 30% !important;
}    
}

@media only screen and (max-width: 400px) {
  #bottom-nav a {
    padding: 10px 2px;
    width: 90px;
  }

  .routericon {
  height: 35% !important;
}  
}

.router-link-active {
  background: #28a745;
}

#bottom-nav {
  background: rgb(45, 100, 45);
  height: 50px;
  position: fixed;
  padding: 0;
  left: 0;
  bottom: 0;
  width: 100%;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

/* Smartphones (landscape) ----------- */
@media only screen and (max-height: 650px) {
  #bottom-nav {
    height: 24px;
  }

  nav {
    padding: 0px;
  }

  #bottom-nav a {
    font-size: 17px;
    padding: 0 0;
  }

  .mainheader {
    visibility: collapse;
  }

  .subheader {
    position: relative;
    top: -60px;
  }

  .routericon {
    visibility: hidden;
    display: none;
    height: 0;
  }


}

.routericon {
  height: 45%;
}

.router-text {
  margin-top:0;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
