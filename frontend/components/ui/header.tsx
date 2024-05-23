import { useEffect, useState } from 'react';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ModeToggle } from '@/components/ui/darkmode';
import axios from 'axios';

interface HeaderProps {
    sessionToken?: string;
    userName?: string;
    avatar?: string;
    discordID?: string;
    selectedTab?: string;
}

export default function Header({
    sessionToken,
    userName,
    avatar,
    discordID,
    selectedTab
}: HeaderProps) {

    useEffect(() => {
        if (sessionToken) {
            localStorage.setItem("sessionToken", sessionToken);
        }
    }, [sessionToken]);

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:8000/api/auth/logout', { discordID: discordID });
            localStorage.removeItem("sessionToken");
            window.location.href = 'http://localhost:3000';
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <div className="flex justify-between items-center mb-4 p-4 bg-gradient-to-r from-blue-200 dark:from-blue-950 to-blue-100 dark:to-transparent">
            <div className="flex items-center space-x-4">
                <DropdownMenu>
                    <DropdownMenuTrigger className="text-lg font-medium border rounded flex items-center p-2 border-gray-700 dark:border-gray-500">
                        <Avatar>
                            <AvatarImage
                                src={`https://cdn.discordapp.com/avatars/${discordID}/${avatar}.png?size=128`}
                                alt={userName || ''}
                            />
                            <AvatarFallback>{userName || ''}</AvatarFallback>
                        </Avatar>
                        <div className="ml-2">{userName || ''}</div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="rounded">
                        <DropdownMenuItem className='rounded text-center' onClick={handleLogout}>
                            <h6 className='text-red-500 font-medium text-center'>Logout</h6>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <h1 className="text-3xl font-bold ml-auto mr-auto text-slate-900 dark:text-slate-200 text-center">{selectedTab || 'Sample Timeline'}</h1>
            <ModeToggle />
        </div>
    );
}
