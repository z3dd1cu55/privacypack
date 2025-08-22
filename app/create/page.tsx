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
import React, { useState, useEffect, useRef } from "react";
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
import Image from "next/image";

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
            mainstream_app_id: category.mainstream_apps[0].id,
            mainstream_app_name: category.mainstream_apps[0].name,
            private_alternative_id: "",
            private_alternative_name: "",
            chosen: true,
        }));
        return initialPack;
    });

    const [appCounts, setAppCounts] = useState<AppCount[]>([]);
    const [loadingCounts, setLoadingCounts] = useState(true);

    // track which dropdown is open
    const [openKey, setOpenKey] = useState<string | null>(null);
    const touchKeyRef = useRef<string | null>(null);

    const getTouchTriggerHandlers = (key: string) => ({
        onPointerDown: (e: React.PointerEvent<HTMLDivElement>) => {
            if (e.pointerType === "touch") {
                // prevent Radix from opening immediately on pointerdown
                e.preventDefault();
                touchKeyRef.current = key;
            }
        },
        onClick: () => {
            // only toggle if this was a true tap
            if (touchKeyRef.current === key) {
                setOpenKey((prev) => (prev === key ? null : key));
            }
            touchKeyRef.current = null;
        },
    });

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
        app: { id: string; name: string },
        type: "mainstream" | "private",
    ) => {
        setPack((prev) =>
            prev.map((item) =>
                item.category === categoryName
                    ? type === "mainstream"
                        ? {
                              ...item,
                              mainstream_app_id: app.id,
                              mainstream_app_name: app.name,
                          }
                        : {
                              ...item,
                              private_alternative_id: app.id,
                              private_alternative_name: app.name,
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
                <div className="flex w-full flex-row items-center justify-between md:px-4 md:pt-4">
                    <Link
                        href="/"
                        className="green-text pr-1 text-2xl font-bold tracking-[-0.09em]"
                    >
                        PrivacyPack
                    </Link>
                    <div className="flex flex-row items-center gap-8">
                        <a
                            href="https://github.com/ente-io/privacypack?tab=readme-ov-file#adding-new-apps"
                            target="_blank"
                            className="hidden text-sm text-[#868686] underline decoration-[#525252] underline-offset-4 hover:text-white hover:decoration-white sm:block"
                        >
                            Where&#39;s my app?
                        </a>
                        <button
                            onClick={() => processSelection(handleDownload)}
                            className="flex h-10 cursor-pointer items-center justify-center gap-2 bg-white px-4 text-black transition-all duration-150 hover:bg-white/80"
                        >
                            <Download color="black" size={18} />
                            <span>DOWNLOAD</span>
                        </button>
                    </div>
                </div>

                <div className="mt-16 mb-10 grid grid-cols-1 gap-14 sm:mx-auto md:grid-cols-2 md:grid-rows-6 md:gap-20 lg:my-24 lg:gap-28 xl:my-24 xl:grid-cols-3 xl:grid-rows-4 xl:gap-20 2xl:my-32 2xl:gap-40">
                    {pack.map((item) => {
                        const category = data.categories.find(
                            (c) => c.name === item.category,
                        );

                        const mainKey = `${item.category}-main`;
                        const altKey = `${item.category}-alt`;

                        return (
                            <div
                                key={item.category}
                                className="flex flex-col gap-2"
                            >
                                <div className="flex flex-row items-center justify-between">
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
                                    <div className="mx-5 h-[1px] w-full bg-[#464646]" />
                                    <span className="whitespace-nowrap text-[#9f9f9f]">
                                        {item.category}
                                    </span>
                                </div>

                                <div className="xs:p-8 flex h-full w-full flex-row items-center justify-between bg-[#181818] p-3 sm:w-auto sm:justify-normal sm:gap-3">
                                    <DropdownMenu
                                        open={openKey === mainKey}
                                        onOpenChange={(next) =>
                                            setOpenKey(next ? mainKey : null)
                                        }
                                    >
                                        <DropdownMenuTrigger
                                            asChild
                                            disabled={!item.chosen}
                                        >
                                            <div
                                                {...getTouchTriggerHandlers(
                                                    mainKey,
                                                )}
                                                className={`flex h-full flex-col items-center bg-[#2B2B2B] p-4 text-[#aeaeae] transition outline-none hover:bg-[#ededed] hover:text-black focus:bg-[#ededed] focus:text-black data-[state=open]:bg-[#ededed] data-[state=open]:text-black ${
                                                    item.chosen
                                                        ? "cursor-pointer touch-pan-y"
                                                        : "pointer-events-none cursor-default opacity-30 grayscale"
                                                }`}
                                            >
                                                <div className="h-18 w-18 lg:h-24 lg:w-24 xl:h-28 xl:w-28 2xl:h-40 2xl:w-40">
                                                    <Image
                                                        src={`/app-logos/${item.mainstream_app_id}.jpg`}
                                                        alt={
                                                            item.mainstream_app_name
                                                        }
                                                        width={0}
                                                        height={0}
                                                        sizes="100vw"
                                                        className="h-auto w-full rounded-2xl"
                                                    />
                                                </div>
                                                <div className="mt-5 max-w-18 text-center text-xs leading-tight font-medium tracking-tight lg:max-w-24 lg:text-base xl:max-w-28 2xl:max-w-40">
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
                                                            <div className="h-5 w-5">
                                                                <Image
                                                                    src={`/app-logos/${mainstream_app.id}.jpg`}
                                                                    alt={
                                                                        mainstream_app.name
                                                                    }
                                                                    width={0}
                                                                    height={0}
                                                                    sizes="100vw"
                                                                    className="h-auto w-full"
                                                                />
                                                            </div>
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

                                    <DropdownMenu
                                        open={openKey === altKey}
                                        onOpenChange={(next) =>
                                            setOpenKey(next ? altKey : null)
                                        }
                                    >
                                        <DropdownMenuTrigger
                                            asChild
                                            disabled={!item.chosen}
                                        >
                                            <div
                                                {...getTouchTriggerHandlers(
                                                    altKey,
                                                )}
                                                className={`flex h-full flex-col items-center bg-[#2B2B2B] p-4 text-[#aeaeae] transition outline-none hover:bg-[#ededed] hover:text-black focus:bg-[#ededed] focus:text-black data-[state=open]:bg-[#ededed] data-[state=open]:text-black ${
                                                    item.chosen
                                                        ? "cursor-pointer touch-pan-y"
                                                        : "pointer-events-none cursor-default opacity-30 grayscale"
                                                }`}
                                            >
                                                <div
                                                    className={`h-18 w-18 rounded-2xl lg:h-24 lg:w-24 xl:h-28 xl:w-28 2xl:h-40 2xl:w-40 ${
                                                        !item.private_alternative_id &&
                                                        "bg-[#383838]"
                                                    }`}
                                                >
                                                    {item.private_alternative_id && (
                                                        <Image
                                                            src={`/app-logos/${item.private_alternative_id}.jpg`}
                                                            alt={
                                                                item.private_alternative_name
                                                            }
                                                            width={0}
                                                            height={0}
                                                            sizes="100vw"
                                                            className="h-auto w-full rounded-2xl"
                                                        />
                                                    )}
                                                </div>
                                                <div className="mt-5 max-w-18 text-center text-xs leading-tight font-medium tracking-tight lg:max-w-24 lg:text-base xl:max-w-28 2xl:max-w-40">
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
                                                                    <div className="h-5 w-5">
                                                                        <Image
                                                                            src={`/app-logos/${private_alternative.id}.jpg`}
                                                                            alt={
                                                                                private_alternative.name
                                                                            }
                                                                            width={
                                                                                0
                                                                            }
                                                                            height={
                                                                                0
                                                                            }
                                                                            sizes="100vw"
                                                                            className="h-auto w-full"
                                                                        />
                                                                    </div>
                                                                    <span className="text-xs sm:text-sm">
                                                                        {
                                                                            private_alternative.name
                                                                        }
                                                                    </span>
                                                                </div>
                                                                <DropdownMenuShortcut className="tracking-tighter">
                                                                    {loadingCounts
                                                                        ? "[Loading...]"
                                                                        : `[In ${private_alternative.count} pack${
                                                                              private_alternative.count ===
                                                                              1
                                                                                  ? ""
                                                                                  : "s"
                                                                          }]`}
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
                    href="https://github.com/ente-io/privacypack?tab=readme-ov-file#adding-new-apps"
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
