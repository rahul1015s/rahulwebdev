
import ProjectsSection from '@/components/sections/ProjectsSection'
import HeroSection from '@/components/sections/HeroSection'
import ProofOfWork from '@/components/sections/ProofOfWork'
import SkillsSection from '@/components/sections/SkillSection'
import AboutSection from '@/components/sections/AboutSection'
import ContactSection from '@/components/sections/ContactSection'
import BlogSection from '@/components/sections/BlogSection'


const page = () => {
  return (
    <div>
     <HeroSection />
    <ProofOfWork />
     <ProjectsSection />
     <SkillsSection />
     <AboutSection />
     <BlogSection />
     <ContactSection />
    </div>
  )
}

export default page
