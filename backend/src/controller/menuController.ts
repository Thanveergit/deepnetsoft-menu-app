import { RequestHandler } from "express";
import {MongoServerError} from 'mongodb';
import menuModel from '../models/menuModel';
import { CreateMenuBody } from "../types";
import itemModel from "../models/itemModel";


export const getAllMenus:RequestHandler = async(req,res)=>{
     try {
          const menus = await menuModel.find().sort({createdAt:1})
          res.status(200).json({success:true,data:menus});

     } catch (error) {
          console.log('getAllMenus error',error)
     }
}

export const createMenu:RequestHandler<{},{},CreateMenuBody> =async(req,res)=>{
     try {
          const {name,description} = req.body;
          console.log(req.body)
          console.log(name,description)
          if(!name?.trim()){
               res.status(400).json({success:false,message:'Menu name is required'});
               return;
          }

          const menu = await menuModel.create({
               name: name.trim(),
               description: description?.trim() ?? ''
          })
          res.status(201).json({success:true,data:menu});
     } catch (error) {
          if(error instanceof MongoServerError && error.code == 11000){
               res.status(400).json({success:false,message:'A menu with that name exists'});
               return;
          }
          console.log('createMenu error',error)

     }

}

export const deletMenus:RequestHandler<{id:string}> = async(req,res)=>{
     try {
          const menu = await menuModel.findByIdAndDelete(req.params.id);
          if(!menu){
               res.status(404).json({success:false,message:"Menu not found"});
               return 
          }
          await itemModel.deleteMany({menuId:req.params.id});
          res.status(200).json({success:false,message:`Menu "${menu.name}" deleted`})
     } catch (error) {
          console.log('deleteMenu error',error)
     }
}