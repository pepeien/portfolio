export function removeExtraSlashes(target?: string): string {
    if (!target) {
        return '';
    }

    if (target.trim() === '/') {
        return target.trim();
    }

    return target.replace(/^[\\/]+|[\\/]+$/g, '');
}

export function getBaseCDN(): string {
    return `${removeExtraSlashes(process.env.GITHUB_CDN)}/${removeExtraSlashes(
        process.env.GITHUB_USER,
    )}`;
}

export function getCurrentRepoCDN(): string {
    return `${removeExtraSlashes(process.env.GITHUB_CDN)}/${removeExtraSlashes(
        process.env.GITHUB_USER,
    )}/${removeExtraSlashes(process.env.GITHUB_REPO)}/${removeExtraSlashes(
        process.env.GITHUB_BRANCH,
    )}`;
}

export function getDeploymentURL(): URL {
    return new URL(process.env.DEPLOYMENT_URL ?? 'http://localhost:3000');
}
