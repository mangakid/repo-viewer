import { useState, useEffect } from "react";
import { useLazyQuery, gql } from "@apollo/client";
import { ReposTable } from "./repos-table/repos-table";
import Typography from "@mui/material/Typography";

import { LoadingComponent, RepoViewerWrapper } from "./repo-viewer.styles";
import { ReposData } from "./repos-viewer.types";
import { SearchBar } from "./search-bar/search-bar";

export const GET_TOP_REPOS = gql`
  query GET_TOP_REPOS($searchQuery: String!) {
    search(query: $searchQuery, type: REPOSITORY, first: 10) {
      repos: nodes {
        ... on Repository {
          id
          name
          forks: forkCount
          stars: stargazerCount
          url
        }
      }
    }
  }
`;

export const RepoViewer = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const MINIMUM_STARS = 10000;
  const starsQuery = `stars:>=${MINIMUM_STARS}`;
  const searchQuery = searchTerm || starsQuery;
  const [getRepos, { loading, error, data }] =
    useLazyQuery<ReposData>(GET_TOP_REPOS);

  // fetch repos
  useEffect(() => {
    getRepos({ variables: { searchQuery } });
  }, [getRepos, searchQuery]);

  const repos = data?.search?.repos || [];

  return (
    <RepoViewerWrapper>
      <SearchBar
        value={searchTerm}
        handleChange={(e) => setSearchTerm(e.target.value)}
      />
      {loading ? (
        <LoadingComponent>
          <Typography variant="h4">Loading...</Typography>
        </LoadingComponent>
      ) : error ? (
        <Typography variant="h4">Something went wrong 😭</Typography>
      ) : (
        <ReposTable repos={repos} />
      )}
    </RepoViewerWrapper>
  );
};
