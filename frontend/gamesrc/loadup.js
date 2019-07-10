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

    //loads player
    player = new PlayableCharacter(30,60)
    player.render()

    //loads the level
    new Level()

    let npc = new Monster(300,300,'./animations/monster')
    document.body.append(npc.element)

    let npc2= new MonsterBig(300,300,'./animations/monster2')
    document.body.append(npc2.element)


    setInterval(()=>{
        

        let directionArray = ['up','down','left','right']
        let directionArray2= ['up','down','left','right']

        let randomDirection = directionArray[Math.floor(Math.random() * 4)]
        let randomDirection2 = directionArray2[Math.floor(Math.random() * 4)]

        
        if(randomDirection == 'up'){
            npc.element.direction = [null,null]
            npc.runUp()
            
        }

        if(randomDirection2 == 'up'){
           
            npc2.element.direction = [null,null]
            npc2.runUp()
        }

        if(randomDirection == 'down'){
            npc.element.direction = [null,null]
            npc.runDown()
            
        }
        if(randomDirection2 == 'down'){
            npc2.element.direction = [null,null]
            npc2.runDown()
            
        }

        if(randomDirection == 'right'){
            npc.element.direction = [null,null]
            npc.runRight()
            
        }

        if(randomDirection2 == 'right'){
           
            npc2.element.direction = [null,null]
            npc2.runRight()
        }

        if(randomDirection == 'left'){
            npc.element.direction = [null,null]
            npc.runLeft()
        }

        if(randomDirection2 == 'left'){
            npc2.element.direction = [null,null]
            npc2.runLeft()
        }

        
    },500)
    

})
 