import Cookie from 'js-cookie'
import JWTDecode from 'jwt-decode'
import cookieparse from 'cookieparser'
import { auth, fireDb } from '@/services/firebase'

export const state = () => ({
  user: null,
  customers: []
})

export const mutations = {
  SET_USER (state, account) {
    state.user = account || null
  },
  GET_CUSTOMERS (state, customers) {
    state.customers = customers || []
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
