import { users, type Users } from "../models/user.model"

// GET ALL
export const getAllUsers = () => {
    return { users, total: users.length }
}

// SEARCH USER 
export const searchUsers = (nama: string, asal?: string) => {

    let result = users;

    if (nama) {
        result = result.filter(n =>
            n.nama.toLowerCase().includes(nama.toLowerCase())
        );
    }

    if (asal) {
        result = result.filter(a =>
            a.asal.toLowerCase().trim() === asal.toLowerCase().trim()
        );
    }

    return result;
}

export const getUserById = (id: string) => {
    const numId = parseInt(id)
    const user = users.find(u => u.id === numId);

    if (!user) {
        throw new Error("Not found book")
    }
    return user

}



export const createUser = (nama: string,
    asal: string, age: number) => {

    const newUser: Users = {
        id: users.length + 1,
        nama,
        asal,
        age
        
    };
    users.push(newUser);

    return users
}



export const updateUser = (id: string, data: any) => {
    const numId = parseInt(id)
    const index = users.findIndex(u => u.id === numId)

    if (index === -1) {
        throw new Error("user tidak di temukan")
    }
    users[index] = { ...users[index], ...data }
    return users[index]
}




export const deleteUser = (id: string) => {
    const numId = parseInt(id);
    const index = users.findIndex(u => u.id === numId);


    if (index === -1) {
        throw new Error, "User success delete"
    }
    const deleted =users.splice(index, 1)

    return deleted
}