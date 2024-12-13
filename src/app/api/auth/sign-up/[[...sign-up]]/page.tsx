import { SignUp } from "@clerk/nextjs";

export const page = () => {
  return (
    <div className="flex justify-center items-center my-auto">
      <SignUp />
    </div>
  );
};

export default page;
