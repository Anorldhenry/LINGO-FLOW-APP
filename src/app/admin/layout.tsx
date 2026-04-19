// Minimal root admin layout — just a passthrough.
// Auth guard and sidebar live in the (dashboard) route group layout.
export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
