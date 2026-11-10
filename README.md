# Sudharsan AJ, portfolio

Next.js 16 + Tailwind CSS 4 + MDX. Deploys to Vercel with no extra config.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

## Where to edit things

| What | File |
| --- | --- |
| Case study text | `src/content/work/skalx.mdx`, `datareveal.mdx`, `foodx.mdx` |
| Case study card info (title, role, timeline, tools, team) | the `meta` block at the top of each `.mdx` file |
| Order of case studies | `src/lib/work.ts` |
| Email, LinkedIn, résumé path, site URL, concept cards | `src/lib/site.ts` |
| About text and timeline | `src/components/Sections.tsx` (`About`) |
| Hero scroll story captions | `src/components/StoryHero.tsx` (`chapters`) |
| Colours and fonts | `src/app/globals.css` (`@theme`) and `src/app/layout.tsx` |

## Things you can use inside an `.mdx` file

```mdx
<Placeholder label="SkalX Ad Studio, main screen" />
<Placeholder label="Tall shot" ratio="4/5" />
<BeforeAfter before="Checkout, before" after="Checkout, after" />
<Todo>something still to write</Todo>
<Stats items={[{ value: "30%", label: "Less handoff time" }]} />
```

## Swapping a placeholder for a real screenshot

1. Put the image in `public/work/skalx/ad-studio.png`.
2. Replace the `<Placeholder ... />` line with:

```mdx
![SkalX Ad Studio, main screen](/work/skalx/ad-studio.png)
```

## Before you go live

- Search the project for `TODO` and fill each one in. They show up in lime on the site on purpose.
- Add your résumé as `public/resume.pdf`.
- Set `NEXT_PUBLIC_SITE_URL` in Vercel to your real domain, e.g. `https://sudharsanaj.com`.
