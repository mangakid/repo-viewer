import { graphql } from "msw";
import { GET_TOP_REPOS } from "../pages/repo-viewer/repo-viewer";

export const handlers = [
  graphql.query(GET_TOP_REPOS, (req, res, ctx) =>
    res(
      ctx.data({
        search: {
          repos: [
            {
              id: "foo",
              name: "bar",
              forkCount: 4562435,
              stargazerCount: 551234,
              url: "someurl",
              __typename: "Repository",
            },
            {
              id: "baz",
              name: "aname",
              forkCount: 572632,
              stargazerCount: 723626,
              url: "anotherurl",
              __typename: "Repository",
            },
          ],
        },
      })
    )
  ),
];

export const errorResponse = graphql.query(GET_TOP_REPOS, (req, res) =>
  res.networkError("Failed to connect")
);
