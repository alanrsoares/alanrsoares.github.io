import React from "react";

import data from "../resume";
import { Pages } from "../types";

import { Hero, HeroContent, HeroButton, Title, Sub } from "../components";

import "../styles.css";

import pages from "../pages";

interface Props {
  onButtonClick(): void;
}

export default function HeroSection(props: Props) {
  return (
    <Hero>
      <HeroContent>
        <Title>{data.basics.name}</Title>
        <Sub>{data.basics.label}</Sub>
      </HeroContent>
      <HeroButton onClick={props.onButtonClick}>know more</HeroButton>
    </Hero>
  );
}
