const AWS = require('aws-sdk')
const s3 = new AWS.S3()

function getRandomIntInclusive(min, max) {
    const mini = Math.ceil(min)
    const maxi = Math.floor(max)
    return Math.floor((Math.random() * ((maxi - mini) + 1)) + mini)
}


module.exports.validate = async (event) => {
    return {...event, coverage_valid: true}
}

module.exports.getoptions = async (event) => {
    const outputOptions = []
    for (let i = 0; i < 10; i++ ){
        outputOptions.push(getRandomIntInclusive(1, 99))
    }
    return {...event, outputOptions: outputOptions}
}

module.exports.recommend = async (event) => {
    const recommended = getRandomIntInclusive(30, 50)
    return {...event, recommended: recommended}
}

module.exports.choose = async (event) => {
    let closestDistance = 99999
    let closestValue = 0

    event.outputOptions.forEach(num => {
        let distance = event.recommended - num
        if (distance >= 0 && distance < closestDistance){
            closestDistance = distance
            closestValue = num
        }
    })
    return {...event, closestValue: closestValue}
}

module.exports.calc = async (event) => {
    const quote = event.closestValue * 3.14
    return {...event, quote: quote}
}

module.exports.save = async (event) => {
    const s3Response = await s3.putObject({
        Bucket: process.env.BUCKET,
        Key: event.key+".txt",
        Body: JSON.stringify(event),
    }).promise()
}
