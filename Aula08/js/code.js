// Code

const botaoConsultar = document.getElementById('consultar');
let cep = document.getElementById('cep');

const setDadosForm = function(dados){
    let lougradouro = document.getElementById('rua');
    let bairro = document.getElementById('bairro');
    let cidade = document.getElementById('cidade');
    let estado = document.getElementById('estado');

    lougradouro.value = dados.logradouro;
    bairro.value = dados.bairro;
    cidade.value = dados.localidade
    estado.value = dados.uf
}

const getDadosCepAPI = async function(numeroCep){
    let url = `https://viacep.com.br/ws/${numeroCep}/json/`;
    const response = await fetch(url);
    const dadosCep = await response.json();
    setDadosForm(dadosCep);
}

const getCepForm = function(){
    if (cep.value == ''){
        alert('Não é possível consultar o CEP em branco.');
    } else {
        getDadosCepAPI(cep.value);
    }
}

cep.addEventListener('focusout', function(){
    getCepForm();
})