import { auth } from '@/services/firebase.js'

export default (context) => {
  const { store } = context

  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged((user) => {
      const { email, uid } = user
      store.commit('SET_USER', { email, uid })
      resolve()
    })
  })
}
