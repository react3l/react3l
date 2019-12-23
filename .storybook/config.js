import {addDecorator, configure} from "@storybook/react";
import React from "react";

addDecorator((storyFn) => {
  return (
    <div className="container-fluid">
      {storyFn()}
    </div>
  );
});

configure(require.context("../src", true, /\.stories\.tsx?$/), module);
