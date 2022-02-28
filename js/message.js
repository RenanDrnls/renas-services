// Variáveis DOM que serão utilizadas
let date = new Date;
let finalMessage = document.querySelector("#fnl-mssg");
let productsInfos = document.querySelector("#products-infos");
let qtdProducts = document.querySelector("#input-qtd-products");
let fichaCheck = document.querySelector("#ficha");
let imgCheck = document.querySelector("#img");
let copyClipboardBtn = document.querySelector("#copy-clipboard");
let countProducts = 0;

// Condicional para definir qual será a saudação inserida na mensagem
function greetingCheck(){
    if(date.getHours() > 6 && date.getHours() < 12){
        return "Bom dia! Tudo bem?"
    } else if(date.getHours() > 12 && date.getHours() < 18){
        return "Boa tarde! Tudo bem?"
    } else {
        return "Boa noite! Tudo bem?"
    };
};

//Manipulação do Textarea do HTML
function convertTextArea(){

    //Separada cada linha em 1 array.
    let finalArr = []
    let productsInfosDivs = productsInfos.value.split("\n");
    
    //Separa cada array de linha em 1 array com 3 ou 4 elementos.
    //Dependendo da quantia de itens inseridos.
    //Utilizado como delimitador do split o símbolo de ponto e vírgula.
    //EX:[[1, 2, 3], [1, 2 , 3 , 4]]

    let countWrongLines = 0;

    productsInfosDivs.forEach(product => {
        let currentArr = product.split(";");
        if(currentArr.length > 4 || currentArr.length <= 2){
            countWrongLines++;
        } else {
            finalArr.push(currentArr);
        }
    });

    if(countWrongLines > 0) {
        alert(`Foi localizado um total de ${countWrongLines} linhas com mais de 4 itens ou com itens faltando, que não será mostrado na mensagem final`);
    }

	//Separa os índices dos subarrays nas strings em SKU, NOME, MODELO e COR(Que será o 4º elemento caso haja),
    //formata a linha com template string baseado na matriz 'lineObj' e adiciona na variável addLine que é a variável contendo as linhas da mensagem final.
    let linesFinalMessage = "";
    console.log(finalArr);
    for(let x = 0; x < finalArr.length; x++){
        const lineObj = [{
            sku: "",
            name: "",
            model: "",
            color: ""
        }]

        finalArr[x].forEach((item, index) => {
                lineObj[index] = item
        })

        switch(finalArr[x].length == 4){
            case true:
                linesFinalMessage += `\nSKU: ${lineObj[0]} - NOME: ${lineObj[1]} - MODELO: ${lineObj[2]} - COR(ES): ${lineObj[3]}\n`;
                break;
            default:
                linesFinalMessage += `\nSKU: ${lineObj[0]} - NOME: ${lineObj[1]} - MODELO: ${lineObj[2]}\n`;
                break;
        }
    }
    return linesFinalMessage;
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
	finalMessage.innerHTML = `${greetingCheck()}\n${qtdProductsSolic()}\n${convertTextArea()}\n${checkBoxes()}\nSe tiverem, podem nos enviar também as informações de INMETRO do produto.\nAgradeço!\n\nAtt,`
});

//Função do botão Copiar Conteúdo para área de transferência
copyClipboardBtn.addEventListener('click', () => {
    let copyMsg = document.querySelector("#fnl-mssg")
    copyMsg.select()
    navigator.clipboard.writeText(copyMsg.value.toString())
    alert("Conteúdo da mensagem copiado!")
})
