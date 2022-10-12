import { useQuery, gql } from "@apollo/client";
import { ReposTable } from "./repos-table/repos-table";
import Typography from "@mui/material/Typography";
import { LoadingComponent, RepoViewerWrapper } from "./repo-viewer.styles";

export type Repo = {
  name: string;
  stars: number;
  forks: number;
  url: string;
  id: string;
};

type RawRepo = {
  id: string;
  name: string;
  forkCount: number;
  stargazerCount: number;
  url: string;
};

export const GET_TOP_REPOS = gql`
  query GET_TOP_REPOS {
    search(query: "stars:>=10000", type: REPOSITORY, first: 10) {
      repos: nodes {
        ... on Repository {
          id
          name
          forkCount
          stargazerCount
          url
        }
      }
    }
  }
`;

export const RepoViewer = () => {
  // fetch top 10 repos
  const { loading, error, data } = useQuery(GET_TOP_REPOS);
  const repos = data?.search?.repos?.map(
    ({ name, id, forkCount, url, stargazerCount }: RawRepo) => ({
      name,
      stars: stargazerCount,
      forks: forkCount,
      url,
      id,
    })
  );

  return (
    <RepoViewerWrapper>
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
