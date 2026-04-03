const form = document.getElementById('tarefas-form');
const input = document.getElementById('tarefas-input');
const lista = document.getElementById('tarefas-list');
const filtro = document.getElementById('filtro');

// == Acessa as informações no salvas localStorage, caso não tenha ele cria um array vazio
let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];


// == Adiciona os dados salvos no array e coloca na lista
function renderTasks() {
  lista.innerHTML = ''; // limpa a lista e monta novamente (evita duplicar os itens)
  const ValorDoFiltro = filtro.value;


  // === Função que cria as tarefas na tela ===
  tarefas.forEach((tarefa, index) => {
    // == Filtro ==
    if (ValorDoFiltro === 'completada' && !tarefa.completed) return;
    if (ValorDoFiltro === 'pedente' && tarefa.completed) return;

    // Cria o elemento <li> da tarefa
    const li = document.createElement('li');
    li.className = tarefa.completed ? 'completed' : '';

    // Cria o texto da tarefa e permite clicar nele para mudar o valor
    const span = document.createElement('span');
    span.textContent = tarefa.text;
    span.addEventListener('click', () => toggleTask(index));

    // Cria o botão da lixeira
    const delBtn = document.createElement('button');
    delBtn.textContent = '🗑️';
    delBtn.addEventListener('click', () => deleteTask(index));

    // Adiciona o texto e o botão dentro do <li> == adiciomna a lista na lista principal
    li.appendChild(span);
    li.appendChild(delBtn);
    lista.appendChild(li);
  });

  // Salva a lista no localStorage
  localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

// === Cria a tarefa e atribui o valor "pendente" a ela ===
form.addEventListener('submit', e => {
  e.preventDefault(); // Evita a página recarregar, por mais que o código funcione sem isso
  const text = input.value.trim();
  if (!text) return alert('Digite uma tarefa!');
  tarefas.push({ text, completed: false });
  input.value = '';
  renderTasks();
});


// === Função que alterna o estado de uma tarefa (concluída <-> pendente) ===
function toggleTask(index) {
  tarefas[index].completed = !tarefas[index].completed;
  renderTasks();
}


// === Lixeira ===
function deleteTask(index) {
  tarefas.splice(index, 1);
  renderTasks();
}


// === Atualiza a lista quando o filtro muda (todas/concluídas/pendentes) ===
filtro.addEventListener('change', renderTasks);

// === Exibe as tarefas salvas ao carregar a página ===
renderTasks();