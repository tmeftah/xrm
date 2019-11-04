
import Cookie from 'js-cookie'
import JWTDecode from 'jwt-decode'
import cookieparse from 'cookieparser'
import { auth, fireDb } from '@/services/firebase'

export const state = () => ({
  user: null,
  customers: [],
  writeSuccess: false
})

export const mutations = {
  SET_USER (state, account) {
    state.user = account || null
  },
  RESET_USER (state) {
    state.user = null
  },
  GET_CUSTOMERS (state, customers) {
    state.customers = customers || []
  },
  AddCustomer (state) {
    state.writeSuccess = true
  },
  IS_STATIC (state, static_) {
    state.static_ = static_
  },
  IS_SERVER (state, server_) {
    state.server_ = server_
  }
}

export const actions = {
  async login ({ commit }, account) {
    // login the user
    await auth.signInWithEmailAndPassword(account.email, account.password)
    // GET JWT from Firebase
    const token = await auth.currentUser.getIdToken()
    const { email, uid } = auth.currentUser

    // SET JWT to Cookie
    Cookie.set('access_token', token)

    // set the user locally
    commit('SET_USER', { email, uid })
    this.$router.push('/')
  },
  resetUser ({ commit }) {
    commit('RESET_USER')
    Cookie.remove('access_token')
  },
  userLogout () {
    return auth.signOut().then(() => {
      this.dispatch('resetUser')
    })
  },
  async  getCustomers ({ commit, state }) {
    const query = await fireDb.collection('users')
      .doc(state.user.uid)
      .collection('customers')
    await query.onSnapshot((snap) => {
      const customers = []
      snap.forEach((doc) => {
        const customer = doc.data()
        customers.push(customer)
      })
      commit('GET_CUSTOMERS', customers)
    })
  },
  async addCustomer ({ commit }, customer) {
    const query = fireDb.collection('users').doc(auth.currentUser.uid).collection('customers')
    const exist = query.where('email', '==', customer.email)
    await exist.where('email', '==', customer.email).get().then((snap) => {
      if (snap.size === 0) {
        try {
          query.add(customer).then(
            commit('AddCustomer')
          )
        } catch (e) {
          // TODO: error handling
          console.error(e)
        }
      }
      // snap.forEach((doc) => {
      //   console.log(doc.data())
      // })
    })
  },

  nuxtServerInit ({ commit }, { req }) {
    if (process.server && process.static) { return };
    if (!req.headers.cookie) { return };
    const parsed = cookieparse.parse(req.headers.cookie)
    const acessTokenCookie = parsed.access_token
    if (!acessTokenCookie) { return };
    const decoded = JWTDecode(acessTokenCookie)
    if (decoded) {
      commit('SET_USER', {
        uid: decoded.user_id,
        email: decoded.email
      })
    }
  }
}

export const getters = {
  isAuthenticated (state) {
    return !!state.user
  },
  loggedUser (state) {
    return state.user
  },
  customersList (state) {
    return state.customers
  }
}
