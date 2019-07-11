class UserPage{

    constructor(user){
        this.h1 = c('h1')
        this.h1.innerText = `Hello ${user.username.toUpperCase()}`
        this.h1.className = 'main-title'

        //div for save file divs
        this.optionsdiv = c('div')

        //div for new file
        let newDiv = c('div')
        newDiv.className = "save-file"
        let newh1 = c('h1')
        newh1.className = "save-title"
        newh1.innerText = "Start New Game"
        newDiv.append(newh1)

        newh1.addEventListener('click',()=>{
            fetch(`http://localhost:3000/savefiles`,{ 
            method:'POST',
            headers: {
                "Content-Type":'application/json',
                'Accept':'application/json'
            },
            body: JSON.stringify({
                user_id: user.id,
                level: 1,
                time: 0,
                health: 5
            })
            })
            .then(response => response.json())
            .then(result => {
                let  gameArea = new GameArea(result)
                gameArea.render()
            })
        })

        this.optionsdiv.append(newDiv)

        //makes divs for each save file. fetching for when user obect passed does not have savefiles listed
        let count = 1
        fetch(`http://localhost:3000/users/${user.id}`)
        .then(response => response.json())
        .then( user => {
            user.savefiles.forEach((file)=>{
                this.saveFile(file,count)
                count++
            })
        })

        //logout button
        this.logoutbutton = c('button')
        this.logoutbutton.innerText = "Log Out"
        this.logoutbutton.className = 'logout'
        this.logoutbutton.addEventListener('click',()=>this.logout())   
    }

    render(){
        document.body.innerHTML = ""
        document.body.append(this.h1,this.optionsdiv,this.logoutbutton)

        loadSource()
    }

    saveFile(file,count){
        let div = c('div')
        div.className = 'save-file'

        let h2 = c('h2')
        h2.className = 'save-title'
        h2.innerText = `Save File ${count}`
        
        let level = c('h3')
        level.className = 'save-info'
        level.innerText = "Level: " + file.level

        let time = c('h3')
        time.className = 'save-info'
        time.innerText = "Time: " + file.time

        let health = c('h3')
        health.className = 'save-info'
        health.innerText = "Health: " + file.health

        div.append(h2,level,time,health)
        this.optionsdiv.append(div)

        div.addEventListener('click',()=>{
            let  gameArea = new GameArea(file.id)
            gameArea.render()
        })
    }

    logout(){
        homePage.render()
    }
}