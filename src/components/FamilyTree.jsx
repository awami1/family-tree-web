import { useEffect, useRef } from "react";
import { OrgChart } from "d3-org-chart";
import familyData from "../data/family.json";

export default function FamilyTree() {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    // تحويل الداتا إلى الشكل الذي تفهمه المكتبة
    const treeData = familyData.individuals.map((person) => ({
      id: person.id,
      parentId: person.parent_id || null,
      name: person.name,
      gender: person.gender,
      generation: person.generation
    }));

    const chart = new OrgChart()
      .container(ref.current)
      .data(treeData)
      .nodeWidth(() => 200)
      .nodeHeight(() => 90)
      .childrenMargin(() => 40)
      .nodeContent((d) => {
        const color = d.data.gender === "female" ? "#fde2e4" : "#e3f2fd";
        return `
          <div style="
            border:1px solid #ccc;
            border-radius:10px;
            padding:10px;
            background:${color};
            text-align:center;
            font-family:Arial;
          ">
            <strong>${d.data.name}</strong><br/>
            <small>الجيل ${d.data.generation}</small>
          </div>
        `;
      })
      .render();

    return () => chart.destroy();
  }, []);

  return <div ref={ref} style={{ width: "100%", height: "100vh" }} />;
}
