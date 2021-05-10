module.exports = {
  vueTemplate: (componentName) => {
    return `
<template>
  <div class="${componentName}">
  </div>
</template>
<script>
export default {
  name: '${componentName}',
  created() {

  },
  mounted() {
  },
  methods: {
  },
  components: {

  },
  computed: {

  },
  watch: {
  },
  beforeUpdate() {

  },
  updated() {

  },
  beforeDestroy() {

  },
  destroyed() {


  },
};
</script>
<style lang="less">
  .${componentName}{

  }
</style>
        `;
  },
  entryTemplate: `

import Index from './index.vue'

export default Index`
};
