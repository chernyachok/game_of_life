const Cell = require ('./cell')

class Grid {
  constructor(size) {
    this.size = size;
    this.init()
  }
  init(){
     this.cells = []

     for(let r = 0; r< this.size; r++){
       this.cells[r] = []

       for(let c = 0; c< this.size; c++){
           let isAlive = Math.random() < .5//random boolean

           this.cells[r][c] = new Cell(r,c , isAlive);
       }
     }    // console.log(this.cells);
  }
  getSummary(){
    return this.cells
  }
  isNeighborAlive(row, col){
    if(!this.cells[row] || !this.cells[col]) return false

    let cell = this.cells[row][col]
    return cell && cell.isAlive
  }

  countNeighbors(cell){//get the coordinates
    let count = 0;
    let row = cell.row//getter
    let col = cell.col//getter
    if(this.isNeighborAlive(row - 1, col - 1)) count+= 1;
    if(this.isNeighborAlive(row - 1, col)) count+=1
    if(this.isNeighborAlive(row - 1, col + 1)) count+=1
    if(this.isNeighborAlive(row, col + 1)) count+=1;
    if(this.isNeighborAlive(row + 1, col + 1)) count+=1
    if(this.isNeighborAlive(row + 1, col)) count+=1;
    if(this.isNeighborAlive(row + 1, col - 1)) count +=1
    if(this.isNeighborAlive(row, col - 1)) count+=1

    return count
  }

  compute(){
    let nextGrid = new Grid(this.size)
    //console.log(this.cells);
    for(let r =0; r<nextGrid.size; r++){
      for(let c = 0; c< nextGrid.size; c++){
        let cell = this.cells[r][c]//cell live or died == new Cell()
        let nextCell = nextGrid.cells[r][c];
        let numNeighbors = this.countNeighbors(cell);

        if(cell.isAlive){// live cell events
          if(numNeighbors <2){
            nextCell.die()
          }else if (numNeighbors == 2 || numNeighbors ==3) {
            nextCell.live();
          }else if (numNeighbors > 3) {
            nextCell.die()
          }
        }else {// for cell that isnt live
          if(numNeighbors == 3){
            nextCell.live()//cell becomes alive
          }
        }


      }
    }
    this.cells = nextGrid.cells;
    return this
  }

  render(){
    let output = ''
    for(let i=0; i< this.size; i++){
      for(let j= 0; j<this.size; j++){
        let cell = this.cells[i][j]
        if(cell.isAlive){
          output += '⬜'
        }else {
          output+= ' '
        }
        if(cell.col == this.size -1){
          output+= '\r\n'
        }
      }
    }
    return output
  }

}

module.exports = Grid;
