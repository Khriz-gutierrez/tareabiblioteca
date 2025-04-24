import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

// Load env variables
dotenv.config()

const app = express()

// Importar las rutas de los libros
import librosRouter from './routes/libroRoute.js';
// Importar las rutas de los autores
import autorRouter from './routes/autoresRouter.js';
// Importar las rutas de los usuario
import usuariosRouter from './routes/usuarioRoute.js';
// Importar las rutas de los prestamo
import prestamosRouter from './routes/prestamosRoute.js';
// Importar las rutas de los prestamo
import editorialesRouter from './routes/editorialesRoute.js';

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())


//Usar las rutas
app.use('/libros', librosRouter); // LIBROS
//Usar las rutas
app.use('/autores', autorRouter); // AUTORES
//Usar las rutas
app.use('/usuario', usuariosRouter); // USUARIO
//Usar las rutas
app.use('/prestamos', prestamosRouter); // PRESTAMOS
//Usar las rutas
app.use('/editoriales', editorialesRouter); // EDITORIALES

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`servidor corriendo en el puerto ${port}`)
})