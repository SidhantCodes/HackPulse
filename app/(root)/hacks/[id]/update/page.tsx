import { EventForm } from '@/components/shared'
import { auth } from '@clerk/nextjs/server'
import React from 'react'

const UpdateHack = () => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  return (
    <>
    <section className='bg-dotted-pattern bg-cover bg-center py-5 md:py-10 bg-primary-50'>
      <h3 className="wrapper h3-bold text-center sm:text-left">
        Update Hackathon
      </h3>
    </section>
    <div className="wrapper my-8">
      <EventForm userId={userId} type="Update" />
    </div>
    </>
  )
}

export default UpdateHack