'use client'
import React from 'react';
import { SideBarStyle } from './SideBar.style';
import { CloseIcon } from '@/app/assets/icons';

interface SideBarProps {
    isOpen:boolean;
    onClose:()=>void
}

const Sidebar = ({ isOpen, onClose } : SideBarProps) => {
    return (
        <SideBarStyle>
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <button className="close-btn" onClick={onClose}>
                <CloseIcon width={20} height={20} fill="var(--secondary-color)"/>
            </button>
        </div>
        </SideBarStyle>
    );
};

export default Sidebar;
