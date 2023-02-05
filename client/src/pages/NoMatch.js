import React from "react";

const NoMatch = () => {
  return (
    <div className="w-screen min-h-screen flex flex-col justify-center p-5">
        <h1 className="p-5 text-center text-5xl text-grey">404 Page Not Found</h1>
        <div className="">
        <h1 className="font-satisfy text-blue text-7xl text-center p-5">Oops! Looks like this page is missing.
        </h1>
        </div>
    </div>
  );
};

export default NoMatch;
