<template>
  <v-layout column>
    <v-flex xs12>
      <v-card outlined>
        <v-card-title>
          <div cols="12">
            <span>New Customer</span>
          </div>
        </v-card-title>
        <v-card-actions>
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
              :disabled="!valid"
              color="success"
              class="mr-4"
              @click="validate"
            >
              Validate
            </v-btn>

            <v-btn
              color="error"
              class="mr-4"
              @click="reset"
            >
              Reset Form
            </v-btn>

            <v-btn
              color="warning"
              @click="resetValidation"
            >
              Reset Validation
            </v-btn>
            <v-btn
              color="success"
              class="mr-4"
              @click="writeToFirestore"
            >
              Save
            </v-btn>
          </v-form>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { fireDb, auth } from '@/services/firebase.js'
export default {
  middleware: 'authenticated',
  data () {
    return {
      valid: true,

      nameRules: [
        v => !!v || 'Field is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters'
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      mobileRules: [
        v => !!v || 'E-mail is required',
        v => /^[0-9-]*$/.test(v) || 'E-mail must be valid'
      ],
      writeSuccessful: false,
      readSuccessful: false,
      customer: {
        firstname: '',
        lastname: '',
        email: '',
        mobile: ''

      }
    }
  },

  methods: {
    validate () {
      if (this.$refs.form.validate()) {
        this.snackbar = true
      }
    },
    reset () {
      this.$refs.form.reset()
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    },
    async writeToFirestore () {
      const customers = fireDb.collection('users').doc(auth.currentUser.uid).collection('customers')
      try {
        await customers.add(this.customer)
      } catch (e) {
        // TODO: error handling
        console.error(e)
      }
      this.writeSuccessful = true
    }
  }
}
</script>
