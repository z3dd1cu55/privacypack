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
                display: "none",
                width: "1920px",
                height: "1119px",
                backgroundColor: "#F5F5F7",
                padding: "50px",
                position: "relative",
                boxSizing: "border-box",
                overflow: "hidden",
                fontFamily: "JetBrains Mono, monospace",
            }}
            id="privacy-pack-result-to-capture"
        >
            <div className="relative flex w-full flex-row items-center justify-between">
                <Image
                    src="/logo.png"
                    alt="PrivacyPack Logo"
                    width={405}
                    height={72}
                />
                <div className="absolute top-15 right-[320px] left-[474px] h-[1px] bg-[#C7C7C7]" />
                <span className="text-[32px] tracking-[-0.09em] text-[#626262]">
                    privacypack.org
                </span>
            </div>
            <div className="grid grid-cols-5 grid-rows-3">
                {pack.map((item) => {
                    return (
                        <div
                            key={item.category}
                            className="group relative flex h-[326px] w-[354px] flex-row items-center gap-2 rounded-md pt-6 transition"
                        >
                            <div className="flex h-full flex-col items-center bg-[#F5F5F7] p-4 transition outline-none">
                                <div className="h-[121px] w-[121px] bg-gray-400"></div>
                                <div className="mt-2 max-w-18 text-center text-[32px] leading-tight tracking-tight">
                                    {item.mainstream_app_name}
                                </div>
                            </div>
                            <ArrowRight size={64} className="text-black" />
                            <div className="flex h-full flex-col items-center bg-[#F5F5F7] p-4 transition outline-none">
                                <div className="h-[121px] w-[121px] bg-gray-400"></div>
                                <div className="mt-2 max-w-18 text-center text-[32px] leading-tight tracking-tight">
                                    {item.private_alternative_name}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default PrivacyPackResult;
