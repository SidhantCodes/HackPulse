import { EventForm } from '@/components/shared'
import { getHackById } from '@/lib/mongodb/actions/hack.actions';
import { getUserIdByClerkId } from '@/lib/mongodb/actions/user.actions';
import { auth } from '@clerk/nextjs/server'

type UpdateEventProps = {
  params: {
    id: string
  }
}

const UpdateHack = async({ params: { id } }: UpdateEventProps) => {
  const { sessionClaims } = auth();
  const uid = sessionClaims?.userId as string;
  const userId = await getUserIdByClerkId(uid)

  const hack = await getHackById(id)
  return (
    <>
    <section className='bg-dotted-pattern bg-cover bg-center py-5 md:py-10 bg-primary-50'>
      <h3 className="wrapper h3-bold text-center sm:text-left">
        Update Hackathon
      </h3>
    </section>
    <div className="wrapper my-8">
      <EventForm userId={userId} type="Update" event={hack} eventId={hack._id} />
    </div>
    </>
  )
}

export default UpdateHack