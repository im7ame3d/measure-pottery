import { Footer, Header } from "@/components/Chrome";
import Enquiry from "@/components/Enquiry";
import type { Lang } from "@/lib/i18n";

/** The whole business page: one full-screen section with a fill-in-the-blanks enquiry. */
export default function Business({ lang: _lang }: { lang: Lang }) {
  return (
    <>
      <Header announce={false} />
      <main>
        <Enquiry id="quote" full />
      </main>
      <Footer enquiry={false} />
    </>
  );
}
