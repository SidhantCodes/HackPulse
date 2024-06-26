import { getHackById, getRelatedHacksByCategory } from "@/lib/mongodb/actions/hack.actions"
import { formatDateTime } from "@/lib/utils";
import { SearchParamProps } from "@/types"
import { Collection } from "@/components/shared";
import Image from "next/image";
const EventDetails = async({ params: { id }, searchParams }: SearchParamProps) => {
  
  const hack = await getHackById(id);
  const relatedHacks = await getRelatedHacksByCategory({
    categoryId: hack.category._id,
    eventId: hack._id,
    page: searchParams.page as string
  })
  return (
    <>
    <section className="flex justify-center bg-primary-50 bg-dotted-pattern bg-contain">
      <div className="grid grid-cols-1 md:grid-cols-2 2x:max-w-7xl">
        <Image src={hack.imageUrl} alt='hero' width={1000} height={1000} className="h-full min-h-[300px] object-cover object-center"/>
        <div className="flex w-full flex-col gap-8 p-5 md:p-10">
          <div className="flex flex-col gap-6">
            <h2 className="h2-bold">{hack.title}</h2>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex gap-3">
                <p className="p-bold-20 rounded-full bg-green-500/10 px-5 py-2 text-green-700">
                {hack.isFree? 'FREE' : `${hack.price}` }
                </p>
                <p className="p-medium-16 rounded-full bg-grey-500/10 px-4 py-2.5 text-grey-500">
                  {hack.category.name}
                </p>
              </div>
              <p className="p-medium-18 ml-2 mt-2 sm:mt-0">
                by{' '}
                <span className="text-primary-500">{hack.organizer.firstName} {hack.organizer.lastName}</span>
              </p>
            </div>
          </div>

          {/* <CheckoutButton event={event} /> */}

          <div className="flex flex-col gap-5">
            <div className="flex gap-2 md:gap-3">
              <Image src="/assets/icons/calendar.svg" alt="calendar" width={32} height={32} />
              <div className="p-medium-16 lg:p-regular-20 flex flex-wrap items-center">
              <p>
                  {formatDateTime(new Date(hack.startDateTime)).dateOnly} - {' '}
                  {formatDateTime(new Date(hack.startDateTime)).timeOnly}
                </p>
                <p>
                  {formatDateTime(new Date(hack.endDateTime)).dateOnly} - {' '}
                  {formatDateTime(new Date(hack.endDateTime)).timeOnly}
                </p>
              </div>
            </div>
            <div className="p-regular-20 flex items-center gap-3">
              <Image src="/assets/icons/location.svg" alt="location" width={32} height={32} />
              <p className="p-medium-16 lg:p-regular-20">{hack.location}</p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="p-bold-20 text-grey-600">What You'll Learn:</p>
            <p className="p-medium-16 lg:p-regular-18">{hack.description}</p>
            <p className="p-medium-16 lg:p-regular-18 truncate text-primary-500 underline">{hack.url}</p>
          </div>
        </div>
      </div>
    </section>
    <section className="wrapper my-8 flex flex-col gap-8 md:gap-12">
      <h2 className="h2-bold">Related Hackathon</h2>  
      <Collection 
          data = {relatedHacks?.data}
          emptyTitle = "No related hackathons found"
          emptyStateSubText = 'Check back later for more hackathons!'
          collectionType = 'All_Hacks'
          limit={5}
          page={1}
          totalPages={2}
        />
    </section>
    </>
  )
}

export default EventDetails