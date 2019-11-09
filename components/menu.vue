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

        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn
              icon
              width="auto"
              height="auto"
              v-on="on"
            >
              <v-avatar>
                <img
                  src="https://avatars.dicebear.com/v2/male/gvdfgfh.svg"
                  alt="John"
                  size="35"
                >
              </v-avatar>
            </v-btn>
          </template>

          <v-list>
            <v-list-item @click="signOut">
              <v-list-item-title>
                Sign out
              </v-list-item-title>
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
  },
  methods: {
    signOut () {
      this.$store.dispatch('userLogout')
        .then(() => {
          this.$router.push('/login')
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>
