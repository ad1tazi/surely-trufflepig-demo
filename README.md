# Surely Search

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://Surely.com/vercel/next.js/tree/canary/packages/create-next-app).

## Features

- Search for Surely Work job listings using natural language.
- Uses [Trufflepig](https://www.trufflepig.ai/), an end to end semantic search API, to index Surely Work job listings and provide accurate search results.

## Getting Started

First, run the development server:

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## How does trufflepig integrate with this application?
You can see how trufflepig is used in `app/api/search/route.ts`

The client of this Next.js application uses the `search` function in `app/search.tsx` to make a request to `app/api/search/route.ts`
`app/api/search/route.ts` contains logic for querying the trufflepig API and parsing the results into a format that can be displayed in the application.

## Indexing Surely job listings

To see how we indexed the job listings, check out [this notebook](https://colab.research.google.com/drive/1jHsmuUFFDKaV-b0zybm_H4pnDXIg9cio?usp=sharing).

### Contact
Reach out to us at adam@trufflepig.ai if you have any questions!