import { Lock, Trash, UserRoundPen } from "lucide-react";
import { useState } from "react";
import EditAccount from "../modals/edit";
import ChangePassword from "../modals/change";
import DeleteAccount from "../../../../../components/dialog/account";

export default function Settings() {
    const [showModal, setShowModal] = useState(false)
    const [changePassword, setChangePassword] =  useState(false)
    const [deleteAccount, setDeleteAccount] = useState(false)

    return (
        <div id="section-settings" className="py-5 px-10 scroll-mt-20">
            <div className="pb-4">
                <h2 className=" font-medium">Account Settings</h2>
                <p className="text-sm text-gray-400 ">Manage your account</p>
            </div>

            <div className="grid grid-rows-1 gap-4">
                <div className="flex gap-5">
                    <button
                        onClick={() => setShowModal(true)}
                        className="flex items-center justify-between w-1/2 bg-white border border-slate-100 p-6 rounded-2xl transition-all duration-300 shadow-md hover:shadow-xl cursor-pointer"
                    >
                        <div>
                            <h1 className="">Edit Account Details</h1>
                            <p className="text-xs text-gray-500 text-left">Avatar, email, and name</p>
                        </div>
                        <UserRoundPen />
                    </button>
                    <div className="w-1/2 p-5">
                        <p className="text-xs">Update your personal information and keep your account details up to date.</p>
                    </div>
                </div>

                <div className="flex gap-5">
                    <button
                        onClick={() => setChangePassword(true)}
                        className="flex items-center justify-between w-1/2 bg-white border border-slate-100 p-6 rounded-2xl transition-all duration-300 shadow-md hover:shadow-xl cursor-pointer">
                        <div>
                            <h1 className="">Change Password</h1>
                            <p className="text-xs text-gray-500 text-left">Password</p>
                        </div>
                        <Lock />
                    </button>
                    <div className="w-1/2 p-5">
                        <p className="text-xs">Update your password to keep your account secure and protected.</p>
                    </div>
                </div>

                <div className="border-2 border-l-6 border-destructive p-5 rounded-3xl ">
                    <p className="text-base text-left mb-4 text-destructive font-medium">Danger Zone</p>
                    <div className="flex gap-5">
                        <button
                            onClick={() => setDeleteAccount(true)}
                            className="flex items-center justify-between w-1/2 bg-white border border-slate-100 p-6 rounded-2xl transition-all duration-300 shadow-md group hover:bg-destructive hover:text-white cursor-pointer">
                            <div>
                                <h1 className="text-destructive transition-all duration-300 group-hover:text-white ">Delete Account</h1>
                                <p className="text-xs text-gray-500 text-left transition-all duration-300 group-hover:text-white">Account</p>
                            </div>
                            <Trash className="text-destructive transition-all duration-300 group-hover:text-white"/>
                        </button>
                        <div className="w-1/2 p-5">
                            <p className="text-xs text-destructive">This action permanently removes your account, feedback, comments, and votes.</p>
                        </div>
                    </div>
                </div>

            </div>

            <EditAccount
                open={showModal}
                onClose={() => setShowModal(false)}
            />

            <ChangePassword
                open={changePassword}
                onClose={() => setChangePassword(false)}
            />

            <DeleteAccount
                openDialog={deleteAccount}
                onClose={() => setDeleteAccount(false)}
            />
        </div>
    )
}
