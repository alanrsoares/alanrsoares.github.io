import tw from "@styled-cva/react";
import { Button } from "components/ui/button";
import { BASICS } from "resume";

const Footer = tw.footer`
  flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3
  pt-8 text-sm text-muted-foreground
  animate-fade-up [animation-delay:160ms]
`;

export function SiteFooter() {
  return (
    <Footer>
      <span>
        © {new Date().getFullYear()} {BASICS.name}
      </span>
      <Button
        variant="link"
        size="sm"
        className="h-auto px-0"
        render={<a href={BASICS.website} />}
      >
        {BASICS.website.replace(/^https?:\/\//, "")}
      </Button>
    </Footer>
  );
}
