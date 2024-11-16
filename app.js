const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const discoRoutes = require('./routes/discoRoutes');
const artistaRoutes = require('./routes/artistaRoutes');
const generoRoutes = require('./routes/generoRoutes');

 // rotas
app.use('/api/discos', discoRoutes);
app.use('/api/artistas', artistaRoutes);
app.use('/api/generos', generoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
