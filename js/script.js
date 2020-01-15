let board = document.getElementById('board');

// O comando para query Selector:
//let board = document.querySelector('#board');

let buttonAdd = document.getElementById('add');

let inputAdd = document.getElementById('addTarefa');

let listaTarefas = [];
//Começa a função vazia. Se não tiver informações salvas, cai no else. Depois de criar uma nova tarefa e salvar,
//a função cai no if.
//verificação se o array está vazio ou se tem informações salvas.
if(localStorage.getItem('listaTarefas')){
    //parse: tranforma um jason em formato array.
    listaTarefas = JSON.parse(localStorage.getItem('listaTarefas'))
 } else {
    //se a lista estiver vazia:
    // listaTarefas = [];
    //stringify: tranfroma um array em formato json
    localStorage.setItem("listaTarefas", JSON.stringify(listaTarefas));
 }
 //agora depois que cria uma nova tarefa e salva no storage, pode atualizar a página que não perde as informações.
 //o local storage só salva as infomrações no navegador do usuário.
//o localStorage é possível visualizar no inspecionar elemento, Aplication, Local Storage.

//já mostra na tela o que tem salvo no local storage.
mostrarNaTela(listaTarefas);

buttonAdd.onclick = function(){
    //uma forma de fazer é criando uma função anônima.
    //alert("Estou no click");

    //Armazena o valor digitado pelo usuário
    let valorDigitado = inputAdd.value;
    //acrescenta o valor digitado no array listaTarefas.
    listaTarefas.push(valorDigitado);


    //cria a div e deppois atribui a classe a essa div
    let tarefa = document.createElement('div');
    tarefa.setAttribute('class', 'tarefa');

    let titulo = document.createElement('div');
    titulo.setAttribute('class', 'col-md-8');
    titulo.textContent = valorDigitado;

    let buttonCheck = document.createElement('div');
    buttonCheck.setAttribute('class', 'col-md-2');

    let inputCheck = document.createElement('input');
    inputCheck.setAttribute('class', 'btn btn-success');
    inputCheck.setAttribute('type', 'button');

    //appendChild coloca um elemento dentro de outro.
    //aqui está usando as variáveis dentro dos ().
    buttonCheck.appendChild(inputCheck);
    tarefa.appendChild(titulo);
    tarefa.appendChild(buttonCheck);

    //inseriu as tarefas dentro da div board
    board.appendChild(tarefa);

    //atualiza as informações no local storage com o array recebido.
    localStorage.setItem("listaTarefas", JSON.stringify(listaTarefas));
}

//renderiza a função na tela.
function mostrarNaTela(listaTarefas){
    for(let item of listaTarefas){
        //pra cada item da lista de tarefas, vai gerar uma nova tarefa
        //é semelhante ao foreach, ao contrário
        gerarTarefa(item);
    }
}


//essa função é pra gerar novas tarefas:
function gerarTarefa(valorDigitado){
    let tarefa = document.createElement('div');
    tarefa.setAttribute('class', 'tarefa');

    let titulo = document.createElement('div');
    titulo.setAttribute('class', 'col-md-8');
    titulo.textContent = valorDigitado;

    let buttonCheck = document.createElement('div');
    buttonCheck.setAttribute('class', 'col-md-2');

    let inputCheck = document.createElement('input');
    inputCheck.setAttribute('class', 'btn btn-success');
    inputCheck.setAttribute('type', 'button');

    buttonCheck.appendChild(inputCheck);

    tarefa.appendChild(titulo);
    tarefa.appendChild(buttonCheck);
    board.appendChild(tarefa);
}