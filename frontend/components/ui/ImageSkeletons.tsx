"use client"
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { useState, useEffect } from "react";

export function HeadImage() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {loading ? (
                <Skeleton className="hidden md:block mt-4 w-5/12 rounded ml-24 border-spacing-4 stroke-slate-700 p-4 h-svh" />
            ) : (
                <Image
                    src="/paths.png"
                    width={250}
                    height={250}
                    className="hidden md:block w-5/12 rounded h-auto ml-24 border-spacing-4 stroke-slate-700 p-4"
                    alt="People walking on a multiple crosswalk road"
                />
            )}
        </>
    );
}

