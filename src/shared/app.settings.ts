import { environment } from '../environments/environment';

export class AppSettings {
	public static SECURE_API_ENDPOINT = `${environment.endpoint}/secure`;

	public static LOGIN_ENDPOINT = `${environment.endpoint}/login`;

	public static TAXREF_ENDPOINT = `${AppSettings.SECURE_API_ENDPOINT}/taxref`;
	public static TAXON_ENDPOINT = `${AppSettings.TAXREF_ENDPOINT}/taxon`;
	public static TAXON_SEARCH_ENDPOINT = `${AppSettings.TAXON_ENDPOINT}/search`;
	public static TAXON_REFERENCE_AND_SYNONYMS_ENDPOINT = `${AppSettings.TAXON_ENDPOINT}/all`;
	public static TAXON_TAXONOMIC_CLASSIFICATION_ENDPOINT = `${AppSettings.TAXON_ENDPOINT}/classification`;

	public static RANK_ENDPOINT = `${AppSettings.TAXREF_ENDPOINT}/rank`;

	public static JOB_ENDPOINT = `${AppSettings.SECURE_API_ENDPOINT}/job`;

	public static JOB_REPORTS_ENDPOINT = `${AppSettings.SECURE_API_ENDPOINT}/job-reports`;
	public static JOB_REPORT_ENDPOINT = `${AppSettings.SECURE_API_ENDPOINT}/job-report`;
	public static JOB_REPORT_STATISTICS_ENDPOINT = `${AppSettings.JOB_REPORT_ENDPOINT}/statistics`;
	public static JOB_RESULTS_ENDPOINT = `${AppSettings.SECURE_API_ENDPOINT}/job-results`;

	public static DEFAULT_TAXONOMIC_CLASSIFICATION_DEPTH = 3;
	public static PAGE_SIZE = 5;
	public static CONFLICT_RESOLUTION_PAGE_SIZE = 10;
	public static SEARCH_TIMER_VALUE = 300;

	public static USUAL_RANKS = ['FM', 'GN', 'AGES', 'ES', 'SSES', 'VAR', 'FO', 'CAR'];

	public static LS_TOKEN_KEY = 'token';
}
