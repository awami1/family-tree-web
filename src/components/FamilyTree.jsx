import familyData from "../data/family.json";

const BOX_WIDTH = 140;
const BOX_HEIGHT = 40;
const H_GAP = 30;
const V_GAP = 90;

export default function FamilyTree() {
  const people = familyData.individuals;

  // خريطة الأشخاص
  const byId = Object.fromEntries(people.map(p => [p.id, p]));

  // خريطة الأب → الأبناء
  const childrenMap = {};
  people.forEach(p => {
    if (p.parent_id) {
      if (!childrenMap[p.parent_id]) childrenMap[p.parent_id] = [];
      childrenMap[p.parent_id].push(p);
    }
  });

  // الجذور (بدون أب)
  const roots = people.filter(p => !p.parent_id);

  // نحسب عرض كل فرع
  function subtreeWidth(person) {
    const kids = childrenMap[person.id] || [];
    if (kids.length === 0) return BOX_WIDTH;
    return kids.reduce((sum, k) => sum + subtreeWidth(k), 0) +
           (kids.length - 1) * H_GAP;
  }

  const nodes = [];
  const lines = [];

  function draw(person, x, level) {
    const y = level * V_GAP + 40;

    nodes.push(
      <g key={person.id}>
        <rect
          x={x}
          y={y}
          width={BOX_WIDTH}
          height={BOX_HEIGHT}
          rx="8"
          fill="#ffffff"
          stroke="#333"
        />
        <text
          x={x + BOX_WIDTH / 2}
          y={y + 25}
          textAnchor="middle"
          fontSize="12"
        >
          {person.name}
        </text>
      </g>
    );

    const kids = childrenMap[person.id] || [];
    let cursorX = x - subtreeWidth(person) / 2;

    kids.forEach(child => {
      const childWidth = subtreeWidth(child);
      const childX = cursorX + childWidth / 2 - BOX_WIDTH / 2;
      const childY = (level + 1) * V_GAP + 40;

      lines.push(
        <line
          key={person.id + "-" + child.id}
          x1={x + BOX_WIDTH / 2}
          y1={y + BOX_HEIGHT}
          x2={childX + BOX_WIDTH / 2}
          y2={childY}
          stroke="#555"
        />
      );

      draw(child, childX, level + 1);
      cursorX += childWidth + H_GAP;
    });
  }

  let startX = 40;
  roots.forEach(root => {
    const w = subtreeWidth(root);
    const rootX = startX + w / 2 - BOX_WIDTH / 2;
    draw(root, rootX, 0);
    startX += w + 80;
  });

  return (
    <svg
      width="2500"
      height="2000"
      style={{ background: "#f5f5f5" }}
    >
      {lines}
      {nodes}
    </svg>
  );
}
