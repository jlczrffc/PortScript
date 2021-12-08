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
			while(command.length > 0){
				while(command.indexOf('paraCada') > -1){
					command = command.replace(/\b(paraCada)\b/,'forEach')
				}
				while(command.indexOf('para') > -1){
					command = command.replace(/\b(para)\b/,'for')
				}
				while(command.indexOf('permita') > -1){
					command = command.replace(/\b(permita)\b/,'let')
				}
				while(command.indexOf('variavel') > -1){
					command = command.replace(/\b(variavel)\b/,'var')
				}
				while(command.indexOf('se') > -1){
					command = command.replace(/\b(se)\b/,'if')
				}
				while(command.indexOf('senao') > -1){
					command = command.replace(/\b(senao)\b/,'else')
				}
				while(command.indexOf('constante') > -1){
					command = command.replace(/\b(constante)\b/,'const')
				}
				while(command.indexOf('imprima') > -1){
					command = command.replace(/\b(imprima)\b/,'console.log')
				}
				while(command.indexOf('verdadeiro') > -1){
					command = command.replace(/\b(verdadeiro)\b/,'true')
				}
				while(command.indexOf('falso') > -1){
					command = command.replace(/\b(falso)\b/,'false')
				}
				while(command.indexOf('enquanto') > -1){
					command = command.replace(/\b(enquanto)\b/,'while')
				}
				while(command.indexOf('faca') > -1){
					command = command.replace(/\b(faca)\b/,'do')
				}
				while(command.indexOf('funcao') > -1){
					command = command.replace(/\b(funcao)\b/,'function')
				}
				while(command.indexOf('troque') > -1){
					command = command.replace(/\b(troque)\b/,'switch')
				}
				while(command.indexOf('caso') > -1){
					command = command.replace(/\b(caso)\b/,'case')
				}
				while(command.indexOf('saia') > -1){
					command = command.replace(/\b(saia)\b/,'break')
				}
				while(command.indexOf('predefina') > -1){
					command = command.replace(/\b(predefina)\b/,'default')
				}
				while(command.indexOf('retorne') > -1){
					command = command.replace(/\b(retorne)\b/,'return')
				}
				while(command.indexOf('fragmento') > -1){
					command = command.replace(/\b(fragmento)\b/,'substring')
				}
				while(command.indexOf('avalie') > -1){
					command = command.replace(/\b(avalie)\b/,'eval ')
				}
				while(command.indexOf('tente') > -1){
					command = command.replace(/\b(tente)\b/,'try')
				}	
				while(command.indexOf('pegue') > -1){
					command = command.replace(/\b(pegue)\b/,'catch')				
				}
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
