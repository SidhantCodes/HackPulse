import Link from "next/link"

const Footer = () => {
  return (
    <footer className='border-t'>
      <div className="flex-center wrapper flex-between flex flex-col p-5 gap-5 text-center sm:flex-row">
        <Link href='/'>
          <h1 className="text-xl">HackPulse</h1>
        </Link>
        <p>
          2023 HackPulse. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer