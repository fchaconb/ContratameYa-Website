const mongoose = require('mongoose');
const usuarioFinalSchema = new mongoose.Schema(
    {
        id : { type: Number, required: true },
        nombre: { type: String, required: true },
        apellidos : { type: String, required: true },
        clave : { type: String, required: true },
        correo : { type: String, required: true },
        experiencia : {
            empresa : { type: String, required: true },
            titulo : { type: String, required: true },
            fechaInicio : { type: Date, required: true },
            fechaFin : { type: Date, required: true },
            descripcion : { type: String, required: true }
        },
        educacion : {
        nivelEducativo : { type: String, required: true }, 
        institucion : { type: String, required: true },
        fechaInicioEducacion : { type: Date, required: true },
        fechaFinEducacion : { type: Date, required: true },
        descripcionEducacion : { type: String, required: true },
        },

    }
);

const UsuarioFinal = mongoose.model('UsuarioFinal', usuarioFinalSchema);
module.exports = UsuarioFinal;
