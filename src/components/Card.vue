<script>
import { computed, ref } from "vue";


export default {
  props: {
    matched: {
      type: Boolean,
      default: false,
    },
    position: {
      type: Number,
      required: true,
    },
    value: {
      required: true,
    },
    cardbg: {
      required: false,
    },
    visible: {
      type: Boolean,
      default: false,
    },
  },

  watch: {
    value: function (newVal) { 
      // console.log("old", this.base_event_value);
      this.base_event_value.faceValue = newVal.value;
      this.base_event_value.variant = newVal.variant;

      // console.log("new", this.base_event_value)
      // console.log('Prop changed: ', newVal, ' | was: ', oldVal)
    },
    position: function (newVal) { 
      // console.log("old", this.base_event_value);
      this.base_event_value.position = newVal;

      // console.log("new", this.base_event_value)
      // console.log('Prop changed: ', newVal, ' | was: ', oldVal)
    }
  },
  setup(props, context) {

    const flippedStyles = computed(() => {
      if (props.visible || props.matched) {
        return "is-flipped";
      }
      return "";
    });

    const cardtextclass = computed(() => {
      const name = props.value.value;
      const splitmax = Math.max(...name.split(/[\s,-]+/).map((el) => el.length));

      if (splitmax < 6) {
        return "card-text";
      } else if (splitmax < 9) {
        return "card-text card-90";
      } else if (splitmax < 10) {
        return "card-text card-80";
      } else if (splitmax < 12) {
        return "card-text card-70";
      } else if (splitmax < 14) {
        return "card-text card-60";
      }

      return "card-text card-50";
    });

    const base_event_value = ref({
      position: props.position,
      faceValue: props.value.value,
      variant: props.value.variant
    })

    const selectCard = () => {
      let event_value = base_event_value.value;

      if (props.visible || props.matched) {
        event_value = {};
      }

      //console.log("emit", "select-card", props.value.value, event_value, props)

      context.emit("select-card", event_value);
    };

    return {
      flippedStyles,
      selectCard,
      cardtextclass,
      base_event_value,
    };
  },
};
</script>

<template>
  <div class="card" :class="flippedStyles" @click="selectCard">
    <span style="font-size:10px; position:absolute; heigh:0; z-index:1000; left:10px; ">
  
    </span>
    <div class="card-face is-front">
      <img v-if="value.variant == 2" class="card-image" :src="value.img" :alt="value.value" />
      <div v-if="value.variant == 1" :class="cardtextclass">
        {{ value.value }}
      </div>
      <img v-if="matched" src="images/checkmark.svg" class="icon-checkmark" />
    </div>
    <div class="card-face is-back"><img class="card-bg" :src="cardbg" /></div>
    <!-- <div style="color: #fff">{{ position }}</div> -->
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

.card-text {
  padding: 5px;
}

.card-90 {
  font-size: 90%;
}

.card-80 {
  font-size: 80%;
}

.card-70 {
  font-size: 70%;
}

.card-60 {
  font-size: 60%;
}

.card-50 {
  font-size: 50%;
}

.card-face {
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  backface-visibility: hidden;
  box-shadow: 2px 2px 6px rgb(221, 247, 221);
}

.card-face.is-front {
  background: #fff;
  font-weight: 700;
  color: #000;
  transform: rotateY(180deg);
  -webkit-user-select: none;
  /* Chrome all / Safari all */
  -moz-user-select: none;
  /* Firefox all */
  -ms-user-select: none;
  /* IE 10+ */
  user-select: none;
  /* Likely future */
}

.card-face.is-back {
  /* background-image: url('images/card-bg.png'); */
  background: rgb(69, 151, 69);
  color: #000;
}

.card-image {
  max-width: 100%;
}

.card-bg {
  max-width: 75%;
}

.icon-checkmark {
  position: absolute;
  right: 5px;
  bottom: 5px;
}
</style>
