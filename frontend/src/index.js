let c = (element) => document.createElement(element)
let s = (element) => document.querySelector(element)
const userURL = 'http://localhost:3000/users'
const saveURL = 'http://localhost:3000/savefiles'
const styleLink = './style.css'
const gameLink = './game.css'
let homePage


document.addEventListener('DOMContentLoaded',()=>{

    homePage = new HomePage
    homePage.render()
})