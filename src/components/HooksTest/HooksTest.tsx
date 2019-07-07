import React from "react";
import styled from "styled-components";
import { HooksTestSideA } from "./HooksTestSideA";
import { HooksTestSideB } from "./HooksTestSideB";

const HooksTestWrapper = styled.div`
  width: 100%;
`;

const Title = styled.h1`
  text-align: center;
`;

const HookWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

export const HooksTest = () => {
  return (
    <HooksTestWrapper>
      <Title>HooksTest</Title>
      <HookWrapper>
        <HooksTestSideA />
        <HooksTestSideB />
      </HookWrapper>
    </HooksTestWrapper>
  );
};
