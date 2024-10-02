import React from "react";

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container w-full  px-7 mx-auto sm:px-6 md:px-10  xl:px-4  lg:max-w-7xl">
      {children}
    </div>
  );
};

export default Container;
