import knexLib from 'knex'

export default class Chats {
    constructor(options) {
        this.knex = knexLib(options)
    }

    async createTable() {
        try {
            await this.knex.schema.dropTableIfExists('mensajes')
            .then(function() {
                return this.knex.schema.createTable('mensajes', table => {
                    table.increments('id_chat')
                    table.string('email')
                    table.string('textoMensaje')
                    table.timestamp('date')
            })
            })
            console.log('La tabla "mensajes" se ha creado')
    
        }catch(err) { 
            console.log(err); throw err 
        }
        finally {
            this.knex.destroy();
        }
    }

    async getAllChats() {
        try {
            return await this.knex('chats').select('*');
        } catch (error) {
            return []
        }
    }

    async save(newMessage) {
        try {
            await this.knex('chats').insert(newMessage)
            return await this.knex('chats').select('*')
        } catch (error) {
            return(error)
        }
    }
}