import firebaseConfig from "../../../firebase.json";
import firebase from "firebase/app";
import "firebas/login";
import "firebas/forget";
import "firebas/register";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

export default firebase;
