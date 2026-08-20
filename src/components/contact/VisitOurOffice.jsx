import { GiMapleLeaf } from 'react-icons/gi'
import { HiOutlineClock, HiOutlineMapPin } from 'react-icons/hi2'
import InfoCard from '../ui/InfoCard'
import MapCard from '../ui/MapCard'
import { contactInfo } from '../../constants/contactInfo'

export default function VisitOurOffice() {
  return (
    <section className="bg-offwhite" aria-labelledby="visit-office-heading">
      <div className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.2fr)_minmax(0,0.9fr)]">
          <div className="flex flex-col gap-5">
            <div>
              <h2 id="visit-office-heading" className="font-display text-3xl font-bold text-navy sm:text-4xl">
                Visit Our Office
              </h2>
              <p className="mt-3 text-base leading-relaxed text-muted">
                We&apos;d love to connect in person. Stop by our office or get in touch with our team.
              </p>
            </div>
            <InfoCard
              icon={HiOutlineMapPin}
              title={contactInfo.name}
              description={contactInfo.officeAddress}
              footer={
                <p className="flex items-start gap-2 text-sm text-navy">
                  <GiMapleLeaf className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden />
                  Proudly supporting employers and job seekers across Canada.
                </p>
              }
            />
          </div>

          <MapCard />

          <InfoCard
            icon={HiOutlineClock}
            title="Office Hours"
            description={`${contactInfo.hoursDetail.days}, ${contactInfo.hoursDetail.time}`}
            footer={<p className="text-sm text-muted">{contactInfo.hoursDetail.note}</p>}
          />
        </div>
      </div>
    </section>
  )
}
