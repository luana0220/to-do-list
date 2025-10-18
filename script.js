const botaoMais = document.querySelector('.contentBotao');
const inputArea = document.querySelector('.inputArea');

botaoMais.addEventListener("click", () => {
    if(inputArea.style.display === 'none') {
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

    if(textoTarefa === '') {
        alert("Digite uma tarefa antes de adicionar!");
        return;
    }

    const li = document.createElement('li');
    li.textContent = textoTarefa;

    const botaodeRemover = document.createElement('button');
    botaodeRemover.textContent = '❌';
    botaodeRemover.classList.add('remover');
    botaodeRemover.addEventListener('click', () => {
        li.remove();
        salvarTarefas();
    });

    li.addEventListener('click', () => {
        li.classList.toggle('concluida');
        salvarTarefas();
    });

    li.appendChild(botaodeRemover);
    lista.appendChild(li);
    input.value = '';
    salvarTarefas();
}

function salvarTarefas() {
    const tarefas = [];
    lista.querySelectorAll('li').forEach(li => {
        tarefas.push({
            texto: li.firstChild.textContent,
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
    botaodeRemover.textContent = '❌';
    botaodeRemover.classList.add('remover');

    botaodeRemover.addEventListener('click', () => {
      li.remove();
      salvarTarefas();
    });

    li.addEventListener('click', () => {
      li.classList.toggle('concluida');
      salvarTarefas();
    });

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