import type { MDXComponents } from "mdx/types";
import { BeforeAfter, Placeholder, Stats, Todo } from "@/components/ui";
import {
  ChecklistVsBasket,
  DesignSystemSheet,
  FinanceDashboard,
  Flow,
  FoodXScreens,
  Grid,
  Prototype,
  Recreated,
  Shift,
  Shot,
} from "@/components/visuals";

// Styles for every case study. Components listed here can be used in any .mdx file
// without importing them: <Placeholder />, <BeforeAfter />, <Todo />, <Stats />.
const components: MDXComponents = {
  h2: ({ children }) => (
    <h2 className="mt-24 mb-6 scroll-mt-24 text-3xl font-medium tracking-tight md:text-5xl">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-12 mb-3 text-xl font-medium tracking-tight md:text-2xl">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="my-5 max-w-[68ch] text-lg leading-relaxed text-paper/80">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="my-5 max-w-[68ch] space-y-2 text-lg leading-relaxed text-paper/80">
      {children}
    </ul>
  ),
  li: ({ children }) => (
    <li className="relative pl-6 before:absolute before:left-0 before:text-lime before:content-['→']">
      {children}
    </li>
  ),
  strong: ({ children }) => <strong className="font-medium text-paper">{children}</strong>,
  a: ({ children, href }) => (
    <a href={href} className="text-lime underline decoration-lime/40 underline-offset-4 hover:decoration-lime">
      {children}
    </a>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-10 border-l-2 border-lime pl-6 text-2xl leading-snug tracking-tight text-paper md:text-3xl">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-16 border-line" />,
  Placeholder: (props) => (
    <div className="my-10">
      <Placeholder {...props} />
    </div>
  ),
  BeforeAfter,
  Todo,
  Stats,
  Shot,
  Recreated,
  Flow,
  Shift,
  Grid,
  Prototype,
  FinanceDashboard,
  DesignSystemSheet,
  FoodXScreens,
  ChecklistVsBasket,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
