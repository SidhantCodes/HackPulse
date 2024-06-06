import { IEvent } from "@/lib/mongodb/database/models/hackathon.model"
import Card from "./Card"

type CollectionProps = {
	data: IEvent[],
	emptyTitle: string,
	emptyStateSubText: string,
	limit: number,
	page: number | string,
	totalPages?: number,
	urlParamName?: string,
	collectionType?: 'Events_Organized' | 'My_Tickets' | 'All_Hacks'
}

const Collection = ({
	data,
	emptyTitle,
	emptyStateSubText,
	collectionType,
	limit,
	page,
	totalPages = 0,
	urlParamName
}: CollectionProps) => {
  return (
    <>
      {data.length>0 ? (
        <div className="flex flex-col items-center gap-10">
          <ul className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
            {data.map((hack) => {
              const hasOrderLink = collectionType === 'Events_Organized'
              const hidePrice = collectionType === 'My_Tickets'
              return (
                <li key={hack._id} className="flex justify-center">
                  <Card hack={hack} hasOrderLink={hasOrderLink} hidePrice={hidePrice}/>
                </li>
              )
            })}
          </ul>
        </div>
      ):(
        <div className="flex-center wrapper min-h-[200px] gap-3 rounded-[14px] bg-gray-50 py-28 text-center w-full flex-col">
          <h3 className="p-bold-20 md:h5-bold">{emptyTitle} ://</h3>
          <p className="p-regular-14">{emptyStateSubText}</p>
        </div>
      )
      }
    </>
  )
}

export default Collection