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

//já mostra na tela o que tem salvo no local storage. Atraves da função mostrarNaTela definida abaixo. 
//É um looping que mostra todas as tarefas salvas no local storage.
mostrarNaTela(listaTarefas);

buttonAdd.onclick = function(event){

    //essa função mostra qual é o evento usado (nesse caso, o botao)
    //let botaoClicado = event.target;
    //console.log(botaoClicado);
    //uma forma de fazer é criando uma função anônima.
    //alert("Estou no click");

    //Armazena o valor digitado pelo usuário
    let valorDigitadoPeloUser = inputAdd.value;
    //acrescenta o valor digitado no array listaTarefas.
    listaTarefas.push(valorDigitadoPeloUser);

    //chamando a função de criar a tarefa definida abaixo:
    gerarTarefa(valorDigitado);
    
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
    //cria a div e deppois atribui a classe a essa div
    let tarefa = document.createElement('div');
    tarefa.setAttribute('class', 'tarefa');
    //tarefa.setAttribute('id', 'task');

    let titulo = document.createElement('div');
    titulo.setAttribute('class', 'col-md-8');
    titulo.textContent = valorDigitado;

    let buttonCheck = document.createElement('div');
    buttonCheck.setAttribute('class', 'col-md-2');

    let inputCheck = document.createElement('input');
    inputCheck.setAttribute('class', 'btn btn-success');
    //inputCheck.setAttribute('id', 'idButton');
    inputCheck.setAttribute('type', 'button');

    //onclick add um evento de click no botão pra cada evento criado, ou seja, pra cada nova tarefa.
    //o target serve pra saber qual o botão foi clicado.
    //selecionamos o evento que acabou de acontecer. Usamos um informação (target), pra saber qual botão foi
    //clicado. O parentNode serve pra saber quem é o pai que segura esse evento (qual div).
    //O remove remove tudo que está na variável tarefaPai.
    inputCheck.onclick = function(event){
        let tarefaPai = event.target.parentNode.parentNode;
        tarefaPai.remove();

        //Se colocar só a variável tarefa com o remove também funciona, pois a variável que cria a div que segura
        //toda a informação do bloco é essa.
        //tarefa.remove();
    }; 

    buttonCheck.appendChild(inputCheck);

    tarefa.appendChild(titulo);
    tarefa.appendChild(buttonCheck);
    //inseriu as tarefas dentro da div board
    board.appendChild(tarefa);
}

