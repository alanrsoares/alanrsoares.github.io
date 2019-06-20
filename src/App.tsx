import React, { useRef, useEffect, useState } from "react";

import { Pages } from "types";

import { AppContainer, Page, HeroSection, Tab, StickyMenu } from "components";

import pages from "pages";

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
  const [page, setPage] = useState<Pages>(
    window.location.hash
      ? (window.location.hash.slice(1) as Pages)
      : Pages.About
  );

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.location.hash = page;
  });

  const activePage = pages[page];

  const CurrentPage: React.ComponentType = activePage.render;

  const handleHeroButtonClick = () => {
    if (!!menuRef.current) {
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
        {Object.keys(pages).map((key: any) => renderTab(key, page, setPage))}
      </StickyMenu>
      <Page>
        <CurrentPage />
      </Page>
    </AppContainer>
  );
}
