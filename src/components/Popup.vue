<template>
    <div class="absolute top-0 left-0 w-full flex justify-center">
      <div class="absolute top-0 left-0 transparent w-full min-h-screen z-10" />

      <div class="bg-white rounded-md py-10 px-3 shadow-lg mt-20 px-20 z-20 popup">
        <slot></slot>
      </div>
    </div>
</template>

<script></script>

<style>
.transparent {
  background: rgb(0, 0, 0, 20%);
}
</style>

