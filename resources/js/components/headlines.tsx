import Grid from "./grid"

export default function Headline() {
    const currPath = window.location.pathname

    return (
        <div className="relative bg-white p-10  rounded-lg shadow w-full">
            <Grid />
            {currPath === '/my-post' ? (
                <div className="relative z-100">
                    <h1 className="font-semibold text-4xl">My Feedbacks</h1>
                    <p className="text-gray-500">View, manage, and track the feedback you’ve shared with the community.</p>
                </div>
            ) : (
                <div className="relative z-100">
                    <h1 className="font-semibold text-4xl">Profile</h1>
                    <p className="text-gray-500">Manage your account, track your feedback activity, and view your contributions in one place.</p>
                </div>
            )}

        </div>
    )
}
