import SideComponent from "./sideComponent";
import TreatmentPlan from "./treatmentPlan";
import WarnComponent from "./warnComponent";

export default function PanelComponent() {
  return (
    <div className="flex flex-col md:flex-row p-6">
      <SideComponent />
      <TreatmentPlan />
      <WarnComponent />
    </div>
  );
}
