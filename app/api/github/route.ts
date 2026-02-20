import { NextResponse } from "next/server"

const GITHUB_USERNAME = "ch4nbin"

const QUERY = `
  query($username: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $username) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              contributionLevel
            }
          }
        }
      }
    }
  }
`

const LEVEL_MAP: Record<string, number> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
}

export async function GET() {
  const token = process.env.GITHUB_TOKEN

  if (!token) {
    return NextResponse.json(
      { contributions: [], total: 0, error: "GITHUB_TOKEN not configured" },
      { status: 500 }
    )
  }

  try {
    const to = new Date()
    const from = new Date()
    from.setMonth(from.getMonth() - 6)

    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: QUERY,
        variables: {
          username: GITHUB_USERNAME,
          from: from.toISOString(),
          to: to.toISOString(),
        },
      }),
      next: { revalidate: 3600 },
    })

    if (!res.ok) {
      const text = await res.text()
      console.error("[v0] GitHub GraphQL error:", res.status, text)
      throw new Error(`GitHub API returned ${res.status}`)
    }

    const json = await res.json()

    if (json.errors) {
      console.error("[v0] GraphQL errors:", json.errors)
      throw new Error(json.errors[0]?.message ?? "GraphQL error")
    }

    const calendar = json.data.user.contributionsCollection.contributionCalendar
    const total = calendar.totalContributions

    const contributions = calendar.weeks.flatMap(
      (week: { contributionDays: { date: string; contributionCount: number; contributionLevel: string }[] }) =>
        week.contributionDays.map((day) => ({
          date: day.date,
          count: day.contributionCount,
          level: LEVEL_MAP[day.contributionLevel] ?? 0,
        }))
    )

    return NextResponse.json({ contributions, total })
  } catch (error) {
    console.error("[v0] GitHub fetch error:", error)
    return NextResponse.json(
      { contributions: [], total: 0, error: "Failed to fetch contributions" },
      { status: 500 }
    )
  }
}
