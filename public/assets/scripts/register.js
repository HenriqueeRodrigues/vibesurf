import firebase from "./firebase-app";
import { getFormValues, hideAlertError, showAlertError } from "./utils";

const auth = firebase.auth();
const authpage = document.querySelector("#conect");;
const header = document.querySelector('#header .menu')
const btnLogoff = document.querySelector("#header .menu .footer button");

if(btnLogoff) {
  btnLogoff.addEventListener('click', e => {
    auth.signOut().then(() => {

    }).catch(err => console.error(err))

  })

}

if (menu) {


  auth.onAuthStateChanged(user => {

    if (user) {
      const userElement = menu.querySelector(".footer > div > div")

      userElement.querySelector("strong").innerHTML = user.displayName
      userElement.querySelector("small").innerHTML = user.register_email

     menu.classList.add("logged");

    }else {
      menu.classList.remove("logged");
    }
  })
}


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
