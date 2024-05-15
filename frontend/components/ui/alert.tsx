"use client"
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function Alert() {
    const [isOpen, setIsOpen] = useState(false);


    const handleGetStartedClick = () => {
        setIsOpen(true); 
    };

    const handleContinue = () => {
        setIsOpen(false);
        const targetId = "#waitlist";
        const isInternalLink = targetId.startsWith("#");
        const targetElement = isInternalLink ? document.querySelector(targetId) : null;
        if (targetElement && isInternalLink) {
            targetElement.scrollIntoView({ behavior: "smooth" });
        } else if (!isInternalLink && targetId) {
            window.location.href = targetId; // Navigate to external URL
        }
    };

    const handleCancel = () => {
        setIsOpen(false);
    };

    return (
        <>
            <Button className="mt-4 rounded dark:text-white" onClick={handleGetStartedClick}>Get Started</Button>
            <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                <AlertDialogContent className="rounded-xl p-4">
                    <AlertDialogHeader className="mb-2">
                        <AlertDialogTitle className="text-lg font-bold">Our Product Is Currently in Development</AlertDialogTitle>
                        <AlertDialogDescription className="text-sm text-muted-foreground">
                            You can still sign up to our waitlist and get early access.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="mt-4">
                        <AlertDialogCancel className="mr-2 rounded py-1 px-3  transition duration-200" onClick={handleCancel}>I&apos;ll just browse</AlertDialogCancel>
                        <AlertDialogAction className="border rounded py-1 px-3 dark:text-white transition duration-200" onClick={handleContinue}>Sign Up for Waitlist</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

        </>
    );
}
