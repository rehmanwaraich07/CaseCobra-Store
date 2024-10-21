import { Suspense } from "react";
import ThankYou from "./ThankYou";

const page = () => {
  return (
    <Suspense>
      <ThankYou />
    </Suspense>
  );
};

export default page;
