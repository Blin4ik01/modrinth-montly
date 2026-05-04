import ProjectBackdropLayoutShell from '@/app/components/ProjectBackdropLayoutShell'

export default async function DatapackSlugLayout({ children, params }) {
  return (
    <ProjectBackdropLayoutShell slug={params.slug}>{children}</ProjectBackdropLayoutShell>
  )
}
