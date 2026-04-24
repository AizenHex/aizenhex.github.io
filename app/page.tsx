import { Header } from "@/components/Header"
import { Hero } from "@/components/Hero"
import { About } from "@/components/About"
import { Experience } from "@/components/Experience"
import { Work } from "@/components/Work"
import { Writing } from "@/components/Writing"
import { Contact } from "@/components/Contact"
import { Footer } from "@/components/Footer"

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
        <About />
        <Experience />
        <Work />
        <Writing />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
