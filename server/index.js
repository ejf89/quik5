import dotenv from 'dotenv';
import Koa from 'koa';
var cors = require('koa-cors');
import session from 'koa-session';
import createShopifyAuth, {
  createVerifyRequest,
} from '@shopify/koa-shopify-auth';
import webpack from 'koa-webpack';
import graphQLProxy from '@shopify/koa-shopify-graphql-proxy';
import React from 'react';
import {renderToString} from 'react-dom/server';
import HTML from '@shopify/react-html';

import renderReactApp from './render-react-app';

dotenv.config();
const {SHOPIFY_API_KEY, SHOPIFY_SECRET} = process.env;

const app = new Koa();
app.use(session(app));
app.use(cors())

app.keys = [SHOPIFY_SECRET];

app.use(
  createShopifyAuth({
    apiKey: SHOPIFY_API_KEY,
    secret: SHOPIFY_SECRET,
    scopes: ['write_products'],
    afterAuth(ctx) {
      const {shop, accessToken} = ctx.session;

      console.log('We did it!', shop, accessToken);

      ctx.redirect('/');
    },
  }),
);

app.use(graphQLProxy)

app.use(createVerifyRequest());

app.use(webpack());

app.use(renderReactApp);

export default app;
