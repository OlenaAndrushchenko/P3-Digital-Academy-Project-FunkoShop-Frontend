<script setup>
import CopyrightBar from './CopyrightBar.vue'
import DevelopersSection from './DevelopersSection.vue'
import SubscribeForm from './SubscribeForm.vue'
</script>

<template>
  <div class="bg-blueFunko-700 py-10 md:py-14">
    <div class="max-w-[1300px] mx-auto xl:px-0 px-5 grid grid-cols-1 md:grid-cols-12 gap-8">
      <SubscribeForm />
      <DevelopersSection />
    </div>
  </div>
  <CopyrightBar />
</template>
