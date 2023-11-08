export function removeExtraSlashes(target: string): string {
    return target.replace(/^[\\/]+|[\\/]+$/g, '');
}
