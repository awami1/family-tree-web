import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Admin() {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPeople();
  }, []);

  async function loadPeople() {
    setLoading(true);
    const { data, error } = await supabase
      .from("individuals")
      .select("*")
      .order("generation", { ascending: true });

    if (error) {
      alert(error.message);
    } else {
      setPeople(data);
    }
    setLoading(false);
  }

  async function updateField(id, field, value) {
    const { error } = await supabase
      .from("individuals")
      .update({ [field]: value })
      .eq("id", id);

    if (error) {
      alert(error.message);
    } else {
      setPeople((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, [field]: value } : p
        )
      );
    }
  }

  if (loading) {
    return <p style={{ padding: 20 }}>جاري التحميل...</p>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>لوحة الإدارة – تنظيف شجرة العائلة</h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: 20
        }}
      >
        <thead>
          <tr>
            <th>الاسم</th>
            <th>الجنس</th>
            <th>الجيل</th>
            <th>الأب</th>
          </tr>
        </thead>
        <tbody>
          {people.map((p) => (
            <tr key={p.id}>
              {/* الاسم */}
              <td>
                <input
                  value={p.name || ""}
                  onChange={(e) =>
                    updateField(p.id, "name", e.target.value)
                  }
                />
              </td>

              {/* الجنس */}
              <td>
                <select
                  value={p.gender || ""}
                  onChange={(e) =>
                    updateField(p.id, "gender", e.target.value)
                  }
                >
                  <option value="">—</option>
                  <option value="male">ذكر</option>
                  <option value="female">أنثى</option>
                </select>
              </td>

              {/* الجيل */}
              <td>
                <input
                  type="number"
                  value={p.generation || ""}
                  onChange={(e) =>
                    updateField(
                      p.id,
                      "generation",
                      Number(e.target.value)
                    )
                  }
                  style={{ width: 60 }}
                />
              </td>

              {/* الأب */}
              <td>
                <select
                  value={p.parent_id || ""}
                  onChange={(e) =>
                    updateField(
                      p.id,
                      "parent_id",
                      e.target.value || null
                    )
                  }
                >
                  <option value="">—</option>
                  {people
                    .filter((x) => x.gender === "male")
                    .map((father) => (
                      <option key={father.id} value={father.id}>
                        {father.name}
                      </option>
                    ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
