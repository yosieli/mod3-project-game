class GameArea{

    constructor(){
        this.link = s(".home")

        // health bar for player (will for sure move this. also did not give it functionality yet)
        this.progress = c('div')
        this.progress.id = "myProgress"
        this.bar = c('div')
        this.bar.id = "myBar"

        this.progress.append(this.bar)
    }

    render(){
        document.body.innerText = ""
        this.link.href = gameLink
        document.body.append(this.progress)
    }

    exitGame(){
        document.body.innerText = ""
        this.link.hrek = styleLink
    }
}