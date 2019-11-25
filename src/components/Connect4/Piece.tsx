import React, { FC, memo } from "react";
import styled, { keyframes } from "styled-components";
interface PieceProps {
  value?: "X" | "O";
  color?: "red" | "yellow";
  drop?: number | undefined;
}

const dropKeyframes = (props: PieceProps) => keyframes`
    from {
      transform: translateY(
        -${props.drop}px
      );
    }
    to {
      transform: translateY(0);
    }
`;

const StyledSVGPiece = styled.svg<PieceProps>`
  animation: ${dropKeyframes} 0.5s;
`;

export const ThisPiece: FC<PieceProps> = ({ value, color, drop }) => {
  console.log("Piece ", drop, color, value);
  return (
    <StyledSVGPiece height="30" width="30" drop={drop || 0}>
      <circle
        cx="15"
        cy="15"
        r="12"
        fill={color}
        stroke="black"
        strokeWidth="2"
        alignmentBaseline="middle"
      />
      <text x="15" y="22" fill="black" textAnchor="middle" fontSize="75%">
        {value}
      </text>
    </StyledSVGPiece>
  );
};

export const Piece: FC<PieceProps> = memo(({ value, color, drop }) => (
  <ThisPiece value={value} color={color} drop={drop} />
));
