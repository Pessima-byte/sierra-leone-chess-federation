import { getMembers } from "@/lib/queries"
import { CreateMemberDialog } from "../components/create-member-dialog"
import { MembersTable } from "../components/members-table"

export default async function AdminMembers() {
    const members = await getMembers()

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-black italic tracking-tight">MEMBERS MANAGEMENT</h1>
                <CreateMemberDialog />
            </div>

            <MembersTable members={JSON.parse(JSON.stringify(members))} />
        </div>
    )
}
