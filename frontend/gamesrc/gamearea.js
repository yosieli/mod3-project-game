class GameArea{

    constructor(){
        this.link = s(".home")

        // health bar for bad guys. likely to put this somewhere else later
        this.progress = c('div')
        this.progress.id = "myProgress"
        this.bar = c('div')
        this.bar.id = "myBar"

        //resets monster health bar positions
        Monster.healthPosition = 5

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