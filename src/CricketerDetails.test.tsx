import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import CricketerDetails from "./component/CricketerDetails/CricketerDetails";

const mockCricketer = {
  id: "1",
  name: "Sachin Tendulkar",
  description: "Master Blaster",
  type: "Batsman",
  points: 1000,
  rank: 1,
  dob: "1973-04-24",
};

describe("CricketerDetails", () => {
  it("renders cricketer details correctly", () => {
    render(
      <BrowserRouter>
        <CricketerDetails cricketers={[mockCricketer]} />
      </BrowserRouter>
    );

    const nameElement = screen.getByText(/Name:/i);
    expect(nameElement).toBeInTheDocument();

    const descriptionElement = screen.getByText(/Description:/i);
    expect(descriptionElement).toBeInTheDocument();

    const backButtonElement = screen.getByRole("button", {
      name: /back to cricketers/i,
    });
    expect(backButtonElement).toBeInTheDocument();
  });

  it("renders 'Cricketer not found' message when cricketer is not found", () => {
    render(
      <BrowserRouter>
        <CricketerDetails cricketers={[]} />
      </BrowserRouter>
    );

    const notFoundElement = screen.getByText(/Cricketer not found/i);
    expect(notFoundElement).toBeInTheDocument();
  });
  it("renders 'Cricketer not found' message when cricketer is not found", () => {
    render(
      <BrowserRouter>
        <CricketerDetails cricketers={[]} />
      </BrowserRouter>
    );

    const notFoundElement = screen.getByText(/Cricketer not found/i);
    expect(notFoundElement).toBeInTheDocument();
  });

  it("navigates to '/cricketers' when 'Back to Cricketers' button is clicked", () => {
    const { container } = render(
      <BrowserRouter>
        <CricketerDetails cricketers={[mockCricketer]} />
      </BrowserRouter>
    );

    const backButtonElement = screen.getByRole("button", {
      name: /back to cricketers/i,
    });
    expect(backButtonElement).toBeInTheDocument();

    backButtonElement.click();

    expect(container.innerHTML).toEqual(expect.stringContaining("/cricketers"));
  });
});
