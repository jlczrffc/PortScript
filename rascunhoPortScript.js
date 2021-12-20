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
				while(command.indexOf('paraCada') > -1){
					command = command.replace(/paraCada/,'forEach')
				}
				while(command.indexOf('para') > -1){
					command = command.replace(/para/,'for')
				}
				while(command.indexOf('permita') > -1){
					command = command.replace(/permita/,'let')
				}
				while(command.indexOf('variavel') > -1){
					command = command.replace(/variavel/,'var')
				}
				while(command.indexOf('se') > -1){
					command = command.replace(/se/,'if')
				}
				while(command.indexOf('doContrario') > -1){
					command = command.replace(/doContrario/,'else')
				}
				while(command.indexOf('definaTempoFinal') > -1){
					command = command.replace(/definaTempoFinal/,'setTimeout')
				}
				while(command.indexOf('constante') > -1){
					command = command.replace(/constante/,'const')
				}
				while(command.indexOf('imprima') > -1){
					command = command.replace(/imprima/,'console.log')
				}
				while(command.indexOf('limpe') > -1){
					command = command.replace(/limpe/,'console.clear')
				}
				while(command.indexOf('verdadeiro') > -1){
					command = command.replace(/verdadeiro/,'true')
				}
				while(command.indexOf('falso') > -1){
					command = command.replace(/falso/,'false')
				}
				while(command.indexOf('enquanto') > -1){
					command = command.replace(/enquanto/,'while')
				}
				while(command.indexOf('faca') > -1){
					command = command.replace(/faca/,'do')
				}
				while(command.indexOf('funcao') > -1){
					command = command.replace(/funcao/,'function')
				}
				while(command.indexOf('troque') > -1){
					command = command.replace(/troque/,'switch')
				}
				while(command.indexOf('caso') > -1){
					command = command.replace(/caso/,'case')
				}
				while(command.indexOf('saia') > -1){
					command = command.replace(/saia/,'break')
				}
				while(command.indexOf('predefina') > -1){
					command = command.replace(/predefina/,'default')
				}
				while(command.indexOf('retorne') > -1){
					command = command.replace(/retorne/,'return')
				}
				while(command.indexOf('fragmente') > -1){
					command = command.replace(/fragmente/,'substring')
				}
				while(command.indexOf('avalie') > -1){
					command = command.replace(/avalie/,'eval ')
				}
				while(command.indexOf('tente') > -1){
					command = command.replace(/tente/,'try')
				}
				while(command.indexOf('pegue') > -1){
					command = command.replace(/pegue/,'catch')				
				}
				while(command.indexOf('aguarde') > -1){
					command = command.replace(/aguarde/,'await ')				
				}
				while(command.indexOf('nova') > -1){
					command = command.replace(/nova/,'new ')				
				}
				while(command.indexOf('assincrona') > -1){
					command = command.replace(/assincrona/,'async ')				
				}
				while(command.indexOf('Promessa') > -1){
					command = command.replace(/Promessa/,'Promise')				
				}
				result = result + command + '\n'
		})
		if (option === '-code'){ 
			console.log(result)
		}
		eval(result);
	}catch(e){
		console.log("Erro: " + e)
	}
})
