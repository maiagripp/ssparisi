// const express = require('express');
// const fileupload = require('express-fileupload');
// const cors = require('cors');

// const app = express();

// app.use(cors());
// app.use(fileupload());
// app.use(express.static('files'));

// app.post('/upload', (req, res) => {
//   const newpath = __dirname + '/files/';
//   const file = req.files.file;

//   file.mv(`${newpath}`, (err) => {
//     if (err) {
//       res.status(500).send({ message: 'File upload failed', code: 200 });
//     }
//     res.status(200).send({ message: 'File Uploaded', code: 200 });
//   });
// });

// app.listen(3000, () => {
//   console.log('Server running successfully on 3000');
// });
const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

app.use(
  fileUpload({
    createParentPath: true,
  })
);

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/upload', async (req, res) => {
  try {
    if (!req.files) {
      res.send({
        status: false,
        message: 'Nenhum arquivo foi enviado',
      });
    } else {
      const responseApi = await axios.get(
        'https://date.nager.at/api/v3/publicholidays/2021/BR'
      );

      const feriados = responseApi.data;
      let files = req.files.files;

      const eventosEmFeriado = [];

      const lines = [];

      lines.forEach((line) => {
        const existeFeriado = feriados.find(
          (feriado) => feriado.date === line.data
        );

        if (existeFeriado) {
          eventosEmFeriado.push(line);
        }
      });

      res.send(eventosEmFeriado);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(3000, () => console.log(`App is listening on port 3000.`));
