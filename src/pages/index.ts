import styled from "styled-components";
import { Beaker } from "styled-icons/octicons/Beaker";
import { MarkGithub } from "styled-icons/octicons/MarkGithub";
import { Profile } from "styled-icons/icomoon/Profile";

import { Pages, PageConfig } from "types";

import About from "pages/About";
import Work from "pages/Work";
import Labs from "pages/Labs";

const renderIcon = (icon: React.ComponentType) => styled(icon)`
  fill: white;
  height: 24px;
  margin-right: 8px;
`;

const pages: Record<Pages, PageConfig> = {
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

export default pages;
