
import AboutUsSection from '@/components/sections/about-us-section'
import { HeroBlock } from '@/components/sections/hero-block'
import { TestimonialsBlock } from '@/components/sections/testimonials-block'
import { ServicesGridBlock } from '@/components/sections/services-grid-block'


const page = () => {
  return (
    <div>
      <HeroBlock />
      <AboutUsSection />
      <ServicesGridBlock />
      <TestimonialsBlock />
    </div>
  )
}

export default page
