const unirest = require('unirest')

const token = process.env.BOT_TOKEN
const baseUri = `https://api.telegram.org/bot${token}`

const replyText = (chat_id, text) => {
    let endpoint = `${baseUri}/sendMessage`
    return new Promise((resolve, reject) => {
        unirest
        .post(endpoint)
        .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
        .send({
            chat_id: chat_id,
            text: text
        })
        .then((response) => {
            return resolve(response)
        }).catch(err => {
            return reject(err)
        })
    })
}

module.exports = {
    replyText
}