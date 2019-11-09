import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
const config = {
  apiKey: 'AIzaSyCuodhPSn8r5jqiUoxteBMwtXo_YXGPG-E',
  authDomain: 'xrm-nuxt.firebaseapp.com',
  databaseURL: 'https://xrm-nuxt.firebaseio.com',
  projectId: 'xrm-nuxt',
  storageBucket: 'xrm-nuxt.appspot.com',
  messagingSenderId: '806858324495',
  appId: '1:806858324495:web:88be33cf569e86a641817a'
}

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}
const auth = firebase.auth()
const fireDb = firebase.firestore()

export { auth, fireDb }
