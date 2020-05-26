const express = require('express');
var exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
//é necessário colocar uma chamada a Handlebars aqui para afzer a chamada ao objeto abaixo
var Handlebars = require('handlebars');
const path = require('path');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;
const sequelizeDatabase = require('./config/dbConnection');
//caso isso não seja setado, haverá um erro de chamada aos campos por não haver referência
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

//autentica no sequelize
sequelizeDatabase.authenticate()
    .then(() => console.log('Banco Conectado'))
    .catch((err) => console.log(`Erro ao conectar ao banco ${err}`));

//cria uma view engine baseado no handelbars
app.engine('handlebars', exphbs({ 
    defaultLayout: 'main',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}));
app.set('view engine', 'handlebars');

//Body Parser
app.use(bodyParser.urlencoded({extended: false}));

//configura pasta public e rota estática
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index', {layout:'landing'})
});

//gig routes
app.use('/gigs', require('./routes/gigs'));

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
})