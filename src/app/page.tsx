import { Hero } from "@/components/home/Hero";
import { About } from "@/components/home/About";
import { Experience } from "@/components/home/Experience";
import { Skills } from "@/components/home/Skills";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { Certificates } from "@/components/home/Certificates";
import { FeaturedBlogs } from "@/components/home/FeaturedBlogs";
import { Contact } from "@/components/home/Contact";

export default async function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Skills />
      <FeaturedProjects />
      <Certificates />
      <FeaturedBlogs />
      <Contact />
    </>
  );
}
