import React, { FC } from "react";
import styled, { css, keyframes } from "styled-components";
interface PieceProps {
  value?: "X" | "O";
  color?: "red" | "yellow";
  className?: "" | "counter" | "pieceAnimDrop";
}
export const PieceDrop = keyframes`
  from {transform: translateY(-70px)}
  to {transform: translateY(0)}
`;
// lets try using just styled components
export const CircleWithTextStyled: FC<PieceProps> = ({ value, color }) => {
  return (
    <StyledSVG>
      <circle
        cx="15"
        cy="15"
        r="12"
        fill={color}
        stroke="black"
        alignmentBaseline="middle"
      />
      <text x="15" y="22" fill="black" textAnchor="middle" fontSize="75%">
        {value}
      </text>
    </StyledSVG>
  );
};

const StyledSVG = styled.svg`
  animation: ${PieceDrop} 0.5s;
  height: "30";
  width: "30";
  stroke-width: "3";
`;

// below tried functional components, closes using style
// see CircleWithText below v3 to v4 says need css helper cant work it out yet!
export const PieceAnim = css`
  animation: ${PieceDrop};
  animation-duration: 0.5s;
`;

// export const PieceAnimDrop: FC = () => {
//   return <span>animation: ${PieceDrop}; animation-duration: 0.5s;</span>;
// };
const CircleBase: FC = () => {
  return (
    <circle cx="15" cy="15" r="12" stroke="black" alignment-baseline="middle" />
  );
};
const TextBase: FC<PieceProps> = ({ value }) => {
  return (
    <text x="15" y="22" fill="black" textAnchor="middle" fontSize="75%">
      {value}
    </text>
  );
};
const CircleWithText: FC<PieceProps> = ({ value }) => {
  return (
    <g>
      <CircleBase />
      <TextBase value={value} />
      {/* animation: ${PieceDrop};
      animation-duration: 0.5s; */}
      {/* style=
      {{
        // animation: `${PieceDrop}; animation-duration: 0.5s;`
      }} */}
      {/* PieceAnim */}
    </g>
  );
};
const CircleWithTextSVG: FC<PieceProps> = ({ value, color }) => {
  return (
    <svg height="30" width="30" fill={color} stroke-width="3">
      <CircleWithText value={value} />
    </svg>
  );
};

const Piece: FC<PieceProps> = ({ value, color, className = "" }) => {
  return (
    <svg
      className={className}
      height="30"
      width="30"
      fill={color}
      stroke-width="3"
    >
      <circle
        cx="15"
        cy="15"
        r="12"
        stroke="black"
        alignment-baseline="middle"
      />
      <text x="15" y="22" fill="black" textAnchor="middle" fontSize="75%">
        {value}
      </text>
    </svg>
  );
};

export const XPiece: FC = () => <Piece value="X" color="red" />;
export const OPiece: FC = () => <Piece value="O" color="yellow" />;
export const XPieceAnimDrop: FC = () => (
  <Piece value="X" color="red" className="pieceAnimDrop" />
);
export const OPieceAnimDrop: FC = () => (
  <Piece value="O" color="yellow" className="pieceAnimDrop" />
);

export const XPieceTest: FC = () => <CircleWithTextSVG value="X" color="red" />;
export const OPieceTest: FC = () => (
  <CircleWithTextSVG value="O" color="yellow" />
);

export const XPieceTest1: FC = () => (
  <CircleWithTextStyled value="X" color="red" />
);

export default Piece;
