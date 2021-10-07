import { createContext, useState, useContext } from "react";

const UserInfoContext = createContext();
const UpdateUserInfoContext = createContext();

export const useUserInfo = ()=>{
    return useContext(UserInfoContext);
}

export const useUpdateUserInfo = ()=>{
    return useContext(UpdateUserInfoContext);
}

export const UserInfoProvider = ({children})=>{


    const [userObject, setUserObject] = useState(null);
    
    return (
        <UserInfoContext.Provider value={userObject}>
            <UpdateUserInfoContext.Provider value={setUserObject}>
                {children}
            </UpdateUserInfoContext.Provider>
        </UserInfoContext.Provider>
    )
}

