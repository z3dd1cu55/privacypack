"use client";

import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import data from "../../data/apps.json";

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

    return (
        <div className="flex w-full flex-col p-4">
            <div className="flex w-full flex-row items-center justify-between">
                <Link
                    href="/"
                    className="green-text pr-1 text-2xl font-bold tracking-[-0.09em]"
                >
                    PrivacyPack
                </Link>
                <button className="flex h-8 w-8 cursor-pointer items-center justify-center bg-black text-white transition-all duration-150 hover:bg-black/80">
                    <Download color="white" size={16} />
                </button>
            </div>

            <div className="mt-12 grid grid-cols-5 grid-rows-3 gap-x-12 gap-y-16">
                {pack.map((item) => {
                    const category = data.categories.find(
                        (c) => c.name === item.category,
                    );

                    return (
                        <div
                            key={item.category}
                            className="flex h-full w-full flex-row items-center justify-between"
                        >
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <div className="flex h-full cursor-pointer flex-col items-center bg-[#F5F5F7] p-4 outline-none hover:bg-[#ededed] focus:bg-[#ededed] data-[state=open]:bg-[#ededed]">
                                        <div className="h-18 w-18 bg-gray-400"></div>
                                        <div className="mt-2 max-w-18 text-center text-xs leading-tight tracking-tight">
                                            {item.mainstream_app_name}
                                        </div>
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start" side="right">
                                    {category?.mainstream_apps.map(
                                        (mainstream_app) => (
                                            <DropdownMenuItem
                                                key={mainstream_app.name}
                                                onClick={() =>
                                                    handleSelectApp(
                                                        item.category,
                                                        mainstream_app,
                                                        "mainstream",
                                                    )
                                                }
                                                className="cursor-pointer"
                                            >
                                                <div className="mr-8 flex flex-row items-center gap-2">
                                                    <div className="h-5 w-5 bg-gray-400"></div>
                                                    <span className="text-xs">
                                                        {mainstream_app.name}
                                                    </span>
                                                </div>
                                                <DropdownMenuShortcut className="tracking-tighter">
                                                    2025 packs
                                                </DropdownMenuShortcut>
                                            </DropdownMenuItem>
                                        ),
                                    )}
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <ArrowRight color="black" size={16} />

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <div className="flex h-full cursor-pointer flex-col items-center bg-[#F5F5F7] p-4 outline-none hover:bg-[#ededed] focus:bg-[#ededed] data-[state=open]:bg-[#ededed]">
                                        <div className="h-18 w-18 bg-gray-400"></div>
                                        <div className="mt-2 max-w-18 text-center text-xs leading-tight tracking-tight">
                                            {item.private_alternative_name}
                                        </div>
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start" side="right">
                                    {category?.private_alternatives.map(
                                        (private_alternative) => (
                                            <DropdownMenuItem
                                                key={private_alternative.name}
                                                onClick={() =>
                                                    handleSelectApp(
                                                        item.category,
                                                        private_alternative,
                                                        "private",
                                                    )
                                                }
                                                className="cursor-pointer"
                                            >
                                                <div className="mr-8 flex flex-row items-center gap-2">
                                                    <div className="h-5 w-5 bg-gray-400"></div>
                                                    <span className="text-xs">
                                                        {
                                                            private_alternative.name
                                                        }
                                                    </span>
                                                </div>
                                                <DropdownMenuShortcut className="tracking-tighter">
                                                    2025 packs
                                                </DropdownMenuShortcut>
                                            </DropdownMenuItem>
                                        ),
                                    )}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
