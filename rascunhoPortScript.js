	let archive = process.argv[2]
let option = process.argv[3]

var fs = require('fs');

fs.readFile(archive, 'utf-8', function(err, data){
	let commands = ''
	let result = ''
	let seek = 0
	try{
		commands = data.split(/\n/)
		commands.forEach(function(command){
			while(command.length > 0 ){
				command = command.replace(/\b(para)\b/,'for') 
				command = command.replace(/\b(permita)\b/,'let')
				command = command.replace(/\b(variavel)\b/,'var')
				command = command.replace(/\b(se)\b/,'if')
				command = command.replace(/\b(constante)\b/,'const')
				command = command.replace(/\b(imprima)\b/,'console.log')
				command = command.replace(/\b(verdadeiro)\b/,'true')
				command = command.replace(/\b(falso)\b/,'false')
				command = command.replace(/\b(enquanto)\b/,'while')
				command = command.replace(/\b(faca)\b/,'do')
				command = command.replace(/\b(funcao)\b/,'function')
				command = command.replace(/\b(troque)\b/,'switch')
				command = command.replace(/\b(caso)\b/,'case')
				command = command.replace(/\b(saia)\b/,'break')
				command = command.replace(/\b(predefina)\b/,'default')
				command = command.replace(/\b(paraCada)\b/,'forEach')
				command = command.replace(/\b(retorne)\b/,'return')
				command = command.replace(/\b(fragmento)\b/,'substring')
				result = result + command
				command = '' 
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
				if(result.substring(l,l+3) === 'log'){
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
