import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
});

export const register = async ({username,email,password}) => {

    try{

        const response = await api.post("/api/auth/register", {username,email,password});

        return response.data

    }catch(error){
        console.log(error);
        throw error
    }


}

export const login = async ({email,password}) => {

    try{

        const response = await api.post("/api/auth/login", {email,password});    

        return response.data

    }catch(error){
        console.log(error);
        throw error
    }
}

export const logout = async () => {

    try{

        const response = await api.get("/api/auth/logout");

        return response.data

    }catch(error){
        console.log(error);
        throw error
    }
}

export const getme = async () => {
    
    try{

        const response = await api.get("/api/auth/getme");

        return response.data
    }catch(err){
        console.log(err);
        throw err
    }
}