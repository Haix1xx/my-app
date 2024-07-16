This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started
## Follow these steps to start the development server:

### Firstly, create a `.env` file like this template:

```bash
NEXT_PUBLIC_DOMAIN=YOUR_DOMAIN
NEXT_PUBLIC_API_DOMAIN=YOUR_API_DOMAIN
MONGO_URI=YOUR_MONGODB_URI
DATABASE_PASSWORD=YOUR_MONGO_PASSWORD
NEXTAUTH_SECRET=YOUR_SECRET
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=YOUR_CLOUDINARY_NAME
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=YOUR_CLOUDINARY_UPLOAD_PRESET
NEXT_PUBLIC_CLOUDINARY_SECRET=YOUR_CLOUDINARY_SECRET
NEXT_PUBLIC_CLOUDINARY_URL=YOUR_CLOUDINARY_URL
```

### Secondly, install all required packages

```bash
npm install
#or
yarn install
```

### Finally, run the development server:

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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
