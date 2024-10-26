import { UserButton } from "@clerk/nextjs";

export function PrivateNavbar() {
    return (
        <div className="absolute right-5 top-5">
            <UserButton
                appearance={{
                    elements: {
                        avatarBox: "w-10 h-10",
                    },
                }}
            />
        </div>
    )
}