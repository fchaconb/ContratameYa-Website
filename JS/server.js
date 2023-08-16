const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const nodemailer = require("nodemailer");

// Modelos
const RangosSalarialesModel = require("./models/rangosSalariales");
const EmpleosModel = require("./models/empleos");
const AdminsModel = require("./models/usuarioAdmin");
const GenerosModel = require("./models/genero");
const UsuarioColaboradorModel = require("./models/usuarioColaborador");
const Aplicaciones = require("./models/aplicaciones");
const UsuarioFinalModel = require("./models/usuarioFinal");
const Notificaciones = require("./models/notificaciones");

// Configuración
const app = express();
app.use(express.json());
app.use(cors());

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'contratame.ya.trabajos@gmail.com',
        pass: 'xdxearacnncfyfpb'
    }
});


// Conexión a la base de datos
mongoose.connect("mongodb+srv://admin:Q9lvp68kolzGS7dB@cluster0.pzmtrxf.mongodb.net/?retryWrites=true&w=majority");

// Rutas
app.get("/rangosSalariales", async function (req, res) {
    console.log("Atendiendo solicitud GET /rangosSalariales");
    try {
        console.log("Consultando rangos salariales en la base de datos");
        const rangosSalariales = await RangosSalarialesModel.find({});
        console.log("Rangos salariales:", rangosSalariales);

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

app.get("/empleosGerente", async function (req, res) {
    console.log("Atendiendo solicitud GET /empleosGerente");

    try {
        const empresa = req.query.empresa;
        const correo = req.query.correoGerente;
        console.log('Consultando empleos de la empresa ' + empresa + ' y usuario ' + correo + ' en la base de datos');

        const empleos = await EmpleosModel.find({empresa: empresa, correoGerente: correo});
        console.log ("Empleos:", empleos);
        res.status(200).send(empleos);

    } catch (error) {
        console.log("Error:", error);
        res.status(500).send(error);
    }
});

app.get("/empleosGerente/:id", async function (req, res) {
    console.log("Atendiendo solicitud GET /empleosGerente/:id");

    try {
        console.log ("Consultando empleo en la base de datos");
        const empleo = await EmpleosModel.findById(req.params.id);
        console.log ("Empleo:", empleo);
        res.status(200).send(empleo);
    } catch (error) {
        console.log("Error:", error);
        res.status(500).send(error);
    }
});

app.put("/empleosGerente/:id", async function (req, res) {
    console.log("Atendiendo solicitud PUT /empleosGerente/:id");

    if (!req.body) {
        console.log("El cuerpo de la solicitud no tiene contenido");
        return res.status(400).send("El cuerpo de la solicitud no tiene contenido");
    }

    const empleo = {
        empresa: req.body.empresa,
        titulo: req.body.titulo,
        visibilidad: req.body.visibilidad,
        rangoSalarialID: req.body.rangoSalarialID,
        rangoSalarial: req.body.rangoSalarial,
        requisitosMinimos: req.body.requisitosMinimos,
        requisitosDeseados: req.body.requisitosDeseados,
        correoGerente: req.body.correoGerente
    };

    try {
        console.log("Actualizando empleo en la base de datos");
        const empleoActualizado = await EmpleosModel.findByIdAndUpdate(req.params.id, empleo, { new: true });
        console.log("Empleo actualizado:", empleoActualizado);
        res.status(201).send(empleoActualizado);
    } catch (error) {
        console.log("Error:", error);
        res.status(500).send(error);
    }
});

app.delete("/empleosGerente/:id", async function (req, res) {
    console.log("Atendiendo solicitud DELETE /empleosGerente/:id");

    try {
        console.log("Eliminando empleo de la base de datos");
        const empleoEliminado = await EmpleosModel.findByIdAndDelete(req.params.id);
        console.log("Empleo eliminado:", empleoEliminado);
        res.status(200).send(empleoEliminado);
    } catch (error) {
        console.log("Error:", error);
        res.status(500).send(error);
    }
});

app.get("/empleosAdmin", async function (req, res) {
    console.log("Atendiendo solicitud GET /empleosAdmin");

    try {
        const empresa = req.query.empresa;
        console.log('Consultando empleos de la empresa ' + empresa + ' en la base de datos');
        const empleos = await EmpleosModel.find({empresa: empresa});
        console.log ("Empleos:", empleos);
        res.status(200).send(empleos);

    } catch (error) {
        console.log("Error:", error);
        res.status(500).send(error);
    }
});

app.get("/empleosAdmin/:id", async function (req, res) {
    console.log("Atendiendo solicitud GET /empleosAdmin/:id");

    try {
        console.log ("Consultando empleo en la base de datos");
        const empleo = await EmpleosModel.findById(req.params.id);
        console.log ("Empleo:", empleo);
        res.status(200).send(empleo);
    } catch (error) {
        console.log("Error:", error);
        res.status(500).send(error);
    }
});

app.put("/empleosAdmin/:id", async function (req, res) {
    console.log("Atendiendo solicitud PUT /empleosAdmin/:id");

    if (!req.body) {
        console.log("El cuerpo de la solicitud no tiene contenido");
        return res.status(400).send("El cuerpo de la solicitud no tiene contenido");
    }

    const empleo = {
        empresa: req.body.empresa,
        titulo: req.body.titulo,
        visibilidad: req.body.visibilidad,
        rangoSalarialID: req.body.rangoSalarialID,
        rangoSalarial: req.body.rangoSalarial,
        requisitosMinimos: req.body.requisitosMinimos,
        requisitosDeseados: req.body.requisitosDeseados,
        correoGerente: req.body.correoGerente
    };

    try {
        console.log("Actualizando empleo en la base de datos");
        const empleoActualizado = await EmpleosModel.findByIdAndUpdate(req.params.id, empleo, { new: true });
        console.log("Empleo actualizado:", empleoActualizado);
        res.status(201).send(empleoActualizado);
    } catch (error) {
        console.log("Error:", error);
        res.status(500).send(error);
    }
});

app.delete("/empleosAdmin/:id", async function (req, res) {
    console.log("Atendiendo solicitud DELETE /empleosAdmin/:id");

    try {
        console.log("Eliminando empleo de la base de datos");
        const empleoEliminado = await EmpleosModel.findByIdAndDelete(req.params.id);
        console.log("Empleo eliminado:", empleoEliminado);
        res.status(200).send(empleoEliminado);
    } catch (error) {
        console.log("Error:", error);
        res.status(500).send(error);
    }
});

app.get("/empleosLanding", async function (req, res) {
    console.log("Atendiendo solicitud GET /empleosLanding");
    try {
        console.log("Consultando empleos en la base de datos");
        const empleos = (await EmpleosModel.find({}, { titulo: 1, rangoSalarial: 1, empresa: 1 }).limit(8));
        console.log("Empleos:", empleos);
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
        rangoSalarialID: req.body.rangoSalarialID,
        rangoSalarial: req.body.rangoSalarial,
        requisitosMinimos: req.body.requisitosMinimos,
        requisitosDeseados: req.body.requisitosDeseados,
        correoGerente: req.body.correoGerente
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
        console.log("Consultando nombres de empresas en la base de datos");
        const nombreEmpresas = (await AdminsModel.find({}, { nombre: 1 }).limit(6));
        console.log("Nombre de empresas:", nombreEmpresas);
        res.status(200).send(nombreEmpresas);

    } catch (error) {
        console.log("Error:", error);
        res.status(500).send(error);
    }
});

app.get("/nombreEmpresasBuscarEmpleos", async function (req, res) {
    console.log("Atendiendo solicitud GET /nombreEmpresasBuscarEmpleos");

    try {
        console.log("Consultando nombres de empresas en la base de datos");
        const nombreEmpresas = await AdminsModel.find({}, { nombre: 1 });
        console.log("Nombre de empresas:", nombreEmpresas);
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

        const mailOptions = {
            from: 'contratame.ya.trabajos@gmail.com',
            to: req.body.correo,
            subject: 'Perfil de empresa creado exitosamente!',
            text: `Hola ${req.body.nombre},\n\nTu perfil de empresa fue creado exitosamente!`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log('Error al enviar el correo de notificación:', error);
            } else {
              console.log('Correo de notificación enviado:', info.response);
            }
        }); 

    } catch (error) {
        console.log("Error:", error);
        res.status(500).send(error);
    }
});

app.get("/empleosOverview", async function (req, res) {
    console.log("Atendiendo solicitud GET /empleosOverview");

    try {
        console.log("Consultando empleos en la base de datos");

        const query = { visibilidad: 'Pública' };

        if (req.query.nombreEmpresa) {
            query.empresa = req.query.nombreEmpresa;
            console.log("Query:", query);
        }

        if (req.query.rangoSalarialID) {
            query.rangoSalarialID = req.query.rangoSalarialID;
            console.log("Query:", query);
        }

        const empleos = await EmpleosModel.find(query);
        console.log("Empleos:", empleos);
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
        console.log("Consultando generos en la base de datos");
        const generos = await GenerosModel.find({});
        console.log("Generos:", generos);
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
        const adminLogin = await AdminsModel.findOne({ correo: login.correo, contrasena: login.contrasena });
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
                rol: colaboradorLogin.rol,
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

        const mailOptions = {
            from: 'contratame.ya.trabajos@gmail.com',
            to: req.body.correo,
            subject: 'Perfil de usuario creado exitosamente!',
            text: `Hola ${req.body.nombre},\n\nTu perfil de usuario fue creado exitosamente!`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log('Error al enviar el correo de notificación:', error);
            } else {
              console.log('Correo de notificación enviado:', info.response);
            }
        }); 

    } catch (error) {
        console.log("Error:", error);
        res.status(500).send(error);
    }
});

