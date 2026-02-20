import { getMembers } from "@/lib/queries"
import { Button } from "@/components/ui/button"
import { Search, MoreHorizontal } from "lucide-react"
import { CreateMemberDialog } from "../components/create-member-dialog"
import { EditMemberDialog } from "../components/edit-member-dialog"
import { DeleteAction } from "../components/delete-action"
import { deleteMember } from "@/app/actions/admin"

export default async function AdminMembers() {
    const members = await getMembers()

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-black italic tracking-tight">MEMBERS MANAGEMENT</h1>
                <CreateMemberDialog />
            </div>

            <div className="bg-slate-900/50 border border-white/10 rounded-2xl overflow-hidden">
                <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
                    <div className="relative w-64">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search members..."
                            className="w-full h-9 pl-9 pr-4 bg-slate-950 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="text-sm text-muted-foreground">
                        Showing {members.length} members
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-slate-950/50 text-muted-foreground uppercase text-[10px] font-black tracking-wider">
                            <tr>
                                <th className="px-6 py-4">FIDE ID</th>
                                <th className="px-6 py-4">Name</th>
                                <th className="px-6 py-4">Rating</th>
                                <th className="px-6 py-4">Club</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {members.map(member => (
                                <tr key={member.id} className="hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4 font-mono text-muted-foreground">{member.fideId || 'N/A'}</td>
                                    <td className="px-6 py-4 font-medium">{member.name}</td>
                                    <td className="px-6 py-4 font-bold text-blue-400">{member.rating}</td>
                                    <td className="px-6 py-4">{member.club}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${member.status === 'Active' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
                                            }`}>
                                            {member.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right flex justify-end gap-2">
                                        <EditMemberDialog member={member as any} />
                                        <DeleteAction
                                            id={member.id}
                                            action={deleteMember}
                                            title="Member"
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
