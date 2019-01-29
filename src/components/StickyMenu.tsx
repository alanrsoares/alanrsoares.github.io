import React, { useRef, useEffect, useState } from "react";

import { Menu, MenuContent, Tab } from "./styled";

interface Props {
  children: React.Node;
}

export default function StickyMenu(props: Props) {
  const [sticky, setSticky] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScrollChange = () => {
      const { offsetTop } = menuRef.current;

      if (window.pageYOffset >= offsetTop) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };

    window.addEventListener("scroll", handleScrollChange);

    return () => {
      window.removeEventListener("scroll", handleScrollChange);
    };
  });

  return (
    <Menu ref={menuRef} sticky={sticky}>
      <MenuContent>{props.children}</MenuContent>
    </Menu>
  );
}
