import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "components/ui/card";
import { Skeleton } from "components/ui/skeleton";

export function SkeletonCard() {
  return (
    <Card aria-hidden="true">
      <CardHeader>
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="size-4" />
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </CardContent>
      <CardFooter>
        <Skeleton className="h-5 w-16" />
      </CardFooter>
    </Card>
  );
}
