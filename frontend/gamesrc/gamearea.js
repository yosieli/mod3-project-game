class GameArea{

    constructor(savefile_id){
        this.link = s(".home")

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
    }

    exitGame(){
        document.body.innerText = ""
        this.link.hrek = styleLink
    }
}