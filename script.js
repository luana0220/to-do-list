const botaoMais = document.getElementById('btnAbrirForm');
const inputArea = document.querySelector('.inputArea');
const input = document.getElementById('addTarefa');
const botaoAdicionar = document.getElementById('botaoAdd');
const lista = document.getElementById('listaTarefas');

const hamburguer = document.querySelector('.hamburguer');
const navegacao = document.getElementById('navegacao');

hamburguer.addEventListener('click', () => {
  navegacao.classList.toggle('active');
});

// abre/fecha o formulário
botaoMais.addEventListener("click", () => {
  inputArea.classList.toggle('active');
});

// adiciona com Enter
input.addEventListener('keypress', e => {
  if (e.key === 'Enter') {
    adicionarTarefa();
  }
});

botaoAdicionar.addEventListener('click', adicionarTarefa);

function adicionarTarefa() {
  const textoTarefa = input.value.trim();
  if (textoTarefa === '') {
    alert("Digite uma tarefa antes de adicionar!");
    return;
  }

  criarElementoTarefa(textoTarefa, false);
  input.value = '';
  salvarTarefas();
}

// cria o elemento visual de uma tarefa
function criarElementoTarefa(textoTarefa, concluida) {
  const li = document.createElement('li');
  li.classList.add('tarefa-item');
  if (concluida) li.classList.add('concluida');

  const botaoCheck = document.createElement('div');
  botaoCheck.classList.add('checkbox');
  if (concluida) botaoCheck.classList.add('checked');

  const texto = document.createElement('span');
  texto.classList.add('tarefa-texto');
  texto.textContent = textoTarefa;

  const botaoRemover = document.createElement('button');
  botaoRemover.classList.add('btn-remover');
  botaoRemover.textContent = 'Remover';

  // marcar/desmarcar tarefa
  botaoCheck.addEventListener("click", () => {
    botaoCheck.classList.toggle('checked');
    li.classList.toggle('concluida');
    salvarTarefas();
  });

  // remover tarefa
  botaoRemover.addEventListener("click", () => {
    li.remove();
    salvarTarefas();
  });

  li.appendChild(botaoCheck);
  li.appendChild(texto);
  li.appendChild(botaoRemover);
  lista.appendChild(li);
}

// salva tarefas no localStorage
function salvarTarefas() {
  const tarefas = [];
  lista.querySelectorAll('li').forEach(li => {
    tarefas.push({
      texto: li.querySelector('.tarefa-texto').textContent,
      concluida: li.classList.contains('concluida')
    });
  });
  localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

// carrega tarefas ao abrir a página
function carregarTarefas() {
  const tarefasSalvas = JSON.parse(localStorage.getItem('tarefas')) || [];
  tarefasSalvas.forEach(tarefa => {
    criarElementoTarefa(tarefa.texto, tarefa.concluida);
  });
}

carregarTarefas();
