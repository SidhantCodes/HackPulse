import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import NavItems from "./NavItems"

const MobileNav = () => {
  return (
    <nav className="md:hidden">
      <Sheet>
        <SheetTrigger className="align-middle">
          <Image src='/assets/icons/menu.svg' alt="menu" width={25} height={25} className="cursor-pointer"/>
        </SheetTrigger>
        <SheetContent className="flex flex-col bg-white md:hidden gap-6">
          <h1 className="text-xl">HackPulse</h1>
          <Separator className="border border-gray-50"/>
          <NavItems />
        </SheetContent>
      </Sheet>
    </nav>

  )
}

export default MobileNav