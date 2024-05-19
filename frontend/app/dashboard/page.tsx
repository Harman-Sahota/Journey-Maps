"use client"
import Header from '@/components/ui/header';
import { useEffect, useState } from 'react';

export default function Dashboard() {
    const [sessionToken, setSessionToken] = useState('');
    const [userName, setUserName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [discordID, setDiscordID] = useState('');
    const [color, setColor] = useState('#2563eb');

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        setSessionToken(params.get('sessionToken') || '');
        setUserName(params.get('name') || '');
        setAvatar(params.get('avatar') || '');
        setDiscordID(params.get('discordID') || '');
        const encodedColor = params.get('color') || '';
        const decodedColor = decodeURIComponent(encodedColor);
        setColor(decodedColor || '#2563eb');
    }, []);

    return (
        <div className="flex flex-col min-h-screen p-4 md:p-0">
            <Header
                sessionToken={sessionToken}
                userName={userName}
                avatar={avatar}
                discordID={discordID}
                color={color}
            />
        </div>
    );
}
