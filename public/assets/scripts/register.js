import firebase from "./firebase-app";
import { getFormValues, hideAlertError, showAlertError } from "./utils";

const authpage = document.querySelector("#conect");


if (authpage) {
 
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

  const formAuthLogin = document.querySelector("#conect");

  formAuthLogin.addEventListener("submit", (e) => {
    e.preventDefault();

    hideAlertError(formAuthLogin);

    const values = getFormValues(formAuthLogin);

    auth
      .signInWithEmailAndPassword(values.email, values.password)
      .then((response) => (window.location.href = "/"))
      .catch(showAlertError(formAuthLogin));
  });

  
}
