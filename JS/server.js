const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Modelos
const RangosSalarialesModel = require("./models/rangosSalariales");
const EmpleosModel = require("./models/empleos");
const AdminsModel = require("./models/usuarioAdmin");
const GenerosModel = require("./models/genero");
const UsuarioColaboradorModel = require("./models/usuarioColaborador");
const EstadoAplicaciones = require("./models/estadoAplicaciones");
const UsuarioFinalModel = require("./models/usuarioFinal");

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

app.post("/generos", async function (req, res) {
    console.log("Atendiendo solicitud POST /generos");

    if (!req.body) {
        console.log("El cuerpo de la solicitud no tiene contenido");
        return res.status(400).send("El cuerpo de la solicitud no tiene contenido");
    }

    const genero = GenerosModel({
        id: req.body.id,
        genero: req.body.genero
    });

    try {
        console.log("Guardando genero en la base de datos");
        const generoGuardado = await genero.save();
        console.log("Genero guardado:", generoGuardado);
        res.status(201).send(generoGuardado);
    } catch (error) {
        console.log("Error:", error);
        res.status(500).send(error);
    }
});

app.get("/generosEditarPerfil", async function (req, res) {
    console.log("Atendiendo solicitud GET /generosEditarPerfil");
    try {
        console.log ("Consultando generos en la base de datos");
        const generos = await GenerosModel.find({});
        console.log ("Generos:", generos);
        res.status(200).send(generos);
    } catch (error) {
        console.log("Error:", error);
        res.status(500).send(error);
    }

});

app.post("/login", async function (req, res) {
    console.log("Atendiendo solicitud POST /login");

    if (!req.body) {
        console.log("El cuerpo de la solicitud no tiene contenido");
        return res.status(400).send("El cuerpo de la solicitud no tiene contenido");
    }

    const login = {
        correo: req.body.correo,
        contrasena: req.body.contrasena,
    };

    try {
        console.log("Consultando login en la base de datos");
        const adminLogin  = await AdminsModel.findOne({ correo: login.correo, contrasena: login.contrasena });
        const colaboradorLogin = await UsuarioColaboradorModel.findOne({ correo: login.correo, contrasena: login.contrasena });
        const usuarioFinalLogin = await UsuarioFinalModel.findOne({ correo: login.correo, clave: login.contrasena });

        if (adminLogin) {
            console.log("Login de admin:", adminLogin);
            res.status(200).send({ 
                perfil: "admin", 
                nombre: adminLogin.nombre,
                correo: adminLogin.correo,
            });
        } else if (colaboradorLogin) {
            console.log("Login de colaborador:", colaboradorLogin);
            res.status(200).send({ 
                perfil: "colaborador",
                empresa: colaboradorLogin.empresa,
                nombre: colaboradorLogin.nombre,
                correo: colaboradorLogin.correo, 
            });
        } else if (usuarioFinalLogin) {
            console.log("Login de usuario final:", usuarioFinalLogin);
            res.status(200).send({ 
                perfil: "usuarioFinal",
                nombre: usuarioFinalLogin.nombre,
                correo: usuarioFinalLogin.correo, 
            });
        } else {
            console.log("Login incorrecto");
            res.status(401).send({ error: "Correo o contraseña incorrectos" });
        }


    } catch (error) {
        console.log("Error:", error);
        res.status(500).send(error);
    }
});

app.post("/registrarUsuarioColaborador", async function (req, res) {
    console.log("Atendiendo solicitud POST /registrarUsuarioColaborador");

    if (!req.body) {
        console.log("El cuerpo de la solicitud no tiene contenido");
        return res.status(400).send("El cuerpo de la solicitud no tiene contenido");
    }

    const usuarioColaborador = UsuarioColaboradorModel({
        empresa: req.body.empresa,
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        correo: req.body.correo,
        contrasena: req.body.contrasena,
        genero: req.body.genero,
        rol: req.body.rol
    });

    try {
        console.log("Guardando usuario colaborador en la base de datos");
        const usuarioColaboradorGuardado = await usuarioColaborador.save();
        console.log("Usuario colaborador guardado:", usuarioColaboradorGuardado);
        res.status(201).send(usuarioColaboradorGuardado);
    } catch (error) {
        console.log("Error:", error);
        res.status(500).send(error);
    }
});

