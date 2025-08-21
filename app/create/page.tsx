"use client";

import Link from "next/link";
import {
    ArrowRight,
    Download,
    Square,
    Share2,
    SquareCheckBig,
    ChevronDown,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import data from "../../data/apps.json";
import PrivacyPackResult from "@/components/PrivacyPackResult";
import { handleDownload, handleShare } from "@/lib/utils";
import { toast } from "sonner";

interface AppCount {
    id: string;
    name: string;
    count: number;
}

export default function App() {
    const [pack, setPack] = useState(() => {
        const initialPack = data.categories.map((category) => ({
            category: category.name,
            order: category.order,
            mainstream_app_name: category.mainstream_apps[0].name,
            mainstream_app_logo: category.mainstream_apps[0].logo,
            private_alternative_id: "",
            private_alternative_name: "",
            private_alternative_logo: "",
            chosen: true,
        }));

        return initialPack;
    });

    const [appCounts, setAppCounts] = useState<AppCount[]>([]);
    const [loadingCounts, setLoadingCounts] = useState(true);

    useEffect(() => {
        fetchAppCounts();
    }, []);

    const fetchAppCounts = async () => {
        try {
            const response = await fetch("/api/apps");
            const data = (await response.json()) as {
                success: boolean;
                apps: AppCount[];
            };

            if (data.success) {
                setAppCounts(data.apps);
            }
        } catch (error) {
            console.error("Failed to fetch app counts:", error);
        } finally {
            setLoadingCounts(false);
        }
    };

    const getAppCount = (appId: string): number => {
        const app = appCounts.find((a) => a.id === appId);
        return app?.count || 0;
    };

    const incrementAppCounts = async (appIds: string[]) => {
        try {
            await fetch("/api/apps/increment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    appIds: appIds.filter((id) => id.length > 0),
                }),
            });
        } catch (error) {
            console.error("Failed to increment app counts:", error);
        }
    };

    const processSelection = async (action: () => void) => {
        const chosenItems = pack.filter((item) => item.chosen);
        const unselectedAlts = chosenItems.filter(
            (item) => !item.private_alternative_id,
        );
        const selectedIds = chosenItems
            .filter((item) => item.private_alternative_id)
            .map((item) => item.private_alternative_id);

        if (unselectedAlts.length > 0) {
            const missingCategories = unselectedAlts
                .map((item) => item.category)
                .join(", ");

            toast.error(
                `Please pick alternatives for: ${missingCategories}, or unselect the categories.`,
                { duration: 7000 },
            );
            return;
        }

        action();
        await incrementAppCounts(selectedIds);
    };

    const handleSelectApp = (
        categoryName: string,
        app: { id?: string; name: string; logo: string },
        type: "mainstream" | "private",
    ) => {
        setPack((prev) =>
            prev.map((item) =>
                item.category === categoryName
                    ? type === "mainstream"
                        ? {
                              ...item,
                              mainstream_app_name: app.name,
                              mainstream_app_logo: app.logo,
                          }
                        : {
                              ...item,
                              private_alternative_id: app.id || "",
                              private_alternative_name: app.name,
                              private_alternative_logo: app.logo,
                          }
                    : item,
            ),
        );
    };

    const toggleChosen = (categoryName: string) => {
        setPack((prev) =>
            prev.map((item) =>
                item.category === categoryName
                    ? { ...item, chosen: !item.chosen }
                    : item,
            ),
        );
    };

    return (
        <>
            <div className="flex w-full flex-col p-4">
                <div className="flex w-full flex-row items-center justify-between">
                    <Link
                        href="/"
                        className="green-text pr-1 text-2xl font-bold tracking-[-0.09em]"
                    >
                        PrivacyPack
                    </Link>
                    <div className="flex flex-row items-center gap-8">
                        <a
                            href="https://github.com/ente-io/privacypack"
                            target="_blank"
                            className="hidden text-sm text-[#868686] underline decoration-[#525252] underline-offset-4 hover:text-white hover:decoration-white sm:block"
                        >
                            Where&#39;s my app?
                        </a>
                        <button
                            onClick={() => processSelection(handleDownload)}
                            className="hidden h-10 cursor-pointer items-center justify-center gap-2 bg-white px-4 text-black transition-all duration-150 hover:bg-white/80 sm:flex"
                        >
                            <Download color="black" size={18} />
                            <span>DOWNLOAD</span>
                        </button>
                    </div>
                </div>
                <div className="mt-16 mb-10 grid grid-cols-1 gap-14 sm:mx-auto md:grid-cols-2 md:grid-rows-7 md:gap-20 lg:my-24 lg:gap-28 xl:my-24 xl:grid-cols-3 xl:grid-rows-5 xl:gap-16 2xl:my-32 2xl:gap-40">
                    {pack.map((item) => {
                        const category = data.categories.find(
                            (c) => c.name === item.category,
                        );

                        return (
                            <div
                                key={item.category}
                                className="flex flex-col gap-2"
                            >
                                <div>
                                    <button
                                        onClick={() =>
                                            toggleChosen(item.category)
                                        }
                                        className="flex cursor-pointer items-center justify-center"
                                    >
                                        {item.chosen ? (
                                            <SquareCheckBig className="h-5 w-5 text-[#9f9f9f]" />
                                        ) : (
                                            <Square className="h-5 w-5 text-[#9f9f9f]" />
                                        )}
                                    </button>
                                </div>
                                <div className="xs:p-8 flex h-full w-full flex-row items-center justify-between bg-[#181818] p-3 sm:w-auto sm:justify-normal sm:gap-3">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger
                                            asChild
                                            disabled={!item.chosen}
                                        >
                                            <div
                                                className={`flex h-full flex-col items-center bg-[#2B2B2B] p-4 text-[#aeaeae] transition outline-none hover:bg-[#ededed] hover:text-black focus:bg-[#ededed] focus:text-black data-[state=open]:bg-[#ededed] data-[state=open]:text-black ${
                                                    item.chosen
                                                        ? "cursor-pointer"
                                                        : "pointer-events-none cursor-default opacity-30 grayscale"
                                                }`}
                                            >
                                                <div className="h-18 w-18 bg-[#181818] lg:h-24 lg:w-24 xl:h-28 xl:w-28 2xl:h-40 2xl:w-40"></div>
                                                <div className="mt-3 max-w-18 text-center text-xs leading-tight font-medium tracking-tight lg:max-w-24 lg:text-base xl:max-w-28 2xl:max-w-40">
                                                    {item.mainstream_app_name}
                                                </div>
                                                <ChevronDown className="mt-1 h-4 w-4" />
                                            </div>
                                        </DropdownMenuTrigger>
                                        {item.chosen && (
                                            <DropdownMenuContent
                                                align="start"
                                                side="bottom"
                                            >
                                                {category?.mainstream_apps.map(
                                                    (mainstream_app) => (
                                                        <DropdownMenuItem
                                                            key={
                                                                mainstream_app.name
                                                            }
                                                            onClick={() =>
                                                                handleSelectApp(
                                                                    item.category,
                                                                    mainstream_app,
                                                                    "mainstream",
                                                                )
                                                            }
                                                            className="flex cursor-pointer flex-row items-center gap-2"
                                                        >
                                                            <div className="h-5 w-5 bg-gray-800"></div>
                                                            <span className="text-xs sm:text-sm">
                                                                {
                                                                    mainstream_app.name
                                                                }
                                                            </span>
                                                        </DropdownMenuItem>
                                                    ),
                                                )}
                                            </DropdownMenuContent>
                                        )}
                                    </DropdownMenu>
                                    <ArrowRight
                                        className={`transition ${
                                            item.chosen
                                                ? "text-[#aeaeae]"
                                                : "text-[#aeaeae] opacity-20"
                                        }`}
                                    />
                                    <DropdownMenu>
                                        <DropdownMenuTrigger
                                            asChild
                                            disabled={!item.chosen}
                                        >
                                            <div
                                                className={`flex h-full flex-col items-center bg-[#2B2B2B] p-4 text-[#aeaeae] transition outline-none hover:bg-[#ededed] hover:text-black focus:bg-[#ededed] focus:text-black data-[state=open]:bg-[#ededed] data-[state=open]:text-black ${
                                                    item.chosen
                                                        ? "cursor-pointer"
                                                        : "pointer-events-none cursor-default opacity-30 grayscale"
                                                }`}
                                            >
                                                <div className="h-18 w-18 bg-[#181818] lg:h-24 lg:w-24 xl:h-28 xl:w-28 2xl:h-40 2xl:w-40"></div>
                                                <div className="mt-3 max-w-18 text-center text-xs leading-tight font-medium tracking-tight lg:max-w-24 lg:text-base xl:max-w-28 2xl:max-w-40">
                                                    {item.private_alternative_name ||
                                                        "[Pick]"}
                                                </div>
                                                <ChevronDown className="mt-1 h-4 w-4" />
                                            </div>
                                        </DropdownMenuTrigger>
                                        {item.chosen && (
                                            <DropdownMenuContent
                                                align="end"
                                                side="bottom"
                                            >
                                                {category?.private_alternatives
                                                    .map((alt) => ({
                                                        ...alt,
                                                        count: getAppCount(
                                                            alt.id,
                                                        ),
                                                    }))
                                                    .sort(
                                                        (a, b) =>
                                                            b.count - a.count,
                                                    )
                                                    .map(
                                                        (
                                                            private_alternative,
                                                        ) => (
                                                            <DropdownMenuItem
                                                                key={
                                                                    private_alternative.id
                                                                }
                                                                onClick={() =>
                                                                    handleSelectApp(
                                                                        item.category,
                                                                        private_alternative,
                                                                        "private",
                                                                    )
                                                                }
                                                                className="cursor-pointer"
                                                            >
                                                                <div className="mr-5 flex flex-row items-center gap-2">
                                                                    <div className="h-5 w-5 bg-gray-800"></div>
                                                                    <span className="text-xs sm:text-sm">
                                                                        {
                                                                            private_alternative.name
                                                                        }
                                                                    </span>
                                                                </div>
                                                                <DropdownMenuShortcut className="tracking-tighter">
                                                                    {loadingCounts
                                                                        ? "[Loading...]"
                                                                        : `[In ${private_alternative.count} pack${private_alternative.count === 1 ? "" : "s"}]`}
                                                                </DropdownMenuShortcut>
                                                            </DropdownMenuItem>
                                                        ),
                                                    )}
                                            </DropdownMenuContent>
                                        )}
                                    </DropdownMenu>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <button
                    onClick={() => processSelection(handleShare)}
                    className="mt-8 flex h-12 w-full cursor-pointer items-center justify-center gap-2 bg-white text-black transition-all duration-150 hover:bg-white/80 sm:hidden"
                >
                    <Share2 color="black" size={16} />
                    <span className="text-lg">SHARE</span>
                </button>
                <button
                    onClick={() => processSelection(handleDownload)}
                    className="mt-3 flex h-12 w-full cursor-pointer items-center justify-center gap-2 bg-[#525252] text-white transition-all duration-150 hover:bg-[#444444] sm:hidden"
                >
                    <Download color="white" size={16} />
                    <span className="text-lg">DOWNLOAD</span>
                </button>
                <a
                    href="https://github.com/ente-io/privacypack"
                    target="_blank"
                    className="mx-auto my-12 text-sm text-[#868686] underline decoration-[#525252] underline-offset-4 hover:text-white hover:decoration-white sm:hidden"
                >
                    Where&#39;s my app?
                </a>
            </div>
            <PrivacyPackResult pack={pack.filter((item) => item.chosen)} />
        </>
    );
}
