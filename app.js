const express = require('express');
const { auth } = require("express-oauth2-jwt-bearer");
const errorHandler = require('./middleware/errorHandler');//importamos el archivo de manejo de errores

// Configuracion Middleware con el Servidor de Autorización
const jwtCheck = auth({
  audience: 'http//localhost:3000/api/libros',
  issuerBaseURL: 'https://dev-zppocy6as2nxaz56.us.auth0.com/',
  tokenSigningAlg: 'RS256'
});
const app = express();
app.use(express.json());
//importamos las rutas de los libro
const librosRouter = require('./middleware/routes/libros');

app.use('/api/libros',jwtCheck, librosRouter);
app.use(errorHandler);
app.listen(3000, () => {
    console.log('Servidor iniciado en el puerto 3000');
});