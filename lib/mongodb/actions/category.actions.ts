"use server"

import { handleError } from "@/lib/utils"
import { CreateCategoryParams } from "@/types"
import { connectToDB } from "../database"
import Category from "../database/models/category.model"

export const createCategory = async ({ categoryName }: CreateCategoryParams) => {
    try {
        await connectToDB()
        const newCat = await Category.create({ name: categoryName })
        return JSON.parse(JSON.stringify(newCat));
    } catch (error) {
        handleError(error)
    }
}

export const getAllCategories = async () => {
    try {
        await connectToDB()
        const allCat = await Category.find()
        return JSON.parse(JSON.stringify(allCat));
    } catch (error) {
        handleError(error)
    }
}