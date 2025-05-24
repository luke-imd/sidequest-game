import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

// Supabase client einmal erstellen (außerhalb der Komponente!)
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function SideQBtn() {
  const [sidequests, setSidequests] = useState<any[]>([]);

  async function getSidequests() {
    const { data, error } = (await supabase.from("Sidequest").select().limit(1).single());

    if (error) {
      console.error("Fehler beim Laden der Sidequests:", error.message);
    } else {
      console.log("Geladene Sidequests:", data);
      setSidequests(data || []);
    }
  }

  return (
    <div className="p-4">
      <button
        onClick={getSidequests}
        className="px-6 py-4 rounded-2xl bg-black text-white border-white border"
      >
        Sidequests laden
      </button>

      <div className="mt-4">
        {sidequests.length > 0 ? (
          <ul className="list-disc pl-6 text-white">
            {sidequests.map((sq, index) => (
              <li key={index}>
                {JSON.stringify(sq)} {/* oder spezifisch: sq.name, sq.description, etc. */}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 mt-2">Noch keine Sidequests geladen.</p>
        )}
      </div>
    </div>
  );
}
