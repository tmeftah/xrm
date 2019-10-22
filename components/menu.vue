<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
    >
      <v-img
        height="80"
        src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
      >
        <v-row
          align="end"
          class="lightbox white--text pa-2 fill-height"
        >
          <v-col>
            <div class="subheading">
              XRM
            </div>
            <div class="body-1">
              crm evolution
            </div>
          </v-col>
        </v-row>
      </v-img>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            XRM
          </v-list-item-title>
          <v-list-item-subtitle />
        </v-list-item-content>
      </v-list-item>

      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-spacer />
      <div class="mr-3">
        <v-badge
          v-model="show"
          color="cyan"
          left
        >
          <template v-slot:badge>
            <span class="font-weight-black">0</span>
          </template>
          <v-icon color="balck lighten-1">
            mdi-cart-arrow-down
          </v-icon>
        </v-badge>
        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <v-menu
          left
          bottom
        >
          <template v-slot:activator="{ on }">
            <v-btn
              icon
              color="success"
              v-on="on"
            >
              <v-avatar color="red">
                <img
                  src="https://cdn.vuetifyjs.com/images/john.jpg"
                  alt="John"
                >
              </v-avatar>
            </v-btn>
          </template>

          <v-list>
            <v-list-item
              v-for="n in 5"
              :key="n"
              @click="() => {}"
            >
              <v-list-item-title>Option {{ n }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      drawer: true,
      items: [{
        icon: 'mdi-monitor-clean',
        title: 'Dashboard',
        to: '/'
      },
      {
        icon: 'mdi-cart-arrow-down',
        title: 'Orders',
        to: '/orders'
      },
      {
        icon: 'mdi-account-group-outline',
        title: 'Customers',
        to: '/customers'
      },
      {
        icon: 'mdi-cube-outline',
        title: 'Products',
        to: '/products'
      },
      {
        icon: 'mdi-information-variant',
        title: 'About',
        to: '/about'
      }
      ],
      userMenus: [
        {
          icon: 'mdi-menu-down-outline',
          title: 'Logout',
          link: '/logout'
        },
        {
          icon: 'mdi-menu-down-outline',
          title: 'Change Password',
          link: '/changepassword'
        }
      ]
    }
  },
  computed: {
    itemss () {
      return this.$store.sidebar.items
    }
  }
}
</script>
