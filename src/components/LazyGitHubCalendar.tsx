import { lazy, Suspense } from 'react'

const LazyCalendar = lazy<any>(() =>
  import('react-github-calendar').then(m => ({ default: m.GitHubCalendar }))
)

function CalendarSkeleton() {
  return (
    <div className="flex items-center justify-center py-10" aria-label="Loading contribution graph">
      <div className="h-28 w-full animate-pulse rounded-lg bg-gray-100 dark:bg-gray-800" />
    </div>
  )
}

export default function LazyGitHubCalendar(props: Record<string, unknown>) {
  return (
    <Suspense fallback={<CalendarSkeleton />}>
      <LazyCalendar {...props} />
    </Suspense>
  )
}
