import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyC-AaGdV3BQwTGpyUvsJtsmPSDlgeJj9oQ",
    authDomain: "crown-db-b45f3.firebaseapp.com",
    databaseURL: "https://crown-db-b45f3.firebaseio.com",
    projectId: "crown-db-b45f3",
    storageBucket: "crown-db-b45f3.appspot.com",
    messagingSenderId: "656216234809",
    appId: "1:656216234809:web:a9b5a02b4484d3ded766e8"
  };

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('Error creating user!', error.message)
    }
  }
  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
