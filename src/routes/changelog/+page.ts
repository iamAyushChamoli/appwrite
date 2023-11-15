import type { ChangelogData } from "$markdoc/layouts/Changelog.svelte";



type ChangelogComponent = {
  frontmatter: ChangelogData;
  default: ConstructorOfATypedSvelteComponent;
}

export const load = async () => {
  const entriesGlob = await import.meta.glob('./**/*.markdoc', { eager: true })
  let entries = Object.entries(entriesGlob).map(([filepath, component]) => {
    const typedComponent = component as ChangelogComponent
    const { frontmatter } = typedComponent

    return { ...frontmatter, component: typedComponent.default, filepath }
  })
  entries = entries.filter((({ filepath }) => {
    return filepath.includes('(entries)')
  }))

  entries = entries.sort((a, b) => {
    const aDate = new Date(a.date)
    const bDate = new Date(b.date)
    return bDate.getTime() - aDate.getTime()
  })

  return {
    entries
  }
};