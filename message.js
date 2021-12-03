// Variáveis DOM que serão utilizadas
let date = new Date
let currentHour = date.getHours()
let finalMessage = document.querySelector("#fnl-mssg")
let prodsInfos = document.querySelector("#products-infos")
let qtdProducts = document.querySelector("#input-qtd-products")
let fichaCheck = document.querySelector("#ficha")
let imgCheck = document.querySelector("#img")
let copyClipboardBtn = document.querySelector("#copy-clipboard")
let countProducts = 0

// Condicional para saber se vai ser Bom dia, Boa tarde ou Boa noite
function greetTimes(){
    if(currentHour > 6 && currentHour < 12){
        return "Bom dia! Tudo bem?"
    } else if(currentHour > 12 && currentHour < 18){
        return "Boa tarde! Tudo bem?"
    } else {
        return "Boa noite! Tudo bem?"
    }
}

//Manipulação do Textarea do HTML
function convertTextArea(){
    let addLine = ""
    let productsInfosDivs = []
    let productsInfos = prodsInfos.value
	//Separa cada linha em um array
    let prodsInfosArr = productsInfos.split("\n")
	countProducts = prodsInfosArr.length
	
	//Separa cada array de linha em 1 array com 3 ou 4 elementos. EX:[[1, 2, 3], [1, 2 , 3 , 4]]
    for(let i = 0; i < prodsInfosArr.length; i++){
        let splitCurrentArr = prodsInfosArr[i].split(";")
        productsInfosDivs.push(splitCurrentArr)
    }
	//Separa os índices dos subarrays nas strings, de SKU, NOME, MODELO e COR, formata a linha com template string baseado no objeto 'lineObg' e adiciona na variável addLine
    for(let x = 0; x < productsInfosDivs.length; x++){
        const lineObj = [{
            sku: "",
            name: "",
            model: "",
            color: ""
        }]
        productsInfosDivs[x].forEach((item, index) => {
            lineObj[index] = item
        })
        if(productsInfosDivs[x].length >= 4) {
            addLine += `\nSKU: ${lineObj[0]} - NOME: ${lineObj[1]} - MODELO: ${lineObj[2]} - COR(ES): ${lineObj[3]}\n`
        } else {
            addLine += `\nSKU: ${lineObj[0]} - NOME: ${lineObj[1]} - MODELO: ${lineObj[2]}\n`
        }
    }
    return addLine
}

//Não tá funcionando, mas é pra saber se é plural ou singular o pedido
function qtdProductsSolic(){
    if(countProducts == 0){
        console.log(countProducts)
        return "Referente ao produto de:"
    } else if(countProducts >= 1){
        console.log(countProducts)
        return "Referente aos produtos de:"
    }
}

//Verifica quais checkboxes estão selecionada no HTML, fique a vontade pra deixar mais smart
function checkBoxes(){
    if(fichaCheck.checked && imgCheck.checked == false){
        return "Peço que preencham a ficha em anexo com as devidas informações que precisamos e nos retornem!"
    } else if(fichaCheck.checked == false && imgCheck.checked){
        return "Peço que nos enviem as imagens em alta resolução dos respectivos dados solicitados acima por um link externo, como WeTransfer (https://wetransfer.com/) ou Google Drive! Não adicionem elas nos anexos!"
    } else if(fichaCheck.checked && imgCheck.checked){
        return "Peço que preencham a ficha em anexo com as devidas informações que precisamos e nos retornem, juntamente com as imagens em alta resolução, estas peço que sejam enviadas por um link externo como WeTransfer (https://wetransfer.com/) ou Google Drive! Não adicionem elas nos anexos!"
    }
}

//Concatena todas as funções anteriores com template string e lança o resultado no textarea ao lado
document.querySelector("#generate-message").addEventListener('click', () => {
	finalMessage.innerHTML = `${greetTimes()}\n${qtdProductsSolic()}\n${convertTextArea()}\n${checkBoxes()}\nSe tiverem, podem nos enviar também as informações de INMETRO do produto.\nAgradeço(a)!\n\nAtt,`
})

//Função do botão Copiar Conteúdo para área de transferência
copyClipboardBtn.addEventListener('click', () => {
    let copyMsg = document.querySelector("#fnl-mssg")
    copyMsg.select()
    navigator.clipboard.writeText(copyMsg.value.toString())
    alert("Conteúdo da mensagem copiado!")
})