import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
        <div className="flex h-dvh w-full flex-col items-center justify-between p-4 md:h-auto md:justify-normal md:p-5">
            <div className="flex w-full flex-row items-center justify-between">
                <div className="h-6 w-6 bg-lime-400"></div>
                <div className="w-14">
                    <a href="https://ente.io" target="_blank">
                        <Image
                            src="/ente.svg"
                            alt="Ente logo"
                            width={0}
                            height={0}
                            sizes="100vw"
                            className="h-auto w-full"
                            priority
                        />
                    </a>
                </div>
            </div>
            <div className="flex flex-col items-center md:mt-44">
                <div className="flex flex-col items-center">
                    <h1 className="green-text ml-2 pr-2 text-6xl font-bold tracking-[-0.09em] md:text-8xl">
                        PrivacyPack
                    </h1>
                    <p className="mt-4 flex flex-col text-center text-lg font-semibold tracking-tighter text-white/50 md:text-2xl">
                        YOUR PRIVACY STORY, IN ONE CARD
                    </p>
                    <Link
                        href="/app"
                        className="mt-6 items-center justify-center bg-white px-10 py-4 text-sm font-semibold text-black transition-all duration-150 hover:bg-white/80"
                    >
                        CREATE YOUR PACK
                    </Link>
                </div>
            </div>
            <div className="flex w-full flex-col items-center gap-3 md:my-32 md:w-[850px]">
                <div className="w-full">
                    <Image
                        src="/sample-privacy-pack.png"
                        alt="Sample Privacy Pack"
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="h-auto w-full"
                        priority
                    />
                </div>
                <div className="text-sm text-black/60 italic">
                    Brogio&#39;s PrivacyPack
                </div>
            </div>
        </div>
    );
}
