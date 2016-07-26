import chai from 'chai'
import hello from '../dev/hello.es6'
var should = chai.should()

describe('hello.es6', () => {
    context('echo', () => {
        it('should return Hello yamamoto when the value is yamamoto', () => {
            hello('yamamoto').should.equal('Hello yamamoto')
        })
    })
})
