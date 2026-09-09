import { existsSync, readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import { load } from 'js-yaml';

type PlainObject = Record<string, any>;

/**
 * Deep merge that concatenates arrays and merges plain objects.
 * Later sources win on scalar conflicts.
 */
function deepMerge(target: PlainObject, source: PlainObject): PlainObject {
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

function isPlainObject(value: unknown): value is PlainObject {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * Resolves the docs directory both for `dist` runs (assets are copied by the
 * nest builder) and for direct `ts-node`/jest runs from `src`.
 */
export function resolveDocsDir(): string {
  const candidates = [
    join(__dirname, 'docs'),
    join(process.cwd(), 'src', 'swagger', 'docs'),
  ];

  const found = candidates.find((dir) => existsSync(dir));
  if (!found) {
    throw new Error(
      `OpenAPI docs directory not found. Looked in: ${candidates.join(', ')}`,
    );
  }

  return found;
}

/**
 * Loads every *.yaml file from the docs directory and merges them into a single
 * OpenAPI document. Files are merged in alphabetical order, so `_root.yaml`
 * (info/servers/tags) is applied first and the per-resource files add to it.
 */
export function loadOpenApiDocument(docsDir = resolveDocsDir()): PlainObject {
  const files = readdirSync(docsDir)
    .filter((file) => file.endsWith('.yaml') || file.endsWith('.yml'))
    .sort();

  if (files.length === 0) {
    throw new Error(`No YAML files found in ${docsDir}`);
  }

  return files.reduce<PlainObject>((document, file) => {
    const parsed = load(readFileSync(join(docsDir, file), 'utf8'));

    if (!isPlainObject(parsed)) {
      throw new Error(`${file} must contain a YAML mapping at the root`);
    }

    return deepMerge(document, parsed);
  }, {});
}
