import { useState, useEffect } from "react";
import data from "../data/family.json";

const STORAGE_KEY = "family-tree-data";

export default function AdminPanel() {
  const [members, setMembers] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : data.members;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(members));
  }, [members]);

  const [name, setName] = useState("");

  function addMember() {
    if (!name) return;
    setMembers([...members, { id: "p" + Date.now(), fullName: name }]);
    setName("");
  }

  return (
    <div>
      <input
        placeholder="الاسم الكامل"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={addMember}>إضافة</button>

      <ul>
        {members.map((m) => (
          <li key={m.id}>{m.fullName}</li>
        ))}
      </ul>
    </div>
  );
}
