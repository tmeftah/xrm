<template>
  <v-layout column>
    <v-flex xs12>
      <v-card outlined>
        <v-card-title>
          <div cols="12">
            <span>Orders (20)</span>
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
              @click="writeToFirestore"
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
              :items="orders"
              :items-per-page="5"
              class="elevation-1"
              dense
            />
          </template>
        </div>
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
      writeSuccessful: false,
      readSuccessful: false,
      text: '',
      headers: [
        {
          text: 'Refrence',
          align: 'left',
          sortable: false,
          value: 'ref'
        },
        { text: 'Order Items', value: 'items' },
        { text: 'Amount', value: 'amount' },
        { text: 'Customer', value: 'customer' },
        { text: 'Order Date', value: 'order_date' }
      ],
      orders: []
    }
  },
  mounted () {
    this.getTodos()
  },

  methods: {
    async getTodos () {
      const orders = await fireDb.collection('users')
        .doc(auth.currentUser.uid)
        .collection('orders')
      orders.onSnapshot((snap) => {
        this.orders = []
        snap.forEach((doc) => {
          const order = doc.data()
          order.id = doc.id
          order.ref = orders.id
          this.orders.push(order)
        })
      })
    },

    async writeToFirestore () {
      const order = fireDb.collection('users').doc(auth.currentUser.uid).collection('orders')
      const document = {
        amount: 247,
        items: 3,
        order_date: Date(Date.now())
      }

      try {
        await order.add(document).then(await function (docRef) {
          docRef.collection('item_list').add(document)
        })
      } catch (e) {
        // TODO: error handling
        console.error(e)
      }
      this.writeSuccessful = true
    }
  }
}
</script>
