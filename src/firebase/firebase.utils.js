import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyCXBvH8bhmUG7z3tIys38Gfe4AXeHbN4-o",
  authDomain: "crwn-db-fa3b2.firebaseapp.com",
  projectId: "crwn-db-fa3b2",
  storageBucket: "crwn-db-fa3b2.appspot.com",
  messagingSenderId: "518144449502",
  appId: "1:518144449502:web:cb550bf97aeb0aa2605b4f",
  measurementId: "G-254ZMCDEYK"
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
      });
    } catch (error) {
      console.log('error creating user', error.message);
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
