// 汎用ユーティリティ
export function toCamelCaseKeysDeep(obj: unknown): unknown {
  if (Array.isArray(obj)) {
    return obj.map(toCamelCaseKeysDeep);
  } else if (obj && typeof obj === "object") {
    return Object.fromEntries(
      Object.entries(obj as Record<string, unknown>).map(([k, v]) => [
        k.replace(/_([a-z])/g, (_, c) => c.toUpperCase()),
        toCamelCaseKeysDeep(v),
      ])
    );
  }

  return obj;
}
