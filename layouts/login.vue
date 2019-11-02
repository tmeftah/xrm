<template>
  <v-app dark>
    <v-container>
      <nuxt />
    </v-container>

    <Footer />
  </v-app>
</template>

<script>
import Footer from '~/components/footer'
export default {
  components: {
    Footer
  }
}
</script>
