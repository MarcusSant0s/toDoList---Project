import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Box, Typography, TextField, Checkbox, FormControlLabel, Button, InputLabel, MenuItem, Select, FormControl } from '@mui/material';
import './App.css';

function App() {
  const [status, setStatus] = useState('');

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  return (
    < >
  

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
        {/* Campo de Texto ocupando 3/5 da largura */}
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

        {/* Botão "Salvar" ocupando 1/5 da largura */}
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

     

      {/* Seção para "Levar cachorro pra passear" com 2/3 da largura */}
      <Box display="flex" alignItems="center" gap={2} mt={2}>
        {/* Textarea que ocupa 2/3 da largura */}
        <Box sx={{ flex: 2 }}>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
            Levar cachorro para passear
          </Typography>
        </Box>

        {/* Select ocupando 1/3 da largura */}
        <Box sx={{ flex: 1 }}>
          <FormControl fullWidth>
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              labelId="status-label"
              id="status-select"
              value={status}
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
    </Box>

    </>
  );
}

export default App;
