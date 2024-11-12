import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express();

// Middleware para lidar com requisições JSON
app.use(express.json());
app.use(cors()); // Habilita o CORS

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

// Rota para pegar todas as tarefas
const q = 'SELECT * FROM tarefas';
app.get('/', (req, res) => {
  db.query(q, (error, results) => {
    if (error) {
      console.error('Erro na consulta SQL: ', error);
      res.status(500).send('Erro na consulta ao banco de dados');
      return;
    }
    res.json(results); // Retorna as tarefas como resposta
  });
});

// Rota para inserir uma nova tarefa
app.post('/INSERT', (req, res) => {
  const { nome, descricao, status } = req.body;

  // Verifica se todos os dados necessários foram passados
  if (!nome || !descricao || !status) {
    return res.status(400).send('Dados faltando: nome, descrição ou status');
  }

  // Inserir no banco de dados
  const query = 'INSERT INTO tarefas (nome, descricao, status) VALUES (?, ?, ?)';
  db.query(query, [nome, descricao, status], (err, result) => {
    if (err) {
      console.error('Erro ao inserir dados: ', err);
      res.status(500).send('Erro ao inserir tarefa no banco de dados');
      return;
    }
    res.status(201).send('Tarefa inserida com sucesso');
  });
});

// Rota DELETE para excluir uma tarefa pelo ID
app.delete('/DELETE/:id', (req, res) => {
  const taskId = req.params.id;

  // Query SQL para excluir a tarefa
  const deleteQuery = 'DELETE FROM tarefas WHERE id = ?';

  db.query(deleteQuery, [taskId], (error, results) => {
    if (error) {
      console.error('Erro ao excluir a tarefa:', error);
      res.status(500).send('Erro ao excluir a tarefa');
      return;
    }
    
    if (results.affectedRows === 0) {
      return res.status(404).send('Tarefa não encontrada');
    }

    res.json({ message: 'Tarefa excluída com sucesso' });
  });
});

 

// Iniciando o servidor na porta 5500
app.listen(5500, () => {
  console.log('Server listening on port 5500');
});
