import knexLib from 'knex';

class Contenedor {
    constructor(config) {
        this.knex = knexLib(config);
    }

    createTable() {
        return this.knex.schema.dropTableIfExists('productos')
        .finally(() => {
            return this.knex.schema.createTable('productos', table =>{
                table.increments('id_articulo').primary();
                table.string('title', 50).notNullable();
                table.float('precio', 9);
                table.string('thumbnail', 50);
            })
        })
    }

    save(product) {
        return this.knex('productos').insert(product);
    }
    
    getAll() {
        return this.knex('productos').select('*');
    }
    
    getById(id) {
        return this.knex('productos').select('*').where('id_articulo', id);
    }
    
    updateArticle(id, product) {
        return this.knex('productos').where('id_articulo', id).update(product);
    }
    
    deleteById(id) {
        return this.knex('productos').where('id_articulo', id).del();
    }
    
    close() {
        return this.knex.destroy();
    }
}


export default Contenedor;