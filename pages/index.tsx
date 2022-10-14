import type { NextPage } from "next";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { RepoViewer } from "./repo-viewer/repo-viewer";

export const client = new ApolloClient({
  uri: "https://api.github.com/graphql",
  headers: {
    authorization: process.env.NEXT_PUBLIC_GITHUB_GQL_TOKEN
      ? `Bearer ${process.env.NEXT_PUBLIC_GITHUB_GQL_TOKEN}`
      : "",
  },
  cache: new InMemoryCache(),
});

const Home: NextPage = () => {
  return (
    <ApolloProvider client={client}>
      <RepoViewer />
    </ApolloProvider>
  );
};

export default Home;
