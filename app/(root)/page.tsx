import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-24">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="gap-8 flex flex-col justify-center">
            <h1 className="h1-bold">Pulsing with Hackathon Opportunities!</h1>
            <p className="p-regular-20 md:p-regular-24">Discover, track, and join hackathons near you. Empowering coders with the latest hackathon opportunities and updates.</p>
            <Button size='lg' asChild className="button w-full rounded-full sm:w-fit">
              <Link href="#hackathons">Explore Hacks</Link>
            </Button>
          </div>    
          <Image src='/assets/images/hero.png' height={1000} width={1000} alt="hero" className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh] rounded-xl"/>
        </div>
      </section>

      <section className="wrapper my-8 flex flex-col gap-8 md:gap-12" id="hackathons">
        <h2 className="h2-bold">
          Find the right <br /> hackathon for you
        </h2>
        <div className="flex w-full flex-col gap-5 md:flex-row">
          Search
          CategoryFilter
        </div>
      </section>
    </>
  );
}
