import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger,
} from "@/components/ui/menubar";
import { ChevronDown } from "lucide-react";
import { ModeToggle } from "./darkmode";
import { Button } from "./button";

export default function Navbar() {
    return (
        <div className="flex justify-between items-center w-full mt-4 px-6">
            <h1 className="text-lg font-bold">Journey Maps</h1>
            <Menubar className="border-none">
                <MenubarMenu>
                    <MenubarTrigger>Home</MenubarTrigger>
                </MenubarMenu>
                <MenubarMenu>
                    <MenubarTrigger>Product <ChevronDown className="w-4 h-4 inline ml-1" /> </MenubarTrigger>
                    <MenubarContent>
                        <MenubarItem>Values</MenubarItem>
                        <MenubarItem>How It Works</MenubarItem>
                        <MenubarItem>Documentation</MenubarItem>
                        <MenubarItem>FAQ</MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                    <MenubarTrigger>Contact Us</MenubarTrigger>
                </MenubarMenu>
            </Menubar>
            <ModeToggle />
        </div>
    );
}
