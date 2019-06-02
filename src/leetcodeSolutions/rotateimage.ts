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
  let maxSquareIndex: number = arrayToRotate[0].length;
  const depthSquareIndex: number = Math.floor(maxSquareIndex / 2);
  // tslint:disable-next-line: no-console
  console.log(`maxSquareIndex ${maxSquareIndex}`);
  // tslint:disable-next-line: no-console
  console.log(`depthSquareIndex ${depthSquareIndex}`);
  let startRowCol = {} as RowCol;
  let toRowCol = {} as RowCol;
  let currentRowCol = {} as RowCol;
  let saveItem: number;
  let itemToMove: number;

  for (let j = 0; j < depthSquareIndex; j++) {
    startRowCol = { row: j, col: j };
    maxSquareIndex = maxSquareIndex - 1;
    for (let i = 0; i < maxSquareIndex; i++) {
      currentRowCol = { row: startRowCol.row, col: startRowCol.col };
      itemToMove = arrayToRotate[maxSquareIndex + j - currentRowCol.col + j][currentRowCol.row];
      toRowCol = { row: currentRowCol.col + j + j, col: maxSquareIndex - currentRowCol.row };
      while (!(toRowCol.row === startRowCol.row && toRowCol.col === startRowCol.col)) {
        saveItem = arrayToRotate[currentRowCol.row][currentRowCol.col];
        arrayToRotate[currentRowCol.row][currentRowCol.col] = itemToMove;
        itemToMove = saveItem;
        toRowCol = { row: currentRowCol.col, col: maxSquareIndex + j - currentRowCol.row + j };
        currentRowCol = { row: toRowCol.row, col: toRowCol.col };
      }
      startRowCol = { row: toRowCol.row, col: toRowCol.col + 1 };
    }
    maxSquareIndex = maxSquareIndex - 1;
  }

  return JSON.stringify(arrayToRotate);
};
