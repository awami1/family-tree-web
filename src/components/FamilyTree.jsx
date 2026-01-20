import { useEffect, useRef } from "react";
import { OrgChart } from "d3-org-chart";
import familyData from "../data/family.json";

export default function FamilyTree() {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const data = familyData.individuals.map((p) => ({
      id: p.id,
      parentId: p.parent_id || null,
      name: p.name
    }));

    const chart = new OrgChart()
      .container(ref.current)
      .data(data)
      .nodeWidth(() => 180)
      .nodeHeight(() => 80)
      .childrenMargin(() => 40)
      .nodeContent((d) => {
        // ⚠️ مهم جدًا: xmlns يحل مشكلة Safari
        return `
          <div xmlns="http://www.w3.org/1999/xhtml"
               style="
                 background:#fff;
                 border:1px solid #999;
                 border-radius:8px;
                 padding:8px;
                 text-align:center;
                 font-family:Arial;
               ">
            ${d.data.name}
          </div>
        `;
      })
      .render();

    return () => chart.destroy();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        width: "100%",
        height: "100vh",
        background: "#f0f0f0"
      }}
    />
  );
}
