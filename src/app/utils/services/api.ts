export function removeExtraSlashes(target?: string): string {
    if (!target) {
        return '';
    }

    if (target.trim() === '/') {
        return target.trim();
    }

    return target.replace(/^[\\/]+|[\\/]+$/g, '');
}

export function getCDN(): string {
    return removeExtraSlashes(process.env.CDN);
}

export function getGitCDN(): string {
    return removeExtraSlashes(process.env.GIT_CDN);
}

export function getDeploymentURL(): URL {
    return new URL(process.env.DEPLOYMENT_URL ?? 'http://localhost:3000');
}

export function getFetchInterval(): number {
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
