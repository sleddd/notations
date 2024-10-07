## Notations
Re-vamp of an old React-based headless WordPress journaling application to work with Next.js 14, NextAuth 4, and WP GraphQL. It is a completely separate application that relies on WordPress for the pre-built GQL API and backend.

It is currently a work in progress for both design and code.

## Libraries and Frameworks
![Next 14](https://img.shields.io/badge/Next%2014-black)
![NextAuth 4](https://img.shields.io/badge/NextAuth%204-purple)
![React 18](https://img.shields.io/badge/React%2018-teal)
![WordPress](https://img.shields.io/badge/WordPress-blue)
![WP GraphQL](https://img.shields.io/badge/WP%20GraphQL-blue)

<img width="1324" alt="Screenshot 2024-10-06 at 8 24 32 PM" src="https://github.com/user-attachments/assets/7ebe68eb-18e2-4aa1-9b33-0a485eb0de98">

---

## A note on the WP backend
For this to work with your WP website, you will need to have installed and configured the following plugins: 
- WP GraphQL Plugin (https://www.wpgraphql.com/)
- WP GraphQL Upload Plugin (https://github.com/dre1080/wp-graphql-upload)
- WP GraphQL CORS plugin (https://github.com/funkhaus/wp-graphql-cors)
- WP GraphQL JWT Authentication (https://github.com/wp-graphql/wp-graphql-jwt-authentication)

Also, note that for now, this is currently using custom mutations for uploading and setting a featured image outlined here:\
https://gist.github.com/sleddd/dafe1f8e0f392ec9f1c142b914a680c2

You also need to add theme and post format support:\
add_theme_support( 'post-formats', array( 'standard', 'link', 'image' ) );\
add_theme_support('post-thumbnails');\
add_post_type_support('post', 'thumbnail');

---

## Getting Started

First, setup your env.local with the following values: 

NOTATIONS_GQL_URL={Your WP GraphQL endpoint}\
NOTATIONS_SECRET={Used for Next JWT signing - you can generate it at command line by running "openssl rand -base64 32"} and it is part of the JWT setup process.

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
