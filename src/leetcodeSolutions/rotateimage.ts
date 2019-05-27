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
  // let temp: number;
  const squareSize: number = arrayToRotate[0].length;
  // tslint:disable-next-line: no-console
  console.log(`squareSize ${squareSize}`);
  let toRowCol = {} as RowCol;
  let fromRowCol = {} as RowCol;
  for (let row = 0; row < squareSize; row++) {
    for (let col = 0; col < squareSize; col++) {
      toRowCol = { row: col, col: squareSize - 1 - row };
      fromRowCol = { row: squareSize - 1 - col, col: row };
      // tslint:disable-next-line: no-console
      console.log(
        `arrayToRotate[row=${row}][col=${col}]=${arrayToRotate[row][col]} : 
        to   ${toRowCol.row} ${toRowCol.col} value ${arrayToRotate[toRowCol.row][toRowCol.col]} 
        from ${fromRowCol.row} ${fromRowCol.col} value ${arrayToRotate[fromRowCol.row][fromRowCol.col]}`
      );
    }
  }

  return JSON.stringify(arrayToRotate);
};
