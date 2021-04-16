import firebase from "./firebase-app";
import { getFormValues, getQueryString, hideAlertError, showAlertError } from "./utils"; 

const auth = firebase.auth();
const authpage2 = document.querySelector("#resetpassword");

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
      
      userElement.querySelector("strong").innerHTML = user.displayName;
      userElement.querySelector("small").innerHTML = user.email;

     menu.classList.add("logged");
     
    }else {
      menu.classList.remove("logged");
    }
  })
}

if (authpage2) {
  
  const formForget = document.querySelector('#forget')
  if(formForget) {
    formForget.addEventListener('submit', e => {

      e.preventDefault()
  
      const btnSubmit = formForget.querySelector('[type=submit]');
      const btnRegisterSend = formForget.querySelector('.registerSend');
      const message = formForget.querySelector('.message');
      const field = formForget.querySelector('.field');
      const actions = formForget.querySelector('.actions');
  
      hideAlertError(formForget)
  
      const values = getFormValues(formForget)
  
      message.style.display = "none";
  
      btnSubmit.disabled = true;
      btnSubmit.innerHTML = "Enviando...";
  
      auth
      .sendPasswordResetEmail(values.email)
      .then(() => {

        field.style.display = 'none';
        actions.style.display = 'none';
        message.style.display = "flex";
        btnRegisterSend.style.display = 'none';

      })
      .catch(error => {

        showAlertError(formForget)(error);

      })
      .finally(() => {

        btnSubmit.disabled = false;
        btnSubmit.innerHTML = "Enviar";

      })
      
    });
  }
}
