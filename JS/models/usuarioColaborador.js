const mongoose = require('mongoose');
const ColaboradorSchema = new mongoose.Schema(
    {
        id : { type: Number, required: true },
        nombre: { type: String, required: true, unique: true },
        apellidos: { type: String, required: true, unique: true },
        correo: { type: String, required: true, unique: true },
        contrasena: { type: String, required: true },
        genero: { type: String, required: true },
        rol: { type: String, required: false }
    },
    {
        timestamps: true,
    }
);

const Colaborador = mongoose.model('Colaborador', ColaboradorSchema);
module.exports = Colaborador;