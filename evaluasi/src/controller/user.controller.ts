import type { Request, Response } from "express";
import { errorResponse, successResponse } from "../utils/response";
import { createUser, deleteUser, getAllUsers, getUserById, searchUsers, updateUser } from "../services/user.services";



// GET ALL
export const getAll = (_req: Request, res: Response ) => {
    const { users, total } = getAllUsers()
    successResponse(
        res, "data pengunjung perpustakaan",
        
        {
            jumlah: total,
            data: users
        }
    )

}

// GET BY ID 
export const getById = (req: Request, res: Response) => {
    if (!req.params.id) {
        return errorResponse(
            res,
            "No parameter sir"
        )
    }
    const user = getUserById(req.params.id!,)

    successResponse(
        res, "user found men",
        user
    )
}

// GET BY SEARCH 
export const search = (req: Request, res: Response) => {
  const { nama, asal } = req.query;

  
  const result = searchUsers((nama as string)?.toString(), asal?.toString());

  return successResponse(res, "User found", result);
};



export const create = (req: Request, res: Response) => {
    const { nama, asal, age } = req.body;

    const users = createUser(nama,
        asal, age
    )

    
    successResponse(
        res,
        "buki berasil di tambah",
        users,
        null,
        201
    )
}



export const update = (req: Request, res: Response) => {
   
    const user = updateUser(req.params.id!, req.body,)
    
    
  successResponse(
    res, 
    "update user",
    user
  )
}



export const remove = (req: Request, res: Response) => {
    
    const deleted = deleteUser(req.params.id!)
    
    successResponse(
        res,
        "user delete",
        deleted
    )
}
