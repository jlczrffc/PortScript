let archive = process.argv[2]

var fs = require('fs');

fs.readFile(archive, 'utf-8', function(err, data){
	let commands = ''
	let command = ''
	let result = ''
	let partial = ''
	let seek = 0
	try{
		commands = data.split(/\n?\s/)
		commands.forEach(function(command){
			while(command.length > 0 ){
				if (command.match(/\b(para)\b/i)){
					partial = command.substring(0,command.indexOf('para'))
					partial = partial + command.substring(command.indexOf('para')+4,command.length)
					command = partial
					result = result + 'for'
				}else if (command.match(/\b(permita)\b/i)){
					partial = command.substring(0,command.indexOf('permita'))
					partial = partial + command.substring(command.indexOf('permita')+7,command.length)
					command = partial
					result = result + 'let '  
				}else if (command.match(/\b(variavel)\b/i)){
					partial = command.substring(0,command.indexOf('variavel'))
					partial = partial + command.substring(command.indexOf('variavel')+7,command.length)
					command = partial
					result = result + 'var '  
				}else if (command.match(/\b(se)\b/i)){
					partial = command.substring(0,command.indexOf('se'))
					partial = partial + command.substring(command.indexOf('se')+2,command.length)
					command = partial
					result = result + 'if'  
				}else if (command.match(/\b(constante)\b/i)){
					partial = command.substring(0,command.indexOf('constante'))
					partial = partial + command.substring(command.indexOf('constante')+9,command.length)
					command = partial
					result = result + 'const '  
				}else if (command.match(/\b(imprima)\b/i)){
					partial = command.substring(0,command.indexOf('imprima'))
					partial = partial + command.substring(command.indexOf('imprima')+7,command.length)
					command = partial
					result = result + 'console.log'  
				}else if (command.match(/\b(verdadeiro)\b/i)){
					partial = command.substring(0,command.indexOf('verdadeiro'))
					partial = partial + command.substring(command.indexOf('verdadeiro')+10,command.length)
					command = partial
					result = result + 'true'  
				}else if (command.match(/\b(falso)\b/i)){
					partial = command.substring(0,command.indexOf('falso'))
					partial = partial + command.substring(command.indexOf('falso')+5,command.length)
					command = partial
					result = result + 'false'
				}else if (command.match(/\b(enquanto)\b/i)){
					if (command.match(/([}])/)){
						partial = command.substring(0,command.indexOf('}enquanto'))
						partial = partial + command.substring(command.indexOf('}enquanto')+9,command.length)
						command = partial
						result = result + '}while'
					}else{
						partial = command.substring(0,command.indexOf('enquanto'))
						partial = partial + command.substring(command.indexOf('enquanto')+8,command.length)
						command = partial
						result = result + 'while'
					}  
				}else if (command.match(/\b(faca)\b/i)){
					partial = command.substring(0,command.indexOf('faca'))
					partial = partial + command.substring(command.indexOf('faca')+4,command.length)
					command = partial
					result = result + 'do'  
				}else if (command.match(/\b(funcao)\b/i)){
					partial = command.substring(0,command.indexOf('funcao'))
					partial = partial + command.substring(command.indexOf('funcao')+6,command.length)
					command = partial
					result = result + 'function '  
				}else if (command.match(/([0-9]+)/)){
					result = result + command
					command = ''  
				}else if (command.match(/([a-z]+)/)){
					result = result + command + ' '
					command = ''  
				}else if (command.match(/[/'"+-{}()*&#@%]/)){
					result = result + command
					command = '' 
				}else if (command.match(/\s/)){
					command = ''
					result = result + command 
	
				}
			}
		})
		
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
		}
		
		console.log(result)
		eval(result);
	}catch(e){
		console.log("Erro: " + e)
	}
})
