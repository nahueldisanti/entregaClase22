//Requires
const express = require('express');
const { Server: HttpServer} = require('http');
const {Server: IOServer} = require('socket.io');
const app = express();
const Messeges = require('./Contenedor/historialDeMensajes.js')
const routerProd = express.Router();
const historial = new Messeges()
const PORT = 8080;
const myRoutes = routerProd.get('/', (req, res) => {
    res.render('index');
});

//Maria DB y SQLlite
import { options } from './options/mariaDB.js';
import Contenedor from './controllers/Contenedor.js'
const ProductController = new Contenedor(config);


//Servidor socket.io (Entrega Seis)
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

//Entregas anteriores
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(myRoutes);
app.use(express.static('/public'));
app.set('view engine', 'ejs');
app.set('views','./public/views');

const mensajes = [];

ProductoController.createTable()
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
        return ProductoController.save(products)
    })
    .then(()=>{
        console.log('Productos insertados');
    })
    .catch((error)=> {
        console.log(error);
        throw error ;
    })


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
    const items = contenedor.getAll();
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

//Levantando el servidor
const server = app.listen(PORT, () => {
    console.log(`Server corriendo en el puerto ${PORT}`)
});
server.on('error', (error) => {
    console.log('Server error:' , error)
});

