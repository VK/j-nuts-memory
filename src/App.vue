<template>
  <nav id="bottom-nav">
    <router-link to="/">Game</router-link>
    <router-link to="/levels">Levels</router-link>
    <router-link to="/score">Hightscore</router-link>
  </nav>
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
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
  display: inline-block;
  color: white;
  text-align: center;
  padding: 16px 16px;
  text-decoration: none;
  width: 80px;
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
    height: 30px;
  }

  nav {
    padding: 0px;
  }

  #bottom-nav a {
    padding: 5px 5px;
  }

  .mainheader {
    visibility: collapse;
  }

  .subheader {
    position: relative;
    top:-40px;
    /* visibility: collapse; */
  }


}
</style>
