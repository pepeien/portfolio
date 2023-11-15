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

export function getGithubCDN(): string {
    return removeExtraSlashes(process.env.GIT_CND);
}

export function getDeploymentURL(): URL {
    return new URL(process.env.DEPLOYMENT_URL ?? 'http://localhost:3000');
}
