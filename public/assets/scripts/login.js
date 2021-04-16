import firebase from "./firebase-app";
import { getFormValues, hideAlertError, showAlertError } from "./utils"; 
import IMask from 'imask'


const auth = firebase.auth();
const authpagelogin = document.querySelector("#conect");


if (authpagelogin) {
 
    console.log("após do if")
    const auth = firebase.auth();
  
  
    const formAuthRegister = document.querySelector("#conect");
  
    formAuthRegister.addEventListener("submit", (e) => {
      e.preventDefault();
  
      hideAlertError(formAuthRegister);
  
      const values = getFormValues(formAuthRegister)
  
      console.log(values)
  
      auth
        .createUserWithEmailAndPassword(values.register_email, values.register_password)
      .then(response => {
  
        const { user } = response
        user.updateProfile({
          displayName: values.name
        })
  
        window.location.href = "/"
  
        console.log("response", response)
      })
      .catch(showAlertError(formAuthRegister));
  
      
    });
  
}