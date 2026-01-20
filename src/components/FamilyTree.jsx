import { useEffect, useRef } from "react";
import { OrgChart } from "d3-org-chart";
import familyData from "../data/family.json";

export default function FamilyTree() {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // تحويل الداتا إلى الشكل الذي تفهمه المكتبة
    const data = familyData.individuals.map((p) => ({
      id: p.id,
      parentId: p.parent_id ?? null,
      name: p.name
    }));

    const chart = new OrgChart()
      .container(chartRef.current)
      .data(data)
      .nodeHeight(() => 70)
      .nodeWidth(() => 180)
      .childrenMargin(() => 40)
      .nodeContent((d) => {
        return `
          <div style="
            padding:10px;
            border-radius:8px;
            background:#ffffff;
            border:1px solid #999;
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
      ref={chartRef}
      style={{ width: "100%", height: "100vh", background: "#f5f5f5" }}
    />
  );
}
