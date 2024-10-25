import { useRouter } from "next/navigation";
import { RouteParams } from "@/types";

export const useDynamicNavigation = () => {
  const router = useRouter();

  const navigateToRoute = ({ slug, dynamicRouteName }: RouteParams) => {
    const url = `${dynamicRouteName}/${slug}`;
    router.push(url);
  };

  return { navigateToRoute };
};
