//class to make characters
class Character{

    //initialize for javascript
    constructor(x, y, ROOT_URL){
        this.ASSET_ROOT = ROOT_URL
        this.element = document.createElement('img')
        this.element.style.width = '50px'
        this.element.style.height = '75px'
        this.element.style.position = 'absolute'

        this.element.src = `${this.ASSET_ROOT}/static.gif`
        this.element.direction = [null,null]
        this.speed = 5

        this.element.style.left = x + 'px'
        this.element.style.bottom = y +'px'

        //figure out how to make this work
        // Character.all.push(this)

        setInterval( ()=>{
            // character.style.left / bottom are both strings: "0px"
            // If we want to do some arithmatic, we'll need to parse them into integers:
            const left = parseInt(this.element.style.left)
            const bottom = parseInt(this.element.style.bottom)
    
            // If the character is moving, the distance between him and the left/bottom side of the screen should change
            // also added logic here for him to not move off screen
            if(this.element.direction[1] == 'right'){
                if ( document.documentElement.clientWidth >= (left+50) ){
                    this.element.style.left = `${left+this.speed}px`;
                }
            }
            
            if(this.element.direction[1] == 'left'){
                if ( left > 0 ){
                    this.element.style.left = `${left-this.speed}px`;
                }
            }
    
            if(this.element.direction[0] == 'up'){
                if ( document.documentElement.clientHeight >= (bottom+113) ){
                    this.element.style.bottom = `${bottom+this.speed}px`;
                }
            }
    
            if(this.element.direction[0] == 'down'){
                if ( bottom > 0 ){
                    this.element.style.bottom = `${bottom-this.speed}px`;
                }
            }

        }, 20);

    }

    //changes direction and image depending on what key is pressed/let go
    walkRight(){
        this.element.src = `${this.ASSET_ROOT}/walkright.gif`
        this.element.direction[1] = 'right'
    }

    walkLeft(){
        this.element.src = `${this.ASSET_ROOT}/walkleft.gif`
        this.element.direction[1] = 'left'
    }

    walkUp(){
        this.element.src = `${this.ASSET_ROOT}/walkup.gif`
        this.element.direction[0] = 'up'
    }

    walkDown(){
        this.element.src = `${this.ASSET_ROOT}/walkdown.gif`
        this.element.direction[0] = 'down'
    }

    stop(){
        this.element.src = `${this.ASSET_ROOT}/static.gif`
        this.element.direction = [null,null]
    }

    //functions to stop depending on what direction is let go. also makes sure to face correct direction if still walking
    stop_x(){
        this.element.direction[1] = null
        if(this.element.direction[0]=='up'){
            this.element.src = `${this.ASSET_ROOT}/walkup.gif`
        }else if(this.element.direction[0]=='down'){
            this.element.src = `${this.ASSET_ROOT}/walkdown.gif`
        }
    }

    stop_y(){
        this.element.direction[0] = null
        if(this.element.direction[1]=='left'){
            this.element.src = `${this.ASSET_ROOT}/walkleft.gif`
        }else if(this.element.direction[1]=='right'){
            this.element.src = `${this.ASSET_ROOT}/walkright.gif`
        }
    }

}