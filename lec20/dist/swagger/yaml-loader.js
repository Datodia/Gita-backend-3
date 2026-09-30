"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveDocsDir = resolveDocsDir;
exports.loadOpenApiDocument = loadOpenApiDocument;
const fs_1 = require("fs");
const path_1 = require("path");
const js_yaml_1 = require("js-yaml");
function deepMerge(target, source) {
    for (const [key, value] of Object.entries(source)) {
        const current = target[key];
        if (Array.isArray(current) && Array.isArray(value)) {
            target[key] = [...current, ...value];
            continue;
        }
        if (isPlainObject(current) && isPlainObject(value)) {
            target[key] = deepMerge(current, value);
            continue;
        }
        target[key] = value;
    }
    return target;
}
function isPlainObject(value) {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}
function resolveDocsDir() {
    const candidates = [
        (0, path_1.join)(__dirname, 'docs'),
        (0, path_1.join)(process.cwd(), 'src', 'swagger', 'docs'),
    ];
    const found = candidates.find((dir) => (0, fs_1.existsSync)(dir));
    if (!found) {
        throw new Error(`OpenAPI docs directory not found. Looked in: ${candidates.join(', ')}`);
    }
    return found;
}
function loadOpenApiDocument(docsDir = resolveDocsDir()) {
    const files = (0, fs_1.readdirSync)(docsDir)
        .filter((file) => file.endsWith('.yaml') || file.endsWith('.yml'))
        .sort();
    if (files.length === 0) {
        throw new Error(`No YAML files found in ${docsDir}`);
    }
    return files.reduce((document, file) => {
        const parsed = (0, js_yaml_1.load)((0, fs_1.readFileSync)((0, path_1.join)(docsDir, file), 'utf8'));
        if (!isPlainObject(parsed)) {
            throw new Error(`${file} must contain a YAML mapping at the root`);
        }
        return deepMerge(document, parsed);
    }, {});
}
//# sourceMappingURL=yaml-loader.js.map