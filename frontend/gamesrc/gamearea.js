class GameArea{

    constructor(){
        this.link = s(".home")
    }

    render(){
        document.body.innerText = ""
        this.link.href = gameLink
    }

    exitGame(){
        document.body.innerText = ""
        this.link.href = styleLink
    }
}