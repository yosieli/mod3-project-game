let testPage = new HomePage

let testArray = [{level: 4,time: 100},{level: 3,time: 300},{level: 1,time: 100},{level: 2,time: 100},{level: 2,time: 80},{level: 2,time: 150},{level: 3,time: 100},{level: 2,time: 200},{level: 3,time: 150},{level: 2,time: 110},{level: 3,time: 200}]
let resultArray = [{level: 4,time: 100},{level: 3,time: 100},{level: 3,time: 150},{level: 3,time: 200},{level: 3,time: 300},{level: 2,time: 80},{level: 2,time: 100},{level: 2,time: 110},{level: 2,time: 150},{level: 2,time: 200}]


describe('organizeScores', () =>{
    it('does not re-arrange scores if times are out of order but level is in order', () => {
        expect( testPage.organizeScores([{level: 2,time: 200},{level: 1,time: 100}]) ).to.eql([{level: 2,time: 200},{level: 1,time: 100}])
        
    })

    it('re-arranges scores if level is not in right order', () => {
       expect( testPage.organizeScores([{level: 1,time: 200},{level: 2,time: 100}]) ).to.eql([{level: 2,time: 100},{level: 1,time: 200}])
    })

    it('Returns top 10 scores in the correct order', () => {
        expect( testPage.organizeScores(testArray) ).to.eql(resultArray)
        expect(testPage.organizeScores(testArray).length).to.eql(10)

     })
        
})