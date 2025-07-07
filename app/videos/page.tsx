import VideosHero from "@/components/videos-hero"
import VideosGrid from "@/components/videos-grid"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ScrollToTop from "@/components/scroll-to-top"

export default function VideosPage() {
  return (
    <>
      <Navbar />
      <main>
        <VideosHero />
        <VideosGrid />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  )
}
