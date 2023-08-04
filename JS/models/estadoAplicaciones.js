const mongoose = require('mongoose');
const EstadoAplicacionesSchema = new mongoose.Schema(
    {
        id : { type: Number, required: true },
        nombrePuesto : { type: String, required: true },
        estadoAplicacion: { type: String, required: true },
        fechaPostulacion: { type: Date, required: true },
        requisitosMinimos: { type: String, required: true },
        requisitosDeseados: { type: String, required: true },
    }
);

const EstadoAplicaciones = mongoose.model('EstadoAplicaciones', EstadoAplicacionesSchema);
module.exports = EstadoAplicaciones;
