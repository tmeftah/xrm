<template>
  <v-layout column>
    <v-flex xs12>
      <v-card outlined>
        <v-card-title>
          <div>
            <span>Orders (20)</span>
            <v-text-field
              label="Quick Search"
              single-line
              append-icon="mdi-glasses"
            >
              <v-card-title />
            </v-text-field>
          </div>
          <v-spacer />
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
          >
            <v-icon>
              mdi-plus-thick
            </v-icon>
          </v-btn>
        </v-card-title>

        <div>
          <template>
            <v-data-table
              :headers="headers"
              :items="desserts"
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
export default {
  data () {
    return {
      headers: [
        {
          text: 'Dessert (100g serving)',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: 'Calories', value: 'calories' },
        { text: 'Fat (g)', value: 'fat' },
        { text: 'Carbs (g)', value: 'carbs' },
        { text: 'Protein (g)', value: 'protein' },
        { text: 'Iron (%)', value: 'iron' }
      ],
      desserts: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: '1%'
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: '1%'
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: '7%'
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: '8%'
        },
        {
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: '16%'
        },
        {
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: '0%'
        },
        {
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: '2%'
        },
        {
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: '45%'
        },
        {
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: '22%'
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: '6%'
        }
      ]
    }
  }
}
</script>
