import React, { FC } from "react";
import styled, { keyframes } from "styled-components";
interface PieceProps {
  value?: "X" | "O";
  color?: "red" | "yellow";
  drop?: number | undefined;
}

// use a functional component, that has a styled component wrapping
export const Piece: FC<PieceProps> = ({ value, color, drop }) => {
  console.log("Piece ", drop);
  return (
    <StyledSVG height="30" width="30" drop={drop || 0}>
      <circle
        cx="15"
        cy="15"
        r="12"
        fill={color}
        stroke="black"
        stroke-width="2"
        alignmentBaseline="middle"
      />
      <text x="15" y="22" fill="black" textAnchor="middle" fontSize="75%">
        {value}
      </text>
    </StyledSVG>
  );
};

const StyledSVG = styled.svg<PieceProps>``;

export const XPiece: FC = () => <Piece value="X" color="red" />;
export const OPiece: FC = () => <Piece value="O" color="yellow" />;

export const PieceAnim: FC<PieceProps> = ({ value, color, drop }) => {
  console.log("PieceAnim ", drop);
  return (
    <StyledSVGAnim height="30" width="30" drop={drop || 0}>
      <circle
        cx="15"
        cy="15"
        r="12"
        fill={color}
        stroke="black"
        stroke-width="2"
        alignmentBaseline="middle"
      />
      <text x="15" y="22" fill="black" textAnchor="middle" fontSize="75%">
        {value}
      </text>
    </StyledSVGAnim>
  );
};

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

const StyledSVGAnim = styled.svg<PieceProps>`
  animation: ${dropKeyframes} 0.5s;
`;

export default Piece;
