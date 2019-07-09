class Monster extends Character{

    constructor(x,y,ROOT_URL){
        super(x,y,ROOT_URL)

        this.health = 5
    }

    hurtbox(){
        let leftBorder = parseInt(this.element.style.left) + 25
        let rightBorder = parseInt(this.element.style.left) + 55
        let topBorder = parseInt(this.element.style.bottom) + 75
        let bottomBorder = parseInt(this.element.style.bottom)

        return [leftBorder,rightBorder,topBorder,bottomBorder]
    }

    hurt(player){
        let hitbox = player.hitbox(player.hitDirection)

        let swordLeft = hitbox[0]
        let swordRight = hitbox[1]
        let swordUp = hitbox[2]
        let swordDown = hitbox[3]

        let selfLeft = this.hurtbox()[0]
        let selfRight = this.hurtbox()[1]
        let selfUp = this.hurtbox()[2]
        let selfDown = this.hurtbox()[3]

        if(swordRight >= selfLeft && swordLeft <= selfRight){
            if(swordUp >= selfDown && swordDown <= selfUp){
                this.hitstun(player.hitDirection)
            } 
        }
    }

    hitstun(direction){

        this.element.style.backgroundColor = "red"
        setTimeout(()=>{
            this.element.style.backgroundColor = "transparent"
            if(direction == 'Right'){
                this.speed = 8
                this.runRight()
            }
            if(direction == 'Left'){
                this.speed = 8
                this.runLeft()
            }
            if(direction == 'Up'){
                this.speed = 8
                this.runUp()
            }
            if(direction == 'Down'){
                this.speed = 8
                this.runDown()
            }
            this.health--
            console.log(this.health)
        },100)

        setTimeout(()=>{
            this.speed = 5
            this.stop()
        },300)
    }
}