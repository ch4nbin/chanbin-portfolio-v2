import { HeaderNav } from "@/components/header-nav"
import { MainGrid } from "@/components/main-grid"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <HeaderNav />

      <main className="px-6 pb-20 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <MainGrid />
        </div>
      </main>

    </div>
  )
}
