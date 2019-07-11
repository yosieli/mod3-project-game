let orderTotal = (array) => {
    return array.reduce( (total,num)=> {
        if( isNaN(parseFloat(total)) || isNaN(parseFloat(num)) ){
            throw TypeError('Not a number')
        }else{
            return parseFloat(total)+parseFloat(num)
        }
    })
}


describe('orderTotal', ()=>{

    it('throws TypeError if what is passed is not an array', ()=>{
        expect( () => orderTotal('moo') ).to.throw(TypeError)
    })

    it('throws TypeError if array passed does not have numbers', ()=>{
        expect( orderTotal(['1','2','3']) ).to.be.equal(6)
        expect( () => orderTotal(['hello','2','3']) ).to.throw(TypeError)
    })

    it('Returns sum of array',() => {
        expect( orderTotal([1,2,3,4]) ).to.be.equal(10)
        expect( orderTotal([1,2,3,4,5]) ).to.be.equal(15)
    })
})