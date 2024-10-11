import { RigthsLayout } from "@/components/layout/RightsLayout";
import Demo from "@/features/demoRigths/components/Demo";

const DemoRights = () => {
  return (
    <RigthsLayout rights={["admin"]}>
      <Demo></Demo>
    </RigthsLayout>
  );
};

export default DemoRights;
