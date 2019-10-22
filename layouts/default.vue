<template>
  <v-app dark>
    <Menu />
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <Footer />
  </v-app>
</template>

<script>
import Menu from '~/components/menu'
import Footer from '~/components/footer'
export default {
  components: {
    Menu,
    Footer
  }
}
</script>
