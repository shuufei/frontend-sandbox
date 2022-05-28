/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { App } from './app/app';

const app = express();

app.get('/', (req, res) => {
  res.send(renderPage(<App />));
});

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);

const pageTemplate = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta
      name="description"
      content="SSR result"
    />
    <title>React App</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
`;

function renderPage(reactComponent: React.ReactElement) {
  //   const reactHtml = renderToString(<App />);
  //   const htmlTemplate = `<!DOCTYPE html>
  // <html>
  //     <head>
  //         <title>Universal React server bundle</title>
  //     </head>
  //     <body>
  //         <div id="app">${reactHtml}</div>
  //         <script src="public/client.bundle.js"></script>
  //     </body>
  // </html>`;
  //   res.send(htmlTemplate);

  const renderedComponent = renderToString(reactComponent);
  return pageTemplate.replace(
    '<div id="root"></div>',
    `<div id="root">${renderedComponent}</div>`
  );
}
