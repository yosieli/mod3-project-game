class HomePage{

    constructor(){
        //creates title on home page
        this.h1 = c('h1')
        this.h1.innerText = "Home Page"
        this.h1.className = "main-title"
        
        //creates div of options
        this.optionsdiv = c('div')

        //create account option
        let newUserh3 = c('h3')
        newUserh3.innerText = "Create Account"
        newUserh3.className = "options"
        newUserh3.addEventListener('click',()=>this.newUser())
        
        //login option
        let loginh3 = c('h3')
        loginh3.innerText = "Log In"
        loginh3.className = "options"
        loginh3.addEventListener('click',()=>this.login())

        //option to check high scores
        let highScoresh3 = c('h3')
        highScoresh3.innerText = "High Scores"
        highScoresh3.className = "options"
        highScoresh3.addEventListener('click',()=>this.highScores())

        //appends options to div
        this.optionsdiv.append(newUserh3,loginh3,highScoresh3)

        //creates div for forms/high score list and starts with high score list
        this.listdiv = c('div')
        this.highScores()

        //renders everything to the body of the document
        this.render()
    }

    //renders everything to the body of the document
    render(){
        document.body.append(this.h1,this.optionsdiv,this.listdiv)
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

        if(passwordInput.value != passwordConfirm.value){
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


        this.listdiv.append(form)
    }

    //puts high scores in listdiv
    highScores(){
        this.listdiv.innerText = ""
        let h2 = c('h2')
        h2.innerText = "High Scores"
        this.listdiv.append(h2)

        //puts top 10 scores with usernames
    }

}