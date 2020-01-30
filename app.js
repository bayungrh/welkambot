require('dotenv').config()
const fastify = require('fastify')({ logger: process.env.DEBUG === 'true' })
const {
    replyText
} = require('./service/reply')

fastify.get('/', async (request, reply) => {
    reply.send("Welkam_bot")
})

fastify.post('/webhook', async (request, reply) => {
    const body = request.body
    console.log("BODY", body)
    if(typeof body.message.new_chat_members != "undefined") {
        let member = body.message.new_chat_members[0]
        let welcome_msg = `Selamat datang ${member['first_name']}`
        replyText(body.message.chat.id, welcome_msg)
        .then(data => console.log("Sent"))
        .catch(err => {
            console.error(err)
        })
    }
    return { message: 'OK' }
})

// Run the server!
const start = async () => {
  try {
    await fastify.listen(3000)
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
    console.log(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()