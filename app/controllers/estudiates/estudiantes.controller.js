//const nodemailer = require("nodemailer");
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
        /**if (result.rowCount == 1) {
            try {
                emailConfirmacion(estudiante.email);
            } catch (error) {
                console.log(error);
            }
        }**/
        return res.send({ ok: result.rowCount == 1, message: result == 1 ? "El estudiante no fue creado" : "Estudiante creado", content: estudiante, });
    } catch (error) {
        return res.send({ ok: false, message: "Error creado el estudiante", content: error, });
    }

};

/**async function emailConfirmacion (req) {
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
        from: '"Pruebas correos" <pruebas12correos@gmail.com>', 
        to: req,
        text: "Confirmacion de prueba", 
        html: "<b>Hello world?</b>", 
      });
}; emailConfirmacion().catch(console.error);**/

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