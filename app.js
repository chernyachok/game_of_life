const readline = require('readline');
const Game = require('./game')

const [speed =1000 , size= 36 ] = process.argv.slice(2)
let game = new Game(size)

//setInterval(()=>{
  let output = game.play()
  readline.cursorTo(process.stdout, 0, 1)
  readline.clearScreenDown(process.stdout)

  process.stdout.write(output)

//},speed)
//console.log(output);
