document.getElementById('buscar').addEventListener('click', buscarCEP);

function buscarCEP() {
  const cep = document.getElementById('cep').value.trim();
  const resultado = document.getElementById('resultado');
  
  if (cep.length !== 8 || isNaN(cep)) {
    resultado.innerHTML = `<span style="color: red;">Digite um CEP válido com 8 números.</span>`;
    return;
  }
  
  resultado.innerHTML = "Buscando...";

  fetch(`https://brasilapi.com.br/api/cep/v1/${cep}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('CEP não encontrado.');
      }
      return response.json();
    })
    .then(data => {
      resultado.innerHTML = `
        <strong>CEP:</strong> ${data.cep}<br>
        <strong>Estado:</strong> ${data.state}<br>
        <strong>Cidade:</strong> ${data.city}<br>
        <strong>Bairro:</strong> ${data.neighborhood || 'Não disponível'}<br>
        <strong>Rua:</strong> ${data.street || 'Não disponível'}
      `;
    })
    .catch(error => {
      resultado.innerHTML = `<span style="color: red;">${error.message}</span>`;
    });
}
