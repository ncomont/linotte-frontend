export class JobReportStatistics {
	found: number;
	resolved: number;
	notFound: number;

	public constructor(init?) {
		Object.assign(this, init);
	}

	public static Parse(json: any): JobReportStatistics {
		return new JobReportStatistics({
			found: json.found_count || 0,
			resolved: json.resolved_count || 0,
			notFound: json.not_found_count || 0,
		});
	}
}
