const express = require("express");
const router = express.Router();
const Libro = require("../models/Libro.js");
const { requiredScopes } = require("express-oauth2-jwt-bearer");

// Ruta para obtener todos los libros
router.get("/", requiredScopes("leer:libro"), async (req, res) => {
try {
const libros = await Libro.find();
res.json(libros);
} catch (error) {
res.status(500).json({ error: "Error al obtener los libros" });
}
});
//busca un libro por id , este no funciona con ".find()" porque la version de mongo
//ya no la acepta . 
// router.get("/:id",async (req, res,next)=>{
//     try{
//         const id = parseInt(req.params.id);
//         const libros = Libro.find((p)=>p.id === id);

//         if(!libros){
//             const error = new Error("libro  no encontrado");
//             error.status = 404;
//             throw error;
//         }
//         res.json(libros)
//         }catch(err){
//             next(err)
//         }
// });
router.get("/:id", requiredScopes("leer:libro"),async (req, res, next) => {
    try {
      const id = req.params.id;
      const libroEncontrado = await Libro.findById(id);
  
      if (!libroEncontrado) {
        const error = new Error("Libro no encontrado");
        error.status = 404;
        throw error;
      }
  
      res.json(libroEncontrado);
    } catch (err) {
      next(err);
    }
  });
// Ruta para crear un nuevo Libro
router.post("/",requiredScopes("escribir:libro"), async (req, res) => {
    try {
        const nuevoLibro = new Libro(req.body);
        await nuevoLibro.save();
        res.json(nuevoLibro);
    } catch (error) {
        res.status(500).json({ error: "Error al crear el Libro" });
  }
});
// Ruta para actualizar un Libro existente
router.put("/:id", requiredScopes("escribir:libro"),async (req, res) => {
    try {
        const Libros = await Libro.findByIdAndUpdate(req.params.id, req.body,
        {
        new: true,
        });
        res.json(Libros);
        } catch (error) {
        res.status(500).json({ error: "Error al actualizar el Libro" });
        }
        });
        // Ruta para eliminar un Libro
        router.delete('/:id', requiredScopes("escribir:libro"),async (req, res) => {
        try {
        await Libro.findByIdAndDelete(req.params.id);
        res.json({ message: 'Libro eliminado correctamente' });
        } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el Libro' });
        }
        });
        module.exports = router;
        