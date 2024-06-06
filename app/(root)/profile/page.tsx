import { Collection } from '@/components/shared'
import { Button } from '@/components/ui/button'
import { getHacksByUser } from '@/lib/mongodb/actions/hack.actions';
import { getUserIdByClerkId } from '@/lib/mongodb/actions/user.actions';
import { auth } from '@clerk/nextjs/server';
import Link from 'next/link'

const ProfilePage = async() => {
  const { sessionClaims } = auth();
  const clerkUserId = sessionClaims?.userId as string;
  const userId = await getUserIdByClerkId(clerkUserId)
  // console.log(userId)
  const organizedHacks = await getHacksByUser({ userId, page:1 })
  return (
    <>
      {/* my orders */}
      <section className='bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10'>
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-cetner sm:text-left">
            My Orders
          </h3>
          <Button asChild size='lg' className='button hidden sm:flex'>
            <Link href='/#hacks'>Explore more hacks</Link>
          </Button>
        </div>
      </section>
      {/* <section className='wrapper my-8'>
      <Collection 
          data = {hacks?.data}
          emptyTitle = "No hackathons tickets purchased"
          emptyStateSubText = 'Go buy something buckaroo ://'
          collectionType = 'My_Tickets'
          limit={3}
          page={1}
          urlParamName='ordersPage'
          totalPages={2}
        />
      </section> */}
      <section className='bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10'>
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-cetner sm:text-left">
            Hacks Organised
          </h3>
          <Button asChild size='lg' className='button hidden sm:flex'>
            <Link href='/hacks/create'>Oragnise a hack</Link>
          </Button>
        </div>
      </section>
      <section className='wrapper my-8'>
      <Collection 
          data = {organizedHacks?.data}
          emptyTitle = "No hackathons have been organised"
          emptyStateSubText = 'Go organize something buckaroo ://'
          collectionType = 'Events_Organized'
          limit={6}
          page={1}
          urlParamName='eventsPage'
          totalPages={2}
        />
      </section>
    </>
  )
}

export default ProfilePage