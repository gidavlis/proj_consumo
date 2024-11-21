document.getElementById('form-cadastro').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const usuarioId = document.getElementById('usuarioId').value;
    const quantidade = parseFloat(document.getElementById('quantidade').value);
    const data = document.getElementById('data').value;
  
    try {
      const response = await fetch('http://localhost:3000/consumo_agua/registrar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuarioId, quantidade, data }),
      });
  
      if (response.ok) {
        document.getElementById('mensagem').textContent = 'Consumo registrado com sucesso!';
        document.getElementById('mensagem').style.color = 'green';
      } else {
        const errorData = await response.json();
        document.getElementById('mensagem').textContent = `Erro: ${errorData.message}`;
        document.getElementById('mensagem').style.color = 'red';
      }
    } catch (error) {
      document.getElementById('mensagem').textContent = 'Erro ao registrar consumo.';
      document.getElementById('mensagem').style.color = 'red';
    }
  });
  
  document.getElementById('form-historico').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const usuarioId = document.getElementById('usuarioIdHistorico').value;
    const dataInicio = document.getElementById('dataInicio').value;
    const dataFim = document.getElementById('dataFim').value;
  
    try {
      const response = await fetch(`http://localhost:3000/consumo_agua/historico?usuarioId=${usuarioId}&dataInicio=${dataInicio}&dataFim=${dataFim}`);
      
      if (response.ok) {
        const historico = await response.json();
        const historicoList = document.getElementById('historico');
        historicoList.innerHTML = '';
  
        if (historico.length === 0) {
          historicoList.innerHTML = '<li>Nenhum registro encontrado.</li>';
        } else {
          historico.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = `Data: ${item.data}, Quantidade: ${item.quantidade}`;
            historicoList.appendChild(listItem);
          });
        }
      } else {
        throw new Error('Erro ao consultar histórico.');
      }
    } catch (error) {
      document.getElementById('historico').innerHTML = `<li>${error.message}</li>`;
    }
  });

  document.getElementById('form-alerta').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const usuarioId = document.getElementById('usuarioIdAlerta').value;
  
    try {
      const response = await fetch(`http://localhost:3000/consumo_agua/alerta?usuarioId=${usuarioId}`);
      
      if (response.ok) {
        const alerta = await response.json();
  
        if (alerta.alerta) {
          document.getElementById('alerta-mensagem').textContent = 'Alerta: Consumo elevado em relação ao mês anterior!';
          document.getElementById('alerta-mensagem').style.color = 'red';
        } else {
          document.getElementById('alerta-mensagem').textContent = 'Consumo dentro dos limites esperados.';
          document.getElementById('alerta-mensagem').style.color = 'green';
        }
      } else {
        throw new Error('Erro ao verificar alerta.');
      }
    } catch (error) {
      document.getElementById('alerta-mensagem').textContent = `Erro: ${error.message}`;
      document.getElementById('alerta-mensagem').style.color = 'red';
    }
  });  