import { GET_TOP_REPOS, RepoViewer } from "./repo-viewer";
import { fireEvent, render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";

const mocks = [
  {
    request: {
      query: GET_TOP_REPOS,
      variables: {
        searchQuery: "stars:>=10000",
      },
    },
    result: {
      data: {
        search: {
          repos: [
            {
              id: "foo",
              name: "bar",
              forks: 4562435,
              stars: 551234,
              url: "someurl",
              __typename: "Repository",
            },
            {
              id: "baz",
              name: "aname",
              forks: 572632,
              stars: 723626,
              url: "anotherurl",
              __typename: "Repository",
            },
          ],
        },
      },
    },
  },
  {
    request: {
      query: GET_TOP_REPOS,
      variables: {
        searchQuery: "react",
      },
    },
    result: {
      data: {
        search: {
          repos: [
            {
              id: "react",
              name: "react",
              forks: 20000,
              stars: 50000,
              url: "somereactrepourl",
              __typename: "Repository",
            },
          ],
        },
      },
    },
  },
];

describe("RepoViewer", () => {
  test("it shows the loading text when loading", async () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <RepoViewer />
      </MockedProvider>
    );
    expect(await screen.findByText(/Loading/)).toBeInTheDocument();
  });

  test("it has the table titles", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <RepoViewer />
      </MockedProvider>
    );
    expect(await screen.findByText(/Name/)).toBeInTheDocument();
    expect(await screen.findByText(/Stars/)).toBeInTheDocument();
    expect(await screen.findByText(/Forks/)).toBeInTheDocument();
  });

  test("it renders the repo details as table rows", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <RepoViewer />
      </MockedProvider>
    );
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

  test("it fetches repos based on the search term entered", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <RepoViewer />
      </MockedProvider>
    );
    const searchBar = await screen.findByLabelText(/search/i);
    fireEvent.change(searchBar, { target: { value: "react" } });

    const links = await screen.findAllByRole("link");
    expect(links[0]).toHaveAttribute("href", "somereactrepourl");
    expect(await screen.findByText(/react/)).toBeInTheDocument();
    expect(await screen.findByText(/⭐ 50000/)).toBeInTheDocument();
    expect(await screen.findByText(/🍴 20000/)).toBeInTheDocument();
  });
});
