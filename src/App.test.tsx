import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import Cricketers from "./component/Cricketers/Cricketers";
import CricketerDetails from "./component/CricketerDetails/CricketerDetails";

describe("App", () => {
  it("renders Cricketers component on the /cricketers route", () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    const cricketersElement = screen.getByText(/Cricketers/i);
    expect(cricketersElement).toBeInTheDocument();
  });

  it("renders Cricketers component on the root route", () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    const cricketersElement = screen.getByText(/Cricketers/i);
    expect(cricketersElement).toBeInTheDocument();
  });

  it("renders CricketerDetails component on the /cricketer/:id route", () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    window.history.pushState({}, "Cricketer Details", "/cricketer/1");

    const cricketerDetailsElement = screen.getByText(/Cricketer Details/i);
    expect(cricketerDetailsElement).toBeInTheDocument();
  });
});
