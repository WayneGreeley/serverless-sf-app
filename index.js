const AWS = require('aws-sdk')
const s3 = new AWS.S3()
const uuid = require('node-uuid')

function getRandomIntInclusive(min, max) {
    const mini = Math.ceil(min)
    const maxi = Math.floor(max)
    return Math.floor((Math.random() * ((maxi - mini) + 1)) + mini)
}


module.exports.validate = async (event) => {
    console.log(`event:${JSON.stringify(event)}`)
    const data = event.data
    const key = uuid.v4()
    const newData = {...data, coverage_valid: true, key: key}
    console.log("newData:"+newData)
    return newData
}

module.exports.getoptions = async (event) => {
    console.log(`event:${JSON.stringify(event)}`)

    const outputOptions = []
    for (let i = 0; i < 10; i++ ){
        outputOptions.push(getRandomIntInclusive(1, 99))
    }
    console.log("outputOptions:"+outputOptions)
    return outputOptions
}

module.exports.recommend = async (event) => {
    console.log(`event:${JSON.stringify(event)}`)

    const recommended = getRandomIntInclusive(30, 50)
    console.log("recommended:"+recommended)
    return recommended
}

module.exports.choose = async (event) => {
    console.log(`event:${JSON.stringify(event)}`)

    const options = event.outputOptions
    const recommended = event.recommended

    let closestDistance = 99999
    let closestValue = 0
    for (option in options){
        let distance = option - recommended
        if (distance >= 0 && distance < closestDistance){
            closestDistance = distance
            closestValue = option
        }
    }

    return closestValue
}

module.exports.calc = async (event) => {
    console.log(`event:${JSON.stringify(event)}`)
    const closestValue = event.closestValue

    const quote = closestValue * 3.14
    console.log("quote:"+quote)
    return quote
}

module.exports.save = async (event) => {
    console.log(`event:${JSON.stringify(event)}`)

    const s3Response = await s3.putObject({
        Bucket: process.env.BUCKET,
        Key: event.key,
        Body: event.data,
    }).promise()
}


