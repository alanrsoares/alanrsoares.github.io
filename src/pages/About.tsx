import React from "react";
import styled from "@emotion/styled";

import data from "../resume";
import { renderRows } from "../helpers";
import { Content, Card } from "../components";

const List = styled.div`
  display: flex;
`;

const Link = styled.a`
  font-weight: bold;
`;

const Social = styled.div`
  list-style: none;
  margin-bottom: 4px;
  border-radius: 4px;
  padding: 8px;
  background: rgba(0, 0, 0, 0.1);
  margin-right: 6px;
`;

const renderProfile = p => (
  <Social key={p.url}>
    <Link href={p.url} target="_blank">
      {p.network}
    </Link>
  </Social>
);

export default function About() {
  return (
    <Content>
      <Card heading="Summary">{renderRows(data.basics.summary)}</Card>
      <Card heading="Find me">
        <List>{data.basics.profiles.map(renderProfile)}</List>
      </Card>
    </Content>
  );
}
