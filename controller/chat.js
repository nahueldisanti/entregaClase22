import Knex from 'knex'
//const knex = require('knex')
import { config } from '../options/sqlite.js'

class Chats {
    constructor(config) {
        this.knex = Knex(config);
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

const historial = new Chats (config);
export default historial