import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
    name: 'users',
    initialState: [],
    reducers: {
        UserData: (state, action) => {
            console.log('actions in user data==>', action);
            return state = action.payload;
        },
        adduser: (state, action) => {
            console.log('actions==>', action);
            state.push(action.payload)
        },
        updateUser: (state, action) => {
            console.log('actions updateUser==>', action);
            const { id, name, email, phone, website, HeartActive } = action.payload;
            const userUpdate = state.find(user => user.id == id);
            console.log('name updateUser==>', name);
            console.log(' updateUser==>', userUpdate);

            if (userUpdate) {
                userUpdate.name = name;
                userUpdate.email = email;
                userUpdate.phone = phone;
                userUpdate.website = website;
                userUpdate.HeartActive = HeartActive
            }
        },
        deleteUser: (state, action) => {
            console.log("state", state);
            const id = action.payload;
            const userDelete = state.find(user => user.id == id)
            console.log("userDelete", userDelete);
            if (userDelete) {
                return state.filter(f => f.id !== id);
            }
        },
        blinkHeart: (state, action) => {
            console.log('actions updateUser==>', action);
            const { id, HeartActive } = action.payload;
            const userUpdate = state.find(user => user.id == id);
            if (userUpdate) {
                userUpdate.HeartActive = HeartActive
            }
        }
    }
})
export const { adduser, updateUser, deleteUser, UserData, blinkHeart } = userSlice.actions;
export default userSlice.reducer