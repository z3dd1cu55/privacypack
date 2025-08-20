import { ArrowRight } from "lucide-react";
import Image from "next/image";
import React from "react";

interface PrivacyPackResultProps {
    pack: Array<{
        category: string;
        order: number;
        mainstream_app_name: string;
        mainstream_app_logo: string;
        private_alternative_name: string;
        private_alternative_logo: string;
        chosen: boolean;
    }>;
}

const PrivacyPackResult: React.FC<PrivacyPackResultProps> = ({ pack }) => {
    return (
        <div
            style={{
                display: "block",
                width: "1500px",
                height: "1500px",
                backgroundColor: "#121212",
                position: "relative",
                boxSizing: "border-box",
                overflow: "hidden",
                fontFamily: "monospace",
            }}
            id="privacy-pack-result-to-capture"
        >
            <div className="relative flex w-full flex-row items-center justify-between px-12 pt-12">
                <Image
                    src="/logo.png"
                    alt="PrivacyPack Logo"
                    width={405}
                    height={72}
                />
                <span className="text-[32px] tracking-[-0.09em] text-[#626262]">
                    PrivacyPack.org
                </span>
            </div>
            <div className="mt-16 grid w-full grid-cols-4 grid-rows-4 gap-x-26 gap-y-10 px-12">
                {pack.map((item) => {
                    return (
                        <div
                            key={item.category}
                            className="group relative flex h-[280px] w-[270px] flex-row items-center justify-between rounded-md pt-6 transition"
                        >
                            <div className="flex h-full flex-col items-center transition outline-none">
                                <div className="h-[116px] w-[116px] bg-[#212121]"></div>
                                <div className="mt-3 max-w-[116px] text-center text-[25px] leading-tight tracking-tight text-[#aeaeae]">
                                    {item.mainstream_app_name}
                                </div>
                            </div>
                            <div className="-mt-32">
                                <ArrowRight
                                    size={24}
                                    className="text-[#aeaeae]"
                                />
                            </div>
                            <div className="flex h-full flex-col items-center transition outline-none">
                                <div className="h-[116px] w-[116px] bg-[#212121]"></div>
                                <div className="mt-3 max-w-[116px] text-center text-[25px] leading-tight tracking-tight text-[#aeaeae]">
                                    {item.private_alternative_name}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="flex w-full flex-row items-center justify-end gap-3 pr-12 text-2xl text-[#626262]">
                <span>by</span>
                <div className="w-16">
                    <Image
                        src="/ente.svg"
                        alt="Ente logo"
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="h-auto w-full"
                        priority
                    />
                </div>
            </div>
        </div>
    );
};

export default PrivacyPackResult;
