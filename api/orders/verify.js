import crypto from 'node:crypto'
import { eq } from 'drizzle-orm'
import { getDatabase } from '../db.js'
import { orders } from '../../db/schema.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  const { razorpay_order_id: razorpayOrderId, razorpay_payment_id: razorpayPaymentId, razorpay_signature: razorpaySignature } = req.body || {}
  const secret = process.env.RAZORPAY_KEY_SECRET
  if (!secret || !razorpayOrderId || !razorpayPaymentId || !razorpaySignature) return res.status(400).json({ error: 'Invalid payment details.' })
  const expected = crypto.createHmac('sha256', secret).update(`${razorpayOrderId}|${razorpayPaymentId}`).digest('hex')
  if (expected.length !== razorpaySignature.length || !crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(razorpaySignature))) return res.status(400).json({ error: 'Payment verification failed.' })

  try {
    const db = getDatabase()
    const [order] = await db.update(orders).set({ razorpayPaymentId, razorpaySignature, paymentStatus: 'Paid' }).where(eq(orders.razorpayOrderId, razorpayOrderId)).returning()
    if (!order) return res.status(404).json({ error: 'Order was not found.' })
    return res.status(200).json({ order: { id: order.orderNumber, items: order.items, subtotal: order.subtotal, deliveryFee: order.deliveryFee, discount: order.discount, total: order.total / 100, paymentMethod: order.paymentMethod, paymentStatus: order.paymentStatus } })
  } catch (error) {
    console.error('Unable to save verified order:', error)
    return res.status(500).json({ error: 'Payment verified but the order could not be recorded.' })
  }
}
