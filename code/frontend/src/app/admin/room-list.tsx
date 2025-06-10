import { useEffect, useState } from "react";
import { z } from "zod";
import axios from "axios";

import { SiteHeader } from "@/components/site-header";
import { RoomDataTable, roomSchema } from "@/components/room-data-table";

function RoomList() {
  const [rooms, setRooms] = useState<ReturnType<typeof roomSchema.parse>[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get("http://localhost:5000/api/rooms/");
        if (res.status !== 200) throw new Error("Failed to fetch rooms");
        const parsed = z.array(roomSchema).parse(res.data);
        setRooms(parsed);
      } catch (err: any) {
        setError(err.message || "Error fetching rooms");
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  return (
    <>
      <SiteHeader title={"Room List"} />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            {loading && <div>Loading...</div>}
            {error && <div className="text-red-500">{error}</div>}
            {!loading && !error && <RoomDataTable data={rooms} />}
          </div>
        </div>
      </div>
    </>
  );
}

export default RoomList;