	let archive = process.argv[2]
let option = process.argv[3]

var fs = require('fs');

fs.readFile(archive, 'utf-8', function(err, data){
	let commands = ''
	let command = ''
	let result = ''
	let partial = ''
	let seek = 0
	try{
		commands = data.split(/\n/)
		commands.forEach(function(command){
			while(command.length > 0 ){
				command = command.replace(/\b(para)\b/i,'for') 
				command = command.replace(/\b(permita)\b/i,'let')
				command = command.replace(/\b(variavel)\b/i,'var')
				command = command.replace(/\b(se)\b/i,'if')
				command = command.replace(/\b(constante)\b/i,'const')
				command = command.replace(/\b(imprima)\b/i,'console.log')
				command = command.replace(/\b(verdadeiro)\b/i,'true')
				command = command.replace(/\b(falso)\b/i,'false')
				command = command.replace(/\b(enquanto)\b/i,'while')
				command = command.replace(/\b(faca)\b/i,'do')
				command = command.replace(/\b(funcao)\b/i,'function')
				command = command.replace(/\b(troque)\b/i,'switch')
				command = command.replace(/\b(caso)\b/i,'case')
				command = command.replace(/\b(saia)\b/i,'break')
				command = command.replace(/\b(predefina)\b/i,'default')
				command = command.replace(/\b(paraCada)\b/i,'forEach')
				command = command.replace(/\b(retorne)\b/i,'return')				
				if (command.match(/([a-z]+)/)){
					result = result + command
					command = ''  
				}else if (command.match(/([0-9]+)/)){
					result = result + command
					command = ''  
				}else if (command.match(/[/'"+-{}()*&#@%;]/)){
					result = result + command
					command = '' 
				}
			}
		})
		if (option === '-code'){ 
			for(let l = 0; l < result.length; l++){
				let letter = result.substring(l,l+1)
				if(result.substring(l,l+3) === 'for'){
					while(seek < 2){
						if(result.substring(l,l+1) !== ')'){
							l++
						}else{
							seek++
						}
					}
					seek = 0
				}
				if (letter === '{'){
					result=result.substring(0,l) + '{\n' +result.substring(l+1,result.length)
				}
				if (letter === ';'){
					result=result.substring(0,l) + ';\n' +result.substring(l+1,result.length)
				}
				if (letter === '}'){
					result=result.substring(0,l-1) + '\n' +result.substring(l,result.length)
				}
			}
			console.log(result)
		}
		eval(result);
	}catch(e){
		console.log("Erro: " + e)
	}
})
