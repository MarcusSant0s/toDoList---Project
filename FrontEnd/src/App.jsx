import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, FormControl, InputLabel, MenuItem, Select, List, ListItem, ListItemText, CircularProgress } from '@mui/material';
import axios from 'axios';
import './App.css';

function App() {
  const [nome, setNome] = useState(''); // Estado para o nome da tarefa
  const [descricao, setDescricao] = useState(''); // Estado para a descrição
  const [status, setStatus] = useState('Pendente'); // Estado para o status
  const [loading, setLoading] = useState(false); // Estado de loading
  const [tasks, setTasks] = useState([]); // Estado para armazenar as tarefas recuperadas do banco de dados
  const [isFetching, setIsFetching] = useState(false); // Estado para indicar que as tarefas estão sendo carregadas

  // Função para buscar as tarefas do banco de dados
  const fetchTasks = async () => {
    setIsFetching(true);
    try {
      const response = await axios.get('http://localhost:5500/');
      setTasks(response.data); // Armazenar as tarefas no estado
    } catch (error) {
      console.error('Erro ao buscar as tarefas:', error);
      alert('Erro ao carregar as tarefas');
    } finally {
      setIsFetching(false);
    }
  };

   // Function to delete a task
   const handleDelete = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5500/DELETE/${taskId}`);
      // After successful deletion, fetch the updated tasks list
      fetchTasks();
      alert('Tarefa excluída com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir a tarefa:', error);
      alert('Erro ao excluir a tarefa');
    }
  };


  // Chama a função fetchTasks quando o componente é montado
  useEffect(() => {
    fetchTasks();
  }, []);

  // Função para tratar o envio da tarefa
  const handleSubmit = async () => {
    if (!nome || !descricao || !status) {
      alert("Por favor, preencha todos os campos");
      return;
    }

    setLoading(true);

    try {
      // Envia a tarefa para o backend
      const response = await axios.post('http://localhost:5500/INSERT', {
        nome,
        descricao,
        status,
      });
      console.log('Tarefa salva com sucesso', response);
      alert('Tarefa salva com sucesso!');
      setNome(''); // Limpar campos após salvar
      setDescricao('');
      setStatus('Pendente');
      fetchTasks(); // Recarregar a lista de tarefas após salvar uma nova
    } catch (error) {
      console.error('Erro ao salvar a tarefa:', error);
      alert('Erro ao salvar a tarefa');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      {/* Seção do Título */}
      <Box
        sx={{
          width: '100%',
          height: '100px',
          padding: 2,
          backgroundColor: 'red',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          fontWeight: '900',
          mb: 4,
        }}
      >
        <Typography variant="h4">Próxima tarefa</Typography>
      </Box>

      {/* Entrada de Tarefa */}
      <Box display="flex" 
        alignItems="center"
         gap={2}
         sx={{
          flexDirection: { xs: 'column', sm: 'row' }, // Switch to column layout on small screens
        }}
         >
        <TextField
          label="Nome da Tarefa"
          variant="standard"
          fullWidth
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          sx={{ flex: 3 }}
        />
        <TextField
          label="Descrição"
          variant="standard"
          fullWidth
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          sx={{ flex: 3 }}
        />
      </Box>

      <Box
        display="flex" 
        alignItems="center"
        gap={2} 
        mt={2}
        sx={{
          flexDirection: { xs: 'column', sm: 'row' }, // Switch to column layout on small screens
      }}
      >
        <FormControl fullWidth sx={{ flex: 1 }}>
          <InputLabel id="status-label">Status</InputLabel>
          <Select
            labelId="status-label"
            id="status-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <MenuItem value="Pendente">Pendente</MenuItem>
            <MenuItem value="EmAndamento">Em Andamento</MenuItem>
            <MenuItem value="Concluída">Concluída</MenuItem>
          </Select>
        </FormControl>
        
        {/* Botão Salvar */}
        <Button
          variant="contained"
          color="success"
          sx={{ flex: 1 }}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Salvando...' : 'Salvar'}
        </Button>
      </Box>

      {/* Seção de Tarefas */}
      <Box mt={4}>
        <Typography variant="h6" mb={2}>Tarefas</Typography>
        {isFetching ? (
          <CircularProgress />
        ) : (
          <List>
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <ListItem key={task.id}>
                  <ListItemText
                    primary={task.nome}
                    secondary={`${task.descricao} - Status: ${task.status}`}
                  />
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(task.id)}
                  >
                    Excluir
                  </Button>
                </ListItem>
              ))
            ) : (
              <Typography variant="body2" color="textSecondary">Nenhuma tarefa encontrada.</Typography>
            )}
          </List>
        )}
      </Box>
    </Box>
  );
}

export default App;
