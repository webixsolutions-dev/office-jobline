/** High-quality photography (Unsplash License). Local public/*.webp files were too small for hero widths. */
const photo = (id, params = 'w=2000&q=80') =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&${params}`

export const images = {
  aboutHero: photo('photo-1497366216548-37526070297c'),
  aboutMission: photo('photo-1600880292203-757bb62b4baf'),
  testimonialJessica: photo('photo-1573496359142-b8d87734a5a2', 'w=800&h=800&q=80&crop=faces'),
  testimonialMark: photo('photo-1560250097-0b93528c311a', 'w=800&h=800&q=80&crop=faces'),
  browseHero: photo('photo-1486312338219-ce68d2c6f44d'),
  contactHero: photo('photo-1497366811353-6870744d04b2'),
  employersHero: photo('photo-1522071820081-009f0129c71c'),
  homeHero: photo('photo-1556761175-4b46a572b786'),
  homeHowItWorks: photo('photo-1600880292089-90a7e086ee0c'),
  articleResumeTips: photo('photo-1586281380349-632531db7ed4', 'w=1200&q=80'),
  articleInterviewTips: photo('photo-1573497019940-1c28c88b4f3e', 'w=1200&q=80'),
  articleHiringSupport: photo('photo-1552664730-d307ca884978', 'w=1200&q=80'),
  postJobHero: photo('photo-1497366754035-f200968a6e72'),
  signInHero: photo('photo-1497366216548-37526070297c'),
  // Static placeholder map for Visit Our Office — not a live Maps API embed.
  officeMap: '/map-toronto.svg',
}
