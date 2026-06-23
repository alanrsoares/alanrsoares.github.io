export interface Profile {
  network: string;
  username: string;
  url: string;
}

export interface Project {
  title: string;
  description: string;
  url: string;
  stars?: number;
  language: string;
  tags: string[];
}

export interface Experiment {
  title: string;
  description: string;
  url: string;
  tags: string[];
}

export const BASICS = {
  name: "Alan R. Soares",
  label: "Senior Product Engineer",
  summary:
    "Senior product engineer building developer tools, SDKs, and the product UI around them. Auckland, New Zealand.",
  email: "hi@alanrsoares.me",
  website: "https://alanrsoares.me",
  profiles: [
    {
      network: "GitHub",
      username: "alanrsoares",
      url: "https://github.com/alanrsoares",
    },
    {
      network: "LinkedIn",
      username: "alanrsoares",
      url: "https://www.linkedin.com/in/alanrsoares",
    },
    {
      network: "Stack Overflow",
      username: "alan-r-soares",
      url: "https://stackoverflow.com/users/1049963/alan-r-soares",
    },
  ] as Profile[],
};

export const OPEN_SOURCE: Project[] = [
  {
    title: "styled-cva",
    description:
      "Type-safe component authoring for React teams using Tailwind, CVA, and styled-components-like ergonomics.",
    url: "https://github.com/alanrsoares/styled-cva",
    language: "TypeScript",
    tags: ["OSS", "Design systems", "React", "Developer tools"],
  },
  {
    title: "onrails",
    description:
      "Railway-oriented TypeScript toolkit for Result, Maybe, exhaustive matching, lint rules, and migration codemods.",
    url: "https://github.com/alanrsoares/onrails",
    language: "TypeScript",
    tags: ["OSS", "Functional programming", "Developer tools", "npm"],
  },
  {
    title: "axelarjs",
    description:
      "Axelar Network's official JavaScript and TypeScript foundations for cross-chain application development.",
    url: "https://github.com/axelarnetwork/axelarjs",
    language: "TypeScript",
    tags: ["OSS", "Monorepo", "Cross-chain", "SDK"],
  },
  {
    title: "yappr",
    description:
      "Personal audio tooling service migrated to use TanStack AI with the Ollama adapter for streaming terminal outputs.",
    url: "https://github.com/alanrsoares/yappr",
    language: "TypeScript",
    tags: ["OSS", "Audio", "AI", "Terminal"],
  },
  {
    title: "greenbot",
    description:
      "Interactive npm dependency updater for keeping JavaScript projects current.",
    url: "https://github.com/alanrsoares/greenbot",
    language: "Svelte",
    tags: ["OSS", "Automation", "Developer tools"],
  },
  {
    title: "re-reduced",
    description:
      "Productivity toolbelt for React/Redux/Redux-Saga apps. Lightweight state management helpers.",
    url: "https://github.com/alanrsoares/re-reduced",
    language: "TypeScript",
    tags: ["OSS", "Redux", "React", "State Management"],
  },
];

export const EXPERIMENTS: Experiment[] = [
  {
    title: "Weirdle",
    description:
      "Wordle reimagined as a playable React clone with daily seeds and shareable runs.",
    url: "https://github.com/alanrsoares/weirdle",
    tags: ["Game", "React", "TypeScript"],
  },
  {
    title: "Game of Life",
    description:
      "Conway's Game of Life in many languages and UI stacks, rebuilt when learning new architectures.",
    url: "https://github.com/alanrsoares/redux-game-of-life",
    tags: ["Cellular automata", "Language study", "Games"],
  },
  {
    title: "unscrabbled",
    description:
      "Svelte word-game experiment with a compact playable surface and deployed demo.",
    url: "https://github.com/alanrsoares/unscrabbled",
    tags: ["Word game", "Svelte", "TypeScript"],
  },
  {
    title: "ts-mines",
    description:
      "Minesweeper implementation in React and TypeScript with a playable browser UI.",
    url: "https://github.com/alanrsoares/ts-mines",
    tags: ["Game", "Minesweeper", "React"],
  },
  {
    title: "mandalorium",
    description:
      "Interactive mandala drawing board for kaleidoscopic generative-art sketches using HTML5 canvas.",
    url: "https://github.com/alanrsoares/mandalorium",
    tags: ["Generative art", "Canvas", "p5"],
  },
];

export const STATIC_STATS = {
  prsMerged: 647,
  reviewsSubmitted: 289,
  reposContributedTo: 17,
  yearsOnGitHub: 16,
  ownOssStars: 427,
  topOrg: {
    login: "Sifchain",
    prContributions: 299,
  },
};
