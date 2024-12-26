'use client'
import React, { useState } from 'react';
import { SideBarStyle } from './SideBar.style';
import { CloseIcon,LogOutIcon } from '@/app/assets/icons';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton } from '@mui/material';
import { setIsLoggedIn, setUserId, setUserName } from '@/app/store/authSlice';

interface SideBarProps {
    isOpen:boolean;
    onClose:()=>void
}

const Sidebar = ({ isOpen, onClose } : SideBarProps) => {

    const { isLoggedIn } = useSelector((state: any) => state.auth);
    const { userName } = useSelector((state: any) => state.auth);
    const [loading, setLoading] = useState(false);

    
    const handleLogout = async () => {
        setLoading(true);
        try {
            dispatch(setIsLoggedIn(false));
            dispatch(setUserName(null));
            dispatch(setUserId(null));
        } catch (error) {
            console.error('Logout failed:', error);
        } finally {
            setLoading(false);
            onClose(); 
        }
    };

    const dispatch = useDispatch();
    return (
        <SideBarStyle>
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <button className="close-btn" onClick={onClose}>
                <CloseIcon width={20} height={20} fill="var(--secondary-color)" />
            </button>
            <div className="user">
                {isLoggedIn && userName ? (
                    <span>{userName}</span>
                ) : (
                    <IconButton>
                    <span>ورود</span>
                    </IconButton>
                 
                )}
            </div>
            {isLoggedIn && (
                <div className="logout">
                    {loading ? (
                        <div className="loader">
                        </div>
                    ) : (
                        <IconButton onClick={handleLogout} disabled={loading}>
                        <span>خروج</span>
                        <LogOutIcon width={15} height={15} fill="var(--lightblue-color)" />
                    </IconButton>
                    )
                    }

                </div>
            )}
        </div>
    </SideBarStyle>
    );
};

export default Sidebar;


