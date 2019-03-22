import * as firebase from "firebase/app";
import "firebase/database"

class Firebase {
  static instance
  constructor() {
    if (this.instance) {
      return this.instance
    }

    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: `${process.env.GATSBY_FIREBASE_apiKey}`,
        authDomain: `${process.env.GATSBY_FIREBASE_authDomain}`,
        databaseURL: `${process.env.GATSBY_FIREBASE_databaseURL}`,
        projectId: `${process.env.GATSBY_FIREBASE_projectId}`,
        storageBucket: `${process.env.GATSBY_FIREBASE_storageBucket}`,
        messagingSenderId: `${process.env.GATSBY_FIREBASE_messagingSenderId}`
      })
    }

    this.instance = this
    this.database = firebase.database()
  }
}

export default Firebase
