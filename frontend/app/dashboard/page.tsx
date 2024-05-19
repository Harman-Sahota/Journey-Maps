"use client"
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function dashboard() {
    const [name, setName] = useState("");

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const sessionToken = params.get("sessionToken");
        const userName = params.get("name");
        if (sessionToken) {
            localStorage.setItem("sessionToken", sessionToken);
        }
        if (userName) {
            setName(userName);
          }
    }, []);

    return (
        <div>
            <h1>Hello, {name}</h1>
            <Button className="mt-4 rounded dark:text-white">Get Started</Button>
        </div>
    );
}