const { normalize, schema, denormalize } = require("normalizr");
const util = require('util');

const originalData = {
    id:"999",
    messeges:[
        {
            id:"245",
            author: {
                id: 'nahuel@gmail.com',
                nombre: "nahuel",
                apellido: "di santi", 
                edad: "30", 
                alias: "ndisanti", 
                avatar:"http://miavatar.com/nahuel"
            }, 
            text: 'Hola'

        }, 
        {
            id:"275",
            author: {
                id: 'pedro@gmail.com',
                nombre: "pedro",
                apellido: "gil", 
                edad: "30", 
                alias: "pgil", 
                avatar:"http://miavatar.com/pedro"
            }, 
            text: 'Hola, como estas?'

        }, 
        {   
            id:"289",
            author: {
                id: 'pedro@gmail.com',
                nombre: "pedro",
                apellido: "gil", 
                edad: "30", 
                alias: "pgil", 
                avatar:"http://miavatar.com/pedro"
            }, 
            text: 'Hola, tenes el nuevo producto?'

        },
        {
            id:"235",
            author: {
                id: 'nahuel@gmail.com',
                nombre: "nahuel",
                apellido: "di santi", 
                edad: "30", 
                alias: "ndisanti", 
                avatar:"http://miavatar.com/nahuel"
            }, 
            text: 'Si, lo tengo en stock. Te paso lista de precio?'

        },
        {
            id:"225",
            author: {
                id: 'pedro@gmail.com',
                nombre: "pedro",
                apellido: "gil", 
                edad: "30", 
                alias: "pgil", 
                avatar:"http://miavatar.com/pedro"
            }, 
            text: 'Si, dale porfa.'

        },
        {
            id:"217",
            author: {
                id: 'nahuel@gmail.com',
                nombre: "nahuel",
                apellido: "di santi", 
                edad: "30", 
                alias: "ndisanti", 
                avatar:"http://miavatar.com/nahuel"
            }, 
            text: 'Aca te dejo. En efvo tenes 20 por ciento de descuento.'

        },
        {   
            id:"218",
            author: {
                id: 'pedro@gmail.com',
                nombre: "pedro",
                apellido: "gil", 
                edad: "30", 
                alias: "pgil", 
                avatar:"http://miavatar.com/pedro"
            }, 
            text: 'Se lo pago al de la mensajeria?'

        },
        {
            id:"215",
            author: {
                id: 'nahuel@gmail.com',
                nombre: "nahuel",
                apellido: "di santi", 
                edad: "30", 
                alias: "ndisanti", 
                avatar:"http://miavatar.com/nahuel"
            }, 
            text: 'Asi es. Igual soy yo asique tranqui con eso'

        },
    ]
}


const author = new schema.Entity('authors'); 
const messege = new schema.Entity('messege');
const posts = new schema.Entity('messege', {
    author: author, 
    messege: messege
})
const messeges = new schema.Entity('messeges', {
    posts: [posts], 
})


const dataNormalizada = normalize(originalData, messeges);
console.log("Datos normalizados: ", dataNormalizada);

function printData(data) {
    console.log(util.inspect(data, false, 12, true));
    }
printData(dataNormalizada);

console.log(
    JSON.stringify(originalData).length,
    JSON.stringify(dataNormalizada).length
    );

const dataOriginal = denormalize(
    dataNormalizada.result,
    messeges,
    dataNormalizada.entities
    );
    printData(dataOriginal);

    function porcentaje(uno, dos) {
    const porcentajes = Math.round(100 - (uno * 100) / dos);
    console.log("porcentaje de compresión del proceso de normalización: " ,porcentajes, "%");
    }
    porcentaje(
        parseInt(JSON.stringify(dataNormalizada).length),
        parseInt(JSON.stringify(originalData).length)
    );