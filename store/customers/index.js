
import { auth, fireDb } from '@/services/firebase'

export const state = () => ({
  list: [],
  customer: {
    firstname: '',
    lastname: '',
    email: '',
    mobile: ''

  }

})

export const mutations = {

  GET_CUSTOMERS (state, list) {
    state.list = list || []
  },
  SET_CUSTOMER (state, customer) {
    state.customer = customer
  }
}

export const actions = {

  async  getCustomers ({ state, commit, rootState }) {
    const query = await fireDb.collection('users')
      .doc(rootState.user.uid)
      .collection('customers')
    await query.onSnapshot((snap) => {
      const list = []
      snap.forEach((doc) => {
        const customer = doc.data()
        customer.id = doc.id
        list.push(customer)
      })
      commit('GET_CUSTOMERS', list)
    })
  },
  async  getCustomerID ({ commit, rootState }, id) {
    await fireDb.collection('users')
      .doc(rootState.user.uid)
      .collection('customers').doc(id).get().then((res) => {
        commit('SET_CUSTOMER', res.data())
      })
  },
  async addCustomer ({ commit }, payload) {
    const query = fireDb.collection('users').doc(auth.currentUser.uid).collection('customers')
    const exist = query.where('email', '==', payload.email)
    await exist.where('email', '==', payload.email).get().then((snap) => {
      if (snap.size === 0) {
        try {
          query.add(payload)
        } catch (e) {
          // TODO: error handling
          console.log(payload)
          console.error(e)
        }
      }
      // snap.forEach((doc) => {
      //   console.log(doc.data())
      // })
    })
  }

}

export const getters = {
  get_list (state) {
    return state.list
  },
  getCustomer (state) {
    return state.customer
  }
}
