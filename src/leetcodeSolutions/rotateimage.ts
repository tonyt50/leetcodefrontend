import { RowCol } from "../types";

/**
 * rotate image, this is a array rotate 90 degrees.
 * @param json array to rotate
 * @returns json array rotated by 90 degrees
 * @example
 *  rotateimage("[[1,2,3], [4,5,6], [7,8,9]]") returns ("[[7,4,1], [8,5,2], [9,6,3]]")
 */
export const rotateImage = (str: string) => {
  const arrayToRotate = JSON.parse(str) as number[][];
  const maxSquareIndex: number = arrayToRotate[0].length - 1;
  // tslint:disable-next-line: no-console
  console.log(`maxSquareIndex ${maxSquareIndex}`);
  let toRowCol = {} as RowCol;
  let fromRowCol = {} as RowCol;
  for (let row = 0; maxSquareIndex >= row; row++) {
    for (let col = 0; maxSquareIndex >= col; col++) {
      toRowCol = { row: col, col: maxSquareIndex - row };
      fromRowCol = { row: maxSquareIndex - col, col: row };
      // tslint:disable-next-line: no-console
      console.log(
        `arrayToRotate[row=${row}][col=${col}]=${arrayToRotate[row][col]} : 
        to   ${toRowCol.row} ${toRowCol.col} value ${arrayToRotate[toRowCol.row][toRowCol.col]} 
        from ${fromRowCol.row} ${fromRowCol.col} value ${arrayToRotate[fromRowCol.row][fromRowCol.col]}`
      );
    }
  }
  let startRowCol = { row: 0, col: 0 } as RowCol;
  let saveItem: number;
  for (let i = 0; i < maxSquareIndex; i++) {
    let currentRowCol = { row: startRowCol.row, col: startRowCol.col } as RowCol;
    let itemToMove = arrayToRotate[maxSquareIndex - currentRowCol.col][currentRowCol.row];
    toRowCol = { row: currentRowCol.col, col: maxSquareIndex - currentRowCol.row } as RowCol;
    while (!(toRowCol.row === startRowCol.row && toRowCol.col === startRowCol.col)) {
      toRowCol = { row: currentRowCol.col, col: maxSquareIndex - currentRowCol.row };
      saveItem = arrayToRotate[currentRowCol.row][currentRowCol.col];
      arrayToRotate[currentRowCol.row][currentRowCol.col] = itemToMove;
      itemToMove = saveItem;
      currentRowCol = { row: toRowCol.row, col: toRowCol.col };
    }
    startRowCol = { row: toRowCol.row, col: toRowCol.col + 1 };
  }

  return JSON.stringify(arrayToRotate);
};
