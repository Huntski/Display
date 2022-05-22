<template>
  <div class="flex items-center">
    <div>
      <h1 class="text-3xl font-extrabold">Good morning! 👋</h1>
      <p>Another great day to ‘study’.</p>
    </div>


    <div class="ml-auto">
      <SearchInput v-model:value="searchQuery" @keydown.enter="searchMedia" />
    </div>
  </div>
</template>