## Notations
Re-vamp of an old React-based headless WordPress journaling application to work with Next.js 14, NextAuth 4, and WP GraphQL. It is a completely separate application that relies on WordPress for the pre-built GQL API and backend. 

## Still a Work In Progress
![Next 14](https://img.shields.io/badge/Next%2014-black)
![NextAuth 4](https://img.shields.io/badge/NextAuth%204-purple)
![React 18](https://img.shields.io/badge/React%2018-teal)
![WP GraphQL](https://img.shields.io/badge/WP%20GraphQL-blue)

---

## Getting Started

First, setup your env.local with the following values: 

NOTATIONS_GQL_URL={Your WP GraphQL endpoint}\
NOTATIONS_SECRET={Used for Next JWT signing - you can generate it at command line by running "openssl rand -base64 32"}\

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
