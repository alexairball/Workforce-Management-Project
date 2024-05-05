import { Suspense } from "react";
import WorkOrder from "./components/WorkOrder";
import WorkOrderSkeleton from "./components/WorkOrderSkeleton";

const App = () => {
  return (
    <Suspense fallback={<WorkOrderSkeleton />}>
      <WorkOrder></WorkOrder>
    </Suspense>
  );
};

export default App;
