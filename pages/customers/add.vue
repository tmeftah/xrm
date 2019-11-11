<template>
  <v-row
    align-center
    justify-center
  >
    <v-col
      cols="12"
      sm="8"
      offset-sm="2"
    >
      <v-card>
        <v-card-title>
          <span>New Customer</span>
        </v-card-title>
        <v-card-text>
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-text-field
              v-model="customer.firstname"
              :counter="10"
              :rules="nameRules"
              label="Firstname*"
              required
            />

            <v-text-field
              v-model="customer.lastname"
              :counter="10"
              :rules="nameRules"
              label="Lastname*"
              required
            />

            <v-text-field
              v-model="customer.email"
              :rules="emailRules"
              label="E-mail*"
              required
            />

            <v-text-field
              v-model="customer.mobile"
              :counter="10"
              :rules="mobileRules"
              label="Mobile*"
              required
            />

            <v-btn
              :loading="loading"
              color="success"
              class="mr-4"
              @click="addCustomer"
            >
              Save
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>

export default {
  middleware: 'authenticated',
  data () {
    return {
      valid: true,
      nameRules: [
        v => !!v || 'Field is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters'
      ],

      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      mobileRules: [
        v => !!v || 'E-mail is required',
        v => /^[0-9-]*$/.test(v) || 'E-mail must be valid'
      ],
      customer: {
        firstname: '',
        lastname: '',
        email: '',
        mobile: ''

      }

    }
  },

  methods: {
    addCustomer () {
      if (this.$refs.form.validate()) {
        this.snackbar = true
        this.$store.dispatch('customers/addCustomer', this.customer)
        // this.$refs.form.reset()
        // this.$refs.form.resetValidation()
      }
    }

  }
}
</script>
