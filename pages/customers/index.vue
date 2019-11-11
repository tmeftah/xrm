<template>
  <v-layout column>
    <v-flex xs12>
      <v-card outlined>
        <v-card-title>
          <div cols="12">
            <span>Customers ({{ customers.length }})</span>
            <v-text-field
              v-model="text"
              label="Quick Search"
              single-line
              append-icon="mdi-glasses"
            >
              <v-card-title />
            </v-text-field>
          </div>
          <v-spacer class="d-none d-sm-flex" />
          <div cols="12">
            <v-btn
              class="mx-2 deep-purple lighten-5"
              fab
              small
            >
              <v-icon>
                mdi-file-document-box-search-outline
              </v-icon>
            </v-btn>
            <v-btn
              class="mx-2 light-blue lighten-5"
              fab
              small
              @click="get_customers"
            >
              <v-icon>
                mdi-reload
              </v-icon>
            </v-btn>
            <v-btn
              class="mx-2 amber lighten-3"
              fab
              small
            >
              <v-icon>
                mdi-printer-settings
              </v-icon>
            </v-btn>
            <v-btn
              class="mx-2 light-green accent-2"
              fab
              small
              @click="add_customer"
            >
              <v-icon>
                mdi-plus-thick
              </v-icon>
            </v-btn>
          </div>
        </v-card-title>

        <div>
          <template>
            <v-data-table
              :headers="headers"
              :items="customers"
              :items-per-page="5"
              class="elevation-1"
            />
          </template>
        </div>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
// import { fireDb, auth } from '@/services/firebase.js'
export default {
  middleware: 'authenticated',
  data () {
    return {
      writeSuccessful: false,
      readSuccessful: false,
      text: '',

      headers: [
        {
          text: 'First Name',
          align: 'left',
          sortable: false,
          value: 'firstname'
        },
        { text: 'Last Name', value: 'lastname' },
        { text: 'Email', value: 'email' },
        { text: 'Mobile', value: 'mobile' }
      ]

    }
  },
  computed: {
    customers () {
      return this.$store.getters['customers/get_list']
    }
  },
  beforeMount () {
    this.$store.dispatch('customers/getCustomers')
  },

  methods: {
    get_customers () {
      this.$store.dispatch('customers/getCustomers')
    },
    add_customer () {
      this.$router.push('/customers/add')
    }

  }
}
</script>
