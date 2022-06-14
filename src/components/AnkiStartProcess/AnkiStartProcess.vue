<template>
  <div>
    <div class="p-10 border border-gray-300 rounded-md mt-10">
      <h2>Get started with Anki</h2>

      <Transition name="slide-fade" mode="out-in">
        <PermissionCheck
            v-if="status.PermissionCheck !== true"
            v-model:status="status.PermissionCheck"
        />

        <BasicConfig
            v-else-if="status.BasicConfig !== true"
            v-model:status="status.BasicConfig"
        />
      </Transition>
    </div>

    <StatusIndicater :items="status" />
  </div>
</template>

<script>
import PermissionCheck from './PermissionCheck'
import BasicConfig from './BasicConfig'

export default {
  data() {
    return {
      status: {
        PermissionCheck: null,
        BasicConfig: null
      }
    }
  },

  watch: {
    status: {
      handler(val) {
        console.log('status update:', val)
      },
      deep: true
    }
  },

  methods: {

  },

  components: {PermissionCheck, BasicConfig}
}
</script>