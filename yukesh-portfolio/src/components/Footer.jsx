import { profile } from '../data/portfolio'

export default function Footer() {
  return (
    <footer className="border-t hairline py-8">
      <div className="container-edit flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-muted">
        <span>© {new Date().getFullYear()} {profile.name}. Built with intention.</span>
        <span className="type-label">{profile.location.toUpperCase()}</span>
      </div>
    </footer>
  )
}
