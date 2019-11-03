<template>
  <v-container
    fluid
    fill-height
  >
    <v-row
      align-center
      justify-center
    >
      <v-col
        cols="12"
        sm="8"
        offset-sm="2"
        md="4"
        offset-md="4"
      >
        <v-card>
          <v-toolbar
            flat
            color="indigo darken-1"
            dark
          >
            <v-toolbar-title>
              Log in to access x-RM
            </v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <form @submit.prevent>
              <v-text-field
                v-model="account.email"
                label="E-mail"
                required
              />
              <v-text-field
                v-model="account.password"
                :append-icon="show1 ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
                :type="show1 ? 'text' : 'password'"
                label="Password"
                required
                @click:append="show1 = !show1"
              />
              <v-btn
                class="mr-4 success"
                @click="login"
              >
                Sign In
              </v-btn>
            </form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
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
    errorString: '',
    show1: false
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
