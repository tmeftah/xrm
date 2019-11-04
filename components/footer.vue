<template>
  <v-footer
    fixed
    app
  >
    <span>&copy; 2019 {{ stat }} {{ serv }} </span>
  </v-footer>
</template>

<script>
export default {
  data () {
    return {
      stat: this.$store.state.static_,
      serv: this.$store.state.server_
    }
  }
}
</script>
