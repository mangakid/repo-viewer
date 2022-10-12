import { render } from "@testing-library/react";
import { GraphQLHandler, GraphQLRequest } from "msw";
import { ApolloProvider } from "@apollo/client";
import { client } from "./pages/index";
import { server } from "./mocks/server";

export const testRenderer =
  (children: React.ReactNode) =>
  (responseOverride?: GraphQLHandler<GraphQLRequest<never>>) => {
    if (responseOverride) {
      server.use(responseOverride);
    }
    render(<ApolloProvider client={client}>{children}</ApolloProvider>);
  };
