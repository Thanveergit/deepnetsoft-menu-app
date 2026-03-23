import { RequestHandler } from "express";
import itemModel from "../models/itemModel";
import menuModel from "../models/menuModel";
import { CreateItemBody,GetItemQuery } from "../types";

export const getItemsByMenu:RequestHandler<{},
{},
{},
GetItemQuery
>=async (req,res,next)=>{
try {
     const {menuId} = req.query;
     if(!menuId){
          res.status(400).json({success:false,message: "menuId query param is required"});
          return;
     }
     const items = await itemModel.find({menuId}).sort({category:1, createdAt:1});
     res.status(200).json({success:true,data:items});

} catch (error) {
     console.log('getItemesByMenu error',error);
}
}

export const createItems:RequestHandler<{},{}, CreateItemBody> = async(req,res)=>{
     try {
          const {menuId,category,name,price,description} = req.body;

          // validate all requered field

          if(!menuId){res.status(400).json({success:false,message: 'MenuId is required'});return};
          if(!category?.trim()){res.status(400).json({success:false,message: 'category is required'});return};
          if(!name?.trim()){res.status(400).json({success:false,message: 'Name is required'});return};
          if(price == undefined || Number(price)<0){
               res.status(400).json({success:false,message:' a valid price is required'});
               return;
          }

          //confirm the parent menu exists
          const menuExists = await menuModel.findById(menuId);
          if(!menuExists){
               res.status(400).json({success:false,message:'Parent menu not found'});
               return;

          }

          const item = await itemModel.create({
               menuId,
               category:category?.trim(),
               name:name?.trim(),
               price:Number(price),
               description:description?.trim() ?? ""
          })

          res.status(201).json({success:true,data:item});

     } catch (error) {
          console.log('createItem error',error)
     }
}

export const deleteItem: RequestHandler<{id:string}> = async(req,res)=>{
     try {
         const item = await itemModel.findByIdAndDelete(req.params.id);
         if(!item){
          res.status(404).json({success:false,message:"items not found"});
          return
         }
         res.status(200).json({success:true,message:`"${item.name}" deleted`})
     } catch (error) {
          console.log('deleteItem error',error)
     }
}