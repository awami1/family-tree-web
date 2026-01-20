import { useEffect, useRef } from "react";
import { OrgChart } from "d3-org-chart";
import * as d3 from "d3";
import data from "../data/family.json";

export default function FamilyTree() {
  const ref = useRef();

  useEffect(() => {
    if (!ref.current) return;

    const chart = new OrgChart()
      .container(ref.current)
      .data(data.members)
      .nodeWidth(() => 180)
      .nodeHeight(() => 80)
      .nodeContent((d) => `
        <div style="border:1px solid #ccc;padding:10px;border-radius:8px;background:#fff">
          ${d.data.fullName}
        </div>
      `)
      .render();

    return () => chart.destroy();
  }, []);

  return <div ref={ref} style={{ height: "100vh" }} />;
}
