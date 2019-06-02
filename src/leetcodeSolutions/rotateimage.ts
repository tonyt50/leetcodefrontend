import { RowCol } from "../types";

/**
 * rotate image, this is a array rotate 90 degrees.
 * @param arrayToRotate array to rotate
 * @returns array rotated by 90 degrees
 * @example
 *  rotateimage([[1,2,3], [4,5,6], [7,8,9]]) returns ([[7,4,1], [8,5,2], [9,6,3]])
 */
export function rotateImage<T>(arrayToRotate: T[][]) {
  let maxSquareIndex: number = arrayToRotate[0].length - 1;
  const depthSquareIndex: number = Math.floor(arrayToRotate[0].length / 2);
  let startRowCol: RowCol;
  let toRowCol: RowCol;
  let currentRowCol: RowCol;
  let saveItem: T;
  let itemToMove: T;

  for (let j = 0; j < depthSquareIndex; j++) {
    startRowCol = { row: j, col: j };
    for (let i = 0; i < maxSquareIndex; i++) {
      currentRowCol = { row: startRowCol.row, col: startRowCol.col };
      itemToMove = arrayToRotate[maxSquareIndex - currentRowCol.col + 2 * j][currentRowCol.row];
      toRowCol = { row: currentRowCol.col + 2 * j, col: maxSquareIndex - currentRowCol.row };
      while (!(toRowCol.row === startRowCol.row && toRowCol.col === startRowCol.col)) {
        saveItem = arrayToRotate[currentRowCol.row][currentRowCol.col];
        arrayToRotate[currentRowCol.row][currentRowCol.col] = itemToMove;
        itemToMove = saveItem;
        toRowCol = { row: currentRowCol.col, col: maxSquareIndex - currentRowCol.row + 2 * j };
        currentRowCol = { row: toRowCol.row, col: toRowCol.col };
      }
      startRowCol = { row: toRowCol.row, col: toRowCol.col + 1 };
    }
    maxSquareIndex = maxSquareIndex - 2;
  }

  return arrayToRotate;
}
