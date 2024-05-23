"use client"
import Header from '@/components/ui/header';
import { useEffect, useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button';
import axios from 'axios';

export default function Dashboard() {
    const [sessionToken, setSessionToken] = useState('');
    const [userName, setUserName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [discordID, setDiscordID] = useState('');
    const [timelineTitle, setTimelineTitle] = useState('');
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [timelines, setTimelines] = useState<string[]>([]);
    const [selectedTab, setSelectedTab] = useState<string>('');

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        setSessionToken(params.get('sessionToken') || '');
        setUserName(params.get('name') || '');
        setAvatar(params.get('avatar') || '');
        setDiscordID(params.get('discordID') || '');
    }, []);

    const fetchTimelines = async () => {
        try {
            const response = await axios.get<string[]>(`http://localhost:8000/api/user/timelines/${discordID}`);
            setTimelines(response.data);
            if (response.data.length > 0) {
                setSelectedTab(response.data[0]);
                localStorage.setItem("first", response.data[0])
            }
        } catch (error) {
            console.error('Error fetching timelines:', error);
        }
    };

    useEffect(() => {
        if (discordID) {
            fetchTimelines();
        }
    }, [discordID]);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            await axios.post('http://localhost:8000/api/user/addTimeline', {
                discordId: discordID,
                name: timelineTitle
            });
            fetchTimelines();
            setTimelineTitle('');
            setLoading(false);
            setOpen(false);
        } catch (error) {
            console.error('Error adding timeline:', error);
        }
    };

    return (
        <div className="flex flex-col min-h-screen p-4 md:p-0">
            <Header
                sessionToken={sessionToken}
                userName={userName}
                avatar={avatar}
                discordID={discordID}
                selectedTab={selectedTab}
            />
            <div className="flex flex-grow justify-center p-2">
                <Tabs defaultValue={localStorage.getItem('first') || "Sample Category"} className="w-[800px] p-2">
                    <TabsList className="w-full flex overflow-x-scroll snap-type-mandatory scrollbar-hide p-2">
                        {timelines.length > 0 && timelines.map((timeline, index) => (
                            <TabsTrigger key={index} value={timeline} onClick={() => setSelectedTab(timeline)} className="px-4 py-2 whitespace-nowrap">{timeline}</TabsTrigger>
                        ))}
                        <Dialog open={open} onOpenChange={setOpen}>
                            <DialogTrigger value="+" className="p-2 rounded ml-4 hover:scale-90">
                                <Plus className="w-4 h-4" />
                            </DialogTrigger>
                            <DialogContent className="rounded">
                                <DialogHeader>
                                    <DialogTitle>Create A New Timeline</DialogTitle>
                                    <DialogDescription>
                                        You are creating a brand new timeline!
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="name" className="text-right">
                                        Name:
                                    </Label>
                                    <Input id="name" placeholder='Depression' value={timelineTitle} onChange={(e) => setTimelineTitle(e.target.value)} className="col-span-3 rounded" />
                                </div>
                                <DialogFooter>
                                    <Button type="submit" onClick={handleSubmit} className='rounded dark:text-slate-200' disabled={loading} variant='outline'>
                                        {loading ? 'Submitting...' : 'Save changes'}
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </TabsList>
                </Tabs>
            </div>
        </div>
    );
}
