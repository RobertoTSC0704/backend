import mongoose from 'mongoose';

const SalesSchema = new mongoose.Schema({
  productName: String,
  price: Number,
  quantity: Number,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

export default mongoose.model('Sales', SalesSchema);
