let fila = [];
let barbeiros = [
  { id: 1, disponivel: false },
  { id: 2, disponivel: false },
  { id: 3, disponivel: false }
];

// Adiciona cliente na fila
document.getElementById('adicionarCliente').addEventListener('click', () => {
  const novoCliente = `Cliente ${fila.length + 1}`;
  fila.push(novoCliente);
  atualizarFila();
  verificarBarbeiros();
});

// Atualiza visualização da fila
function atualizarFila() {
  const filaClientes = document.getElementById('filaClientes');
  filaClientes.innerHTML = '';
  fila.forEach(cliente => {
    const li = document.createElement('li');
    li.textContent = cliente;
    filaClientes.appendChild(li);
  });
}

// Verifica se há barbeiro disponível e chama o próximo cliente
function verificarBarbeiros() {
  const barbeiroDisponivel = barbeiros.find(barbeiro => barbeiro.disponivel);
  if (barbeiroDisponivel && fila.length > 0) {
    const clienteAtendido = fila.shift();
    atualizarFila();
    document.getElementById('mensagem').textContent = `${clienteAtendido}, vá para o Barbeiro ${barbeiroDisponivel.id}`;
    barbeiroDisponivel.disponivel = false;
    atualizarStatusBarbeiros();
  }
}

// Atualiza o status dos barbeiros na tela
function atualizarStatusBarbeiros() {
  barbeiros.forEach(barbeiro => {
    const status = barbeiro.disponivel ? 'Disponível' : 'Ocupado';
    document.getElementById(`barbeiro${barbeiro.id}`).textContent = status;
  });
}

// Libera um barbeiro para atender
document.getElementById('liberarBarbeiro').addEventListener('click', () => {
  const barbeiroOcupado = barbeiros.find(barbeiro => !barbeiro.disponivel);
  if (barbeiroOcupado) {
    barbeiroOcupado.disponivel = true;
    atualizarStatusBarbeiros();
    verificarBarbeiros();
  } else {
    document.getElementById('mensagem').textContent = 'Todos os barbeiros já estão disponíveis!';
  }
});

// Inicializa os status dos barbeiros
atualizarStatusBarbeiros();