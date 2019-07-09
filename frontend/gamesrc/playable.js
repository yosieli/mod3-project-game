class PlayableCharacter extends Character{
        
    constructor(x,y){
        super(x,y,'./animations/knight')

        let downkey = null
        //recording keyboard inputs
        document.addEventListener('keydown', (e)=> {

            downkey = e.key
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
        })

        //stops if no key is pressed
        document.addEventListener('keyup',(e)=>{
            //logic so that if left/right is pressed down before right/left is lifted up, won't stop the character
            if( (e.key == 'ArrowLeft' && downkey != 'ArrowRight') || (e.key == 'ArrowRight' && downkey != 'ArrowLeft') ){
                if(this.element.direction[0] == null){
                    this.stop()
                }else{
                    this.stop_x()
                }
            }else if( (e.key == 'ArrowUp' && downkey != 'ArrowDown') || (e.key == 'ArrowDown' && downkey != 'ArrowUp') ){
                if(this.element.direction[1] == null){
                    this.stop()
                }else{
                    this.stop_y()
                }
            }
        })

    }

}