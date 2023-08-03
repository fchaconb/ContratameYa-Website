const mongoose = require('mongoose');
const EstadoAplicacionesSchema = new mongoose.Schema(
    {
        id : { type: Number, required: true },
        estadoAplicacion: { type: String, required: true }
    }
);

const EstadoAplicaciones = mongoose.model('EstadoAplicaciones', EstadoAplicacionesSchema);
module.exports = EstadoAplicaciones;
