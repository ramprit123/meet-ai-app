import React, { type PropsWithChildren } from "react";

const MainLayout = ({ children }: PropsWithChildren) => {
  return <div className="size-full">{children}</div>;
};

export default MainLayout;
