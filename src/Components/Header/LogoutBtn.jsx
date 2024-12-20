import React from 'react';
import { useDispatch } from 'react-redux';
import authService from '../../../../blog/src/appwrite/auth';
import { logout } from '../../../../blog/src/Store/authSlice';

function LogoutBtn(props) {
    const dispatch = useDispatch();

    const logoutHandler = () => {
        authService.logout()
        .then(() => {
            dispatch(logout())
        })
    }
    return (
        <button
        className='inline-block px-6 py-2 duration-200 hover:bg-blue-200 rounded-full'
        >Logout</button>
    );
}

export default LogoutBtn;