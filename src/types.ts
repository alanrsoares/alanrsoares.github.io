export enum Pages {
  About = "about",
  // Resume = "resume",
  Work = "work",
  Labs = "labs"
}

export interface PageConfig {
  tabTitle: string;
  render: React.ComponentType;
  icon: React.ComponentType;
}
