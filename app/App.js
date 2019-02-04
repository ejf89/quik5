import React from 'react';
import Fetch from 'react-fetch-component';
import { masterFetch } from './components/fetchModule'
import ExternalDeploy from './components/external-deploy'

import axios from 'axios';
import { AppProvider, Link, AccountConnection } from '@shopify/polaris';
import { EmptyState, Layout, Page, Heading, Subheading } from '@shopify/polaris';

// import dotenv from 'dotenv'
// dotenv.config();
// const {SHOPIFY_API_KEY, SHOPIFY_SECRET} = process.env;
// console.log("HERE");
// console.log("HERE");
// console.log("HERE");

//
import ApolloClient, {gql} from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import {Mutation} from 'react-apollo';


const client = new ApolloClient({
  fetchOptions: {
    credentials: 'include',
  },
});

const CREATE_PRODUCT = gql`
  mutation CreateProduct($product: ProductInput!) {
    productCreate(input: $product) {
      product {
        id
        title
      }
    }
  }
`;

export default function() {
  return (
    <ApolloProvider client={client}>

      <AppProvider apiKey={'27bf04c77437f1f1d1ce5496e1cb4467'} >
      <React.Fragment>
      <link rel="stylesheet" href="https://sdks.shopifycdn.com/polaris/3.6.0/polaris.min.css" />
      <h1>QuikSite 222222</h1>


                    <Page>
                    <Heading>Please enter a store base url and product handle</Heading>
                    <ExternalDeploy> </ExternalDeploy>
                    </Page>

      </React.Fragment>
      </AppProvider>
    </ApolloProvider>
  );
}
