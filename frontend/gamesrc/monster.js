class Monster extends Character{

    hurt(hitbox){
        swordLeft = hitbox[0]
        swordRight = hitbox[1]
        swordUp = hitbox[2]
        swordDown = hitbox[3]

        selfLeft = this.hurtbox[0]
        selfRight = this.hurtbox[1]
        selfUp = this.hurtbox[2]
        selfDown = this.hurtbox[3]

    }
}