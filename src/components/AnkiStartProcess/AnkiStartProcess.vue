<template>
  <div class="flex mt-10 anki-process">
    <div class="p-10 border border-gray-300 rounded-md w-full">
      <Transition name="slide-fade" mode="out-in">
        <PermissionCheck
            v-if="status.PermissionCheck !== true"
            v-model:status="status.PermissionCheck"
        />

        <BasicConfig
            v-else-if="status.BasicConfig !== true"
            v-model:status="status.BasicConfig"
        />

        <CardSetup
            @previous="previous"
            v-else-if="status.CardSetup !== true"
            v-model:status="status.CardSetup"
        />
      </Transition>
    </div>

    <StatusIndicator class="ml-10" :items="status" />
  </div>
</template>

<script>
import PermissionCheck from './PermissionCheck'
import BasicConfig from './BasicConfig'
import CardSetup from './CardSetup'
import StatusIndicator from './StatusIndicator'

export default {
  data() {
    return {
      status: {
        PermissionCheck: null,
        BasicConfig: null,
        CardSetup: null,
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
    /***
     *  Changes previous shown form to null.
     */
    previous() {
      for (let i = 0; i < Object.keys(this.status).length; i++) {
        if (this.status[Object.keys(this.status)[i]] === null) {
          this.status[Object.keys(this.status)[i-1]] = null
          break
        }
      }
    }
  },

  components: {PermissionCheck, BasicConfig, CardSetup, StatusIndicator: StatusIndicator}
}
</script>

<style>
.anki-process {
  max-width: 1200px;
}
</style>
