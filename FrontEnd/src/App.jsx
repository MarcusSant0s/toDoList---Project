import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import axios from 'axios';
import './App.css';

function App() {
  const [status, setStatus] = useState('');
  const [tarefas, setTarefas] = useState([]);  // Para armazenar as tarefas recebidas da API

  // Função para lidar com a mudança no Select
  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  // Função para carregar as tarefas da API
  const fetchTarefas = async () => {
    try {
      const response = await axios.get('http://localhost:5500'); // Sua API Express que retorna as tarefas
      setTarefas(response.data); // Atualiza o estado com as tarefas recebidas
    } catch (error) {
      console.error("Erro ao buscar as tarefas:", error);
    }
  };

  // Carregar as tarefas quando o componente for montado
  useEffect(() => {
    fetchTarefas();
  }, []); // O array vazio significa que isso acontece apenas uma vez, quando o componente é montado

  return (
    <Box sx={{ padding: 3 }}>
      {/* Seção do Título */}
      <Box
        sx={{
          width: '100%',
          height: '100px',
          backgroundColor: 'red',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          fontWeight: '900',
          mb: 4, // Margem inferior para dar espaçamento entre as seções
        }}
      >
        <Typography variant="h3">ADICIONE SUA PRÓXIMA TAREFA</Typography>
      </Box>

      {/* Seção de Entrada de Texto, Botão e Checkboxes */}
      <Box display="flex" alignItems="center" gap={2}>
        {/* Campo de Texto */}
        <TextField
          id="standard-basic"
          label="Tarefa"
          variant="standard"
          fullWidth
          sx={{
            flex: 3,  // Ocupa 3/5 da largura disponível
            mb: 2,    // Margem inferior entre o campo de texto e o Divider
          }}
        />

        {/* Botão "Salvar" */}
        <Button
          variant="contained"
          color="success"
          sx={{
            flex: 1,  // Ocupa 1/5 da largura disponível
            mb: 2,    // Margem inferior para garantir o espaçamento
          }}
        >
          Salvar
        </Button>
      </Box>

      {/* Seção de Tarefas */}
      <Box mt={4}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
          Tarefas Pendentes
        </Typography>

        {/* Exibindo as tarefas recebidas da API */}
        {tarefas.length > 0 ? (
          tarefas.map((tarefa) => (
            <Box key={tarefa.id} sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
              {/* Tarefa */}
              <Box sx={{ flex: 2 }}>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  {tarefa.nome}
                </Typography>
                <Typography variant="body2">{tarefa.descricao}</Typography>
              </Box>

              {/* Status da Tarefa */}
              <Box sx={{ flex: 1 }}>
                <FormControl fullWidth>
                  <InputLabel id={`status-label-${tarefa.id}`}>Status</InputLabel>
                  <Select
                    labelId={`status-label-${tarefa.id}`}
                    id={`status-select-${tarefa.id}`}
                    value={status || tarefa.status}
                    label="Status"
                    onChange={handleChange}
                  >
                    <MenuItem value="EmAndamento">Em Andamento</MenuItem>
                    <MenuItem value="Feito">Feito</MenuItem>
                    <MenuItem value="Pendente">Pendente</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
          ))
        ) : (
          <Typography variant="body1" color="textSecondary">
            Nenhuma tarefa encontrada.
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default App;
