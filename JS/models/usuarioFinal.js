const mongoose = require('mongoose');
const usuarioFinalSchema = new mongoose.Schema(
    {
        nombre: { type: String, required: true },
        apellidos : { type: String, required: true },
        clave : { type: String, required: true },
        correo : { type: String, required: true, unique: true },
        genero: { type: String, required: true },
        experiencia : {
            empresa : { type: String, required: true },
            titulo : { type: String, required: true },
            fechaInicio : { type: Date, required: true },
            fechaFin : { type: Date, required: false },
            descripcion : { type: String, required: false }
        },
        educacion : {
            nivelEducativo : { type: String, required: true }, 
            institucion : { type: String, required: true },
            fechaInicioEducacion : { type: Date, required: true },
            fechaFinEducacion : { type: Date, required: false },
            descripcionEducacion : { type: String, required: false },
        },

    }
);

const UsuarioFinalModel = mongoose.model('UsuarioFinal', usuarioFinalSchema);
module.exports = UsuarioFinalModel;
