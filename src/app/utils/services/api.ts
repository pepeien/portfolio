export function removeExtraSlashes(target: string): string {
    if (target.trim() === '/') {
        return target.trim();
    }

    return target.replace(/^[\\/]+|[\\/]+$/g, '');
}
