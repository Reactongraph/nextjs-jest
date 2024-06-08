// src/app/layout.js
import "./globals.css";
import client from '../../apollo-client'
// import dynamic from 'next/dynamic';

// const ApolloProviderComponent = dynamic(() => import('../../apollo-client').then((mod) => mod.ApolloProviderComponent), { ssr: false });

import React from "react";
import { ApolloProvider } from "@apollo/client";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* <ApolloProvider client={client}> */}
      <body>{children}</body>

      {/* </ApolloProvider> */}
    </html>
  );
}
