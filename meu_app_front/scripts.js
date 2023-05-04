/*
  -----------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  -----------------------------------------------------------------------------------
*/
const getList = async () =>{
    let url = 'http://192.168.31.21:5000/clientes_listar';
    fetch(url, {
        method: 'get',
    })
    .then((response) => response.json())
    .then((data) => {
        data.clientes.forEach(item => insertList(item.id_do_cliente, item.nome_do_cliente, item.email_do_cliente, item.telefone_do_cliente))
    })
    .catch((error) => {
        console.error('Error:', error);
    })
}

/*
  --------------------------------------------------------------------------------------
  Chamada da função para carregamento inicial dos dados
  --------------------------------------------------------------------------------------
*/
getList()


/*
  --------------------------------------------------------------------------------------
  Função para colocar um item na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/
const postItem = async (inputNome, inputEmail, inputTelefone) => {
    const formData = new FormData();
    formData.append('nome_do_cliente', inputNome);
    formData.append('email_do_cliente', inputEmail);
    formData.append('telefone_do_cliente', inputTelefone);

    let url = 'http://192.168.31.21:5000/cliente_cadastrar';
    fetch(url, {
      method: 'post',
      body: formData
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error:', error);
      });
}


/*
  --------------------------------------------------------------------------------------
  Função para criar um botão close para cada item da lista
  --------------------------------------------------------------------------------------
*/
const insertButton = (parent) => {
    let span = document.createElement("span");
    let txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    parent.appendChild(span);
}


/*
  --------------------------------------------------------------------------------------
  Função para remover um item da lista de acordo com o click no botão close
  --------------------------------------------------------------------------------------
*/
const removeElement = () => {
    let close = document.getElementsByClassName("close");
    // var table = document.getElementById('myTable');
    let i;
    for (i = 0; i < close.length; i++) {
        close[i].onclick = function () {
            let div = this.parentElement.parentElement;
            const nomeItem = div.getElementsByTagName('td')[0].innerHTML
            if (confirm("Voce tem certeza?")) {
                div.remove()
                deleteItem(nomeItem)
                alert("Removido!")
            }
        }
    }
}


/*
  --------------------------------------------------------------------------------------
  Função para deletar um item da lista do servidor via requisição DELETE
  --------------------------------------------------------------------------------------
*/
const deleteItem = (item) => {
    console.log(item)
    let url = 'http://192.168.31.21:5000/cliente_deletar?id_do_cliente=' + item ;
    fetch(url, {
      method: 'delete'
    })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}


/*
  --------------------------------------------------------------------------------------
  Função para adicionar um novo item com nome, quantidade e valor 
  --------------------------------------------------------------------------------------
*/
const newItem = () => {
  let inputNome = document.getElementById("newNome").value;
  let inputEmail = document.getElementById("newEmail").value;
  let inputTelefone = document.getElementById("newTelefone").value;
  
  if (inputNome === '') {
    alert("Escreva o nome de um item!");
  } else if (inputEmail === '' ) {
    alert("Escreva o email de um cliente!");
  } else if (inputTelefone === '') {
  alert("Escreva o telefone de um cliente!");
  } else {
    insertList(inputNome, inputEmail, inputTelefone)
    postItem(inputNome, inputEmail, inputTelefone)
    alert("Cliente adicionado!")
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para inserir items na lista apresentada
  --------------------------------------------------------------------------------------
*/
const insertList = (idCliente, nameCliente, emailCliente, telefoneCliente) => {
    var item = [idCliente, nameCliente, emailCliente, telefoneCliente]
    var table = document.getElementById('myTable');
    var row = table.insertRow();
  
    for (var i = 0; i < item.length; i++) {
      var cel = row.insertCell(i);
      cel.textContent = item[i];
    }
    insertButton(row.insertCell(-1))
    document.getElementById("newNome").value = "";
    document.getElementById("newEmail").value = "";
    document.getElementById("newTelefone").value = "";
  
    removeElement()
  }