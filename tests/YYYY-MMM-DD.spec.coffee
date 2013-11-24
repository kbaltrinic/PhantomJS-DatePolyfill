referenceDate = testDate = null

describe 'For a date of the form YYYY MMM D hh:mm:ss', ->


    describe 'calling new Date(string)', ->

        before ->
            referenceDate = new Date('2010-01-09T12:03:34')
            testDate = new Date('2010 Jan 9 12:03:34')

        it 'should result in a valid date.', ->
            assert.isNumber testDate.getTime()

        it 'should result in the correct date.', ->
            testDate.getTime().should.equal referenceDate.getTime()

        testCallability = (funcName) ->
            it "create a date with a callable #{funcName}() method.", ->
                new Date('2010 Jan 9 12:03:34')[funcName]().should.not.be.undefined

        testCallability funcName for funcName in ["getDate", "getDay", "getFullYear", "getHours", "getMilliseconds", "getMinutes", "getMonth", "getSeconds", "getTime", "getTimezoneOffset", "getUTCDate", "getUTCDay", "getUTCFullYear", "getUTCHours", "getUTCMilliseconds", "getUTCMinutes", "getUTCMonth", "getUTCSeconds", "getYear", "setDate", "setFullYear", "setHours", "setMilliseconds", "setMinutes", "setMonth", "setSeconds", "setTime", "setUTCDate", "setUTCFullYear", "setUTCHours", "setUTCMilliseconds", "setUTCMinutes", "setUTCMonth", "setUTCSeconds", "setYear", "toDateString", "toGMTString", "toISOString", "toJSON", "toLocaleDateString", "toLocaleTimeString", "toLocaleString", "toString", "toTimeString", "toUTCString", "valueOf"]

    describe 'calling new Date.parse(string)', ->

        before ->
            referenceDate = Date.parse('2010-01-09T12:03:34')
            testDate = Date.parse('2010 Jan 9 12:03:34')

        it 'should result in a number of mills.', ->
            assert.isNumber testDate

        it 'should be the correct number of mills.', ->
            testDate.should.equal referenceDate


describe 'Calling new Date(mills)', ->

    before ->
        referenceDate = 1263038614000
        testDate = new Date(referenceDate)

    it 'should result in a valid date.', ->
        assert.isNumber testDate.getTime()

    it 'should create a date of with the correct value.', ->
        testDate.getTime().should.equal referenceDate

describe 'Calling new Date(YYYY, MM, DD)', ->

    before ->
        referenceDate = new Date('2010-01-09T00:00:00')
        testDate = new Date(2010, 0, 9)

    it 'should result in a valid date.', ->
        assert.isNumber testDate.getTime()

    it 'should create a date of with the correct value.', ->
        testDate.getTime().should.equal referenceDate.getTime() - timeZoneOffset

describe 'Calling new Date(YYYY, MM, DD hh)', ->

    before ->
        referenceDate = new Date('2010-01-09T12:00:00')
        testDate = new Date(2010, 0, 9, 12)

    it 'should result in a valid date.', ->
        assert.isNumber testDate.getTime()

    it 'should create a date of with the correct value.', ->
        testDate.getTime().should.equal referenceDate.getTime() - timeZoneOffset

describe 'Calling new Date(YYYY, MM, DD hh:mm)', ->

    before ->
        referenceDate = new Date('2010-01-09T12:03:00')
        testDate = new Date(2010, 0, 9, 12, 3)

    it 'should result in a valid date.', ->
        assert.isNumber testDate.getTime()

    it 'should create a date of with the correct value.', ->
        testDate.getTime().should.equal referenceDate.getTime() - timeZoneOffset

describe 'Calling new Date(YYYY, MM, DD hh:mm:ss)', ->

    before ->
        referenceDate = new Date('2010-01-09T12:03:32')
        testDate = new Date(2010, 0, 9, 12, 3, 32)

    it 'should result in a valid date.', ->
        assert.isNumber testDate.getTime()

    it 'should create a date of with the correct value.', ->
        testDate.getTime().should.equal referenceDate.getTime() - timeZoneOffset

describe 'Calling new Date(YYYY, MM, DD hh:mm:ss.sss)', ->

    before ->
        referenceDate = new Date('2010-01-09T12:03:32.890')
        testDate = new Date(2010, 0, 9, 12, 3, 32, 890)

    it 'should result in a valid date.', ->
        assert.isNumber testDate.getTime()

    it 'should create a date of with the correct value.', ->
        testDate.getTime().should.equal referenceDate.getTime() - timeZoneOffset



