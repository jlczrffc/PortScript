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
				if (command.match(/\b(para)\b/i)){
					partial = command.substring(0,command.indexOf('para'))
					partial = partial + 'for' + command.substring(command.indexOf('para')+4,command.length)
					command = partial
				} if (command.match(/\b(permita)\b/i)){
					partial = command.substring(0,command.indexOf('permita'))
					partial = partial + 'let ' + command.substring(command.indexOf('permita')+7,command.length)
					command = partial
				} if (command.match(/\b(variavel)\b/i)){
					partial = command.substring(0,command.indexOf('variavel'))
					partial = partial + 'var ' + command.substring(command.indexOf('variavel')+8,command.length)
					command = partial
				} if (command.match(/\b(se)\b/i)){
					partial = command.substring(0,command.indexOf('se'))
					partial = partial + 'if' + command.substring(command.indexOf('se')+2,command.length)
					command = partial
				} if (command.match(/\b(constante)\b/i)){
					partial = command.substring(0,command.indexOf('constante'))
					partial = partial + 'const ' + command.substring(command.indexOf('constante')+9,command.length)
					command = partial
				} if (command.match(/\b(imprima)\b/i)){
					partial = command.substring(0,command.indexOf('imprima'))
					partial = partial + 'console.log' + command.substring(command.indexOf('imprima')+7,command.length)
					command = partial
				} if (command.match(/\b(verdadeiro)\b/i)){
					partial = command.substring(0,command.indexOf('verdadeiro'))
					partial = partial + 'true' + command.substring(command.indexOf('verdadeiro')+10,command.length)
					command = partial
					console.log('#############################' + command +'#######################')
				} if (command.match(/\b(falso)\b/i)){
					partial = command.substring(0,command.indexOf('falso'))
					partial = partial + 'false' + command.substring(command.indexOf('falso')+5,command.length)
					command = partial
				} if (command.match(/\b(enquanto)\b/i)){
					if (command.match(/([}])/)){
						partial = command.substring(0,command.indexOf('}enquanto'))
						partial = partial + '}while' + command.substring(command.indexOf('}enquanto')+9,command.length)
						command = partial
					}else{
						partial = command.substring(0,command.indexOf('enquanto'))
						partial = partial + 'while' + command.substring(command.indexOf('enquanto')+8,command.length)
						command = partial
					}  
				} if (command.match(/\b(faca)\b/i)){
					partial = command.substring(0,command.indexOf('faca'))
					partial = partial + 'do' + command.substring(command.indexOf('faca')+4,command.length)
					command = partial
				} if (command.match(/\b(funcao)\b/i)){
					partial = command.substring(0,command.indexOf('funcao'))
					partial = partial + 'function ' + command.substring(command.indexOf('funcao')+6,command.length)
					command = partial
				} if (command.match(/\b(retorne)\b/i)){
					partial = command.substring(0,command.indexOf('retorne'))
					partial = partial + 'return ' + command.substring(command.indexOf('retorne')+7,command.length)
					command = partial
				} if (command.match(/\b(troque)\b/i)){
					partial = command.substring(0,command.indexOf('troque'))
					partial = partial + 'switch' + command.substring(command.indexOf('troque')+6,command.length)
					command = partial
				} if (command.match(/\b(caso)\b/i)){
					partial = command.substring(0,command.indexOf('caso'))
					partial = partial + 'case' + command.substring(command.indexOf('caso')+4,command.length)
					command = partial
				} if (command.match(/\b(saia)\b/i)){
					partial = command.substring(0,command.indexOf('saia'))
					partial = partial + 'break' + command.substring(command.indexOf('saia')+4,command.length)
					command = partial
				} if (command.match(/\b(predefina)\b/i)){
					partial = command.substring(0,command.indexOf('predefina'))
					partial = partial + 'default' + command.substring(command.indexOf('predefina')+9,command.length)
					command = partial
				} if (command.match(/\b(paraCada)\b/i)){
					partial = command.substring(0,command.indexOf('paraCada'))
					partial = partial + 'forEach' + command.substring(command.indexOf('paraCada')+8,command.length)
					command = partial
				}
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
					console.log('******************* '+ l)
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
