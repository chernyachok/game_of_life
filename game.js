const Grid = require('./grid')
//console.log(new Grid(36));

class Game {
  constructor(gridSize) {
    this.grid = new Grid(gridSize)
  }

  play(){
    return this.grid.compute().render()
  }

}

module.exports = Game;
