<template>
  <header class="flex items-center justify-center bg-white py-4 shadow-md">
    <img :src="JitchatLogo" alt="JitChat Logo" class="h-8 w-8 mr-2" />
    <h1 class="text-xl font-bold">JitChat</h1>
  </header>
</template>

<script setup lang="ts">
  import JitchatLogo from '@src/assets/logo.png';
  </script>