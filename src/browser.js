const rows = 15;
const cols = 15;
const minesCount = 30;
const mines = [];

const plantMines = () => {
  for(let i = 0; i < minesCount; i+= 1) {
    let mineRow = Math.floor(Math.random() * rows);
    let mineCol = Math.floor(Math.random() * cols);
    mines.push([mineRow, mineCol]);
  }
  console.log(`mines in ${mines}`);
}

const countNeighborsMine = (row, col) => {
   let count = 0;
   if (hasMine(row-1, col-1)) { count += 1; }
   if (hasMine(row-1, col)) { count += 1; }
   if (hasMine(row-1, col+1)) { count += 1; }

   if (hasMine(row, col-1)) { count += 1; }
   if (hasMine(row, col+1)) { count += 1; }

   if (hasMine(row+1, col-1)) { count += 1; }
   if (hasMine(row+1, col)) { count += 1; }
   if (hasMine(row+1, col+1)) { count += 1; }

   return count;
}

const hasMine = (row, col) => {
  let mine = false;
  mines.forEach((m)=>{
    if(m[0] === row && m[1] === col) { mine = true}
  });
  return mine;
}

const openTile = (tile) => {
  let tileRow = tile.parentElement.rowIndex;
  let tileCol = tile.cellIndex;
  console.log(`clicked in row:${tileRow} col:${tileCol}`);

  tile.classList.remove('unopened');

  if(hasMine(tileRow, tileCol)) {
    tile.classList.add('mine');
  } else {
    let count = countNeighborsMine(tileRow, tileCol);
    if (count === 0) {
      tile.classList.add('opened');
    } else {
      tile.classList.add(`mine-neighbour-${count}`);
    }
  }

}

const grid = () => {
  const table = document.createElement('table');
  table.setAttribute('id', 'minesweeper');

  for(let i = 0; i < rows; i+= 1) {
    const row = document.createElement('tr');

    for(let i = 0; i < rows; i+= 1) {
      const col = document.createElement('td');
      col.classList.add('unopened');

      col.addEventListener('click', (event) =>{
        openTile(event.currentTarget);
      })

      row.appendChild(col);
    }

    table.appendChild(row);
  }

  return table;
}

plantMines();
const game = document.getElementById('game');
game.appendChild(grid());




