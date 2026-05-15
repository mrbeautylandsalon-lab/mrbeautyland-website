"use client";

import { useEffect, useState } from "react";

import { supabase } from "../../supabase";

export default function AttendancePage() {

  const [staff, setStaff] =
    useState<any[]>([]);

  const [attendanceData, setAttendanceData] =
    useState<any[]>([]);

  const [checkedInToday, setCheckedInToday] =
    useState(0);

  async function loadData() {

    /* STAFF */

    const { data: staffData } =
      await supabase
        .from("staff")
        .select("*")
        .order("created_at", {
          ascending: false,
        });

    setStaff(staffData || []);

    /* ATTENDANCE */

    const { data: attendance } =
      await supabase
        .from("staff_attendance")
        .select("*");

    setAttendanceData(
      attendance || []
    );

    const checkedIn =
      attendance?.filter(
        (item) =>
          item.status ===
          "Checked In"
      ).length || 0;

    setCheckedInToday(
      checkedIn
    );

  }

  async function checkIn(
    member: any
  ) {

    const currentTime =
      new Date().toLocaleTimeString();

    const currentDate =
      new Date().toLocaleDateString();

    /* STAFF TABLE */

    await supabase
      .from("staff")
      .update({

        attendance_status:
          "Checked In",

        check_in_time:
          currentTime,

        attendance_date:
          currentDate,

      })
      .eq(
        "id",
        member.id
      );

    /* ATTENDANCE TABLE */

    await supabase
      .from("staff_attendance")
      .insert([

        {

          staff_name:
            member.name,

          attendance_date:
            currentDate,

          check_in_time:
            currentTime,

          status:
            "Checked In",

        },

      ]);

    loadData();

  }

  async function checkOut(
    member: any
  ) {

    const currentTime =
      new Date().toLocaleTimeString();

    await supabase
      .from("staff")
      .update({

        attendance_status:
          "Checked Out",

        check_out_time:
          currentTime,

      })
      .eq(
        "id",
        member.id
      );

    await supabase
      .from("staff_attendance")
      .update({

        check_out_time:
          currentTime,

        status:
          "Checked Out",

      })
      .eq(
        "staff_name",
        member.name
      );

    loadData();

  }

  useEffect(() => {

    loadData();

  }, []);

  return (

    <div>

      {/* TOP */}

      <div className="mb-12">

        <p className="uppercase tracking-[5px] text-sm text-zinc-500 mb-3">

          Enterprise Staff System

        </p>

        <h1 className="text-6xl font-bold">

          Attendance 😎

        </h1>

      </div>

      {/* ANALYTICS */}

      <div className="grid md:grid-cols-3 gap-6 mb-12">

        <div className="bg-white rounded-[35px] p-8 shadow-sm">

          <p className="text-zinc-500 text-lg mb-4">
            Total Staff
          </p>

          <h2 className="text-6xl font-bold">
            {staff.length}
          </h2>

        </div>

        <div className="bg-black text-white rounded-[35px] p-8 shadow-sm">

          <p className="text-zinc-400 text-lg mb-4">
            Checked In Today
          </p>

          <h2 className="text-6xl font-bold">
            {checkedInToday}
          </h2>

        </div>

        <div className="bg-[#e5cfaa] rounded-[35px] p-8 shadow-sm">

          <p className="text-black/60 text-lg mb-4">
            Total Attendance Records
          </p>

          <h2 className="text-6xl font-bold">
            {attendanceData.length}
          </h2>

        </div>

      </div>

      {/* STAFF GRID */}

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

        {staff.map((member) => {

          const totalAttendance =
            attendanceData.filter(
              (item) =>
                item.staff_name ===
                member.name
            ).length;

          return (

            <div
              key={member.id}
              className="bg-white rounded-[40px] p-8 shadow-sm"
            >

              {/* PROFILE */}

              <div className="flex items-center gap-5 mb-8">

                <div className="w-20 h-20 rounded-full bg-black text-white flex items-center justify-center text-3xl font-bold">

                  {member.name?.charAt(0)}

                </div>

                <div>

                  <h2 className="text-3xl font-bold">

                    {member.name}

                  </h2>

                  <p className="text-zinc-500 text-lg mt-1">

                    {member.role}

                  </p>

                </div>

              </div>

              {/* STATUS */}

              <div className="bg-[#f7f1eb] rounded-[30px] p-6 mb-8">

                <div className="flex items-center justify-between mb-6">

                  <div>

                    <p className="text-zinc-500 text-sm mb-2">

                      Status

                    </p>

                    <h3
                      className={`text-2xl font-bold ${
                        member.attendance_status ===
                        "Checked In"
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >

                      {member.attendance_status}

                    </h3>

                  </div>

                  <div
                    className={`w-5 h-5 rounded-full ${
                      member.attendance_status ===
                      "Checked In"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  />

                </div>

                {/* DATE */}

                <div className="mb-5">

                  <p className="text-zinc-500 text-sm mb-1">

                    Date

                  </p>

                  <h3 className="text-xl font-semibold">

                    {member.attendance_date || "-"}

                  </h3>

                </div>

                {/* TIMES */}

                <div className="grid grid-cols-2 gap-4 mb-6">

                  <div className="bg-white rounded-2xl p-5">

                    <p className="text-zinc-500 text-sm mb-2">

                      Check-In

                    </p>

                    <h3 className="text-2xl font-bold text-green-600">

                      {member.check_in_time || "--:--"}

                    </h3>

                  </div>

                  <div className="bg-white rounded-2xl p-5">

                    <p className="text-zinc-500 text-sm mb-2">

                      Check-Out

                    </p>

                    <h3 className="text-2xl font-bold text-red-500">

                      {member.check_out_time || "--:--"}

                    </h3>

                  </div>

                </div>

                {/* TOTAL */}

                <div className="bg-black text-white rounded-2xl p-5">

                  <p className="text-zinc-400 text-sm mb-2">

                    Total Attendance

                  </p>

                  <h3 className="text-4xl font-bold">

                    {totalAttendance}

                  </h3>

                </div>

              </div>

              {/* BUTTONS */}

              <div className="flex gap-4">

                <button
                  onClick={() =>
                    checkIn(member)
                  }
                  className="bg-green-500 text-white px-6 py-4 rounded-2xl flex-1"
                >

                  Check In

                </button>

                <button
                  onClick={() =>
                    checkOut(member)
                  }
                  className="bg-black text-white px-6 py-4 rounded-2xl flex-1"
                >

                  Check Out

                </button>

              </div>

            </div>

          );

        })}

      </div>

    </div>

  );

}