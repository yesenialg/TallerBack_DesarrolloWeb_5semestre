const nodemailer = require("nodemailer");
const excel = require("exceljs");
const PostgresService = require('../../services/postgres.service');
const _pg = new PostgresService();

const getUsers = async (req, res) => {
    let sql = `select * from personas`;
    try {
        let result = await _pg.executeSql(sql);
        return crearExcel(result.rows, res);
    } catch (error) {
        console.log(error);
        return res.send({ ok: false, message: "Error consultando los estudiantes", content: error, });
    }
};

const createUser = async (req, res) => {
    try {
        let estudiante = req.body;
        let sql = `insert into personas (id, name, email) values(${estudiante.id}, '${estudiante.name}', '${estudiante.email}')`;
        let result = await _pg.executeSql(sql);
        let email = estudiante.email;
        if (result.rowCount == 1) {
            try {
                let enviado = await crearEmail(email);
                console.log(enviado);
            } catch (error) {
                console.log(error);
            }
        }
        return res.send({ ok: result.rowCount == 1, message: result == 1 ? "El estudiante no fue creado" : "Estudiante creado", content: estudiante, });
    } catch (error) {
        return res.send({ ok: false, message: "Error creado el estudiante", content: error, });
    }

};

async function crearEmail(email) {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: 'pruebas12correos@gmail.com',
            pass: 'mzvuqumstzwkveor',
        },
    });

    let info = await transporter.sendMail({
        from: '"Correos de confirmacion" <pruebas12correos@gmail.com>',
        to: email,
        subject: "Ahora eres parte de nuestra Universidad",
        text: "Confirmacion de prueba",
        html: `
<head>
  <style>
    h1 { color: #2C8B78; }
    h3 { color: #F9AC36; }
    pr { color: #206355; }
   	b { color: #206355; }
  </style>
</head>

<body>
<center>
  <br>
  <h1>BIENVENIDO A NUESTRA UNIVERSIDAD</h1>
<b>Le informamos que ha sido registrado correctamente en nuestro sistema</b> 
  <br>
  <br>
  <pr>Ahora podrás disfrutar de todos los beneficios que tiene la Universidad para tí</pr>
  <h3>¡NO TE PIERDAS DE NADA!</h3>
</center>
</body>`,
    });
};

function crearExcel(req, res) {
    let workbook = new excel.Workbook();
    let worksheet = workbook.addWorksheet("Estudiantes");

    worksheet.columns = [
        { header: "Id", key: "id", width: 20 },
        { header: "Name", key: "name", width: 20 },
        { header: "Email", key: "email", width: 250 },
    ];

    worksheet.addRows(req);

    res.setHeader(
        "Content-Disposition",
        "attachment; filename=" + "Estudiantes.xlsx"
    );

    return workbook.xlsx.write(res).then(function () {
        res.status(200).end();
    });
}

module.exports = { getUsers, createUser };