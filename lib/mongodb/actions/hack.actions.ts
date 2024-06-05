"use server"

import { handleError } from "@/lib/utils"
import { CreateEventParams } from "@/types"
import { connectToDB } from "../database"
import User from "../database/models/user.model"
import Hack from "../database/models/hackathon.model"

export const createHack = async({ event, userId, path }: CreateEventParams) =>{
    try {
        await connectToDB();

        const organiser = await User.findById(userId);
        if(!organiser){
            throw new Error('Organizer does not exist')
        }
        
        const newHack = await Hack.create({
            ...event, category: event.categoryId, organiser: userId
        })

        return JSON.parse(JSON.stringify(newHack));
    } catch (error) {
        handleError(error);
    }
}