app.get("/datosUsuarioFinal", async function (req, res) {
    console.log("Atendiendo solicitud GET /datosUsuarioFinal");

    try {
        const userEmail = req.query.correo;
        console.log('Consultando informacion del usuario final ' + userEmail + 'en la base de datos');
        const usuariosFinales = await UsuarioFinalModel.findOne({ correo: userEmail }, { nombre: 1, apellidos: 1, correo: 1, genero: 1, experiencia: 1, educacion: 1 });
        console.log('Usuarios finales:', usuariosFinales);
        res.status(200).send(usuariosFinales);

    } catch (error) {
        console.log('Error:', error);
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

        const mailOptions = {
            from: 'contratame.ya.trabajos@gmail.com',
            to: req.body.correo,
            subject: 'Perfil de usuario creado exitosamente!',
            text: `Hola ${req.body.nombre},\n\nTu perfil de usuario fue creado exitosamente!`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log('Error al enviar el correo de notificación:', error);
            } else {
              console.log('Correo de notificación enviado:', info.response);
            }
        }); 
        
    } catch (error) {
        console.log("Error:", error);
        res.status(500).send(error);
    }
});

app.put('/editarPerfilUsuarioFinal', async function (req, res) {
    console.log("Atendiendo solicitud PUT /editarPerfilUsuarioFinal");

    if (!req.body) {
        console.log("El cuerpo de la solicitud no tiene contenido");
        return res.status(400).send("El cuerpo de la solicitud no tiene contenido");
    }

    const usuarioFinal = {
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
    };

    try {
        console.log("Actualizando usuario final en la base de datos");
        const usuarioFinalActualizado = await UsuarioFinalModel.findOneAndUpdate({ correo: usuarioFinal.correo }, usuarioFinal, { new: true });
        console.log("Usuario final actualizado:", usuarioFinalActualizado);
        res.status(201).send(usuarioFinalActualizado);
    } catch (error) {
        console.log("Error:", error);
        res.status(500).send(error);
    }
});

