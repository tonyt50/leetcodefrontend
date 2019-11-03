import React from "react";
import styled from "styled-components";
import { HooksTest } from "../components/HooksTest/HooksTest";
import { Provider } from "../components/HooksTest/Store";

const HooksTestPageWrapper = styled.div`
  flex: 1;
  /* width: 100%; */
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HooksTestPage = () => (
  <Provider>
    <HooksTestPageWrapper>
      <h1>HooksTestPage</h1>
      <HooksTest />
    </HooksTestPageWrapper>
  </Provider>
);

export default HooksTestPage;
