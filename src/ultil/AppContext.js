import { createContext, useState } from "react";


export const AppContext = createContext();

export const AppContextProvider = (props) => {
    const {children} = props;
    //data truyen vao
    const [isLogin, setisLogin] = useState(false)
    return (
        <AppContext.Provider value={{isLogin, setisLogin}}>
            {children}
        </AppContext.Provider>
    )

}