app.get("/aplicacionesUsuarioFinal", async function (req, res) {
    console.log("Atendiendo solicitud GET /aplicacionesUsuario");

    try {
        console.log("Consultando aplicaciones en la base de datos");
        const aplicaciones = (await Aplicaciones.find({ correoAplicante: req.query.correoAplicante })).reverse();
        console.log("Aplicaciones:", aplicaciones);
        res.status(200).send(aplicaciones);
    } catch (error) {
        console.log("Error:", error);
        res.status(500).send(error);
    }
});

app.delete("/aplicacionesUsuarioFinal/:id", async function (req, res) {
    console.log("Atendiendo solicitud DELETE /aplicacionesUsuarioFinal/:id");

    try {
        console.log("Eliminando aplicacion de la base de datos");
        const aplicacionEliminada = await Aplicaciones.findByIdAndDelete(req.params.id);
        console.log("Aplicacion eliminada:", aplicacionEliminada);
        res.status(200).send(aplicacionEliminada);
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

    const aplicacion = Aplicaciones({
        nombrePuesto: req.body.nombrePuesto,
        nombreAplicante: req.body.nombreAplicante,
        correoAplicante: req.body.correoAplicante,
        estadoAplicacion: req.body.estadoAplicacion,
        requisitosMinimos: req.body.requisitosMinimos,
        requisitosDeseados: req.body.requisitosDeseados
    });

    try {
        console.log("Guardando aplicacion en la base de datos");
        const aplicacionGuardada = await aplicacion.save();
        console.log("Aplicacion guardada:", aplicacionGuardada);
        res.status(201).send(aplicacionGuardada);

        const mailOptions = {
            from: 'contratame.ya.trabajos@gmail.com',
            to: req.body.correoAplicante,
            subject: 'Notificación de aplicación',
            text: `Hola ${req.body.nombreAplicante},\n\nHas aplicado al puesto "${req.body.nombrePuesto}" exitosamente.`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error al enviar el correo de notificación:', error);
            } else {
                console.log('Correo de notificación enviado:', info.response);
            }
        });

    } catch (error) {
        console.log("Error:", error);
        res.status(500).send(error);
    }
});


