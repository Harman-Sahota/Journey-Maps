"use client"
import { useEffect, useState, ChangeEvent } from 'react';
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
    color?: string;
}

export default function Header({
    sessionToken,
    userName,
    avatar,
    discordID,
    color,
}: HeaderProps) {
    const [selectedColor, setSelectedColor] = useState(color || '#2563eb');
    const [textColor, setTextColor] = useState<string>('text-slate-900');

    const calculateLuminance = (hexColor: string) => {
        const hex = hexColor.replace(/#/, '');
        const r = parseInt(hex.substring(0, 2), 16) / 255;
        const g = parseInt(hex.substring(2, 4), 16) / 255;
        const b = parseInt(hex.substring(4, 6), 16) / 255;
        return 0.2126 * r + 0.7152 * g + 0.0722 * b; // Relative luminance
    };

    if (sessionToken) {
        localStorage.setItem("sessionToken", sessionToken);
    }
    useEffect(() => {
        setSelectedColor(color || '#2563eb');
    }, [color]);

    useEffect(() => {
        const luminance = calculateLuminance(selectedColor);
        console.log(luminance); 
        setTextColor(luminance > 0.4 ? 'text-slate-900' : 'text-slate-50');
    }, [selectedColor]);


    const handleColorChange = async (event: ChangeEvent<HTMLInputElement>) => {
        setSelectedColor(event.target.value);
        try {
            await axios.put('http://localhost:8000/api/user/updateColor', { discordID: discordID, color: event.target.value });
        } catch (error) {
            console.error('Error sending color to backend:', error);
        }
    };

    const handleColorPickerClick = (
        event: React.MouseEvent<HTMLInputElement, MouseEvent>
    ) => {
        event.stopPropagation();
    };

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
        <div className="flex justify-between items-center mb-4 p-4" style={{
            background: `radial-gradient(circle, ${selectedColor} 20%, rgba(255, 255, 255, 0) 70%, transparent 90%)`
        }}

        >
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
                        <DropdownMenuItem className='rounded'>
                            <label className='p-1 font-normal'>Current Color: </label>
                            <input
                                type="color"
                                className="h-8 w-8 block cursor-pointer rounded disabled:opacity-50 disabled:pointer-events-none"
                                id="hs-color-input"
                                value={selectedColor}
                                onChange={handleColorChange}
                                onClick={handleColorPickerClick}
                                title="Choose your color"
                            />
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className='rounded text-center' onClick={handleLogout}>
                            <h6 className='text-red-500 font-medium text-center'>Logout</h6>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <h1 className={`p-2 text-3xl font-bold text-center ${textColor}`}>Sample Timeline</h1>
            <ModeToggle />
        </div>
    );
}
