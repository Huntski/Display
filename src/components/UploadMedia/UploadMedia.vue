<template>
  <Popup>
    <div class="upload-popup z-20 bg-white mt-20 rounded-lg p-10">
      <draggable
          v-model="list"
          group="people"
          @start="drag=true"
          @end="drag=false"
          item-key="id">
        <template #item="{element}">
          <div>{{ element.name }}</div>
        </template>
      </draggable>
    </div>
  </Popup>
</template>

<script>
import Popup from '@/components/Popup'
import draggable from 'vuedraggable'

export default {
  data() {
    return {
      drag: false,
      list: [
        {name: "John", id: 0},
        {name: "Joao", id: 1},
        {name: "Jean", id: 2}
      ],
    }
  },

  methods: {},

  components: {Popup, draggable}
}
</script>

<style>
.upload-popup {
  min-width: 800px;
  height: 600px;
}
</style>