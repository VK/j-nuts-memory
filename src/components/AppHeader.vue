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
  <h3 class="subheader">{{ subtitle }}</h3>
</template>

<style>

.mainheader {
  padding-top: 1rem;
  margin-bottom: 0.3rem;
  border-bottom:solid rgb(69, 151, 69) 3px;
}

.subheader {
  margin-top: 0;
}
</style>