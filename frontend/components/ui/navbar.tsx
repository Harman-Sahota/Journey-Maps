"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { ModeToggle } from "./darkmode"

const components: { title: string; href: string; }[] = [
    {
        title: "Values",
        href: "#values"
    },
    {
        title: "How It Works",
        href: "#howitworks"
    },
    {
        title: "Documentation",
        href: "https://github.com/Harman-Sahota/Journey-Maps/blob/main/README.md"
    },
    {
        title: "FAQ",
        href: "#faq"
    },
]

export default function NavigationMenuDemo() {

    const handleSmoothScroll = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        const targetId = event.currentTarget.getAttribute("href");
        if (!targetId) return; // Exit if no targetId is found

        const isInternalLink = targetId.startsWith("#");
        const targetElement = isInternalLink ? document.querySelector(targetId) : null;
        if (targetElement && isInternalLink) {
            targetElement.scrollIntoView({ behavior: "smooth" });
        } else if (!isInternalLink && targetId) {
            window.location.href = targetId; // Navigate to external URL
        }
    };



    return (
        <div className="flex justify-between items-center w-full mt-4 px-6">
            <h1 className="text-sm md:text-lg font-bold">Journey Maps</h1>
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <Link href="/" legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                Home
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Product</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid w-[200px] gap-3 p-4 md:w-[200px] md:grid-cols-1 lg:w-[200px] ">
                                {components.map((component) => (
                                    <ListItem
                                        key={component.title}
                                        title={component.title}
                                        href={component.href}
                                        onClick={handleSmoothScroll}
                                    >
                                    </ListItem>
                                ))}
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link href="#contactus" legacyBehavior passHref >
                            <NavigationMenuLink onClick={handleSmoothScroll} className={navigationMenuTriggerStyle()}>
                                Contact Us
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
            <ModeToggle />
        </div>
    )
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"