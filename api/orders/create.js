import crypto from 'node:crypto'
import { PRODUCTS } from '../../src/data/products.js'
import { getDatabase } from '../db.js'
import { orders } from '../../db/schema.js'

const COUPONS = { BOOST10: 10, BOOST20: 20 }

function buildOrder(items, couponCode) {
  if (!Array.isArray(items) || !items.length) throw new Error('Your cart is empty.')
  const productMap = new Map(PRODUCTS.map((product) => [String(product.id), product]))
  const orderItems = items.map(({ id, quantity }) => {
    const product = productMap.get(String(id))
    const safeQuantity = Number(quantity)
    if (!product || !Number.isInteger(safeQuantity) || safeQuantity < 1 || safeQuantity > 10) throw new Error('Your cart contains an invalid item.')
    return { id: product.id, name: product.name, price: product.price, image: product.image, quantity: safeQuantity }
  })
  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discount = Math.round(subtotal * (COUPONS[String(couponCode || '').toUpperCase()] || 0) / 100)
  const deliveryFee = subtotal < 999 ? 99 : 0
  return { items: orderItems, subtotal, deliveryFee, discount, total: subtotal - discount + deliveryFee }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  const { items, couponCode, customer, paymentMethod } = req.body || {}
  if (!customer?.fullName || !customer?.phone || !customer?.address || !customer?.city || !customer?.pincode) return res.status(400).json({ error: 'Complete delivery details are required.' })
  if (!['upi', 'card', 'cod'].includes(paymentMethod)) return res.status(400).json({ error: 'Invalid payment method.' })

  try {
    const pricing = buildOrder(items, couponCode)
    const orderNumber = `BB-${crypto.randomUUID().replaceAll('-', '').slice(0, 10).toUpperCase()}`
    const isCod = paymentMethod === 'cod'
    let razorpayOrderId = null
    if (!isCod) {
      const keyId = process.env.RAZORPAY_KEY_ID
      const keySecret = process.env.RAZORPAY_KEY_SECRET
      if (!keyId || !keySecret) throw new Error('Payment service is not configured.')
      const response = await fetch('https://api.razorpay.com/v1/orders', {
        method: 'POST', headers: { Authorization: `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString('base64')}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: pricing.total * 100, currency: 'INR', receipt: orderNumber, notes: { order_number: orderNumber } }),
      })
      if (!response.ok) throw new Error('Unable to create the Razorpay order.')
      razorpayOrderId = (await response.json()).id
    }

    await getDatabase().insert(orders).values({
      orderNumber, razorpayOrderId, customer, items: pricing.items, subtotal: pricing.subtotal, deliveryFee: pricing.deliveryFee,
      discount: pricing.discount, total: pricing.total * 100, paymentMethod: isCod ? 'COD' : `RAZORPAY ${paymentMethod.toUpperCase()}`,
      paymentStatus: isCod ? 'Pending' : 'Created',
    })
    const order = { id: orderNumber, ...pricing, paymentMethod: isCod ? 'COD' : `RAZORPAY ${paymentMethod.toUpperCase()}`, paymentStatus: isCod ? 'Pending' : 'Created' }
    if (isCod) return res.status(201).json({ order })
    return res.status(201).json({ order, razorpay: { key: process.env.RAZORPAY_KEY_ID, orderId: razorpayOrderId, amount: pricing.total * 100, currency: 'INR' } })
  } catch (error) {
    console.error('Unable to create order:', error)
    return res.status(400).json({ error: error.message || 'Unable to create order.' })
  }
}
