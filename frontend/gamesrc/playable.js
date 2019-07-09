class PlayableCharacter extends Character{
        
    static all = []

    constructor(x,y){

        super(x,y,'file:///Users/flatironschool/Desktop/mod-3_game/frontend/animations/knight')

        PlayableCharacter.all.push(this)
        //recording keyboard inputs
        document.addEventListener('keydown', (e)=> {

            //checks for animation after slash is complete
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

            //logic so that if left/right is pressed down before right/left is lifted up, won't stop the character
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

        //put idle checks for if the play was idle before/after slash animation starts
        let idleCheck = false
        if(this.element.src === `${this.ASSET_ROOT}/idle.gif`){
            idleCheck = true
            direction = this.idleDirection
        }
        this.finishSlash = false
        this.element.src = `${this.ASSET_ROOT}/slash${direction}.gif`

        setTimeout( ()=>{
            this.finishSlash = true
            if(this.element.src === `${this.ASSET_ROOT}/idle.gif`){
                idleCheck = true
            }
            if(this.slashCheck && !idleCheck){
                this.element.src = `${this.ASSET_ROOT}/run${direction}.gif`
            }else if(idleCheck){
                this.element.src = `${this.ASSET_ROOT}/idle.gif`
            }
        },200)
    }

    hitbox(direction){
        if(direction == 'Right'){
            leftBorder = this.element.style.left + 40
            rightBorder = this.element.style.left + 75
            topBorder = this.element.style.bottom + 50
            bottomBorder = this.element.style.bottom + 15
        }
        if(direction == 'Left'){
            leftBorder = this.element.style.left
            rightBorder = this.element.style.left + 35
            topBorder = this.element.style.bottom + 50
            bottomBorder = this.element.style.bottom + 15
        }
        if(direction == 'Up'){
            leftBorder = this.element.style.left
            rightBorder = this.element.style.left + 75
            topBorder = this.element.style.bottom + 75
            bottomBorder = this.element.style.bottom + 50
        }
        if(direction == 'Down'){
            leftBorder = this.element.style.left
            rightBorder = this.element.style.left + 75
            topBorder = this.element.style.bottom + 35
            bottomBorder = this.element.style.bottom
        }

        return [leftBorder,rightBorder,topBorder,bottomBorder]
    }

}