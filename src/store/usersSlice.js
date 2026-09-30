import { createSlice } from '@reduxjs/toolkit';
import {  collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/config.js";

export const usersSlice = createSlice({
    name: 'users',
    initialState: {
        login: localStorage.getItem('userLogin') ?
            JSON.parse(localStorage.getItem('userLogin')) : null,
        id: localStorage.getItem('userId') ?
            JSON.parse(localStorage.getItem('userId')) : null,
        
    },
    reducers: {
        
        setUserLogin: (state, action) => {
            localStorage.setItem('userLogin',JSON.stringify(action.payload))
            state.login = action.payload;
            },
        setUserId: (state, action) => {
            localStorage.setItem('userId', JSON.stringify(action.payload))
            state.id = action.payload;
        },
        logOut: (state) => {
            state.login = null;
            state.Id = null;
            localStorage.removeItem('userLogin');
            localStorage.removeItem('userId');
        },   
        }
    
})

   
   

export async function checkUser(login) {
    

    const usersRef = collection(db, "players");
    const querySnapshot = await getDocs(usersRef);

    let found = false;
    querySnapshot.forEach((doc) => {
        const userData = doc.data();
        
        if (userData.login === login) {
            found = true;
        }
    });

    
    return found;
}

export function checkAdmin(login) {

            if (login == '558899')
            { return true; }
            else { return false; }
}

export function checkDemo(login) {

    if (login == 'testDesk') { return true; }
    else { return false; }
}

export const { setUserId, setUserLogin, logOut, setStatus } = usersSlice.actions;

export const selectCurrentUserLogin = (state) => state.users.login;

export const selectCurrentUserId = (state) => state.users.id;

export default usersSlice.reducer;