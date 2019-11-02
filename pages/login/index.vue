<template>
  <form @submit.prevent>
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="account.email"
            label="E-mail"
            required
          />
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="account.password"
            label="Password"
            required
          />
        </v-col>
      </v-row>
    </v-container>
    <v-btn
      class="mr-4"
      @click="login"
    >
      submit
    </v-btn>
  </form>
</template>

<script>

export default {
  layout: 'login',
  middleware: 'anonymous',
  data: () => ({
    account: {
      email: 't@tt.de',
      password: 't@tt.de'
    },
    isError: false,
    errorString: ''
  }),
  methods: {
    login () {
      this.$store.dispatch('login', this.account)
    }
  }
}
</script>

<style>
</style>
