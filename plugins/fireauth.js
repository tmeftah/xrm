import { auth } from '@/services/firebase.js'

export default (context) => {
  const { store } = context

  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const { email, uid } = user
        resolve(store.commit('SET_USER', { email, uid }))
      }
      return resolve()
    })
  })
}
