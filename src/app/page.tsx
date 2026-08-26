import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { FontTool } from "@/components/font-tool";
import { SeoContentV2 } from "@/components/seo-content-v2";
import { Footer } from "@/components/footer";
import { ScrollToTop } from "@/components/scroll-to-top";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <Hero />
        <div className="pt-4 sm:pt-6">
          <FontTool />
        </div>
        <SeoContentV2 />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
