class GameArea{

    constructor(savefile_id){ //change to get savefile object instead of id
        this.link = s(".home")

        this.exitButton = c('button')
        this.exitButton.id = "exit-button"
        this.exitButton.innerText = "Quit Game"
        this.exitButton.addEventListener('click',()=>this.exitGame())

        //gets savefile
        fetch(`http://localhost:3000/savefiles/${savefile_id}`)
            .then(response => response.json())
            .then(savefile => {
                //clears page and changes which css file to use
                this.render()
                //loads level based on savefile
                new Level(savefile)
            })
    }

    render(){
        document.body.innerText = ""
        this.link.href = gameLink
        document.body.append(this.exitButton)
    }

    exitGame(){
        document.body.innerText = ""
        this.link.href = styleLink
        //render userPage the save file belongs to
    }
}