import styled from "@emotion/styled";
import { Beaker } from "styled-icons/octicons/Beaker";
import { Zap } from "styled-icons/octicons/Zap";
import { MarkGithub } from "styled-icons/octicons/MarkGithub";
import { Profile } from "styled-icons/icomoon/Profile";

import { Pages } from "../types";

import About from "./About";
import Work from "./Work";
import Labs from "./Labs";

const renderIcon = icon => styled(icon)`
  fill: white;
  height: 24px;
  margin-right: 8px;
`;

export default {
  [Pages.About]: {
    tabTitle: "About me",
    render: About,
    icon: renderIcon(Profile)
  },
  [Pages.Work]: {
    tabTitle: "Work",
    render: Work,
    icon: renderIcon(MarkGithub)
  },
  [Pages.Labs]: {
    tabTitle: "Labs",
    render: Labs,
    icon: renderIcon(Beaker)
  }
};
