import { Schema,model } from "mongoose";
import { IMenuDocument } from "../types";


const menuSchema = new Schema<IMenuDocument>(
     {
      name: {
      type:     String,
      required: [true, 'Menu name is required'],
      trim:     true,
      unique:   true,   
    },
    description: {
      type:    String,
      trim:    true,
      default: '',
    },
     },
     {timestamps:true}
)

export default model<IMenuDocument>('menuModel',menuSchema)