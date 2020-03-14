
import App from 'next/app'
import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory'
import fetch from 'node-fetch';
const WebSocket = require('isomorphic-ws');
import { WebSocketLink } from "apollo-link-ws";
import { split } from "apollo-link";
import { createHttpLink } from "apollo-link-http";
import { getMainDefinition } from "apollo-utilities";
import ws from 'websocket'
import Link from 'next/link';

const httpLink = createHttpLink({
  uri: "http://192.168.1.117/graphql",
  fetch
});
const wsLink = new WebSocketLink({
  uri: `ws://192.168.1.117/graphql`,
  options: {
    reconnect: true,
  },
  webSocketImpl: ws.client
});
const link = split(
  ({ query }) => {
    // const { kind, operation } = getMainDefinition(query);
    const definition = getMainDefinition(query);
    return definition.kind === "OperationDefinition" && definition.operation === "subscription";
  },
  wsLink,
  httpLink
);

const cache = new InMemoryCache();


const client = new ApolloClient({
  link,
  cache,
});

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <ul>
        <li><Link href="/login"><a href="/login">Login</a></Link></li>
        <li><Link href="/signup"><a href="/login">Sign Up</a></Link></li>
        <li><Link href="/communities"><a href="/communities">Communities</a></Link></li>
      </ul>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp
