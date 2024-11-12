Test technique Alternant Frontend React chez
BLIINK

Objectif:
Développer un site de news simple contenant deux pages principales : une page d’accueil et une
page article, avec des fonctionnalités pour afficher et filtrer les articles de presse en temps réel.
Fonctionnalités du Site

1.  Page d’accueil
    a. Afficher les articles phares du moment avec les informations suivantes : titre,
    date de publication, et image.
    b. Utiliser le point d’accès de l’API : https://newsapi.org/v2/top-headlines?country=fr
    c. Inclure la possibilité de filtrer les articles par catégorie parmi les suivantes :
    business, entertainment, health, science, sports, technology.
2.  Page article
    a. Afficher les détails de l’article sélectionné, incluant le titre, la date de publication,
    l’image, la description, et le corps de l’article.
    API
    ● Inscription nécessaire pour obtenir une clé API via NewsAPI.
    ● Utiliser cette clé pour récupérer les articles en temps réel.
    Contraintes Techniques
    ● Design:Libre, mais l’utilisation de kits CSS comme Bootstrap est interdite.
    ● Framework: Utilisation d’un framework frontend, avec une préférence pour React.js
    (Vue.js accepté).
    ● Typescript : L’utilisation de Typescript est un plus.
    ● Testsunitaires : L’ajout de tests unitaires (Jest, Cypress, etc.) est un plus.
    Livrable
    ● Fournir un repository Git contenant le code du projet

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

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

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
