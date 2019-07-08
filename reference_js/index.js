//create playable character and npc
let npc = new Character(300,300,'./assets/red-character')
let playablecharacter = new PlayableCharacter(0,0)

//function to determine if playable character is hit by something
hurtbox = (player,monster) => {
    let playerLeft = parseInt(player.element.style.left)+5
    let playerRight = playerLeft + parseInt(player.element.style.width) - 10
    
    let playerBottom = parseInt(player.element.style.bottom) + 20
    let playerTop = playerBottom + player.element.offsetHeight - 25

    let monsterLeft = parseInt(monster.element.style.left)
    let monsterRight = monsterLeft + parseInt(monster.element.style.width)

    let monsterBottom = parseInt(monster.element.style.bottom)
    let monsterTop = monsterBottom + monster.element.offsetHeight
    let monsterHeight = monster.element.offsetHeight
    
    if ( playerLeft < monsterRight && playerRight > monsterLeft){
        if( playerBottom < monsterTop && playerTop > monsterBottom){
            alert("oof")
            player.element.style.left = '0px'
            player.element.style.bottom = '0px'
            player.stop()
        }
    }
}

// if script is put before other html, this will load all html first
document.addEventListener('DOMContentLoaded',function(e){

    // makes sure not to refresh page as well as other things form would normally default do to page
    e.preventDefault()


    //adds npc
    document.body.append(npc.element)

    //fetch request to get saved position and put on to window
    fetch('http://localhost:3000/players/1')
        .then( function(response){
            return response.json()
        })
        .then(function(result){
            playablecharacter.element.style.left = result.x + 'px'
            playablecharacter.element.style.bottom = result.y + 'px'
            document.body.append(playablecharacter.element)
        })

    // speed adjustment
    let button = document.querySelector('.button')
    button.addEventListener('click',function(e){
        let speedInput = document.querySelector('.speed-input')
        playablecharacter.speed = parseInt(speedInput.value)
    })

    //add event listener for save button
    let saveButton = document.querySelector('.save-button')
    saveButton.addEventListener('click',function(){
        fetch('http://localhost:3000/players/1',{
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                x: parseInt(playablecharacter.element.style.left),
                y: parseInt(playablecharacter.element.style.bottom)
            })
        })
    })

    setInterval( function(){ hurtbox(playablecharacter,npc) }, 20)
})
