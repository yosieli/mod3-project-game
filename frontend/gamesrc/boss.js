class Boss{

    constructor(){

        // health bar for boss (did not give it functionality yet)
        this.progress = c('div')
        this.progress.id = "myProgress"
        this.bar = c('div')
        this.bar.id = "myBar"
        this.progress.append(this.bar)

    }
    
}