type TotalSectionProps = {
	firstTitle: string;
	secondTitle: string;
	totalAccounts: number;
	totalThisMonth: number;
};

const TotalSection = ({
	firstTitle,
	secondTitle,
	totalAccounts,
	totalThisMonth,
}: TotalSectionProps) => {
	return (
		<div className="flex flex-col sm:flex-row items-center justify-between px-4 py-2 rounded-b-lg mt-5">
			<div className="flex flex-col items-center sm:items-start">
				<p className="text-sm font-medium text-gray-700">{firstTitle}</p>
				<p className="text-lg font-bold text-gray-900">{totalAccounts}</p>
			</div>

			<div className="flex flex-col items-center sm:items-end">
				<p className="text-sm font-medium text-gray-700">{secondTitle}</p>
				<p className="text-lg font-bold text-gray-900">{totalThisMonth}</p>
			</div>
		</div>
	);
};

export default TotalSection;
