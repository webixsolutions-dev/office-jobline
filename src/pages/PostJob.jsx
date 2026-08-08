

import React from 'react'
import PostJobHero from '../components/postJob/PostJobHero'
import HowPostingWorks from '../components/postJob/HowPostingWorks'
import PricingPlans from '../components/postJob/PricingPlans'
import CTAFAQ from '../components/postJob/CTAFAQ'

const PostJob = () => {
  return (
    <div>
      <PostJobHero />

      <HowPostingWorks />
      <PricingPlans />
      <CTAFAQ />
    </div>
  )
}

export default PostJob