const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const sequelizeDatabase = require('../config/dbConnection');
const Gig = require('../models/gigModel');
const Op = Sequelize.Op; //atributo para leitura


//mostra o formulario de criação de tarefas
router.get('/add', (req, res) => res.render('add'));

router.get('/', (req, res) => {
    Gig.findAll()
        .then((gigs) => {
            // console.log(gigs);
            res.status(200);
            res.render('gigs', {
                gigs
            });

        })
        .catch((err) => {
            console.error(`Erro ao obter os dados da model Gigs ${err}`);
        });
});

//include
router.get('/add', (req, res) => {
    const data = {
        title: 'Oferta para desenvolvimento React',
        technologies: 'javascript, react, redux, css, html',
        budget: 'US$ 3000',
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged",
        contact_email: 'teste@test.com'
    }

    let params = data;

    //criação de registro retorna promise
    Gig.create({
            title: params.title,
            technologies: params.technologies,
            description: params.description,
            budget: params.budget,
            contact_email: params.contact_email
        })
        .then(() => {
            console.log('Adicionado registro com sucesso');
            res.redirect('/gigs');
        })
        .catch((err) => {
            console.error(`Erro ao inserir na base de dados Gig ${erro}`);
        })
});

//em /gig/add vai incluir uma gig pelos parâmetros do get
//versão com get com parâmetros
// router.get('/add', (req, res) =>{
//     const params = req.query;
//     //criação de registro retorna promise
//     Gig.create({
//         title: params.title,
//         technologies: params.technologies,
//         description: params.description,
//         budget: params.budget,
//         contact_email: params.contact_email
//     })
//     .then(()=>{
//         console.log('Adicionado registro com sucesso');
//         res.redirect('/gigs');
//     })
//     .catch((err) => {
//         console.error(`Erro ao inserir na base de dados Gig ${erro}`);
//     })
// });

//include com post
router.post('/add', (req, res) => {
    let params = req.body;
    let errors = [];

    //verifica erros
    if (!params.title) {
        errors.push({
            text: 'Campo de título não pode estar vazio.'
        });
    }
    if (!params.description) {
        errors.push({
            text: 'Informe a descrição.'
        });
    }
    if (!params.technologies) {
        errors.push({
            text: 'Informe as tecnologias a serem usadas'
        });
    }
    if (!params.contact_email) {
        errors.push({
            text: 'Informe um e-mail para contato'
        });
    }

    if (errors.length > 0) {
        res.render('add', {
            errors: errors,
            title: params.title,
            technologies: params.technologies,
            description: params.description,
            budget: params.budget,
            contact_email: params.contact_email
        })
    } else {
        let techField = params.technologies.toLowerCase().replace(/, /g, ',');
        //criação de registro retorna promise
        Gig.create({
                title: params.title,
                technologies: techField,
                description: params.description,
                budget: params.budget ? `$${params.budget}` : 'Unknown',
                contact_email: params.contact_email
            })
            .then(() => {
                console.log('Adicionado registro com sucesso');
                res.redirect('/gigs');
            })
            .catch((err) => {
                console.error(`Erro ao inserir na base de dados Gig ${erro}`);
            })
    }
});

//buscas
//as mesmas serão feitas por parâmetros de busca na url
router.get('/search', (req, res) => {
    const params = req.query.term;
    //aqui eu vou usar um find all com um array de objetos where
    //no where eu especifico o que vou usar na busca (no caso o campo technologies)
    //depois com as [] eu coloco o Op.like na qual eu vou fazer a operação like do SQL
    //como like é SELECT * FROM TABELA WHERE CAMPO LIKE %CRITERIO% a escrita aqui é feita da mesma forma
    Gig.findAll({
            where: {
                technologies: {
                    [Op.like]: '%' + params.toLocaleLowerCase() + '%'
                }
            }
        })
        .then((gigs) => {
            // console.log(gigs);
            res.status(200);
            res.render('gigs', {
                gigs
            });

        })
        .catch((err) => {
            console.error(`Erro ao obter os dados da model Gigs ${err}`);
        });
});
module.exports = router;