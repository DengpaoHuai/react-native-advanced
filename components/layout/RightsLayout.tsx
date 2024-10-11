import { Rigths } from "@/types/rights";
import { useConfigStore } from "@/zustand/useConfig";
import { router } from "expo-router";
import { FC, useEffect } from "react";

type RightsLayoutProps = {
  rights: Rigths[];
  children: React.ReactNode;
};

export const RigthsLayout: FC<RightsLayoutProps> = ({ rights, children }) => {
  const { config } = useConfigStore();

  if (rights.includes(config.right)) {
    return <>{children}</>;
  } else {
    router.back();
  }
  // router.back();
  return null;
};
