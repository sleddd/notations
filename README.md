Re-vamp of an old react-based headless WordPress journaling application to work with Next.js 14, Next-Auth.js 4, and WP GraphQL. It is a completely separate application that relies on WordPress for the pre-built WP GraphQL API only to make building and maintaing the backend faster. 

## Work In Progress

[Next.js 14](https://nextjs.org)
[Next-Auth.js 4](https://next-auth.js.org)
[React 18]((https://react.dev/versions)
[WP GraphQL](https://www.wpgraphql.com)

---

## Getting Started

First, setup your env.local with the following values: 

NOTATIONS_GQL_URL={Your WP GraphQL endpoint}
NOTATIONS_SECRET={Used for Next JWT signing - you can generate it at command line by running "openssl rand -base64 32"}

Second, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
