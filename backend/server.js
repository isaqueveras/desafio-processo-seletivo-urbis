const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const db = require("./app/models");
const app = express();

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// Analisar solicitações de tipo de conteúdo -> application/json
app.use(bodyParser.json());

// Analisar solicitações de tipo de conteúdo -> application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Sicronizar com o banco de dados
db.sequelize.sync({ force: false });

// Chamando as rotas
require("./app/routes/Tasks.routes")(app);
require("./app/routes/User.routes")(app);

// Adicionando uma porta
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta: ${PORT}.`);
});
