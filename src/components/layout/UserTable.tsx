import type { MutedUser } from "@/types/muted";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../ui/table";

type UserTableProps = {
	data: MutedUser[];
	type: "hate_speech" | "sexual_harassment" | "muted_account";
};

const UserTable = ({ data, type }: UserTableProps) => {
	return (
		<Table>
			<TableHeader className="border-y border-gray-300">
				<TableHead className="text-center font-bold">Username</TableHead>
				<TableHead className="text-center font-bold">Timestamp</TableHead>
				{type !== "muted_account" && (
					<TableHead className="text-center font-bold">Count</TableHead>
				)}
			</TableHeader>
			<TableBody>
				{data.map((user, index) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					<TableRow className="border-y border-gray-200" key={index}>
						<TableCell className="text-center">
							{user.blocked_username}
						</TableCell>
						<TableCell className="text-center">
							{new Date(user.created_at).toLocaleDateString()}
						</TableCell>
						{type !== "muted_account" && (
							<TableCell className="text-center">{user.count}</TableCell>
						)}
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};

export default UserTable;
