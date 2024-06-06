"use server"

import { handleError } from "@/lib/utils"
import { CreateEventParams, DeleteEventParams, GetAllEventsParams, GetEventsByUserParams, GetRelatedEventsByCategoryParams, UpdateEventParams } from "@/types"
import { connectToDB } from "../database"
import User from "../database/models/user.model"
import Hack from "../database/models/hackathon.model"
import Category from "../database/models/category.model"
import { revalidatePath } from "next/cache"
import { getUserIdByClerkId } from "./user.actions"

const populateHack = (query: any) => {
    return query
      .populate({ path: 'organizer', model: User, select: '_id firstName lastName' })
      .populate({ path: 'category', model: Category, select: '_id name' })
  }

export const createHack = async({ event, userId, path }: CreateEventParams) =>{
    try {
        await connectToDB();

        const organizer = await User.findById(userId);
        if(!organizer){
            throw new Error('Organizer does not exist')
        }
        
        const newHack = await Hack.create({
            ...event, category: event.categoryId, organizer: userId
        })

        return JSON.parse(JSON.stringify(newHack));
    } catch (error) {
        handleError(error);
    }
}


export const getHackById = async(eventId: string) => {
    try {
        await connectToDB();
        const hack = await populateHack(Hack.findById(eventId))
        if(!hack){
            throw new Error('Error not found')
        }
        return JSON.parse(JSON.stringify(hack));
    } catch (error) {
        handleError(error)
    }
}

export const getAllHacks = async({ query, limit=6, page, category }: GetAllEventsParams) => {
    try {
        await connectToDB();
        const conditions = {}
        const hackQuery = Hack.find(conditions).sort({ createdAt: 'desc' }).skip(0).limit(limit)

        const hacks = await populateHack(hackQuery);
        const hacksCount = await Hack.countDocuments(conditions);


        return {
            data: JSON.parse(JSON.stringify(hacks)),
            totalPages: Math.ceil(hacksCount/limit)
        }
    } catch (error) {
        handleError(error)
    }
}

export const deleteHackById = async({ eventId, path }: DeleteEventParams) => {
    try {
        await connectToDB();
        const deletedHack = await Hack.findByIdAndDelete(eventId);

        if(deletedHack){
            revalidatePath(path)
        }
    } catch (error) {
        handleError(error)
    }
}
export async function updateHack({ userId, event, path }: UpdateEventParams) {
    try {
        await connectToDB()

        const eventToUpdate = await Hack.findById(event._id)
        
        if (!eventToUpdate || eventToUpdate.organizer.toHexString() !== userId) {
            throw new Error('Unauthorized or event not found')
        }

    const updatedEvent = await Hack.findByIdAndUpdate(
        event._id,
        { ...event, category: event.categoryId },
        { new: true }
    )
    revalidatePath(path)

    return JSON.parse(JSON.stringify(updatedEvent))
    } catch (error) {
        handleError(error)
    }
}

export async function getRelatedHacksByCategory({
    categoryId,
    eventId,
    limit = 3,
    page = 1,
  }: GetRelatedEventsByCategoryParams) {
    try {
      await connectToDB()
  
      const skipAmount = (Number(page) - 1) * limit
      const conditions = { $and: [{ category: categoryId }, { _id: { $ne: eventId } }] }
  
      const eventsQuery = Hack.find(conditions)
        .sort({ createdAt: 'desc' })
        .skip(skipAmount)
        .limit(limit)
  
      const events = await populateHack(eventsQuery)
      const eventsCount = await Hack.countDocuments(conditions)
  
      return { data: JSON.parse(JSON.stringify(events)), totalPages: Math.ceil(eventsCount / limit) }
    } catch (error) {
      handleError(error)
    }
}

export async function getHacksByUser({ userId, limit = 6, page }: GetEventsByUserParams) {
  try {
    await connectToDB()

    const conditions = { organizer: userId }
    const skipAmount = (page - 1) * limit

    const eventsQuery = Hack.find(conditions)
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(limit)

    const events = await populateHack(eventsQuery)
    const eventsCount = await Hack.countDocuments(conditions)

    return { data: JSON.parse(JSON.stringify(events)), totalPages: Math.ceil(eventsCount / limit) }
  } catch (error) {
    handleError(error)
  }
}