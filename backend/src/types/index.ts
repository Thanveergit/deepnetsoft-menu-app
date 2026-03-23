import { Document,Types } from "mongoose";


export interface IMenu{
     name: string;
     description: string;

}

export interface IMenuDocument extends IMenu, Document {
  _id: Types.ObjectId
  crreatedAt: Date
  updatedAt: Date
}

// item data

export interface IItem {
     menuId: Types.ObjectId | string
     category: string
     name:string
     price:number
     description:string
}

export interface IItemDocument extends IItem, Document {
  _id:       Types.ObjectId
  createdAt: Date
  updatedAt: Date
}


export interface CreateMenuBody{
     name: string
     description?:string
}

export interface CreateItemBody{
     menuId: string
     category: string
     name: string
     price: number
     description?:string
}


export interface GetItemQuery{
     menuId?: string
}

// api response

export interface ApiResponse<T>{
     success: boolean
     data?:T
     message?: string
}