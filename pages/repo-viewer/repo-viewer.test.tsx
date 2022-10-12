import { RepoViewer } from "./repo-viewer";
import { screen } from "@testing-library/react";
import { testRenderer } from "../../test-utils";
import { errorResponse } from "../../mocks/handlers";

describe("RepoViewer", () => {
  test("it shows the loading text when loading", async () => {
    const renderPage = testRenderer(<RepoViewer />);
    renderPage();
    expect(await screen.getByText(/Loading/)).toBeInTheDocument();
  });

  test("it has the table titles", async () => {
    const renderPage = testRenderer(<RepoViewer />);
    renderPage();
    expect(await screen.findByText(/Name/)).toBeInTheDocument();
    expect(await screen.findByText(/Stars/)).toBeInTheDocument();
    expect(await screen.findByText(/Forks/)).toBeInTheDocument();
  });

  test("it renders the repo details as table rows", async () => {
    const renderPage = testRenderer(<RepoViewer />);
    renderPage();
    expect(await screen.findByText(/bar/)).toBeInTheDocument();
    const links = await screen.findAllByRole("link");
    expect(links[0]).toHaveAttribute("href", "someurl");
    expect(links[1]).toHaveAttribute("href", "anotherurl");
    expect(await screen.findByText(/⭐ 551234/)).toBeInTheDocument();
    expect(await screen.findByText(/🍴 4562435/)).toBeInTheDocument();
    expect(await screen.findByText(/aname/)).toBeInTheDocument();
    expect(await screen.findByText(/⭐ 723626/)).toBeInTheDocument();
    expect(await screen.findByText(/🍴 572632/)).toBeInTheDocument();
  });
});
