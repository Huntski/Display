<template>
    <div class="fixed z-50 top-0 left-0 w-full flex justify-center">
      <slot class="popup"></slot>

      <div class="absolute top-0 left-0 w-full min-h-screen z-10"
            :style="{ background: 'rgb(0, 0, 0, 20%)'}"/>
    </div>
</template>
