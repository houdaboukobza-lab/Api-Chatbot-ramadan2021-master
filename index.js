// Imports
const express = require('express');
const cors = require('cors')

// Initial Config
const app = express();
const port = process.env.PORT || 3000;

app.use(cors())
app.use(express.json())

// Initial API
app.get('/', (req, res) => {
    res.status(200).send('Welcome to the server !')
})

const http = require('http').createServer(app)

const io = require('socket.io')(http, {
    cors: {
        origin: '*'
    }
})

io.on('connection', (socket) => {
    console.log("user connected");
    socket.on('message',(data )=> { 
        console.log(data.message);
        io.emit('broadcast',data)
    })
    

    socket.on('message', (data) => {
        console.log(data.message);
        io.emit('broadcast', data)
    })

    socket.on('disconnect', () => {
        console.log("user disconnected");
    })
})

// Server
http.listen(port, () => console.log(`Listening on port ${port}`));