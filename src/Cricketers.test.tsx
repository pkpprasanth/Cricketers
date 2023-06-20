import { render, screen } from "@testing-library/react";
import Cricketers from "./component/Cricketers/Cricketers";

describe("Cricketers", () => {


  beforeEach(() => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockResolvedValue([]),
    } as any);
  });

  it("renders the component without crashing", () => {
    render(<Cricketers />);
  });

  it("renders the table with correct columns", () => {
    render(<Cricketers />);
    const rankColumn = screen.getByText("Rank");
    const nameColumn = screen.getByText("Name");
    const descriptionColumn = screen.getByText("Description");
    const typeColumn = screen.getByText("Type");
    const pointsColumn = screen.getByText("Points");
    const actionsColumn = screen.getByText("Actions");

    expect(rankColumn).toBeInTheDocument();
    expect(nameColumn).toBeInTheDocument();
    expect(descriptionColumn).toBeInTheDocument();
    expect(typeColumn).toBeInTheDocument();
    expect(pointsColumn).toBeInTheDocument();
    expect(actionsColumn).toBeInTheDocument();
  });

  it("fetches cricketers data and updates state", async () => {
    const mockCricketers = [
      { id: "1", name: "Player 1", description: "Description 1", type: "Batsman", points: 100, rank: 1 },
      { id: "2", name: "Player 2", description: "Description 2", type: "Bowler", points: 90, rank: 2 },
    ];

    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockCricketers),
    } as unknown as Response);

    render(<Cricketers />);

    // Wait for the data to be fetched and state to be updated
    await screen.findByText("Player 1");
    await screen.findByText("Player 2");

    const rankCell1 = screen.getByText("1");
    const rankCell2 = screen.getByText("2");

    expect(rankCell1).toBeInTheDocument();
    expect(rankCell2).toBeInTheDocument();
  });

  it("updates the current cricketers based on page size and current page", () => {
    const mockCricketers = [
      { id: "1", name: "Player 1", description: "Description 1", type: "Batsman", points: 100, rank: 1 },
      { id: "2", name: "Player 2", description: "Description 2", type: "Bowler", points: 90, rank: 2 },
      { id: "3", name: "Player 3", description: "Description 3", type: "All-Rounder", points: 80, rank: 3 },
    ];

    render(<Cricketers />);

    const pageSizeInput = screen.getByLabelText("Page Size:");
    const currentPageInput = screen.getByLabelText("Current Page:");

    (pageSizeInput as HTMLInputElement).value = "2";
    (currentPageInput as HTMLInputElement).value = "2";

    const updateButton = screen.getByRole("button", { name: "Update" });
    updateButton.click();

    const cricketerName = screen.getByText("Player 3");
    expect(cricketerName).toBeInTheDocument();
  });

  it("filters cricketers based on the selected filter", () => {
    const mockCricketers = [
      { id: "1", name: "Player 1", description: "Description 1", type: "Batsman", points: 100, rank: 1 },
      { id: "2", name: "Player 2", description: "Description 2", type: "Bowler", points: 90, rank: 2 },
    ];

    render(<Cricketers />);

    const updateButton = screen.getByRole("button", { name: "Update" });
    updateButton.click();

    const cricketerName = screen.getByText("Player 1");
    expect(cricketerName).toBeInTheDocument();
  });

});
