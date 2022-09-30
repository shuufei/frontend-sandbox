import flag from 'country-code-emoji';

export const template = (cf: Request['cf']) => {
  const emoji = cf?.country && flag(cf.country);
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Cloudflare Worker Sample 20220930</title>
      </head>
      <body>
        <h1>Hellow World from ${cf?.city} in ${cf?.country} ${emoji}</h1>
        <h2>Cloudflare Worker Sample 202209030</h2>
      </body>
    </html>
`;
};
