<template>
  <v-app>
    <v-main>
      <responsive-modal @select-customer="handleCustomerSelect" />
    </v-main>
  </v-app>
</template>

<script>
import ResponsiveModal from './components/ResponsiveModal.vue'

export default {
  name: 'App',
  
  components: {
    ResponsiveModal
  },
  
  methods: {
    handleCustomerSelect(customer) {
      console.log('Selected customer:', customer)
    }
  }
}
</script>

<style>
body {
  font-family: 'Montserrat', sans-serif !important;
}

.v-application {
  font-family: 'Montserrat', sans-serif !important;
}
</style>
