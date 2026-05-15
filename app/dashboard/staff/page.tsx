"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../supabase";

export default function StaffPage() {

  const [staff, setStaff] = useState<any[]>([]);

  async function loadStaff() {

    const { data } = await supabase
      .from("staff")
      .select("*");

    setStaff(data || []);
  }

  useEffect(() => {
    loadStaff();
  }, []);

  return (
    <div>

      <h1 className="text-5xl font-bold mb-10">
        Staff
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {staff.map((member) => (

          <div
            key={member.id}
            className="bg-zinc-900 p-6 rounded-3xl"
          >

            <h2 className="text-3xl font-bold">
              {member.name}
            </h2>

            <p className="text-zinc-400 mt-2">
              {member.role}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}