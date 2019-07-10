//these four are already in the index.js page
let s = (element) => document.querySelector(element)
let c = (element) => document.createElement(element)
const styleLink = './style.css'
const gameLink = './game.css'

//put these in index.js later
let gameArea

document.addEventListener('DOMContentLoaded',()=>{

    gameArea = new GameArea()
    gameArea.render()

    fakemonster = new Monster(500,500,'file:///Users/flatironschool/Desktop/mod-3_game/frontend/animations/knight')
    fakemonster2 = new Monster(400,500,'file:///Users/flatironschool/Desktop/mod-3_game/frontend/animations/knight')
    document.body.append(fakemonster.element,fakemonster2.element)
    
    player = new PlayableCharacter(30,60)
    document.body.append(player.element)

    setInterval( ()=>{
        fakemonster.hurt(player)
        fakemonster2.hurt(player)
    },20)

})
 