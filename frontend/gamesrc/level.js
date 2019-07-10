class Level{
    //checks if level is beaten
    static winMonster = false

    //keeps track of time
    static time

    constructor(level = 1, time = 0){
        //sets start time
        Level.time = time
        let tracker = c('h3')
        tracker.id = "time-tracker"
        tracker.innerText = `Time: ${Level.time}`
        document.body.append(tracker)

        //victory div box
        let victory = c('div')
        victory.id = "victory-box"
        let victoryText = c('h1')
        victoryText.id = "victory-text"
        victoryText.innerText = "YOU WIN"
        victory.append(victoryText)

        //resets monster health bar positions
        Monster.healthPosition = 5

        //loads player
        let player = new PlayableCharacter(30,60)
        player.render()

        //creates monsters based on level number
        for (let i = 0; i < (level); i++) {
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
            if(Level.winMonster){
                //stops player from moving
                player.dead = true
                console.log(Level.time)
                document.body.append(victory)

                //ends setInterval
                clearInterval(interval)
            }
        },20)
    }

    save(){
        //fetch request to save
    }
}