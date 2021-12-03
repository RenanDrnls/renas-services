let date = new Date
let currentHour = date.getHours()
let numbersOS = document.querySelector('#os-numbers')
let finalMessage = document.querySelector('#final-message')
let generateMessage = document.querySelector('#generate-message')
let advancedPost = document.querySelector('#advanced-posts')
let copyClipboardBtn = document.querySelector("#copy-clipboard")


function greetTimes(){
    if(currentHour > 6 && currentHour < 12){
        return "Bom dia! Tudo bem?"
    } else if(currentHour > 12 && currentHour < 18){
        return "Boa tarde! Tudo bem?"
    } else {
        return "Boa noite! Tudo bem?"
    }
}

let countOS = 0
function listenOS(){
	let numbersOfOS = ""
	let OSvalues = numbersOS.value
	let OSarr = OSvalues.split(",")
	for(let i = 0; i < OSarr.length; i++){
		if(i == OSarr.length - 1){
			numbersOfOS += ` ${OSarr[i]}.`
		} else {
			numbersOfOS += ` ${OSarr[i]},`
		}
		countOS = i
	}
	return numbersOfOS
}

generateMessage.addEventListener('click', () =>{
	if(countOS == 0){
		finalMessage.innerHTML = `${greetTimes()}\n\nEntro em contato para solicitar as Notas Fiscais da seguinte O.S. para lançamento de despesas internas:${listenOS()}\n\nAtt,`
	} else {
		finalMessage.innerHTML = `${greetTimes()}\n\nEntro em contato para solicitar as Notas Fiscais das seguintes O.S. para lançamento de despesas internas:${numbersOfOS}\n\nAtt,`
	}
})

copyClipboardBtn.addEventListener('click', () => {
    finalMessage.select()
    navigator.clipboard.writeText(finalMessage.value.toString())
    alert("Conteúdo da mensagem copiado!")
})