app.get('/datosPerfilEmpresa', async function (req, res) {
    console.log("Atendiendo solicitud GET /datosPerfilEmpresa");

    try {
        const userEmail = req.query.correo;
        console.log('Consultando informacion de la empresa ' + userEmail + 'en la base de datos');
        const empresas = await AdminsModel.findOne({ correo: userEmail }, { nombre: 1, correo: 1, descripcion: 1 });
        console.log('Empresas:', empresas);
        res.status(200).send(empresas);
    } catch (error) {
        console.log('Error:', error);
        res.status(500).send(error);
    }
});

app.put('/editarPerfilEmpresa', async function (req, res) {
    console.log("Atendiendo solicitud PUT /editarPerfilEmpresa");

    if (!req.body) {
        console.log("El cuerpo de la solicitud no tiene contenido");
        return res.status(400).send("El cuerpo de la solicitud no tiene contenido");
    }

    const empresa = {
        nombre: req.body.nombre,
        correo: req.body.correo,
        contrasena: req.body.contrasena,
        descripcion: req.body.descripcion
    };

    try {
        console.log("Actualizando empresa en la base de datos");
        const empresaActualizada = await AdminsModel.findOneAndUpdate({ correo: empresa.correo }, empresa, { new: true });
        console.log("Empresa actualizada:", empresaActualizada);
        res.status(201).send(empresaActualizada);

        const notificacionData = {
            correoRecipiente: req.body.correo,
            titulo: "Datos de perfil actualizados",
            mensaje: "Se han actualizado los datos de tu perfil.",
          };

        await fetch("http://localhost:3000/notificaciones", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(notificacionData),
        });

    } catch (error) {
        console.log("Error:", error);
        res.status(500).send(error);
    }
});

app.get("/notificaciones", async function (req, res) {
    console.log("Atendiendo solicitud GET /notificaciones");

    try {
        console.log("Consultando notificaciones en la base de datos");
        const notificaciones = (await Notificaciones.find({ correoRecipiente: req.query.correoRecipiente })).reverse();
        console.log("Notificaciones:", notificaciones);
        res.status(200).send(notificaciones);
    } catch (error) {
        console.log("Error:", error);
        res.status(500).send(error);
    }
});

