import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Home() {
    return (
        <div className="flex w-full flex-col p-4">
            <div className="flex w-full flex-row items-center justify-between">
                <Link
                    href="/"
                    className="green-text pr-1 text-2xl font-bold tracking-[-0.09em]"
                >
                    PrivacyPack
                </Link>
                <button className="h-8 w-8 cursor-pointer items-center justify-center bg-black text-white transition-all duration-150 hover:bg-black/80">
                    D
                </button>
            </div>
            <div>
                <DropdownMenu>
                    <DropdownMenuTrigger>Open</DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>
                            Profile
                            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem>Billing</DropdownMenuItem>
                        <DropdownMenuItem>Team</DropdownMenuItem>
                        <DropdownMenuItem>Subscription</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
}
