class HomePage{

    constructor(){
        //creates title on home page
        this.h1 = c('h1')
        this.h1.innerText = "Monster Hunter 8-Bit"
        this.h1.className = "main-title"

        //create account option
        let newUserh2 = c('h2')
        newUserh2.innerText = "Create Account"
        newUserh2.className = "options"
        newUserh2.addEventListener('click',()=>this.newUser())
        
        //login option
        let loginh2 = c('h2')
        loginh2.innerText = "Log In"
        loginh2.className = "options"
        loginh2.addEventListener('click',()=>this.login())

        //option to check high scores
        let highScoresh2 = c('h2')
        highScoresh2.innerText = "High Scores"
        highScoresh2.className = "options"
        highScoresh2.addEventListener('click',()=>this.highScores())

        //creates div of options and appends options to the div
        this.optionsdiv = c('div')
        this.optionsdiv.className = "options-div"
        this.optionsdiv.append(newUserh2,loginh2,highScoresh2)

        //creates div for forms/high score list and starts with login form
        this.listdiv = c('div')
        this.listdiv.className = "list-div"
        this.login()

        //div for all homepage divs
        this.homeDiv = c('div')
        this.homeDiv.className="home-div"
        this.homeDiv.append(this.optionsdiv,this.listdiv)

    }

    //renders everything to the body of the document
    render(){
        document.body.innerHTML = ""
        this.login()
        document.body.append(this.h1,this.homeDiv)

        //from source.js folder. loads where background of home page is from
        loadSource()
    }

    //renders account creation into listdiv
    newUser(){
        this.listdiv.innerText = ""
        let h2 = c('h2')
        h2.innerText = "Create an Account"
        this.listdiv.append(h2)
        this.newUserForm()
    }

    //form to create account
    newUserForm(){

        let form = c('form')
        let usernameInput = c('input')
        usernameInput.type = 'text'
        usernameInput.placeholder = "Username"

        let passwordInput = c('input')
        passwordInput.type = 'password'
        passwordInput.placeholder = "Password"
        //another field to confirm password when creating an account
        let passwordConfirm = c('input')
        passwordConfirm.type = 'password'
        passwordConfirm.placeholder = "Confirm Password"

        let submit = c('input')
        submit.type = 'submit'

        form.append(usernameInput,c('br'),passwordInput,c('br'),passwordConfirm, c('br'),submit)
        form.addEventListener('submit', (e)=>this.createUser(e,usernameInput,passwordInput,passwordConfirm))

        this.listdiv.append(form)
    }

    //creates new user
    createUser(e,usernameInput,passwordInput,passwordConfirm){
        e.preventDefault()

        if(passwordInput.value !== passwordConfirm.value){
            alert('Passwords do not match')
        }else{
            fetch(userURL,{
                method: 'POST',
                headers: {
                    'Content-Type':'application/json',
                    'Accept':'application/json'
                },
                body: JSON.stringify({
                    username: usernameInput.value,
                    password: passwordInput.value
                })
            })
            .then(response => response.json())
            .then(result => result.username)
            .then(name => this.login(name))

            usernameInput.value = ""
            passwordInput.value = ""
            passwordConfirm.value = ""
        }

    }

    //renders login info into listdiv
    login(name = null){
        this.listdiv.innerText = ""
        let h2 = c('h2')
        h2.innerText = "Log In"
        this.listdiv.append(h2)
        this.loginForm(name)
    }

    //form to log in
    loginForm(name){
        let form = c('form')
        let usernameInput = c('input')
        usernameInput.value = name
        usernameInput.type = 'text'
        usernameInput.placeholder = "Username"

        let passwordInput = c('input')
        passwordInput.type = 'password'
        passwordInput.placeholder = "Password"

        let submit = c('input')
        submit.type = 'submit'

        form.append(usernameInput,c('br'),passwordInput, c('br'),submit)
        form.addEventListener('submit', (e) => this.userPage(e,usernameInput,passwordInput))

        this.listdiv.append(form)
    }

    //directs to User's page
    userPage(e,usernameInput,passwordInput){
        e.preventDefault()

        //fetch users
        fetch(userURL)
        .then(response => response.json())
        .then(users => {
            let desiredUser = users.find( (user) => user.username===usernameInput.value )
            //checks if username exists and if password is correct
            if(desiredUser && (desiredUser.password===passwordInput.value) ){
                let userPage = new UserPage(desiredUser)
                userPage.render()
                usernameInput.value = ""
                passwordInput.value = ""
            }else{
                alert("Incorrect Username or Password")
            }  
        })
    }



    //puts high scores in listdiv
    highScores(){
        fetch(saveURL)
        .then(response => response.json())
        .then(result => {
            let orderedFiles = this.organizeScores(result)
            let ol = c('ol')
            orderedFiles.forEach((file)=>this.listScores(file,ol))
            return ol
        })
        .then((ol)=>{
            this.listdiv.innerText = ""
            let h2 = c('h2')
            h2.innerText = "High Scores"
            this.listdiv.append(h2,ol)
        })
    }


    

    //arranges save files in order by level and then by time if level is tied
    organizeScores(files){
        files.sort(function(a, b){
            if(a.level === b.level){
                return a.time-b.time
            }else{
                return b.level-a.level
            }
        })
        let first_10_files =files.slice(0,10)
        return first_10_files //only return first 10
    }

    //list the high scores
    listScores(file,ol){
        let li = c('li')
        li.innerText=`${file.user.username} | Level: ${file.level} | Time: ${file.time} seconds`
        ol.append(li)
    }

}
