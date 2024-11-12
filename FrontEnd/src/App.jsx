import React, { useState } from 'react';
import { Box, Typography, TextField, Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import axios from 'axios';
import './App.css';

function App() {
  const [nome, setNome] = useState(''); // Estado para o nome da tarefa
  const [descricao, setDescricao] = useState(''); // Estado para a descrição
  const [status, setStatus] = useState('Pendente'); // Estado para o status
  const [loading, setLoading] = useState(false); // Estado de loading

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
    } catch (error) {
      console.error('Erro ao salvar a tarefa:', error);
      alert('Erro ao salvar a tarefa');
    } finally {
      setLoading(false);
    }
  };

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
          mb: 4,
        }}
      >
        <Typography variant="h3">ADICIONE SUA PRÓXIMA TAREFA</Typography>
      </Box>

      {/* Entrada de Tarefa */}
      <Box display="flex" alignItems="center" gap={2}>
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

      <Box display="flex" alignItems="center" gap={2} mt={2}>
        <FormControl fullWidth sx={{ flex: 1 }}>
          <InputLabel id="status-label">Status</InputLabel>
          <Select
            labelId="status-label"
            id="status-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <MenuItem value="Pendente">Pendente</MenuItem>
            <MenuItem value="Em Andamento">Em Andamento</MenuItem>
            <MenuItem value="Feito">Feito</MenuItem>
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
    </Box>
  );
}

export default App;
