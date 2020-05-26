# exemplo_sequelize

Este é uma réplica do case apresentadpo no tutorial de sequeloze do traversy media.
Links dos vídeos:
* Parte 1: https://www.youtube.com/watch?v=bOHysWYMZM0
* Parte 2: https://www.youtube.com/watch?v=67OhLlFPqFQ
* Parte 3: https://www.youtube.com/watch?v=6jbrWF3BWM0

O Sequelize vai trazer para o node um ORM de conexão a bancos de dados como SQLite, Postgres, MariaDB e MySQL dependendo do dialect utilizado.

# Como usar:

Instale o Postgres(https://www.postgresql.org/download/) e ligue o pgadmin.
Com ele crie a tabela "gigs", com os seguintes campos:

* id: integer primary key
* budget: character varying 20
* contact_email: character varying 50
* technologies: character varying 200
* title: character varying 200
* createdAt: Date
* updatedAt: Date

Execute com o node app.js
