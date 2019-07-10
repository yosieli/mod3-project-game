class Level{
    //checks if level is beaten
    static winMonster = false

    //keeps track of time
    static time

    constructor(savefile){
        //set level to be called later
        this.level = savefile.level
        //sets start time
        Level.time = savefile.time
        let tracker = c('h3')
        tracker.id = "time-tracker"
        tracker.innerText = `Time: ${Level.time}`
        document.body.append(tracker)

        //status div box for if player wins or dies
        let statusBox = c('div')
        statusBox.id = "status-box"
        let statusText = c('h1')
        statusText.id = "status-text"
        statusBox.append(statusText)

        
        

        //resets monster health bar positions
        Monster.healthPosition = 5

        //loads player
        let player = new PlayableCharacter(30,60)
        player.health = savefile.health
        player.render()

        //creates monsters based on level number
        for (let i = 0; i < (this.level); i++) {
            //used full path so animation comparisons will work
            let fakemonster = new Monster(500,500,'file:///Users/flatironschool/Desktop/mod-3_game/frontend/animations/knight')
            fakemonster.render()

            //checks if monster is hit by sword every 20 ms
            setInterval( ()=>{
                fakemonster.hurt(player)
            },20)

            //checks if player is hit by monster every 20 ms
            setInterval( ()=>{
                player.hurt(fakemonster)
            },20)
        }

        let interval = setInterval(()=>{
            Level.time ++
            tracker.innerText = `Time: ${Level.time}`
            let monsterCheck = Monster.all.filter( (monster)=> monster.dead )
            if(monsterCheck.length == Monster.all.length){
                Level.winMonster = true
            }
            if(player.dead){
                player.element.src = "/Users/flatironschool/Desktop/mod-3_game/frontend/animations/knight/death.gif"
                setTimeout(()=>{
                    //puts status box with defeat
                    statusText.innerText = "Game Over"
                    document.body.append(statusBox)
                },3000)
                //ends setInterval
                clearInterval(interval)
            }else if(Level.winMonster){
                //stops player from moving
                player.invincible = true
                player.stop()

                //puts status box with victory
                statusText.innerText = "YOU WIN"
                document.body.append(statusBox)

                //saves game
                this.save(player)

                //ends setInterval
                clearInterval(interval)
            }

        },20)
    }

    save(player){
        //fetch request to save
        fetch(`http://localhost:3000/savefiles/${savefile.id}`,{
            method:'PATCH',
            headers: {
                "Content-Type":'application/json',
                'Accept':'application/json'
            },
            body: JSON.stringify({
                level: (this.level+1),
                time: Level.time,
                health: player.health
            })
        })
        .then(response => response.json())
        .then(result => console.log(result))

    }
}