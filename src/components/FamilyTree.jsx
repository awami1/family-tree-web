import familyData from "../data/family.json";

export default function FamilyTree() {
  const people = familyData.individuals;

  // نبني خريطة الأب → الأبناء
  const childrenMap = {};
  people.forEach(p => {
    if (p.parent_id) {
      if (!childrenMap[p.parent_id]) {
        childrenMap[p.parent_id] = [];
      }
      childrenMap[p.parent_id].push(p);
    }
  });

  // الجذور (بدون أب)
  const roots = people.filter(p => !p.parent_id);

  let y = 40;
  const nodes = [];
  const lines = [];

  function drawPerson(person, x, level) {
    const boxWidth = 140;
    const boxHeight = 40;
    const yPos = level * 90 + 40;

    nodes.push(
      <g key={person.id}>
        <rect
          x={x}
          y={yPos}
          width={boxWidth}
          height={boxHeight}
          rx="8"
          fill="#ffffff"
          stroke="#333"
        />
        <text
          x={x + boxWidth / 2}
          y={yPos + 25}
          textAnchor="middle"
          fontSize="12"
        >
          {person.name}
        </text>
      </g>
    );

    const kids = childrenMap[person.id] || [];
    kids.forEach((child, i) => {
      const childX = x + i * 180;
      const childY = (level + 1) * 90 + 40;

      lines.push(
        <line
          key={person.id + "-" + child.id}
          x1={x + boxWidth / 2}
          y1={yPos + boxHeight}
          x2={childX + boxWidth / 2}
          y2={childY}
          stroke="#555"
        />
      );

      drawPerson(child, childX, level + 1);
    });
  }

  roots.forEach((root, i) => {
    drawPerson(root, 40 + i * 220, 0);
  });

  return (
    <svg width="2000" height="2000" style={{ background: "#f5f5f5" }}>
      {lines}
      {nodes}
    </svg>
  );
}
