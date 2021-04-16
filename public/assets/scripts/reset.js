import firebase from "./firebase-app";
import { getFormValues, getQueryString, hideAlertError, showAlertError } from "./utils"; 

const auth = firebase.auth();
const authpage = document.querySelector("#conect");
const authpage2 = document.querySelector("#resetpassword");

const header = document.querySelector('#header .menu')
const btnLogoff = document.querySelector("#header .menu .footer button");

if (authpage2) {


    const hideAuthForms = () => {
        document
          .querySelectorAll("#auth form")
          .forEach((el) => el.classList.add("hide"));
    };

    const showAuthForm = (id) => {
        document.getElementById(id).classList.remove("hide");
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
                console.log("Cheguei no 2 then")
                hideAuthForms()
                window.location.href = "/login.html"
            })
            .catch(showAlertError(formReset))
            .finally(() => {
                btnSubmit.disabled = false
                btnSubmit.innerHTML = "Redefinir";
                console.log("Cheguei no Finaly")

            })
            console.log("Cheguei no Final de tu")
        
        })
        
        

    })
}