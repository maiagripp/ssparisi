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

      const holidays = responseApi.data;
      let files = req.files.files;

      const events = [];
      // const eventosEmFeriado = [];

      const lines = [];

      lines.forEach((line) => {
        const ifHoliday = holidays.find(
          (holiday) => holiday.date === line.data
        );

        if (ifHoliday) {
          events.push(line);
        }
      });

      res.send(events);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(3000, () => console.log(`App is listening on port 3000.`));
