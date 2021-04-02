import firebase from "./firebase-app";
import { getFormValues, hideAlertError, showAlertError } from "./utils";

const authpage = document.querySelector("#conect");


if (authpage) {
 
  const auth = firebase.auth();


  const formAuthRegister = document.querySelector("#conect");

  formAuthRegister.addEventListener("submit", (e) => {
    e.preventDefault();

    

    const values = getFormValues(formAuthRegister)

    console.log(values)

    auth
      .createUserWithEmailAndPassword(values.register_email, values.register_password)
    .then(response => {

      console.log("response", response)
    })
    .catch(err => {
      console.log('err', err)
    })

    
  });

  
}
