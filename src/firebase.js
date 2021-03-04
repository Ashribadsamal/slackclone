import firebase from 'firebase'


const firebaseConfig = {
    apiKey: "AIzaSyBp0k_rjHCcgbsSm95J6_s6RPz6NIDi_Ew",
    authDomain: "slack-clone-project-baf29.firebaseapp.com",
    projectId: "slack-clone-project-baf29",
    storageBucket: "slack-clone-project-baf29.appspot.com",
    messagingSenderId: "828566896806",
    appId: "1:828566896806:web:059a5b64dca73db7fa3467"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db=firebaseApp.firestore();
  const auth=firebase.auth();
  const provider=new firebase.auth.GoogleAuthProvider();

  export {auth,provider} 
  export default db;
  