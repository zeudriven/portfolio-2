// A Next.js "template" re-mounts on every navigation (unlike layout), so this wrapper
// re-runs its fade-in each time you switch sections — giving a smooth transition instead
// of a hard cut. CSS-only (opacity, no transform) so it never disturbs the fixed
// star / sun / beach background layers.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="animate-page-in">{children}</div>;
}
