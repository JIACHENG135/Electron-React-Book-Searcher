<template>
  <div id="app" class="container-fluid">
    <Transition mode="out-in" name="slide-up">
      <!-- <keep-alive> -->
      <RouterView />
      <!-- </keep-alive> -->
    </Transition>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'ImageParsing',
})
</script>

<style>
html{
  background-color: transparent!important;
  /* backdrop-filter: brightness(200%)!important; */
}

</style>
