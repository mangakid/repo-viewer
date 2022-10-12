import type { NextPage } from "next";
import fetch from "cross-fetch";
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import { RepoViewer } from "./repo-viewer/repo-viewer";

export const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://api.github.com/graphql",
    fetch,
    headers: {
      authorization: process.env.NEXT_PUBLIC_GITHUB_GQL_TOKEN
        ? `Bearer ${process.env.NEXT_PUBLIC_GITHUB_GQL_TOKEN}`
        : "",
    },
  }),
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
