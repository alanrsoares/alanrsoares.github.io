import React from "react";
import styled from "styled-components";

const CardContainer = styled.div`
  border-radius: 4px;
  background-color: #f5f5f5;
  margin: 0.5em 1em;
  box-shadow: 0 12px 24px -5px rgba(0, 0, 0, 0.3);
`;

const CardHeader = styled.div`
  border-radius: 4px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  padding: 1em;
  background-image: linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%);
  font-weight: bold;
  font-size: 1.25em;
  border-bottom: dotted 4px rgba(0, 0, 0, 0.2);
`;

const CardBody = styled.div`
  margin: 1em;
`;

interface Props {
  children: React.ReactNode;
  heading: React.ReactNode;
}

export default function Card(props: Props) {
  return (
    <CardContainer>
      {props.heading && <CardHeader>{props.heading}</CardHeader>}
      <CardBody>{props.children}</CardBody>
    </CardContainer>
  );
}
