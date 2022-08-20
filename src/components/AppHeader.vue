<script>
export default {

 props: {
    subtitle: {
      type: String,
      required: true,
    }
 }

}
</script>

<template>
  <h1 class="mainheader">J🌰 Memory</h1>
  <hr class="headerdivider"/>
  <h3 class="subheader">{{ subtitle }}</h3>
</template>

<style>

.mainheader {
  margin-bottom: 0;
}
.headerdivider {
  border:solid rgb(69, 151, 69) 1px;
}
.subheader {
  margin-top: 0;
}
</style>