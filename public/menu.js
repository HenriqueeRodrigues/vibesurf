const btnOpen = document.querySelector('.btn-open');
const btnClose = document.querySelector('.btn-close');
const closeMenu = document.querySelectorAll('[data-close="menu"]');
const menu = document.querySelector('.menu');

const body = document.querySelector('body')

btnOpen.addEventListener('click', e => {

  menu.classList.add('open-menu')
  body.classList.add('open-menu')


})

btnClose.addEventListener('click', e => {

  menu.classList.remove('open-menu')
  body.classList.remove('open-menu')

})

closeMenu.forEach(el => {
  el.addEventListener('click', e=> {
      menu.classList.remove('open-menu')
      body.classList.remove('open-menu');
  })
})