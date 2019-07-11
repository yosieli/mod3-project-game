class Level{

    //keeps track of time
    static time

    constructor(savefile){
        this.savefile = savefile
        //set level to be called later
        this.level = savefile.level
        //sets start time
        Level.time = savefile.time
        let tracker = c('h3')
        tracker.id = "time-tracker"
        tracker.innerText = `Time: ${Level.time}`
        document.body.append(tracker)

        //resets monster health bar positions
        Monster.healthPosition = 5

        //loads player with proper health
        this.player = new PlayableCharacter(30,60,savefile.health)
        this.player.render()

        //creates monsters based on level number
        for (let i = 0; i < (this.level); i++) {
            //used full path so animation comparisons will work
            let fakemonster = new Monster(500,500,'/Users/flatironschool/Desktop/mod-3_game/frontend/animations/monster')
            fakemonster.render()

            //checks if monster is hit by sword every 20 ms
            setInterval( ()=>{
                fakemonster.hurt(this.player)
            },20)

            //checks if player is hit by monster every 20 ms
            setInterval( ()=>{
                this.player.hurt(fakemonster)
            },20)
        }

        let interval = setInterval(()=>{
            Level.time ++
            tracker.innerText = `Time: ${Level.time}`
            let monsterCheck = Monster.all.filter( (monster)=> monster.dead )
            if(this.player.dead){
                this.player.gameOver()
                setTimeout(()=>{
                    //puts status box with defeat text and options
                    this.defeat()
                },3000)

                //ends setInterval
                clearInterval(interval)

            }else if(monsterCheck.length == Monster.all.length){
                //stops player from moving
                this.player.stop()

                //puts status box with victory
                this.victory()

                //ends setInterval
                clearInterval(interval)
            }

        },20)
    }

    victory(){
        this.endScreen("Level Complete","Save & Continue","Save & Quit")
        this.option1.addEventListener('click', ()=> this.save(false))
        this.option2.addEventListener('click', ()=> this.save(true))
    }

    defeat(){
        this.endScreen("Game Over","Try Again","Quit")
        this.option1.addEventListener('click',()=>{
            let  gameArea = new GameArea(this.savefile.id)
            gameArea.render()
        })
            this.option2.addEventListener('click',()=>{
            GameArea.endLevelQuit()
        })
    }

    endScreen(stringStatus,string1,string2){
        //status div box for if player wins or dies
        let statusBox = c('div')
        statusBox.id = "status-box"
        let statusText = c('h1')
        statusText.id = "status-text"

        //option boxes for when player wins/loses
        this.option1 = c('div')
        this.option1.className = "option-box"
        let option1Text = c('h2')
        option1Text.className = "option-text"
        this.option1.append(option1Text)
        this.option2 = c('div')
        this.option2.className = "option-box"
        let option2Text = c('h2')
        option2Text.className = "option-text"
        this.option2.append(option2Text)

        
        statusBox.append(statusText,this.option1,this.option2)

        statusText.innerText = stringStatus
        option1Text.innerText = string1
        option2Text.innerText = string2

        document.body.append(statusBox)
    }

    save(quit){
        //adds one health if health is less than 5
        if(this.player.health<5){
            this.player.health ++
        }

        //fetch request to save
        fetch(`http://localhost:3000/savefiles/${this.savefile.id}`,{
            method:'PATCH',
            headers: {
                "Content-Type":'application/json',
                'Accept':'application/json'
            },
            body: JSON.stringify({
                level: (this.level+1),
                time: Level.time,
                health: this.player.health
            })
        })
        .then(response => response.json())
        .then(result => {
            if(quit){
                GameArea.endLevelQuit()
            }else{
                let  gameArea = new GameArea(this.savefile.id)
                gameArea.render()
            }
        })
    }
}