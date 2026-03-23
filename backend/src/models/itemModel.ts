import { Schema,model } from "mongoose";
import { IItemDocument } from "../types";

const itemSchema = new Schema<IItemDocument>(
     {
          menuId: {
      type:     Schema.Types.ObjectId,
      ref:      'Menu',
      required: [true, 'menuId is required'],
    },
    category: {
      type:     String,
      required: [true, 'Category is required'],
      trim:     true,
    },
    name: {
      type:     String,
      required: [true, 'Item name is required'],
      trim:     true,
    },
    price: {
      type:     Number,
      required: [true, 'Price is required'],
      min:      [0, 'Price cannot be negative'],
    },
    description: {
      type:    String,
      trim:    true,
      default: '',
    },
     },
     {timestamps:true}
)

export default model<IItemDocument>('itemModel',itemSchema)