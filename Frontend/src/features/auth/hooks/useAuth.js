import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { login,register,logout,getme } from "../services/auth.api";

export const useAuth = () => {

    const context = useContext(AuthContext);

    const {user,setUser,loading,setLoading} = context;

    const handleLogin = async ({ email, password }) => {
    setLoading(true);

    try {
        await login({ email, password });

        const data = await getme();

        console.log("GETME:", data);

        setUser(data.user);

        console.log("USER SET");
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        setLoading(false);
    }
}

    const handleRegister = async ({ username, email, password }) => {
    setLoading(true);

    try {
        await register({ username, email, password });

        const data = await getme();

        setUser(data.user);
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        setLoading(false);
    }
    }

    const handleLogout = async () => {

        setLoading(true);
        try{
            const data = await logout();
            setUser(null);

        }catch (err) {
            console.log(err);
            throw err
        }finally{
            setLoading(false);
        }
    }


    return {user,loading,handleLogin,handleRegister,handleLogout};
}