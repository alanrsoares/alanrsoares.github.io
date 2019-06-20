import React from "react";

import { renderRows } from "helpers";
import resume from "resume";
import { Content, Card } from "components";

export default function Work() {
  return (
    <Content>
      {resume.work.map(x => (
        <Card key={x.company} heading={`${x.position} @ ${x.company}`}>
          {renderRows(x.highlights)}
        </Card>
      ))}
    </Content>
  );
}
