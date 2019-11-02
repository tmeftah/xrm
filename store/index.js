import Cookie from 'js-cookie'
import JWTDecode from 'jwt-decode'
import cookieparse from 'cookieparser'
import { auth } from '@/services/firebase'

export const state = () => ({
  user: null
})

export const mutations = {
  SET_USER (state, account) {
    state.user = account || null
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
  }
}
