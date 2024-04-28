import { StringServices } from '.';

export class InternalServices {
    public static getBLOB(): string {
        return StringServices.removeExtraSlashes(process.env.BLOB);
    }

    public static getGitBLOB(): string {
        return StringServices.removeExtraSlashes(process.env.GIT_BLOB);
    }

    public static getDeploymentURL(): URL {
        return new URL(process.env.DEPLOYMENT_URL ?? 'http://localhost:3000');
    }

    public static getFetchInterval(): number {
        const DEFAULT_FETCH_INTERVAL_IN_SECONDS = 3600;

        if (!process.env.FETCH_REVALIDATION_INTERVAL) {
            return DEFAULT_FETCH_INTERVAL_IN_SECONDS;
        }

        const environmentValue = parseInt(process.env.FETCH_REVALIDATION_INTERVAL);

        if (isNaN(environmentValue)) {
            return DEFAULT_FETCH_INTERVAL_IN_SECONDS;
        }

        return environmentValue;
    }
}
