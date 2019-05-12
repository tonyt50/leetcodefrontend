/**
 * rotate image, this is a array rotate 90 degrees.
 * @param json array to rotate
 * @returns json arroy rotated by 90 degrees
 * @example
 *  rotateimage("[[1,2,3], [4,5,6], [7,8,9]]") returns ("[[7,4,1], [8,5,2], [9,6,3]]")
 */
export const rotateImage = (str: string) => {
  const origImage = JSON.parse(str) as number[][];
  let temp: number;

  for (let col = 0; col < origImage[0].length; col++) {
    for (let row = origImage.length - 1; row >= 0; row--) {
      temp = origImage[row][col];
      origImage[row][col] = origImage[col][row];
      origImage[col][row] = temp;
    }
  }
  const result = origImage;

  return JSON.stringify(result);
}
