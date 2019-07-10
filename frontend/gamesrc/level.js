class Level{

    constructor(level = 1){
        //resets monster health bar positions
        Monster.healthPosition = 5

        //creates 3 monsters times the level number
        for (let i = 0; i < (level*3); i++) {
            let fakemonster = new Monster(500,500,'/Users/feventsegay/Desktop/mod-3_game/frontend/animations/knight')
            fakemonster.render()

            //checks if monster is hit by sword every 20 ms
            setInterval( ()=>{
                fakemonster.hurt(player)
            },20)
        }
    }
}