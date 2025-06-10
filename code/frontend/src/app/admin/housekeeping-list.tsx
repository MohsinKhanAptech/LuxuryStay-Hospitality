import { useEffect, useState } from "react";
import { z } from "zod";
import axios from "axios";

import { SiteHeader } from "@/components/site-header";
import { HousekeepingDataTable, housekeepingSchema } from "@/components/housekeeping-data-table";

function HousekeepingList() {
  const [tasks, setTasks] = useState<ReturnType<typeof housekeepingSchema.parse>[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get("http://localhost:5000/api/housekeeping/");
        if (res.status !== 200) throw new Error("Failed to fetch housekeeping tasks");
        const parsed = z.array(housekeepingSchema).parse(res.data);
        setTasks(parsed);
      } catch (err: any) {
        setError(err.message || "Error fetching housekeeping tasks");
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  return (
    <>
      <SiteHeader title={"Housekeeping List"} />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            {loading && <div>Loading...</div>}
            {error && <div className="text-red-500">{error}</div>}
            {!loading && !error && <HousekeepingDataTable data={tasks} />}
          </div>
        </div>
      </div>
    </>
  );
}

export default HousekeepingList;