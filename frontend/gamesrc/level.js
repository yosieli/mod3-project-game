class Level{
    //checks if level is beaten
    static winMonster = false

    //keeps track of time
    static time

    constructor(level = 1, time = 0){
        //set level to be called later
        this.level = level
        //sets start time
        Level.time = time
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
        player.render()

        //creates monsters based on level number
        for (let i = 0; i < (level); i++) {
            //used full path so animation comparisons will work
            let fakemonster = new Monster(500,500,'/Users/feventsegay/Desktop/mod-3_game/frontend/animations/knight')
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
            if(Level.winMonster){
                //stops player from moving
                player.dead = true

                //puts status box with victory
                statusText.innerText = "YOU WIN"
                document.body.append(statusBox)

                //saves game
                this.save(player)

                //ends setInterval
                clearInterval(interval)
            }else if(player.dead){
                player.element.src = "/Users/flatironschool/Desktop/mod-3_game/frontend/animations/knight/death.gif"
                setTimeout(()=>{
                    //puts status box with defeat
                    statusText.innerText = "Game Over"
                    document.body.append(statusBox)
                },3000)
                //ends setInterval
                clearInterval(interval)
            }

        },20)
    }

    save(player){
        //fetch request to save
        fetch(`http://localhost:3000/savefiles/1`,{ //need savefile ID
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