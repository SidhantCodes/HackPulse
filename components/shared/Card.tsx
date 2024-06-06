import { IEvent } from "@/lib/mongodb/database/models/hackathon.model"
import { formatDateTime } from "@/lib/utils";
import Link from "next/link"
import Image from "next/image";
import { getUserIdByClerkId } from '@/lib/mongodb/actions/user.actions';
import { auth } from '@clerk/nextjs/server';
import { DeleteConfirmation } from "./DeleteConfirmation";


type CardProps = {
    hack: IEvent,
    hasOrderLink?: boolean,
    hidePrice?: boolean
}

const Card = async({ hack, hasOrderLink, hidePrice } : CardProps) => {

  const { sessionClaims } = auth();
  const clerkUserId = sessionClaims?.userId as string;
  const userId = await getUserIdByClerkId(clerkUserId);
  const isHackCreator = hack.organizer._id === userId;

  return (
    <div className="group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md  transition-all hover:shadow-lg  md:min-h-[438px]">
      <Link 
        href={`/hacks/${hack._id}`}
        style={{backgroundImage: `url(${hack.imageUrl})`}}
        className="flex-center flex-grow bg-gray-50 bg-cover bg-center text-gray-500"
      />
        {isHackCreator && !hidePrice && (
          <div className="absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-white p-3 shadow-sm transition-all">
            <Link href={`/hacks/${hack._id}/update`}>
              <Image src="/assets/icons/edit.svg" width={20} height={20} alt="edit" />
            </Link>
            <DeleteConfirmation hackId={hack._id}/>
          </div>
        )}
      <Link
        href={`/hacks/${hack._id}`}
        className="flex min-h-[230px] flex-col gap-3 p-5 md:gap-4"
      > 
        {
          !hidePrice &&  <div className="flex gap-2">
          <span className="p-semibold-14 rounded-full w-min bg-green-100 px-4 py-1 text-green-600">{hack.isFree? 'Free' : `$${hack.price}`}</span>
          <p className="line-clamp-1 p-semibold-14 w-fit rounded-full bg-grey-500/10 px-4 py-1 text-gray-500">{hack.category.name}</p>
        </div>
        }
        <p className="p-medium-16 p-medium-18 text-gray-500">
          {formatDateTime(new Date(hack.startDateTime)).dateTime}
        </p>
        <p className="p-medium-16 md:p-medium-20 line-clamp-2 flex-1 text-black">
          {hack.title}
        </p>
        <div className="flex-between w-full">
          <p className="p-medium-14 md:p-medium-16 text-gray-600">
            {hack.organizer.firstName} {hack.organizer.lastName}
          </p>
          {hasOrderLink && (
            <Link href={`/orders?hackId=${hack._id}`} className="flex gap-2">
              <p className="text-primary-500">Order Details</p>
              <Image src="/assets/icons/arrow.svg" width={10} height={10} alt="search" />
            </Link>
          )}
        </div>
      </Link>
    </div>
  )
}

export default Card