app.post("/registrarUsuarioFinal", async function (req, res) {
    console.log("Atendiendo solicitud POST /registrarUsuarioFinal");

    if (!req.body) {
        console.log("El cuerpo de la solicitud no tiene contenido");
        return res.status(400).send("El cuerpo de la solicitud no tiene contenido");
    }

    const usuarioFinal = UsuarioFinalModel({
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        clave: req.body.clave,
        correo: req.body.correo,
        genero: req.body.genero,
        experiencia: {
            empresa: req.body.experiencia.empresa,
            titulo: req.body.experiencia.titulo,
            fechaInicio: req.body.experiencia.fechaInicio,
            fechaFin: req.body.experiencia.fechaFin,
            descripcion: req.body.experiencia.descripcion
        },
        educacion: {
            nivelEducativo: req.body.educacion.nivelEducativo,
            institucion: req.body.educacion.institucion,
            fechaInicioEducacion: req.body.educacion.fechaInicioEducacion,
            fechaFinEducacion: req.body.educacion.fechaFinEducacion,
            descripcionEducacion: req.body.educacion.descripcionEducacion
        },
    });

    try { 
        console.log("Guardando usuario final en la base de datos");
        const usuarioFinalGuardado = await usuarioFinal.save();
        console.log("Usuario final guardado:", usuarioFinalGuardado);
        res.status(201).send(usuarioFinalGuardado);
    } catch (error) {
        console.log("Error:", error);
        res.status(500).send(error);
    }
});

app.get("/aplicacionesUsuarioFinal", async function (req, res) {
    console.log("Atendiendo solicitud GET /aplicacionesUsuario");
    try {
        const aplicaciones = await EstadoAplicaciones.find({});
        console.log ("Aplicaciones:", aplicaciones);
        res.status(200).send(aplicaciones);
    } catch (error) {
        console.log("Error:", error);
        res.status(500).send(error);
    }
});

app.post("/aplicacionesUsuarioFinal", async function (req, res) {
    console.log("Atendiendo solicitud POST /aplicacionesUsuarioFinal");

    if (!req.body) {
        console.log("El cuerpo de la solicitud no tiene contenido");
        return res.status(400).send("El cuerpo de la solicitud no tiene contenido");
    }

    const aplicacion = EstadoAplicaciones({
        id: req.body.id,
        nombrePuesto: req.body.nombrePuesto,
        nombreAplicante: req.body.nombreAplicante,
        correoAplicante: req.body.correoAplicante,
        estadoAplicacion: req.body.estadoAplicacion,
        fechaPostulacion: req.body.fechaPostulacion,
        requisitosMinimos: req.body.requisitosMinimos,
        requisitosDeseados: req.body.requisitosDeseados
    });

    try {
        console.log("Guardando aplicacion en la base de datos");
        const aplicacionGuardada = await aplicacion.save();
        console.log("Aplicacion guardada:", aplicacionGuardada);
        res.status(201).send(aplicacionGuardada);
    } catch (error) {
        console.log("Error:", error);
        res.status(500).send(error);   
    }
});

app.get('/editarPerfilAdministrador', async (req, res) => {
    try {
      // Obtener el nombre y el correo de la empresa desde la base de datos
    const empresas = await AdminsModel.find({} , {nombre: 1, correo: 1});
    

      // Responder con los datos de las empresas
    res.json(empresas);
    } catch (error) {
    console.error('Error al obtener el nombre y el correo de la empresa:', error);
    res.status(500).json({ error: 'Error al obtener el nombre y el correo de la empresa' });
    }
});


// Iniciar servidor

app.listen(3000, function proyecto() {
    console.log("Servidor escuchando en puerto 3000");
});