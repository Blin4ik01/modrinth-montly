import ProjectBackdropLayoutShell from '@/app/components/ProjectBackdropLayoutShell'

export default async function ShaderSlugLayout({ children, params }) {
  return (
    <ProjectBackdropLayoutShell slug={params.slug}>{children}</ProjectBackdropLayoutShell>
  )
}
