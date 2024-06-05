'use server'

import { revalidatePath } from 'next/cache'

import { connectToDB } from '../database'
import User from '../database/models/user.model'
import Order from '../database/models/order.model'
import Hack from '../database/models/hackathon.model'
import { handleError } from '@/lib/utils'

import { CreateUserParams, UpdateUserParams } from '@/types'

export async function createUser(user: CreateUserParams) {
  try {
    await connectToDB()

    const newUser = await User.create(user)
    return JSON.parse(JSON.stringify(newUser))
  } catch (error) {
    handleError(error)
  }
}

export async function getUserById(userId: string) {
  try {
    await connectToDB()

    const user = await User.findById(userId)

    if (!user) throw new Error('User not found')
    return JSON.parse(JSON.stringify(user))
  } catch (error) {
    handleError(error)
  }
}

export async function updateUser(clerkId: string, user: UpdateUserParams) {
  try {
    await connectToDB()

    const updatedUser = await User.findOneAndUpdate({ clerkId }, user, { new: true })

    if (!updatedUser) throw new Error('User update failed')
    return JSON.parse(JSON.stringify(updatedUser))
  } catch (error) {
    handleError(error)
  }
}

export async function deleteUser(clerkId: string) {
  try {
    await connectToDB()
    const userToDelete = await User.findOne({ clerkId })

    if (!userToDelete) {
      throw new Error('User not found')
    }

    await Promise.all([

      Hack.updateMany(
        { _id: { $in: userToDelete.Hacks } },
        { $pull: { organizer: userToDelete._id } }
      ),

      Order.updateMany({ _id: { $in: userToDelete.orders } }, { $unset: { buyer: 1 } }),
    ])

    const deletedUser = await User.findByIdAndDelete(userToDelete._id)
    revalidatePath('/')

    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null
  } catch (error) {
    handleError(error)
  }
}

export async function getUserIdByClerkId(clerkId: string) {
  try {
    await connectToDB()

    const user = await User.findOne({ clerkId: clerkId })

    if (!user) throw new Error('User not found')
    return user._id.toString()
  } catch (error) {
    handleError(error)
  }
}