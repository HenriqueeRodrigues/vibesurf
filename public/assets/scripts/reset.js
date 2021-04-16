import firebase from "./firebase-app";
import { getFormValues, getQueryString, hideAlertError, showAlertError } from "./utils"; 

const auth = firebase.auth();
const authpage2 = document.querySelector("#resetpassword");

if (authpage2) {


    const hideAuthForms = () => {
        document
          .querySelectorAll("#auth form")
          .forEach((el) => el.classList.add("hide"));
    };

    const formReset = document.querySelector('#reset')
    console.log(formReset)
    formReset.addEventListener('submit', e => {

        e.preventDefault();

        const btnSubmit = formReset.querySelector('[type=submit]')

        btnSubmit.disabled = true
        btnSubmit.innerHTML = "Redefinindo...";

        const { oobCode } = getQueryString()
        const { password } = getFormValues(formReset)
      

        hideAlertError(formReset)
        console.log(oobCode)
        auth
        .verifyPasswordResetCode(oobCode)
        .then(() => {

            auth
            .confirmPasswordReset(oobCode, password)
            .then(() => {
                hideAuthForms()
                window.location.href = "/login.html"
                
            })
            .catch(showAlertError(formReset))
            .finally(() => {
                btnSubmit.disabled = false
                btnSubmit.innerHTML = "Redefinir";
                alert("Senha alterada com Sucesso")

            })
                
        })
    })
}