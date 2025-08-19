"use client";

import Link from "next/link";
import {
    ArrowRight,
    Download,
    CheckSquare,
    Square,
    Share2,
    MoveRight,
    SquareCheck,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import data from "../../data/apps.json";
import PrivacyPackResult from "@/components/PrivacyPackResult";
import { handleDownload } from "@/lib/utils";

export default function App() {
    const [pack, setPack] = useState(() => {
        const initialPack = data.categories.map((category) => ({
            category: category.name,
            order: category.order,
            mainstream_app_name: category.mainstream_apps[0].name,
            mainstream_app_logo: category.mainstream_apps[0].logo,
            private_alternative_name: category.private_alternatives[0].name,
            private_alternative_logo: category.private_alternatives[0].logo,
            chosen: true,
        }));

        return initialPack;
    });

    const handleSelectApp = (
        categoryName: string,
        app: any,
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

    const [gap, setGap] = useState(48);

    useEffect(() => {
        function updateGap() {
            const itemWidth = 240;
            const containerWidth = window.innerWidth - 16;
            const itemsPerRow = Math.floor(containerWidth / itemWidth);

            if (itemsPerRow > 1) {
                const newGap =
                    (containerWidth - itemsPerRow * itemWidth) /
                    (itemsPerRow - 1);
                setGap(newGap);
            }
        }

        updateGap();
        window.addEventListener("resize", updateGap);
        return () => window.removeEventListener("resize", updateGap);
    }, []);

    return (
        <>
            {/* Desktop view */}
            <div className="flex w-full flex-col p-4">
                <div className="flex w-full flex-row items-center justify-between">
                    <Link
                        href="/"
                        className="green-text pr-1 text-2xl font-bold tracking-[-0.09em]"
                    >
                        PrivacyPack
                    </Link>
                    <div className="flex flex-row gap-5">
                        <a
                            href="https://github.com/ente-io/privacypack"
                            target="_blank"
                            className="flex h-8 w-auto cursor-pointer items-center justify-center bg-[#525252] px-3 text-xs text-white transition-all duration-150 hover:bg-[#444444]"
                        >
                            WHERE'S MY APP?
                        </a>
                        <button
                            onClick={handleDownload}
                            className="hidden h-8 w-8 cursor-pointer items-center justify-center bg-white text-black transition-all duration-150 hover:bg-white/80 sm:flex"
                        >
                            <Download color="black" size={16} />
                        </button>
                    </div>
                </div>
                <div className="mt-16 mb-10 grid grid-cols-1 gap-14 sm:mx-auto sm:gap-22 md:grid-cols-2 md:grid-rows-7 lg:grid-cols-3 lg:grid-rows-5 xl:mb-16 xl:grid-cols-4 xl:grid-rows-4">
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
                                            <SquareCheck className="h-5 w-5 text-white" />
                                        ) : (
                                            <Square className="h-5 w-5 text-white" />
                                        )}
                                    </button>
                                </div>
                                <div className="flex h-full w-full flex-row items-center justify-between bg-[#181818] p-8 sm:w-auto sm:justify-normal sm:gap-3">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger
                                            asChild
                                            disabled={!item.chosen}
                                        >
                                            <div
                                                className={`flex h-full flex-col items-center bg-[#2B2B2B] p-4 transition outline-none ${
                                                    item.chosen
                                                        ? "cursor-pointer hover:bg-[#ededed] focus:bg-[#ededed] data-[state=open]:bg-[#ededed]"
                                                        : "pointer-events-none cursor-default opacity-40 grayscale"
                                                }`}
                                            >
                                                <div className="h-18 w-18 bg-[#181818]"></div>
                                                <div className="mt-2 max-w-18 text-center text-xs leading-tight font-medium tracking-tight text-white">
                                                    {item.mainstream_app_name}
                                                </div>
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
                                                            <div className="h-5 w-5 bg-gray-400"></div>
                                                            <span className="text-xs">
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
                                    <div className="flex items-center justify-center rounded-full border border-[#181818] bg-[#2B2B2B] p-3">
                                        <ArrowRight
                                            className={`transition ${
                                                item.chosen
                                                    ? "text-white"
                                                    : "text-white"
                                            }`}
                                        />
                                    </div>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger
                                            asChild
                                            disabled={!item.chosen}
                                        >
                                            <div
                                                className={`flex h-full flex-col items-center bg-[#2B2B2B] p-4 transition outline-none ${
                                                    item.chosen
                                                        ? "cursor-pointer hover:bg-[#ededed] focus:bg-[#ededed] data-[state=open]:bg-[#ededed]"
                                                        : "pointer-events-none cursor-default opacity-40 grayscale"
                                                }`}
                                            >
                                                <div className="h-18 w-18 bg-[#181818]"></div>
                                                <div className="mt-2 max-w-18 text-center text-xs leading-tight font-medium tracking-tight text-white">
                                                    {
                                                        item.private_alternative_name
                                                    }
                                                </div>
                                            </div>
                                        </DropdownMenuTrigger>
                                        {item.chosen && (
                                            <DropdownMenuContent
                                                align="end"
                                                side="bottom"
                                            >
                                                {category?.private_alternatives.map(
                                                    (private_alternative) => (
                                                        <DropdownMenuItem
                                                            key={
                                                                private_alternative.name
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
                                                                <span className="text-xs">
                                                                    {
                                                                        private_alternative.name
                                                                    }
                                                                </span>
                                                            </div>
                                                            <DropdownMenuShortcut className="tracking-tighter">
                                                                [in 2025 packs]
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
                <button className="mt-12 flex h-12 w-full cursor-pointer items-center justify-center gap-2 bg-white text-black transition-all duration-150 hover:bg-white/80 sm:hidden">
                    <Share2 color="black" size={16} />
                    <span className="text-lg">SHARE</span>
                </button>
            </div>
            <PrivacyPackResult pack={pack} />
        </>
    );
}
