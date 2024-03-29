import firebase from "./firebase-app";
import { getFormValues, getQueryString, hideAlertError, showAlertError } from "./utils"; 

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
      userElement.querySelector("small").innerHTML = user.email

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

  const formForget = document.querySelector('#forget')

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

  const formReset = document.querySelector("#reset")
  formReset.addEventListener('submit', e => {

    e.preventDefault();

    const btnSubmit = formReset.querySelector('[type=submit]')

    btnSubmit.disabled = true
    btnSubmit.innerHTML = "Redefinindo...";

    const { oobCode} = getQueryString()
    const {password} = getFormValues(formReset)

    hideAlertError(formReset)

    auth.verifyPasswordResetCode(oobCode)
    .then( () => auth.confirmPasswordReset(oobCode, password))
    .then(() => {
      window.location.href = "/"
    })
    .catch(showAlertError(formReset))
    .finally(() => {

      btnSubmit.disabled = true
      btnSubmit.innerHTML = "Redefinir..."
    })

  })

  
  
}
