const botaoMais = document.querySelector('.contentBotao');
const inputArea = document.querySelector('.inputArea');

botaoMais.addEventListener("click", () => {
  if (inputArea.style.display === 'none') {
    inputArea.style.display = 'flex';
  } else {
    inputArea.style.display = 'none';
  }
});

const input = document.getElementById('addTarefa');
const botao = document.getElementById('botaoAdd');
const lista = document.getElementById('listaTarefas');

function adicionarTarefa() {
  const textoTarefa = input.value.trim();
  //verifica se o usuário realmente digitou alguma coisa
  if (textoTarefa === '') {
    alert("Digite uma tarefa antes de adicionar!");
    return;
  }

  //cria uma tarefa
  const li = document.createElement('li');
  //cria o botão que concluí uma tarefa
  const botaoConcluir = document.createElement('button');
  botaoConcluir.classList.add('concluir');


  const texto = document.createElement("span");
  texto.textContent = textoTarefa;

  //adiciona o botão de remover ao criar uma tarefa
  const botaodeRemover = document.createElement('button');
  botaodeRemover.textContent = 'X Remover tarefa';
  botaodeRemover.classList.add('remover');
  botaodeRemover.style.display = 'none';

  li.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    if (botaodeRemover.style.display === 'none') {
      botaodeRemover.style.display = 'block';
    } else {
      botaodeRemover.style.display = 'none';
    }
  });
  botaoConcluir.addEventListener('click', () => {
    li.classList.toggle('concluida');
    salvarTarefas();
  });


  botaodeRemover.addEventListener('click', () => {
    li.classList.toggle('removida');
    li.remove();
    salvarTarefas();
  });





  li.appendChild(botaoConcluir);
  li.appendChild(texto);
  li.appendChild(botaodeRemover);
  lista.appendChild(li);
  input.value = '';
  salvarTarefas();
}



function salvarTarefas() {
  const tarefas = [];
  lista.querySelectorAll('li').forEach(li => {
    tarefas.push({
      texto: li.querySelector('span').textContent,
      concluida: li.classList.contains('concluida')
    });
  });
  localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

function carregarTarefas() {
  const tarefasSalvas = JSON.parse(localStorage.getItem('tarefas')) || [];
  tarefasSalvas.forEach(tarefa => {
    const li = document.createElement('li');
    li.textContent = tarefa.texto;

    if (tarefa.concluida) {
      li.classList.add('concluida');
    }

    const botaodeRemover = document.createElement('button');
    botaodeRemover.textContent = 'X Remover tarefa';
    botaodeRemover.classList.add('remover');

    botaodeRemover.addEventListener('click', () => {
      li.remove();
      salvarTarefas();
    });

    botaoConcluir.addEventListener('click', () => { li.classList.toggle('concluida'); salvarTarefas(); });
    li.appendChild(botaoConcluir);
    li.appendChild(texto);
    li.appendChild(botaodeRemover);
    lista.appendChild(li);
  });
}

// Quando clicar no botão, adiciona uma tarefa
botao.addEventListener('click', adicionarTarefa);

// Quando apertar Enter, também adiciona
input.addEventListener('keypress', e => {
  if (e.key === 'Enter') {
    adicionarTarefa();
  }
});

// Carrega as tarefas assim que o site abre
carregarTarefas();