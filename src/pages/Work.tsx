import React from "react";

import { renderRows } from "../helpers";
import data from "../resume";
import { Content, Card } from "../components";

export default function Work() {
  return (
    <Content>
      {data.work.map(x => (
        <Card key={x.company} heading={`${x.position} @ ${x.company}`}>
          {renderRows(x.highlights)}
        </Card>
      ))}
    </Content>
  );
}
