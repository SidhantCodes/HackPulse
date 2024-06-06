import { GetOrdersByUserParams } from "@/types"
import { connectToDB } from "../database"
import Order from "../database/models/order.model"
import User from "../database/models/user.model"
import { handleError } from "@/lib/utils"
import Hack from "../database/models/hackathon.model"


export async function getOrdersByUser({ userId, limit = 3, page }: GetOrdersByUserParams) {
    try {
      await connectToDB()
  
      const skipAmount = (Number(page) - 1) * limit
      const conditions = { buyer: userId }
  
      const orders = await Order.distinct('event._id')
        .find(conditions)
        .sort({ createdAt: 'desc' })
        .skip(skipAmount)
        .limit(limit)
        .populate({
          path: 'hacks',
          model: Hack,
          populate: {
            path: 'organizer',
            model: User,
            select: '_id firstName lastName',
          },
        })
  
      const ordersCount = await Order.distinct('event._id').countDocuments(conditions)
  
      return { data: JSON.parse(JSON.stringify(orders)), totalPages: Math.ceil(ordersCount / limit) }
    } catch (error) {
      handleError(error)
    }
  }