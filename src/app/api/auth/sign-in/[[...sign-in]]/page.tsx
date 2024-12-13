import { SignIn } from "@clerk/nextjs";

const page = () => {
  return (
    <div className="flex justify-center items-center my-auto">
      <SignIn />
    </div>
  );
};

export default page;
