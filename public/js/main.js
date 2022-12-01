import { io } from "socket.io-client";
const socket = io.connect();


function addMessage() {
    const mensaje = document.getElementById('mensajes').value;
    const correo = document.getElementById('correo').value;
    const newMessage = {
        correo: correo, 
        mensaje: mensaje
    }
    socket.emit('new-messege', newMessage);
    return false;
}

async function bringProducts(itemProduct) {
    let html = ''
    const itemList = await fetch('views/partials/Productos.ejs').then(res => res.text());
    if (itemProduct.length != 0) {
        html = ejs.render('itemList', itemProduct )
    }else{
        html = `No se encontraron productos`
    }
    
    document.getElementById('tabla').innerHTML = html 
}
document.getElementById('btn').addEventListener('click', () => {
        const title = document.getElementById('nombre').value;
        const price = document.getElementById('price').value;
        const thumbnail = document.getElementById('thumbnail').value;

        const newItem = {
            title: title,
            price: price,
            thumbnail: thumbnail
        }
    socket.emit('newItem', newItem);
    })



function renderMesseges(data) {

    const html = data.map((elem, index) => {
        return (`
        <div>
            <strong>${elem.correo}</strong>
            <strong>[${elem.fecha}]:</strong>
            <strong>${elem.mensaje}</strong>
        </div>
        `);
    }).join('');

    document.getElementById('messeges').innerHTML = html;

}
document.getElementById('chatForm').addEventListener('submit', (e) => {
    e.preventDefault()
    addMessage()
})

socket.on('mensajes', data => {
    renderMesseges(data);
});

socket.on("items", items => {
    bringProducts(items);
});