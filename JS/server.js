const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Modelos
const RangosSalarialesModel = require("./models/rangosSalariales");
const EmpleosModel = require("./models/empleos");
const AdminsModel = require("./models/usuarioAdmin");

// Configuración
const app = express();
app.use(express.json());
app.use(cors());

// Conexión a la base de datos
mongoose.connect("mongodb+srv://admin:Q9lvp68kolzGS7dB@cluster0.pzmtrxf.mongodb.net/?retryWrites=true&w=majority");

// Rutas
app.get("/rangosSalariales", async function (req, res) {
    console.log("Atendiendo solicitud GET /rangosSalariales");
    try {
        console.log ("Consultando rangos salariales en la base de datos");
        const rangosSalariales = await RangosSalarialesModel.find({});
        console.log ("Rangos salariales:", rangosSalariales);

        res.status(200).send(rangosSalariales);
    } catch (error) {
        console.log("Error:", error);
        res.status(500).send(error);
    }
});

app.post("/rangosSalariales", async function (req, res) {
    console.log("Atendiendo solicitud POST /rangosSalariales");

    if (!req.body) {
        console.log("El cuerpo de la solicitud no tiene contenido");
        return res.status(400).send("El cuerpo de la solicitud no tiene contenido");
    }
    
    const rangoSalarial = RangosSalarialesModel({
        id: req.body.id,
        rangoSalarial: req.body.rangoSalarial
    });

    try {
        console.log("Guardando rango salarial en la base de datos");
        const rangoSalarialGuardado = await rangoSalarial.save();
        console.log("Rango salarial guardado:", rangoSalarialGuardado);
        res.status(201).send(rangoSalarialGuardado);
    } catch (error) {
        console.log("Error:", error);
        res.status(500).send(error);
    }
});

app.get("/empleosLanding", async function (req, res) {
    console.log("Atendiendo solicitud GET /empleosLanding");
    try {
        console.log ("Consultando empleos en la base de datos");
        const empleos = (await EmpleosModel.find({}, {titulo: 1, rangoSalarial: 1, empresa: 1}).limit(8));
        console.log ("Empleos:", empleos);
        res.status(200).send(empleos);

    } catch (error) {
        console.log("Error:", error);
        res.status(500).send(error);
    }
});

app.post("/empleos", async function (req, res) {
    console.log("Atendiendo solicitud POST /empleos");

    if (!req.body) {
        console.log("El cuerpo de la solicitud no tiene contenido");
        return res.status(400).send("El cuerpo de la solicitud no tiene contenido");
    }

    const empleo = EmpleosModel({
        empresa: req.body.empresa,
        titulo: req.body.titulo,
        visibilidad: req.body.visibilidad,
        rangoSalarial: req.body.rangoSalarial,
        requisitosMinimos: req.body.requisitosMinimos,
        requisitosDeseados: req.body.requisitosDeseados
    });

    try {
        console.log("Guardando empleo en la base de datos");
        const empleoGuardado = await empleo.save();
        console.log("Empleo guardado:", empleoGuardado);
        res.status(201).send(empleoGuardado);
    } catch (error) {
        console.log("Error:", error);
        res.status(500).send(error);
    }
});

app.get("/nombreEmpresasLanginUsuarios", async function (req, res) {
    console.log("Atendiendo solicitud GET /nombreEmpresasLanginUsuarios");

    try {
        console.log ("Consultando nombres de empresas en la base de datos");
        const nombreEmpresas = (await AdminsModel.find({}, {nombre: 1}).limit(6));
        console.log ("Nombre de empresas:", nombreEmpresas);
        res.status(200).send(nombreEmpresas);

    } catch (error) {
        console.log("Error:", error);
        res.status(500).send(error);
    }
});

app.get("/nombreEmpresasBuscarEmpleos", async function (req, res) {
    console.log("Atendiendo solicitud GET /nombreEmpresasBuscarEmpleos");

    try {
        console.log ("Consultando nombres de empresas en la base de datos");
        const nombreEmpresas = await AdminsModel.find({}, {nombre: 1});
        console.log ("Nombre de empresas:", nombreEmpresas);
        res.status(200).send(nombreEmpresas);

    } catch (error) {
        console.log("Error:", error);
        res.status(500).send(error);
    }
});

app.post("/registrarEmpresas", async function (req, res) {
    console.log("Atendiendo solicitud POST /registrarEmpresas");

    if (!req.body) {
        console.log("El cuerpo de la solicitud no tiene contenido");
        return res.status(400).send("El cuerpo de la solicitud no tiene contenido");
    }

    const empresa = AdminsModel({
        nombre: req.body.nombre,
        correo: req.body.correo,
        contrasena: req.body.contrasena,
        descripcion: req.body.descripcion
    });

    try {
        console.log("Guardando empresa en la base de datos");
        const empresaGuardada = await empresa.save();
        console.log("Empresa guardada:", empresaGuardada);
        res.status(201).send(empresaGuardada);
    } catch (error) {
        console.log("Error:", error);
        res.status(500).send(error);
    }
});

app.get("/empleosOverview", async function (req, res) {
    console.log("Atendiendo solicitud GET /empleosOverview");

    try {
        console.log ("Consultando empleos en la base de datos");
        const empleos = await EmpleosModel.find({ visibilidad: 'Pública' }, { empresa: 1, titulo: 1, rangoSalarial: 1 });
        console.log ("Empleos:", empleos);
        res.status(200).send(empleos);

    } catch (error) {
        console.log("Error:", error);
        res.status(500).send(error);
    }

});



// Iniciar servidor

app.listen(3000, function proyecto() {
    console.log("Servidor escuchando en puerto 3000");
});