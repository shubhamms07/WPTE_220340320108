let dbparams =
{
    host: 'localhost',
    user: 'root',
    password: 'cdac',
    database: 'test',
    port: 3306
};
const mysql = require('mysql2');
const con = mysql.createConnection(dbparams);

const express = require('express');
const app = express();

app.use(express.static("cp"));

//getitem=====================================
app.get("/getItem", (req, resp) => {
    let input = req.query.x;
   // console.log(input);
    let output = { bookfoundstatus: false}

    con.query('select * from book where bookid =?', [input], (error, rows) => {

        if (rows.length > 0) {
            output.bookfoundstatus = true;
            output.bookdetails = rows[0];
        }
        resp.send(output);
    });

});


//add item=======================================
app.get("/insert", (req, resp) => {
    let no = req.query.a;
    let name = req.query.b;
    let id = req.query.c;
    //console.log(no);
    let output = { bookfoundstatus: false }

    con.query('insert into emp (bookid,bookname,price) values (?,?,?)', [no, name, id], (error, rows) => {

        if (rows.affectedRows > 0) {
            output.bookfoundstatus = true;
        }
        resp.send(output);
    });
});


//getall=====================================
app.get("/getall", (req, resp) => {

    con.query('select * from book', [], (error, rows) => {
        resp.send(rows);
    });
});

//============================================
app.listen(8081, function () {
    console.log("server listening at port 8081...");
});