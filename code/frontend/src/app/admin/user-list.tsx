import { useEffect, useState } from "react";
import { z } from "zod";
import axios from "axios";

import { SiteHeader } from "@/components/site-header";
import { UserDataTable, userSchema } from "@/components/user-data-table";

function UserList() {
  const [users, setUsers] = useState<ReturnType<typeof userSchema.parse>[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get("http://localhost:5000/api/users/");
        if (res.status !== 200) throw new Error("Failed to fetch users");
        const parsed = z.array(userSchema).parse(res.data);
        setUsers(parsed);
      } catch (err: any) {
        setError(err.message || "Error fetching users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <>
      <SiteHeader title={"User List"} />
      <div className="flex flex-col flex-1">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col items-center justify-center gap-4 py-4 md:gap-6 md:py-6">
            {loading && <div>Loading...</div>}
            {error && <div className="text-red-500">{error}</div>}
            {!loading && !error && <UserDataTable data={users} />}
          </div>
        </div>
      </div>
    </>
  );
}

export default UserList;
