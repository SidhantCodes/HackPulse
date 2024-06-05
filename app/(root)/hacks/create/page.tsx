import { EventForm } from '@/components/shared'
import { getUserIdByClerkId } from '@/lib/mongodb/actions/user.actions';
import { auth } from '@clerk/nextjs/server';

const CreateHack = async () => {
  const { sessionClaims } = auth();
  const clerkUserId = sessionClaims?.userId as string;
  const userId = await getUserIdByClerkId(clerkUserId)
  return (
    <>
    <section className='bg-dotted-pattern bg-cover bg-center py-5 md:py-10 bg-primary-50'>
      <h3 className="wrapper h3-bold text-center sm:text-left">
        Create/Organize a Hackathon
      </h3>
    </section>
    <div className="wrapper my-8">
      <EventForm userId={userId} type="Create" />
    </div>
    </>
  )
}

export default CreateHack