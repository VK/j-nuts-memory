<template>
  <nav id="bottom-nav">
    <router-link to="/">Game</router-link>
    <router-link to="/levels">Levels</router-link>
    <router-link to="/score">Hightscore</router-link>
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
  font-size: 22px;
  display: inline-block;
  color: white;
  text-align: center;
  padding: 8px 16px;
  height: 100%;
  text-decoration: none;
  width: 100px;
}

@media only screen and (max-width: 375px) {
  #bottom-nav a {
    font-size: 15px;
    padding: 10px 2px;
    width: 80px;
    
  }
  #bottom-nav {
    height: 24px;
  }  
}

@media only screen and (max-width: 400px) {
  #bottom-nav a {
    font-size: 18px;
    padding: 11px 2px;
    width:90px;
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
    padding: 5px 5px;
  }

  .mainheader {
    visibility: collapse;
  }

  .subheader {
    position: relative;
    top: -40px;
    /* visibility: collapse; */
  }

  .card {
    width: 70px;
  }
}
</style>
