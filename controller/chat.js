import knexLib from 'knex'
//const knex = require('knex')

export default  class Chats {
    constructor(config) {
        this.knex = knexLib(config);
    }

    async createTable() {
        try {
            await this.knex.schema.dropTableIfExists('mensajes')
            return this.knex.schema.createTable('mensajes', table => {
                    table.increments('id_chat')
                    table.string('email')
                    table.string('textoMensaje')
                    table.timestamp('date')
                    console.log('tabla creada')
            })
    
        }catch(err) { 
            console.log(err); throw err 
        }
    }

    async getAllChats() {
        try {
            return await this.knex('mensajes').select('*');
        } catch (error) {
            return []
        }
    }

    async save(newMessage) {
        try {
            await this.knex('mensajes').insert(newMessage)
            return await this.knex('mensajes').select('*')
        } catch (error) {
            return(error)
        }
    }
}