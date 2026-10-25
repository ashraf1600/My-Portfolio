/** Helpers that replace Astro's `class:list` and string `style` attributes in JSX. */
type CxValue = string | false | null | undefined | Record<string, unknown> | CxValue[];

export function cx(...values: CxValue[]): string {
  const out: string[] = [];
  const walk = (v: CxValue) => {
    if (!v) return;
    if (typeof v === "string") out.push(v);
    else if (Array.isArray(v)) v.forEach(walk);
    else for (const [k, on] of Object.entries(v)) if (on) out.push(k);
  };
  values.forEach(walk);
  return out.join(" ");
}

/** Parses "a:b;--x:1" into a React style object (custom properties kept verbatim). */
export function css(input: string): Record<string, string> {
  const style: Record<string, string> = {};
  for (const decl of input.split(";")) {
    const i = decl.indexOf(":");
    if (i < 0) continue;
    const key = decl.slice(0, i).trim();
    const value = decl.slice(i + 1).trim();
    if (!key) continue;
    style[key.startsWith("--") ? key : key.replace(/-([a-z])/g, (_, c) => c.toUpperCase())] = value;
  }
  return style;
}
