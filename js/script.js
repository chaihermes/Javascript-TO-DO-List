
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
    let valorDigitado = inputAdd.value;
    //acrescenta o valor digitado no array listaTarefas.
    listaTarefas.push(valorDigitado);

    //chamando a função de criar a tarefa definida abaixo:
    //listaTarefas.length -1: apresenta a última posição dentro do array
    gerarTarefa(valorDigitado, listaTarefas.length -1);
    
    //atualiza as informações no local storage com o array recebido.
    localStorage.setItem("listaTarefas", JSON.stringify(listaTarefas));
}

//renderiza a função na tela.
function mostrarNaTela(listaTarefas){
            // for(let item of listaTarefas){
            //     //pra cada item da lista de tarefas, vai gerar uma nova tarefa
            //     //é semelhante ao foreach, ao contrário
            //     gerarTarefa(item);
            // }
    board.innerHTML = "";
    //o inner HTML vazio, significa que a variável board será limpada toda vez, antes de imprimir.
    //Se houver troca de posição, ela atualiza as posições pra os lugares certos.

    //passa uma função anônima pra cada item do array      
    //vai fazer um foreach pra cada item da lista de tarefas e vai executar a função anônima
    // e vai gerar uma tarefa com o valor e a posição pra cada item.  
    //o valor é o que está sendo digitado no campo pra adicionar nova tarefa
    listaTarefas.forEach(function(valor, posicao){
        gerarTarefa(valor, posicao);
    })
}


//essa função é pra gerar novas tarefas:
//com o parâmentro pposicao, a função recebe também o campo posição pra saber qual a posição que determinada
//tarefa está salva no local Storage.
function gerarTarefa(valorDigitado, posicao){
    //cria a div e deppois atribui a classe a essa div
    let tarefa = document.createElement('div');
    tarefa.setAttribute('class', 'tarefa');
    //inserindo o elemento posição:
    tarefa.setAttribute('posicao', posicao);

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
        // let tarefaPai = event.target.parentNode.parentNode;
        // tarefaPai.remove();
        //Se colocar só a variável tarefa com o remove também funciona, pois a variável que cria a div que segura
        //toda a informação do bloco é essa.
                //console.log pra comparar as informações da lista de tarefas. O splice deveria remover do array e 
                //reposicionar o resto da lista
                // console.log(listaTarefas);
                //o splice retorna um array dele mesmo.
                // let posicaoTarefa = tarefa.getAttribute('posicao');
                // listaTarefas.splice(posicaoTarefa);

                // console.log(listaTarefas);
        //console.log(listaTarefas);
        let posicaoTarefa = tarefa.getAttribute('posicao');
        listaTarefas = listaTarefas.filter(function(valor, posicao){
            //o filter retorna um array filtrado.
            //filtra a informação. Só retornará o que for diferente da posição que está sendo deletada.
            //Vai atualizar o conteúdo da própria lista de tarefas.
            return posicao != posicaoTarefa;
        })
        //chamou a função mostrar da tela pra atualizar a lista de tarefas, com a atualização das posições.
        mostrarNaTela(listaTarefas);
        //salva a nova lista de tarefas, que remove a add itens.
        localStorage.setItem("listaTarefas", JSON.stringify(listaTarefas));

        //console.log(listaTarefas);
        tarefa.remove();
    }; 

    buttonCheck.appendChild(inputCheck);

    tarefa.appendChild(titulo);
    tarefa.appendChild(buttonCheck);
    //inseriu as tarefas dentro da div board
    board.appendChild(tarefa);
}

