import mongoose from 'mongoose';

export const ORDER_SCHEMA_NAME = 'order';

export const OrderSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  status: {
    type: String,
    enum: ['created', 'confirmed', 'delivered', 'cancelled'],
    default: 'created'
  },
});

export interface Order extends Document {
  fullName: String;
  phone: String;
  address: String;
  status: String;
}
