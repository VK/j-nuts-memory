import { createRouter, createWebHistory } from 'vue-router'
import Game from '../views/Game.vue'
import HighScore from '../views/HighScore.vue'
import Levels from '../views/Levels.vue'

const routes = [
  {
    path: '/',
    name: 'game',
    component: Game
  },
  {
    path: '/levels',
    name: 'levels',
    component: Levels
  },
  {
    path: '/score',
    name: 'highscore',
    component: HighScore
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
