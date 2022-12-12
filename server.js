//Requires
import express from 'express';
const app = express();

import { createServer } from 'http';
import { Server } from "socket.io";

const httpServer = new createServer(app);
const io = new Server(httpServer);


const routerProd = express.Router();
const myRoutes = routerProd.get('/', (req, res) => {
    res.render('index');
});

//Maria DB y SQLlite
//import { config } from './options/sqlite.js'
//import { options } from './options/mariaDB.js';


//import Contenedor from './controller/productos.js'
//const ProductoController = new Contenedor(options);

import productoController from './controller/productos.js'

//import Chats from './controller/chat.js'
//const historial = new Chats(config);

import historial from './controller/chat.js'

//Entregas anteriores
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(myRoutes);
app.use(express.static('/public'));
app.set('view engine', 'ejs');
app.set('views','./public/views');

const mensajes = [];

//Inicializo la tabla de productos

productoController.createTable()
    .then(()=>{
        console.log('Tabla de Productos creados');

        const products = [
            {
                "title": "Martillo",
                "price": 850,
                "thumbnail": "asdasdasdasdasdasd",
                "id_articulo": 1
            },
            {
                "title": "Regla",
                "price": 1300,
                "thumbnail": "sdfsadfdsfsdf",
                "id_articulo": 2
            },
            {
                "title": "Pinza",
                "price": 985,
                "thumbnail": "sdfsfsdfsdfdsfsdfsdfsdfsdf",
                "id_articulo": 3
            },
        ]
        return productoController.save(products)
    })
    .then(()=>{
        console.log('Productos insertados');
    })
    .catch((error)=> {
        console.log(error);
        throw error ;
    })

//Incializo la tabla Mensajes

historial.createTable()
    .then(() => {
        console.log("Tabla de mensajes creada");
        const chats = [];
        return historial.save(chats)
    })
    .then(() => {
        console.log("Mensaje agregado");
    })
    .catch((error) => {
        console.log(error)
    });


    //IO
io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado!');

    //Mensajes
    socket.emit('mensajes', mensajes)

    socket.on('new-message', data => {
        mensajes.push(data);
        io.sockets.emit('mensajes', mensajes)
    });

    //Traemos los productos
    const items = productoController.getAll();
    socket.emit('items', items);
    
    //Guardando productos
    socket.on('newItem', (newItem) => {
        contenedor.save(newItem)
        io.sockets.emit('items', items)
    });

    //Traemos el historial de mensajes
    const messeges = historial.getMesseges();
    socket.emit('messegesHistory', messeges);
    socket.on('new-messegeses', (newMessege) => {
        historial.saveMessege(newMessege)
        io.sockets.emit('messages', newMessage)
    } );
});


const PORT = 8080;
//Levantando el servidor
const server = app.listen(PORT, () => {
    console.log(`Server corriendo en el puerto ${PORT}`)
});
server.on('error', (error) => {
    console.log('Server error:' , error)
});

