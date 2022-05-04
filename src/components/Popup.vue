<template>
    <div class="absolute top-0 left-0 w-full flex justify-center">
      <div class="absolute top-0 left-0 w-full min-h-screen z-10"
            :style="{ background: 'rgb(0, 0, 0, 20%)'}"/>

      <slot class="popup"></slot>
    </div>
</template>
