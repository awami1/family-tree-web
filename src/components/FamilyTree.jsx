import familyData from "../data/family.json";

export default function FamilyTree() {
  return (
    <pre style={{ direction: "ltr", padding: 20 }}>
      {JSON.stringify(familyData, null, 2)}
    </pre>
  );
}
