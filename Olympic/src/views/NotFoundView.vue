<script setup lang="ts">
import { defineProps, withDefaults } from 'vue';

const props = withDefaults(
  defineProps<{
    resource: string;
  }>(),
  {
    resource: 'page',
  }
);
</script>

<template>
  <div class="not-found text-center p-6 bg-gray-100 h-screen flex flex-col justify-center items-center">
    <img src="../picture/error.png" alt="404 Error" class="w-48 h-48 mb-6" />
    <h1 class="text-4xl font-bold mb-4">Oops! We couldn't find that...</h1>
    <h3 class="text-lg mb-6">
      The {{ props.resource }} you're looking for has either been moved or doesn't exist.
    </h3>
    <p class="mb-6 text-gray-700">
      Don't worry, it's not your fault. You can try going back to the homepage or exploring other sections of the site.
    </p>
    <router-link to="/" class="text-blue-500 hover:underline">Back to Home</router-link>
  </div>
</template>

<style scoped>
.not-found {
  @apply flex flex-col justify-center items-center text-center;
}

.not-found img {
  @apply mb-6 rounded-full;
}

h1 {
  @apply text-4xl font-bold mb-4;
}

h3 {
  @apply text-lg mb-6;
}

p {
  @apply mb-6 text-gray-700;
}

router-link {
  @apply text-blue-500 hover:underline;
}
</style>
