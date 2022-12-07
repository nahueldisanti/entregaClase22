import knexLib from 'knex';

class Contenedor {
    constructor(config) {
        this.knex = knexLib(config);
    }

    async createTable() {
        try {
            await this.knex.schema.dropTableIfExists('productos')
            .then(async function() {
            return await this.knex.schema.createTable('productos', table => {
                table.increments('id_articulo').primary();
                table.string('title', 50).notNullable();
                table.float('price', 9);
                table.string('thumbnail', 50);
            })
            })
            console.log('La tabla "productos" se ha creado');
        }catch(err) { 
            console.log(err); throw err 
        }
        finally {
            this.knex.destroy();
        }
    }

    async save(product) {
        return await this.knex('productos').insert(product);
    }
    
    async getAll() {
        return await this.knex('productos').select('*');
    }
    
    async getById(id) {
        return await this.knex('productos').select('*').where('id_articulo', id);
    }
    
    async updateArticle(id, product) {
        return await this.knex('productos').where('id_articulo', id).update(product);
    }
    
    async deleteById(id) {
        return await this.knex('productos').where('id_articulo', id).del();
    }
    
    async close() {
        return await this.knex.destroy();
    }
}


export default Contenedor;