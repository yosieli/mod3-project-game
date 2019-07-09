//class to make characters
class Character{
    
    static all=[]

    //initialize for javascript
    constructor(x, y, ROOT_URL){
        this.ASSET_ROOT = ROOT_URL
        this.element = document.createElement('img')
        this.element.style.width = '75px'
        this.element.style.height = '75px'
        this.element.style.position = 'absolute'

        this.element.src = `${this.ASSET_ROOT}/idle.gif`
        this.element.direction = [null,null]
        this.speed = 5

        this.element.style.left = x + 'px'
        this.element.style.bottom = y +'px'

        //keeps track of all characters
        Character.all.push(this)

        setInterval( ()=>{
            // character.style.left / bottom are both strings: "0px"
            // If we want to do some arithmatic, we'll need to parse them into integers:
            const left = parseInt(this.element.style.left)
            const bottom = parseInt(this.element.style.bottom)
    
            // If the character is moving, the distance between him and the left/bottom side of the screen should change
            // also added logic here for him to not move off screen
            if(this.element.direction[1] == 'right'){
                if ( document.documentElement.clientWidth >= (left+80) ){
                    this.element.style.left = `${left+this.speed}px`;
                }
            }
            
            if(this.element.direction[1] == 'left'){
                if ( left+10 > 0 ){
                    this.element.style.left = `${left-this.speed}px`;
                }
            }
    
            if(this.element.direction[0] == 'up'){
                if ( document.documentElement.clientHeight >= (bottom+80) ){
                    this.element.style.bottom = `${bottom+this.speed}px`;
                }
            }
    
            if(this.element.direction[0] == 'down'){
                if ( bottom-5 > 0 ){
                    this.element.style.bottom = `${bottom-this.speed}px`;
                }
            }

        }, 20);

    }

    //changes direction and image depending on what key is pressed/let go
    runRight(){
        this.element.src = `${this.ASSET_ROOT}/runRight.gif`
        this.element.direction[1] = 'right'
    }

    runLeft(){
        this.element.src = `${this.ASSET_ROOT}/runLeft.gif`
        this.element.direction[1] = 'left'
    }

    runUp(){
        this.element.src = `${this.ASSET_ROOT}/runUp.gif`
        this.element.direction[0] = 'up'
    }

    runDown(){
        this.element.src = `${this.ASSET_ROOT}/runDown.gif`
        this.element.direction[0] = 'down'
    }

    stop(){
        this.element.src = `${this.ASSET_ROOT}/idle.gif`
        this.element.direction = [null,null]
    }

    //functions to stop depending on what direction is let go. also makes sure to face correct direction if still walking
    stop_x(){
        this.element.direction[1] = null
        if(this.element.direction[0]=='up'){
            this.element.src = `${this.ASSET_ROOT}/runUp.gif`
        }else if(this.element.direction[0]=='down'){
            this.element.src = `${this.ASSET_ROOT}/runDown.gif`
        }
    }

    stop_y(){
        this.element.direction[0] = null
        if(this.element.direction[1]=='left'){
            this.element.src = `${this.ASSET_ROOT}/runLeft.gif`
        }else if(this.element.direction[1]=='right'){
            this.element.src = `${this.ASSET_ROOT}/runRight.gif`
        }
    }

}