import { Lock, UserRoundPen } from "lucide-react";

export default function Settings() {
    return (
        <div id="section-settings" className="py-5 px-10 scroll-mt-20">
            <div className="pb-4">
                <h2 className=" font-medium">Account Settings</h2>
                <p className="text-sm text-gray-400 ">Manage your account</p>
            </div>

            <div className="grid grid-rows-1 gap-4">
                <div className="flex gap-5">
                    <div className="flex items-center justify-between w-1/2 bg-white border border-slate-100 p-6 rounded-2xl transition-all duration-300 shadow-md hover:border-violet-200 hover:shadow-xl cursor-pointer">
                        <div>
                            <h1 className="">Edit Account Details</h1>
                            <p className="text-xs text-gray-500">Avatar, email, and name</p>
                        </div>
                        <UserRoundPen />
                    </div>
                    <div className="w-1/2 p-5">
                        <p className="text-xs">Update your personal information and keep your account details up to date.</p>
                    </div>
                </div>

                <div className="flex gap-5">
                    <div className="flex items-center justify-between w-1/2 bg-white border border-slate-100 p-6 rounded-2xl transition-all duration-300 shadow-md hover:border-violet-200 hover:shadow-xl cursor-pointer">
                        <div>
                            <h1 className="">Change Password</h1>
                            <p className="text-xs text-gray-500">Password</p>
                        </div>
                        <Lock />
                    </div>
                    <div className="w-1/2 p-5">
                        <p className="text-xs">Update your password to keep your account secure and protected.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
