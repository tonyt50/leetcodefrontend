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
    <StyledSVGPiece height="40" width="40" drop={drop || 0}>
      <defs id="defs2">
        <filter id="filter4598" style={{ colorInterpolation: "sRGB" }}>
          <feGaussianBlur
            id="feGaussianBlur4572"
            result="result0"
            in="SourceAlpha"
            stdDeviation="2.3"
          />
          <feMorphology
            id="feMorphology4574"
            result="result1"
            radius="6.6"
            in="SourceAlpha"
          />
          <feGaussianBlur
            id="feGaussianBlur4576"
            in="result1"
            stdDeviation="8.9"
          />
          <feColorMatrix
            id="feColorMatrix4578"
            result="result91"
            values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.3 0"
          />
          <feComposite
            id="feComposite4580"
            in2="result91"
            result="result2"
            operator="out"
            in="result0"
          />
          <feGaussianBlur
            id="feGaussianBlur4582"
            result="result4"
            stdDeviation="1.7"
          />
          <feDiffuseLighting id="feDiffuseLighting4586" surfaceScale="10">
            <feDistantLight
              id="feDistantLight4584"
              elevation="45"
              azimuth="225"
            />
          </feDiffuseLighting>
          <feBlend id="feBlend4588" mode="multiply" in2="SourceGraphic" />
          <feComposite
            id="feComposite4590"
            result="result3"
            operator="in"
            in2="SourceAlpha"
          />
          <feSpecularLighting
            id="feSpecularLighting4594"
            specularExponent="17.9"
            surfaceScale="5"
            in="result4"
          >
            <feDistantLight
              id="feDistantLight4592"
              elevation="45"
              azimuth="225"
            />
          </feSpecularLighting>
          <feComposite
            result="fbSourceGraphic"
            id="feComposite4596"
            operator="atop"
            in2="result3"
          />
          <feColorMatrix
            id="feColorMatrix4600"
            values="0 0 0 -1 0 0 0 0 -1 0 0 0 0 -1 0 0 0 0 1 0"
            in="fbSourceGraphic"
            result="fbSourceGraphicAlpha"
          />
          <feColorMatrix
            in="fbSourceGraphic"
            type="luminanceToAlpha"
            result="result2"
            id="feColorMatrix4602"
          />
          <feDiffuseLighting
            surfaceScale="15"
            result="result1"
            diffuseConstant="0.5"
            in="result2"
            lighting-color="#ffffff"
            id="feDiffuseLighting4604"
          >
            <feDistantLight
              elevation="10"
              azimuth="225"
              id="feDistantLight4606"
            />
          </feDiffuseLighting>
          <feComposite
            k3="0.8"
            k2="1"
            operator="arithmetic"
            result="result9"
            id="feComposite4608"
            in2="fbSourceGraphic"
          />
          <feComposite
            in="result9"
            operator="in"
            result="result7"
            id="feComposite4610"
            in2="fbSourceGraphic"
          />
        </filter>
        <filter id="shadow" x="-20%" y="-20%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2 2" result="shadow" />
          <feOffset dx="6" dy="6" />
        </filter>
      </defs>
      <g id="layer1">
        <circle
          r="20"
          cy="20"
          cx="20"
          style={{
            fill: color,
            fillOpacity: 1,
            filter: "url(#filter4598)"
          }}
        />
        <text
          style={{ filter: "url(#shadow)", fill: "black" }}
          textAnchor="middle"
          font-size="xx-large"
          x="17"
          y="27"
        >
          {value}
        </text>
        <text
          style={{ fill: color }}
          textAnchor="middle"
          font-size="xx-large"
          x="20"
          y="31"
        >
          {value}
        </text>
      </g>
    </StyledSVGPiece>
  );
};

export const Piece: FC<PieceProps> = memo(({ value, color, drop }) => (
  <ThisPiece value={value} color={color} drop={drop} />
));
