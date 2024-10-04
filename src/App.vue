<script setup>
import { RouterView, useRoute } from 'vue-router'
import NavBar from './components/NavBar/NavBar.vue'
import FooterComponent from './components/Footer/FooterComponent.vue'

const route = useRoute()
</script>

<template>
  <header>
    <NavBar />
  </header>
  <div class="wrapper"></div>

  <RouterView />
  <footer v-if="route.path != '/404'">
    <FooterComponent />
  </footer>
</template>
