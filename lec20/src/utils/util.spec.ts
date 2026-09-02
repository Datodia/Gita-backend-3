import { addItemToTheEnd, compileAndroidCode, reverseStr, sum } from "./util";




describe('Utils functions', () => {
    describe('Sum function', () =>{
        it('Should return 5 when 2 and 3 passed', () => {
            const result = sum(2, 3)
            expect(result).toBe(5)
        })

        it('should return 0.3 when 0.1 and 0.2 passed', () => {
            const result = sum(0.1, 0.2)
            expect(result).toBeCloseTo(0.3)
        })
    })

    describe('Reverse String function', () => {
        it('should return olleh when hello passed', () => {
            const result = reverseStr('hello')
            expect(result).toBe('olleh')
        })
    })

    describe('AddItemTotheEnd', () =>{

        it('should return [1,2,3] when passed [1,2] 3', () => {
            const result = addItemToTheEnd([1,2], 3)
            expect(result).toEqual([1,2,3])
        })

        it('object test', () => {
            const a = {b: 30}
            const c = {b: 30}

            expect(a).toEqual(c)
        })

    })

    describe('Failed android code', () => {
        it('should thro error', () => {
            expect(() => compileAndroidCode()).toThrow('you are using the wrong JDK')
        })
    })

})