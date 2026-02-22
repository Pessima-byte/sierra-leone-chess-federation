import { getMembers } from "@/lib/queries"
import { CreateMemberDialog } from "../components/create-member-dialog"
import { MembersTable } from "../components/members-table"

export default async function AdminMembers() {
    const members = await getMembers()

    return (
        <div className="space-y-4 md:space-y-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                <div>
                    <h1 className="text-2xl md:text-3xl font-black italic tracking-tight">MEMBERS</h1>
                    <p className="text-xs text-muted-foreground mt-0.5">{members.length} registered players</p>
                </div>
                <CreateMemberDialog />
            </div>

            <MembersTable members={JSON.parse(JSON.stringify(members))} />
        </div>
    )
}
