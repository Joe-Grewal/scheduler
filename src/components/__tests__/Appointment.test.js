import React from "react";
import { cleanup, render } from "@testing-library/react";

import Appointment from "components/Appointment"

afterEach(cleanup);

/*
  A test that renders a React Component
*/
describe("Appointment", () => {
  it("renders without crashing", () => {
    render(<Appointment />);
  });

  xit("does something it is supposed to do", () => {
    // ...
  });

  xit("does something else it is supposed to do", () => {
    // ...
  });
});