"use client";

import { useEffect, useState } from "react";
import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";

interface PostHogProviderProps {
    children: React.ReactNode;
}

interface PosthogConfig {
    key: string;
    host: string;
}

export function PostHogProvider({ children }: PostHogProviderProps) {
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const init = async () => {
            const res = await fetch("/api/posthog");
            const data: PosthogConfig = await res.json();

            posthog.init(data.key, {
                api_host: data.host,
                disable_persistence: true,
                persistence: "memory",
            });

            setReady(true);
        };

        init();
    }, []);

    if (!ready) return null;

    return <PHProvider client={posthog}>{children}</PHProvider>;
}
