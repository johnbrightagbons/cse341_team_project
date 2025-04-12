import { User } from "../models/user.model.js";
import createError from "http-errors";
import { validateUser } from "../utils/validateUser.js";
import mongoose from "mongoose";

const getAll = async(req,res, next) => {
    try {
        //#swagger.tags=['User']
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        next(createError(500, "Something went wrong while fetching users"));
    }
};

const getSingle = async(req, res, next) => {
    try{
        //#swagger.tags = ['User']
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return next(createError(400, "Invalid User Id"));
        }    

    const user = await User.findById(id);
    if (!user) {
        return next (createError(404, "User not found"));
    }
        res.status(200).json(user);
    } catch (error){
        next(createError(500, "Something went wrong while fetching user."));
    }
};

const createUser = async (req, res, next) => {
    try {
      //#swagger.tags=['User']
      console.log("🔔 POST /users acionado");
      console.log("📦 req.body:", req.body);
      console.log("🔐 req.session.user:", req.session?.user);
  
      const newUser = new User(req.body);
      await newUser.save();
  
      console.log("✅ Usuário criado:", newUser);
  
      res.status(201).json(newUser);
    } catch (error) {
      console.error("❌ Erro em createUser:", error.message);
      next(createError(400, error.message || "Invalid user data"));
    }
  };
  

/*const  createUser = async(req,res, next)=>{
    try {
        //#swagger.tags=['User']
        const newUser = new User(req.body);
        await newUser.save();

        res.status(201).json(newUser);
    } catch (error) {
        next(createError(400, error.message || "Invalid user data"));
    }
};*/

const updateUser = async (req, res, next) => {
    try {
      //#swagger.tags=['User']
      console.log("🔔 PUT /users/:id acionado");
      console.log("🆔 req.params.id:", req.params.id);
      console.log("📦 req.body:", req.body);
      console.log("🔐 req.session.user:", req.session?.user);
  
      const { id } = req.params;
  
      if (!mongoose.Types.ObjectId.isValid(id)) {
        console.warn("⚠️ ID inválido");
        return next(createError(400, "Invalid user ID"));
      }
  
      const updatedUser = await User.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
  
      if (!updatedUser) {
        console.warn("⚠️ Usuário não encontrado");
        return next(createError(404, "User not found"));
      }
  
      console.log("✅ Usuário atualizado:", updatedUser);
  
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error("❌ Erro em updateUser:", error.message);
      if (error.isJoi) {
        return next(createError(400, error.details[0].message));
      }
      next(createError(500, "Something went wrong while updating the user."));
    }
  };
  

/*const updateUser = async(req, res, next) => {
    try{
        //#swagger.tags=['User']
        const { id } = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)){
            return next(createError(400, "Invalid user ID"));
        }

        const updatedUser = await User.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!updatedUser){
            return next(createError(404, "User not found"));
        }
        res.status(200).json(updatedUser);
    } catch (error){
        if (error.isJoi){
            return next(createError(400, error.details[0].message));
        }
        next(createError(500, "Something went wrong  while updating the user."));
    }
};*/

const deleteUser = async(req, res, next) => {
    try{
        //#swagger.tags=['User']
        const { id } = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)){
            return next(createError(400, "Invalid user ID"));
        }
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser){
            return next (createError(404, "User not found."));
        }
        res.status(200).json({ message: "User deleted Successfully."});
    } catch(error){
        next(createError(500, "Something went wrong while deleting the User."));
    }
};

export { getAll, getSingle, createUser, updateUser, deleteUser };