app.post("/notificaciones", async function (req, res) {
    console.log("Atendiendo solicitud POST /notificaciones");

    if (!req.body) {
        console.log("El cuerpo de la solicitud no tiene contenido");
        return res.status(400).send("El cuerpo de la solicitud no tiene contenido");
    }

    const notificacion = Notificaciones({
        correoRecipiente: req.body.correoRecipiente,
        titulo: req.body.titulo,
        mensaje: req.body.mensaje
    });

    try {
        console.log("Guardando notificacion en la base de datos");
        const notificacionGuardada = await notificacion.save();
        console.log("Notificacion guardada:", notificacionGuardada);
        res.status(201).send(notificacionGuardada);

    } catch (error) {
        console.log("Error:", error);
        res.status(500).send(error);
    }
});

app.delete("/notificaciones/:id", async function (req, res) {
    console.log("Atendiendo solicitud DELETE /notificaciones/:id");

    try {
        console.log("Eliminando notificacion de la base de datos");
        const notificacionEliminada = await Notificaciones.findByIdAndDelete(req.params.id);
        console.log("Notificacion eliminada:", notificacionEliminada);
        res.status(200).send(notificacionEliminada);
    } catch (error) {
        console.log("Error:", error);
        res.status(500).send(error);
    }
});

app.get('/datosPerfilColaborador', async function (req, res) {
    console.log("Atendiendo solicitud GET /datosPerfilColaborador");

    try {
        const userEmail = req.query.correo;
        console.log('Consultando informacion del colaborador ' + userEmail + 'en la base de datos');
        const colaboradores = await UsuarioColaboradorModel.findOne({ correo: userEmail }, { nombre: 1, apellidos: 1, correo: 1, genero: 1, rol: 1 });
        console.log('Colaboradores:', colaboradores);
        res.status(200).send(colaboradores);
    } catch (error) {
        console.log('Error:', error);
        res.status(500).send(error);
    }
});

app.put('/editarPerfilColaborador', async function (req, res) {
    console.log("Atendiendo solicitud PUT /editarPerfilColaborador");

    if (!req.body) {
        console.log("El cuerpo de la solicitud no tiene contenido");
        return res.status(400).send("El cuerpo de la solicitud no tiene contenido");
    }

    const colaborador = {
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        correo: req.body.correo,
        rol: req.body.rol,
        genero: req.body.genero,
        contrasena: req.body.contrasena
    };

    try {
        console.log("Actualizando colaborador en la base de datos");
        const colaboradorActualizado = await UsuarioColaboradorModel.findOneAndUpdate({ correo: colaborador.correo }, colaborador, { new: true });
        console.log('Colaborador actualizado:', colaboradorActualizado);
        res.status(201).send(colaboradorActualizado);
    } catch (error) {
        console.log("Error:", error);
        res.status(201).send(error);
    }
});

app.get("/administrarEmpleados", async function (req, res) {
    console.log("Atendiendo solicitud GET /administrarEmpleados");

    try {
        console.log("Consultando empleados en la base de datos");
        const empleados = await UsuarioColaboradorModel.find({}, { correo: 1, empresa: 1, });
        console.log("Empleados:", empleados);
        res.status(200).send(empleados);
    } catch (error) {
        console.log("Error:", error);
        res.status(500).send(error);
    }
});


app.put("/administrarEmpleados/:correo", async function (req, res) {
    console.log("Atendiendo solicitud PUT /administrarEmpleados");

    const correoSeleccionado = req.params.correo; // Obtener el correo seleccionado desde los parámetros de la URL
    
    if (!req.body) {
        console.log("El cuerpo de la solicitud no tiene contenido");
        return res.status(400).send("El cuerpo de la solicitud no tiene contenido");
    }

    const nuevoRol = req.body.editarRol; // Obtener el nuevo rol desde el cuerpo de la solicitud

    try {
        console.log("Actualizando empleado en la base de datos");
        const empleadoActualizado = await UsuarioColaboradorModel.findOneAndUpdate(
            { correo: correoSeleccionado }, // Buscar por el correo seleccionado
            { rol: nuevoRol }, // Actualizar el rol
            { new: true }
        );
        console.log("Empleado actualizado:", empleadoActualizado);
        res.status(201).json(empleadoActualizado);
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json(error);
    }
});



// Iniciar servidor

app.listen(3000, function proyecto() {
    console.log("Servidor escuchando en puerto 3000");
});