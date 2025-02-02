import { Spinner } from "flowbite-react";

const SpinnerComponent = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
      <Spinner size="xl" />
    </div>
  );
};

export default SpinnerComponent;
