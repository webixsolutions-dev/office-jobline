// Hero background photos used across the site.
// Sourced from Unsplash (images.unsplash.com), free-to-use under the Unsplash License.
const u = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1920&q=80`

export const heroImages = {
  home: u('photo-1758873268745-dd2cf0d677b5'), // team collaborating around a computer
  aboutUs: u('photo-1745015446589-7ee6f702d8c1'), // modern glass office building
  browse: u('photo-1486312338219-ce68d2c6f44d'), // person using laptop, job search
  employers: u('photo-1521791136064-7986c2920216'), // two people shaking hands
  postJob: u('photo-1758520144437-f068ecaf0d83'), // interview at office desk
  contactUs: u('photo-1499750310107-5fef28a66643'), // laptop, mug and phone on desk
}
