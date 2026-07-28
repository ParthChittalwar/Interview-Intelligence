import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
});

export const register = async ({username,email,password}) => {

    try{

        const response = await api.post("/register", {username,email,password});

        return response.data

    }catch(error){

    }


}

export const login = async ({email,password}) => {

    try{

        const response = await api.post("/login", {email,password});    

        return response.data

    }catch(error){
        console.log(error);
    }
}

export const logout = async () => {

    try{

        const response = await api.get("/logout");

        return response.data

    }catch(error){
        console.log(error);
    }
}

export const getme = async () => {
    
    try{

        const response = await api.get("/getme");

        return response.data
    }catch(err){
        console.log(err);
    }
}