const urlBase = "https://servicodados.ibge.gov.br/api/v1/paises/"

const asia = $("#asia")
const africa = $("#africa")
const america = $("#america")
const europa = $("#europa")
const oceania = $("#oceania")
const selectButton = $("#selectButton")
const inputButton = $("#inputButton")
const select = $("select")
const resultado = $("#resultado")
const input = $("input")
const tbody = $("tbody")
const historico = $("#historico")

const paisesAsia = []
const paisesAfrica = []
const paisesAmerica = []
const paisesEuropa = []
const paisesOceania = []
const nomeTabela = ["Nome", "Área", "Capital", "Região", "Línguas", "Moedas"]
let resposta

function criaOption(paises, select) {
    paises.forEach(function (pais) {
        $("<option></option>").attr("value", Object.values(pais.id)[1]).html(`${pais.nome.abreviado}`).appendTo(select)
    })
}

function criaTabela(paises, valores){
    for(let i = 0; i<paises.length; i++){
            const tableRow = $("<tr></tr>")
            $("<td></td>").html(paises[i]).appendTo(tableRow)
            $("<td></td>").html(valores[i]).appendTo(tableRow)
            tableRow.appendTo(tbody)
    }
    const h1 = $("<h1>").html("Histórico").appendTo(resultado)
    const p = $("<p>").html(valores[valores.length-1]).appendTo(resultado).css("text-align", "justify")

}

function selectBusca() {
    const valor = select.val()
    let pais = resposta.filter(function (item) {
        return Object.values(item.id)[1] === valor
    })
    pais = pais[0]
    const linguasObjeto = Object.values(pais.linguas)
    const moeda = Object.values(pais["unidades-monetarias"])[0].nome
    const linguas = linguasObjeto.map(function(lingua){return lingua.nome})
    const linguaString = linguas.join(',')
    const paisArray = [pais.nome.abreviado, `${pais.area.total}  ${pais.area.unidade.nome}`, pais.governo.capital.nome, Object.values(pais.localizacao)[1].nome, linguaString, moeda, pais.historico]
    criaTabela(nomeTabela, paisArray)
    console.log(pais)
}

function inputBusca(){
    const valor = input.val()
    let pais = resposta.filter(function(item){
        return item.nome.abreviado === valor
    })
    pais = pais[0]
    const linguasObjeto = Object.values(pais.linguas)
    const moeda = Object.values(pais["unidades-monetarias"])[0].nome
    const linguas = linguasObjeto.map(function(lingua){return lingua.nome})
    const linguaString = linguas.join(',')
    const paisArray = [pais.nome.abreviado, `${pais.area.total}  ${pais.area.unidade.nome}`, pais.governo.capital.nome, Object.values(pais.localizacao)[1].nome, linguaString, moeda, pais.historico]
    criaTabela(nomeTabela, paisArray)
}


$.get(urlBase, function (data) {
    resposta = data
    for (let i = 0; i < resposta.length; i++) {
        switch (resposta[i].localizacao.regiao.nome) {
            case "Ásia":
                paisesAsia.push(resposta[i])
                break
            case "África":
                paisesAfrica.push(resposta[i])
                break
            case "Europa":
                paisesEuropa.push(resposta[i])
                break
            case "Oceania":
                paisesOceania.push(resposta[i])
                break
            case "América":
                paisesAmerica.push(resposta[i])
                break
            default:
                console.log("País não encontrado")
        }
    }
    criaOption(paisesAfrica, africa)
    criaOption(paisesAmerica, america)
    criaOption(paisesAsia, asia)
    criaOption(paisesEuropa, europa)
    criaOption(paisesOceania, oceania)

})

selectButton.one("click", selectBusca)
inputButton.one("click", inputBusca)