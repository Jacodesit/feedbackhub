import Logout from "@/components/logout-btn";

export default function Dashboard() {
    return (
        <main>
            <header className="bg-black text-white">
                <h1>You're successfully authenticated as admin.</h1>
                <Logout />
            </header>

        </main>
    )
}
