export enum Pages {
  About = "about",
  Work = "work",
  Labs = "labs"
}

export interface PageConfig {
  tabTitle: string;
  render: React.ComponentType;
  icon: React.ComponentType;
}
