"use client";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { HackFormSchema } from "@/lib/validator"
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { eventDefaultValues } from "@/constants";
import DropDown from "./DropDown";
import { Textarea } from "@/components/ui/textarea"
import { FileUploader } from "./FileUploader";
import { useState } from "react";
import Image from "next/image";
import DatePicker from 'react-datepicker';
import { Checkbox } from "@/components/ui/checkbox"
import { useUploadThing } from "@/lib/uploadthing";

import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/navigation";
import { createHack, updateHack } from "@/lib/mongodb/actions/hack.actions";
import { IEvent } from "@/lib/mongodb/database/models/hackathon.model";
import { getUserIdByClerkId } from "@/lib/mongodb/actions/user.actions";

type EventFormProps = {
  userId: string
  type: "Create" | "Update"
  event?: IEvent,
  eventId?: string
}



const EventForm = ({ userId, type, event, eventId }: EventFormProps) => {
  const router = useRouter();
  const initVal = event && type==='Update' ? {
    ...event,
    startDateTime: new Date(event.startDateTime),
    endDateTime: new Date(event.endDateTime)
  } : eventDefaultValues;
  const { startUpload } = useUploadThing('imageUploader')
  const form = useForm<z.infer<typeof HackFormSchema>>({
    resolver: zodResolver(HackFormSchema),
    defaultValues: initVal
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof HackFormSchema>) {
    let uploadedImgUrl = values.imageUrl;
    if(files.length > 0){
      const uploadedImages = await startUpload(files)
      if(!uploadedImages){
        return
      }
      uploadedImgUrl = uploadedImages[0].url
    }
    if(type==='Create'){
      try {
        const newHack = await createHack({
          event: { ...values, imageUrl: uploadedImgUrl },
          userId,
          path: '/profile'
        });
        if(newHack){
          form.reset();
          router.push(`/hacks/${newHack._id}`)
        }
      } catch (error) {
        console.log(error)
      }
    }else if(type==='Update'){
      if(!eventId){
        router.back()
        return;
      }
      try {
        const updatedHack = await updateHack({
          event: { ...values, imageUrl: uploadedImgUrl, _id: eventId },
          userId,
          path: `/hacks/${eventId}`
        });
        if(updatedHack){
          form.reset();
          router.push(`/hacks/${updatedHack._id}`)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  const [files, setFiles] = useState<File[]>([])
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input placeholder="Hackathon Title" {...field} className="input-field" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <DropDown onchangehandler={field.onChange} value={field.value} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-72">
                  <Textarea placeholder="Description" {...field} className="textarea rounded-2xl"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <FileUploader onFieldChange={field.onChange} imageUrl={field.value} setFiles={setFiles}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                    <Image src='/assets/icons/location-grey.svg' alt='calender' width={25} height={25}/>
                    <Input placeholder="Hackathon Location or Online" {...field} className="input-field" />
                  </div>
                  
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="startDateTime"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                    <Image
                      src="/assets/icons/calendar.svg"
                      alt="calendar"
                      width={24}
                      height={24}
                      className="filter-grey"
                    />
                    <p className="ml-3 whitespace-nowrap text-grey-600">Start Date:</p>
                    <DatePicker selected={field.value} onChange={(date: Date) => field.onChange(date)} showTimeSelect timeInputLabel="Time:" dateFormat='dd/MM/yyyy h:mm aa' wrapperClassName="datePicker" />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endDateTime"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                    <Image
                      src="/assets/icons/calendar.svg"
                      alt="calendar"
                      width={24}
                      height={24}
                      className="filter-grey"
                    />
                    <p className="ml-3 whitespace-nowrap text-grey-600">End Date:</p>
                    <DatePicker selected={field.value} onChange={(date: Date) => field.onChange(date)} showTimeSelect timeInputLabel="Time:" dateFormat='dd/MM/yyyy h:mm aa' wrapperClassName="datePicker" />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                    <Image
                      src="/assets/icons/dollar.svg"
                      alt="dollar"
                      width={24}
                      height={24}
                      className="filter-grey"
                    />
                    <Input type="number" placeholder="Price" {...field} className="p-regular-16 border-0 bg-gray-50 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0" />
                    <FormField
                      control={form.control}
                      name="isFree"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="flex items-center">
                              <label htmlFor="isFree" className="whitespace-nowrap pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-65">Free?</label>
                              <Checkbox onCheckedChange={field.onChange} checked={field.value} id="isFree" className="mr-2 h-5 w-5 border-2 border-primary-500"/>
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                    <Image src='/assets/icons/link.svg' alt='link' width={25} height={25}/>
                    <Input placeholder="Hackathon URL" {...field} className="input-field" />
                  </div>
                  
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button size='lg' disabled={form.formState.isSubmitting} className="button col-span-2 w-full" type="submit">
          {form.formState.isSubmitting? 'Submitting...' : `${type} Hackathon`}
        </Button>
      </form>
    </Form>
    )
}

export default EventForm