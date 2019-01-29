import React, { useRef, useEffect, useState } from "react";
import styled from "@emotion/styled";

import data from "./resume";
import { Pages } from "./types";

import {
  AppContainer,
  Page,
  HeroSection,
  Title,
  Sub,
  Menu,
  MenuContent,
  Tab,
  Content,
  Card,
  StickyMenu
} from "./components";

import pages from "./pages";

const renderTab = (key: Pages, page: Pages, onClick: (key: Pages) => void) => {
  const activePage = pages[key];

  return (
    <Tab key={key} active={key === page} onClick={() => onClick(key)}>
      {activePage.icon && <activePage.icon />}
      {activePage.tabTitle}
    </Tab>
  );
};

export default function App() {
  const [page, setPage] = useState(
    window.location.hash ? window.location.hash.slice(1) : Pages.About
  );

  const menuRef = useRef(null);

  useEffect(() => {
    window.location.hash = page;
  });

  const CurrentPage = pages[page].render;

  const handleHeroButtonClick = () => {
    if (menuRef.current) {
      window.scrollTo({
        top: menuRef.current.offsetTop,
        behavior: "smooth"
      });
    }
  };

  return (
    <AppContainer>
      <HeroSection onButtonClick={handleHeroButtonClick} />
      <div ref={menuRef} />
      <StickyMenu>
        {Object.keys(pages).map(key => renderTab(key, page, setPage))}
      </StickyMenu>
      <Page>
        <CurrentPage />
      </Page>
    </AppContainer>
  );
}
