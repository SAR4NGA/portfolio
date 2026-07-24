const GH_USER = 'SAR4NGA'
const EXCLUDE = ['portfolio', 'SAR4NGA']

function toTitle(name) {
  return name
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase())
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

async function main() {
  const res = await fetch(`https://api.github.com/users/${GH_USER}/repos?per_page=100&sort=updated`)
  const repos = await res.json()
  if (!Array.isArray(repos)) {
    console.warn(`GitHub API limit or error:`, repos?.message || repos)
    console.warn(`Using existing src/data/projects.ts dataset.`)
    return
  }

  const filtered = repos.filter(r => !r.fork && !EXCLUDE.includes(r.name))

  console.log(`Found ${filtered.length} repos (excluding forks, portfolio, profile)`)


  const projects = []

  for (const repo of filtered) {
    console.log(`  Fetching languages for ${repo.name}...`)
    let tech = []
    try {
      const langRes = await fetch(repo.languages_url)
      const langData = await langRes.json()
      tech = Object.keys(langData).sort((a, b) => langData[b] - langData[a])
    } catch {
      if (repo.language) tech = [repo.language]
    }

    projects.push({
      title: toTitle(repo.name),
      description: repo.description || '',
      tech,
      github: repo.html_url,
      demo: repo.homepage || undefined,
    })
  }

  shuffle(projects)

  const content = `export interface Project {
  title: string
  description: string
  tech: string[]
  github: string
  demo?: string
  image?: string
}

export const projects: Project[] = ${JSON.stringify(projects, null, 2).replace(/\"([^\"]+)\":/g, '$1:')}
`

  const { writeFileSync } = await import('fs')
  writeFileSync('src/data/projects.ts', content, 'utf-8')
  console.log(`Wrote ${projects.length} projects to src/data/projects.ts`)
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
