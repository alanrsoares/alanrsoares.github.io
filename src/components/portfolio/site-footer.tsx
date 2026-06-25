import tw from "@styled-cva/react";
import { Button } from "components/ui/button";
import { SITE } from "site";

const Footer = tw.footer`
  flex flex-col items-center text-center sm:flex-row sm:justify-between sm:text-left gap-3
  pt-8 text-sm text-muted-foreground
  animate-fade-up [animation-delay:160ms]
`;

export function SiteFooter() {
  return (
    <Footer>
      <span>
        © {new Date().getFullYear()} {SITE.name}
      </span>
      <Button
        className="h-auto px-0"
        render={<a href={SITE.pagesUrl} />}
        size="sm"
        variant="link"
      >
        {SITE.pagesUrl.replace(/^https?:\/\//, "")}
      </Button>
    </Footer>
  );
}
