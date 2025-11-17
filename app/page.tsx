import { Home } from "./components/home";
import { About } from "./components/about";
import { Gallery } from "./components/gallery";
import { Prints } from "./components/prints";
import { Pricing } from "./components/pricing";
import { Testimonials } from "./components/testimonials";
import { Contact } from "./components/contact";

const sections = [
  { id: "home", Component: Home },
  { id: "about", Component: About },
  { id: "gallery", Component: Gallery },
  { id: "prints", Component: Prints },
  { id: "pricing", Component: Pricing },
  { id: "testimonials", Component: Testimonials },
  { id: "contact", Component: Contact },
];

export default function Page() {
  return (
    <>
      {sections.map(({ id, Component }) => (
        <section id={id} key={id}>
          <Component />
        </section>
      ))}
    </>
  );
}