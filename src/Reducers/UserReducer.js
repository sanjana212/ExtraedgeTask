import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
    name: 'users',
    initialState: [],
    reducers: {
        UserData: (state, action) => {
            console.log('actions in user data==>', action);
            return state=action.payload;
        },
        adduser: (state, action) => {
            console.log('actions==>', action);
            state.push(action.payload)
        },
        updateUser: (state, action) => {
            console.log('actions updateUser==>', action);
            const { id, name, email } = action.payload;
            const userUpdate = state.find(user => user.id == id);
            console.log('name updateUser==>', name);
            console.log(' updateUser==>', userUpdate);

            if (userUpdate) {
                userUpdate.name = name;
                userUpdate.email = email;
            }
        },
        deleteUser: (state, action) => {
            console.log("state",state);
            const id = action.payload;
            const userDelete = state.find(user => user.id == id)
            console.log("userDelete",userDelete);
            if (userDelete) {
                return state.filter(f => f.id !== id);
            }
        }
    }
})
export const { adduser, updateUser, deleteUser,UserData } = userSlice.actions;
export default userSlice.reducer