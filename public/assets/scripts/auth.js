import firebase from "./firebase-app";
import { getFormValues, getQueryString, hideAlertError, showAlertError } from "./utils"; 

const auth = firebase.auth();
const authpagesing = document.querySelector("#conect");;
const header = document.querySelector('#header .menu')
const btnLogoff = document.querySelector("#header .menu .footer button");

if (authpagesing) {
 
    
    const auth = firebase.auth();

    const formAuthLogin = document.querySelector("#conect");

    formAuthLogin.addEventListener("submit", (e) => {
      e.preventDefault();
  
      hideAlertError(formAuthLogin);
  
      const values = getFormValues(formAuthLogin);
  
      auth  
        .signInWithEmailAndPassword(values.email, values.password)
        .then((response) => {
  
          const values = getQueryString()
  
          if (values.url) {
              if (window.location.hostname === 'localhost') {
                  window.location.href = `http://localhost:8080${values.url}`
              } else {
                  window.location.href = `https://vibesurf-e63f3.web.app${values.url}`
              }
          } else {
              window.location.href = "/"
          }
  
      })
      .catch(showAlertError(formAuthLogin))
    });
  
}