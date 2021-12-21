let archive = process.argv[2]
let option = process.argv[3]
let saveFile = process.argv[4]

var fs = require('fs');

fs.readFile(archive, 'utf-8', function(err, data){
    let allComm = [
        ['paraCada','forEach'],
        ['para','for'],
        ['permita','let'],
        ['variavel','var'],
        ['se','if'],
        ['doContrario','else'],
        ['definaTempoFinal','setTimeout'],
        ['constante','const'],
        ['imprima','console.log'],
        ['limpe','console.clear'],
        ['verdadeiro','true'],
        ['falso','false'],
        ['enquanto','while'],
        ['faca','do'],
        ['funcao','function'],
        ['troque','switch'],
        ['caso','case'],
        ['saia','break'],
        ['predefina','default'],
        ['retorne','return'],
        ['fragmente','substring'],
        ['avalie','eval '],
        ['tente','try'],
        ['pegue','catch'],
        ['aguarde','await '],
        ['nova','new '],
        ['assincrona','async '],
        ['Promessa','Promise ']
    ]		

    let commands = ''
	let result = ''

    try{
		commands = data.split(/\n/)
		commands.forEach(function(command){
            allComm.forEach(function(repl){
                //command = command.replaceAll(repl[0],repl[1])
                while(command.indexOf(repl[0]) > -1){
                    command = command.replace(repl[0],repl[1])
                }
                
            })
            result = result + command + '\n'
		})
		if (option === '-code'){ 
			console.log(result)
		}
		if (option === '-save'){
			saveFile = saveFile + '.js' 
			fs.writeFileSync(saveFile, result)
		}
		eval(result);
	}catch(e){
		console.log("Erro: " + e)
	}
})
