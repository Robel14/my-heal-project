import type { Metadata } from "next"
import VideosHero from "@/components/videos-hero"
import VideosGrid from "@/components/videos-grid"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ScrollToTop from "@/components/scroll-to-top"

export const metadata: Metadata = {
  title: "Videos | HEAL Ethiopia",
  description: "Watch videos from HEAL Ethiopia",
}

const videos = [
  {
    id: "video1",
    title: "HIWOT Ethiopia - Our Mission",
    description: "Learn about HIWOT Ethiopia's mission and vision for creating sustainable change.",
    thumbnail: "/placeholder.svg?height=200&width=350",
    youtubeId: "example1",
  },
  {
    id: "video2",
    title: "Education Programs in Action",
    description: "See how our education initiatives are transforming communities across Ethiopia.",
    thumbnail: "/placeholder.svg?height=200&width=350",
    youtubeId: "example2",
  },
  {
    id: "video3",
    title: "Healthcare Outreach",
    description: "Our healthcare teams bringing vital services to remote communities.",
    thumbnail: "/placeholder.svg?height=200&width=350",
    youtubeId: "example3",
  },
  {
    id: "video4",
    title: "Community Development Projects",
    description: "Witness the impact of our community-led development initiatives.",
    thumbnail: "/placeholder.svg?height=200&width=350",
    youtubeId: "example4",
  },
  {
    id: "video5",
    title: "Youth Empowerment Program",
    description: "How we're helping young people build skills and confidence for the future.",
    thumbnail: "/placeholder.svg?height=200&width=350",
    youtubeId: "example5",
  },
  {
    id: "video6",
    title: "Agricultural Training Initiative",
    description: "Farmers learning sustainable techniques to improve yields and food security.",
    thumbnail: "/placeholder.svg?height=200&width=350",
    youtubeId: "example6",
  },
]

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
