import firebase from "./firebase-app";
import IMask from "imask"
import { getFormValues, getQueryString, hideAlertError, showAlertError } from "./utils"; 

const auth = firebase.auth();
const authpagesing = document.querySelector("#conect");;


/*const email = authpagelogin.document("#email")
const register_email = authpagelogin.document("#register_email")


new IMask(email,{
mask: 'exemplo@dominio.com'
}) 
new IMask(register_email,{
mask: 'exemplo@dominio.com'
})*/

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