class PlayableCharacter extends Character{
        
    static all = []

    constructor(x,y){

        super(x,y,'/Users/feventsegay/Desktop/mod-3_game/frontend/animations/knight')

        PlayableCharacter.all.push(this)

        //will slash up on game start when slash button is pressed
        this.idleDirection = 'Up'

        //recording keyboard inputs
        document.addEventListener('keydown', (e)=> {

            //checks for animation after slash is complete
            //this ensures player is not stuck in slash animation when changing direction
            this.slashCheck = false

            //save downkey to check how to stop on up keys
            this.downkey = e.key
            

            if(event.repeat){
                return
            }

            if(e.key == 'ArrowUp'){
                this.runUp()
            }
            if(e.key == 'ArrowDown'){
                this.runDown()
            }
            if(e.key == 'ArrowLeft'){
                this.runLeft()
            }
            if(e.key == 'ArrowRight'){
                this.runRight()
            }
            if(e.key == ' '){
                this.slash()
            }
        })

        //stops if no key is pressed
        document.addEventListener('keyup',(e)=>{

            this.upkey = e.key

            // logic to move in diagonal directions
            // also, if left/right is pressed down before right/left is lifted up, won't stop the character
            if( (e.key == 'ArrowLeft' && this.downkey != 'ArrowRight') || (e.key == 'ArrowRight' && this.downkey != 'ArrowLeft') ){
                if(this.element.direction[0] == null){
                    this.stop()
                }else{
                    this.stop_x()
                }
            }else if( (e.key == 'ArrowUp' && this.downkey != 'ArrowDown') || (e.key == 'ArrowDown' && this.downkey != 'ArrowUp') ){
                if(this.element.direction[1] == null){
                    this.stop()
                }else{
                    this.stop_y()
                }
            }

            //checks for animation after slash is complete
            if(e.key !== ' '){
                this.idleDirection = e.key.slice(5)
                this.slashCheck = false
            }

        })
    }

    render(){
        document.body.append(this.element)
    }


    // slashes is whichever direction player is facing or was last facing
    slash(){
        if(this.directionCheck('Right')){
            this.slashanimation('Right')
        }
        if(this.directionCheck('Left')){
            this.slashanimation('Left')
        }
        if(this.directionCheck('Up')){
            this.slashanimation('Up')
        }
        if(this.directionCheck('Down')){
            this.slashanimation('Down')
        }
        if(this.element.src === `${this.ASSET_ROOT}/idle.gif`){
            let string = this.upkey
            this.slashanimation(string.slice(5))
        }
    }

    // boolean statement to see what direction the character was facing
    directionCheck(direction){
        return this.element.src === `${this.ASSET_ROOT}/run${direction}.gif` || this.element.src === `${this.ASSET_ROOT}/slash${direction}.gif`
    }

    //animation for slash
    slashanimation(direction){
        this.slashCheck = true

        // put idle checks for if the player was idle before slash animation starts
        let idleCheck = false
        if(this.element.src === `${this.ASSET_ROOT}/idle.gif`){
            idleCheck = true
            direction = this.idleDirection
        }

        // boolean to say that slash animation is not finished
        this.finishSlash = false
        this.element.src = `${this.ASSET_ROOT}/slash${direction}.gif`

        // set hit direction of sword for sword hitbox
        this.hitDirection = direction
        this.hitbox()

        setTimeout( ()=>{
            // boolean to say slash animation is finished
            this.finishSlash = true

            // put idle checks for if the player was idle before slash animation starts
            if(this.element.src === `${this.ASSET_ROOT}/idle.gif`){
                idleCheck = true
            }

            //checks if player moved direction before slash animation was complete
            if(this.slashCheck && !idleCheck){
                this.element.src = `${this.ASSET_ROOT}/run${direction}.gif`
            // checks if player stopped moving before slash animation was complete
            }else if(idleCheck){
                this.element.src = `${this.ASSET_ROOT}/idle.gif`
            }

            //turns off hitbox at the end of the 200 milliseconds
            this.hitDirection = null
        },200)
    }

    hitbox(direction){
        let leftBorder = null
        let rightBorder = null
        let topBorder = null
        let bottomBorder = null

        if(direction == 'Right'){
            leftBorder = parseInt(this.element.style.left) + 40
            rightBorder = parseInt(this.element.style.left) + 75
            topBorder = parseInt(this.element.style.bottom) + 50
            bottomBorder = parseInt(this.element.style.bottom) + 15
        }
        if(direction == 'Left'){
            leftBorder = parseInt(this.element.style.left)
            rightBorder = parseInt(this.element.style.left) + 35
            topBorder = parseInt(this.element.style.bottom) + 50
            bottomBorder = parseInt(this.element.style.bottom) + 15
        }
        if(direction == 'Up'){
            leftBorder = parseInt(this.element.style.left)
            rightBorder = parseInt(this.element.style.left) + 75
            topBorder = parseInt(this.element.style.bottom) + 75
            bottomBorder = parseInt(this.element.style.bottom) + 50
        }
        if(direction == 'Down'){
            leftBorder = parseInt(this.element.style.left)
            rightBorder = parseInt(this.element.style.left) + 75
            topBorder = parseInt(this.element.style.bottom) + 35
            bottomBorder = parseInt(this.element.style.bottom)
        }

        return [leftBorder,rightBorder,topBorder,bottomBorder]

    }

}