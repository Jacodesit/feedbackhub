export default function Activity() {
    return (
        <div className="py-5 px-10">
            <div className="pb-4">
                <h2 className=" font-medium">Recents Activity</h2>
                <p className="text-sm text-gray-400 ">Show your recent actions</p>
            </div>
            <div className="border border-dashed rounded-lg h-72 flex justify-center items-center">
                <div className="flex flex-col gap-5">
                    <img
                        src="/images/under-development.svg"
                        alt="Feature Soon"
                        className="h-15 opacity-50"
                    />
                    <p className="text-gray-500 text-xs ">Recent activity tracking will be available soon.</p>
                </div>
            </div>
        </div>
    )
}
