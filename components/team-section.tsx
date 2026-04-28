import { fetchAPI } from "@/lib/api"

export default async function TeamSection() {
  const teamMembers = await fetchAPI('/team/') || [];
  return (
    <section id="team" className="bg-[var(--navy)] py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[var(--gold)] font-sans text-xs uppercase tracking-[0.3em] font-semibold">
            Les personnes derrière IBUKA
          </span>
          <h2 className="font-serif text-white text-3xl md:text-4xl font-bold mt-3">
            Notre équipe
          </h2>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="w-12 h-0.5 bg-[var(--gold)]" />
            <div className="w-2 h-2 rounded-full bg-[var(--gold)]" />
            <div className="w-12 h-0.5 bg-[var(--gold)]" />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {teamMembers.map((member: any) => (
            <div
              key={member.name}
              className="group flex flex-col items-center text-center gap-3"
            >
              <div className="w-16 h-16 rounded-full border-2 border-white/20 group-hover:border-[var(--gold)] flex items-center justify-center bg-white/5 transition-all duration-300">
                <span className="font-serif text-white text-sm font-bold">
                  {member.initials}
                </span>
              </div>
              <div>
                <p className="text-white font-sans text-xs font-semibold leading-tight">
                  {member.name}
                </p>
                <p className="text-white/50 font-sans text-xs mt-0.5">
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
