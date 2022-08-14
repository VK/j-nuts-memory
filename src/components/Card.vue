<script>
import { computed } from 'vue'

export default {
  props: {
    matched: {
      type: Boolean,
      default: false
    },
    position: {
      type: Number,
      required: true
    },
    value: {
      required: true
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  setup(props, context) {
    const flippedStyles = computed(() => {
      if (props.visible) {
        return 'is-flipped'
      }
      return ''
    })

    const selectCard = () => {
      context.emit('select-card', {
        position: props.position,
        faceValue: props.value.value
      })
    }

    return {
      flippedStyles,
      selectCard
    }
  }
}
</script>

<template>
  <div class="card" :class="flippedStyles" @click="selectCard">
    <div class="card-face is-front">
      <img v-if="value.variant == 2"
        class="card-image"
        :src="value.img"
        :alt="value.value"
      />
      <div v-if="value.variant == 1">{{value.value}}</div>
      <img v-if="matched" src="/images/checkmark.svg" class="icon-checkmark" />
    </div>
    <div class="card-face is-back"></div>
  </div>
</template>

<style>
.card {
  position: relative;
  transition: 0.5s transform ease-in;
  transform-style: preserve-3d;
  
}

.card.is-flipped {
  transform: rotateY(180deg);
}

.card-face {
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  backface-visibility: hidden;
  box-shadow: 1px 2px 6px  rgb(165, 233, 165);
}

.card-face.is-front {
  background: #fff;
  font-weight: 700;
  color: #000;
  transform: rotateY(180deg);
}

.card-face.is-back {
  /* background-image: url('/images/card-bg.png'); */
  background: rgb(69, 151, 69);;
  color: #000
}

.card-image {
  max-width: 100%;
}

.icon-checkmark {
  position: absolute;
  right: 5px;
  bottom: 5px;
}
</style>
