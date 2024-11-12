import express from 'express';
import mysql from 'mysql';
import cors from 'cors'

const app = express();

app.use(express.json())
app.use(cors)

// Configuração da conexão com o MySQL
const db = mysql.createConnection({
  host: 'localhost',       // Endereço do servidor MySQL
  user: 'marcus',          // Usuário do banco de dados
  password: '12345',       // Senha do banco de dados
  database: 'tarefas'      // Nome do banco de dados
});

// Conexão com o banco de dados
db.connect((err) => {
  if (err) {
    console.error('Erro de conexão: ' + err.stack);
    return;
  }
  console.log('Conectado ao MySQL como ID ' + db.threadId);
});

// Definindo a consulta SQL
const q = 'SELECT * FROM tarefas';

// Definindo a rota raiz
app.get('/', (req, res) => {
  // Executando a consulta SQL
  db.query(q, (error, results, fields) => {
    if (error) {
      console.error('Erro na consulta SQL: ', error);
      res.status(500).send('Erro na consulta ao banco de dados');
      return;
    }
    
    // Retornando os resultados da consulta ao cliente
    res.json(results);
  });
});

// Iniciando o servidor na porta 5500
app.listen(5500, () => {
  console.log('Server listening on port 5500');
});