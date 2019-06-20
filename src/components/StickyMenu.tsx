import React, { useRef, useEffect, useState } from "react";

import { Menu, MenuContent } from "components/styled";

interface Props {
  children: React.ReactNode;
}

export default function StickyMenu(props: Props) {
  const [sticky, setSticky] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScrollChange = () => {
      if (menuRef.current && window.pageYOffset >= menuRef.current.offsetTop) {
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
