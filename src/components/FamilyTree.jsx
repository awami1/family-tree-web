import familyData from "../data/family.json";

export default function FamilyTree() {
  const people = familyData.individuals;

  // تجميع حسب الجيل
  const generations = {};
  people.forEach(p => {
    if (!generations[p.generation]) {
      generations[p.generation] = [];
    }
    generations[p.generation].push(p);
  });

  const sortedGenerations = Object.keys(generations)
    .map(Number)
    .sort((a, b) => a - b);

  function getParentName(person) {
    if (!person.parent_id) return null;
    const parent = people.find(p => p.id === person.parent_id);
    return parent ? parent.name : null;
  }

  return (
    <div style={{ padding: "16px", background: "#f6f7f8" }}>
      <h1 style={{ textAlign: "center", marginBottom: 24 }}>
        شجرة العائلة
      </h1>

      {sortedGenerations.map(gen => (
        <section key={gen} style={{ marginBottom: 32 }}>
          <h2 style={{ marginBottom: 12 }}>
            الجيل {gen}
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
              gap: "12px"
            }}
          >
            {generations[gen].map(person => (
              <div
                key={person.id}
                style={{
                  background: "#ffffff",
                  borderRadius: 12,
                  padding: 12,
                  boxShadow: "0 2px 6px rgba(0,0,0,0.08)"
                }}
              >
                <div
                  style={{
                    fontWeight: "bold",
                    marginBottom: 6
                  }}
                >
                  {person.name}
                </div>

                {getParentName(person) && (
                  <div style={{ fontSize: 12, color: "#666" }}>
                    ابن / بنت {getParentName(person)}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
