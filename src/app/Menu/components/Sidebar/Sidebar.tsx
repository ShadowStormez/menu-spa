// Sidebar.tsx
'use client';
import React, { useState } from 'react';
import { SideBarStyle } from './SideBar.style';
import { CloseIcon, LogOutIcon } from '@/app/assets/icons';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton } from '@mui/material';
import { setIsLoggedIn, setUserId, setUserName } from '@/app/store/authSlice';

interface SideBarProps {
    isOpen: boolean;
    onClose: () => void;
    onLoginClick: () => void;
}

const Sidebar = ({ isOpen, onClose,onLoginClick }: SideBarProps) => {
    const { isLoggedIn, userName } = useSelector((state: any) => state.auth);
    const dispatch = useDispatch();
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
            onClose(); // Close the sidebar after logout
        }
    };
    const handleLoginClick = () => {
        onClose();
        onLoginClick;
};

    

    return (
        <SideBarStyle>
            <div className={`sidebar ${isOpen ? 'open' : ''}`}>
                <div className="close-button-container">
                    <button className="close-btn" onClick={onClose}>
                        <CloseIcon width={20} height={20} stroke="var(--secondary-color)" />
                    </button>
                </div>
                <div className="user">
                    {isLoggedIn && userName ? (
                        <span>{userName}</span>
                    ) : (
                        <IconButton onClick={handleLoginClick}>
                        <span style={{ fontSize: '20px' }}>ورود</span>
                      </IconButton>
                    )}
                </div>
                {isLoggedIn && (
                    <div className="logout">
                        {loading ? (
                            <div className="loader"></div>
                        ) : (
                            <IconButton sx={{gap:'10px'}} onClick={handleLogout} disabled={loading}>
                                <span style={{ fontSize: '20px' }}>خروج</span>
                                <LogOutIcon width={20} height={20} fill="var(--lightblue-color)" />
                            </IconButton>
                        )}
                    </div>
                )}
            </div>
        </SideBarStyle>
    );
};

export default Sidebar;
