import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import axios from "axios";

import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const HousekeepingDetail = () => {
  const [form, setForm] = useState({
    room: "",
    task: "",
    status: "",
    scheduledDate: "",
    assignedTo: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;

  const [isLoading, setIsLoading] = useState(true);
  const [housekeepingId, setHousekeepingId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let idToFetch: string | null = null;

    if (state) {
      if (typeof state === "string") {
        idToFetch = state;
      } else if (typeof state === "object" && state._id) {
        idToFetch = state._id;
      }
    }

    if (idToFetch) {
      setHousekeepingId(idToFetch);

      axios
        .get(`http://localhost:5000/api/housekeeping/${idToFetch}`)
        .then(async (res) => {
          const hk = res.data;

          // Fetch room info
          let roomLabel = "";
          if (hk.roomId) {
            try {
              const roomRes = await axios.get(
                `http://localhost:5000/api/rooms/${hk.roomId}`
              );
              roomLabel = roomRes.data.roomType || roomRes.data._id;
            } catch {
              roomLabel = typeof hk.roomId === "string" ? hk.roomId : "";
            }
          }

          // Fetch assigned user info
          let assignedLabel = "-";
          if (hk.assignedTo) {
            try {
              const userRes = await axios.get(
                `http://localhost:5000/api/users/${hk.assignedTo}`
              );
              const u = userRes.data;
              assignedLabel =
                (
                  (u.personalInfo?.firstName || "") +
                  " " +
                  (u.personalInfo?.lastName || "")
                ).trim() ||
                u.email ||
                u._id ||
                "-";
            } catch {
              assignedLabel =
                typeof hk.assignedTo === "string" ? hk.assignedTo : "-";
            }
          }

          setForm({
            room: roomLabel,
            task: hk.task,
            status: hk.status,
            scheduledDate: hk.scheduledDate
              ? new Date(hk.scheduledDate).toLocaleString()
              : "",
            assignedTo: assignedLabel,
          });
          setErrorMessage(null);
        })
        .catch((error) => {
          console.error("Failed to fetch housekeeping data:", error);
          setErrorMessage(
            "Failed to load housekeeping data. Please try again or check the network."
          );
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      console.warn(
        "No valid housekeeping ID found in location state. Cannot show detail."
      );
      setErrorMessage(
        "No housekeeping task selected for detail. Returning to list."
      );
      setIsLoading(false);
      navigate("/admin/housekeeping/list");
    }
  }, [state, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-screen text-4xl text-center">
        Loading housekeeping data...
      </div>
    );
  }

  return (
    <>
      <SiteHeader title={"Housekeeping Detail"} />
      <section className="p-4 md:p-10">
        <form onSubmit={handleSubmit} className="bg-white p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            View Housekeeping Task
          </h2>

          {errorMessage && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
              role="alert"
            >
              <span className="block sm:inline">{errorMessage}</span>
            </div>
          )}

          <div className="flex flex-col gap-6">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="room">Room</Label>
              <Input type="text" id="room" value={form.room} disabled={true} />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="task">Task</Label>
              <Input type="text" id="task" value={form.task} disabled={true} />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="status">Status</Label>
              <Input
                type="text"
                id="status"
                value={form.status}
                disabled={true}
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="scheduledDate">Scheduled Date</Label>
              <Input
                type="text"
                id="scheduledDate"
                value={form.scheduledDate}
                disabled={true}
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="assignedTo">Assigned To</Label>
              <Input
                type="text"
                id="assignedTo"
                value={form.assignedTo}
                disabled={true}
              />
            </div>
            <Button
              variant={"default"}
              className="w-full mt-4"
              type="button"
              asChild
            >
              <Link to={"/admin/housekeeping/edit"} state={housekeepingId}>
                Edit
              </Link>
            </Button>
            <Button
              variant={"destructive"}
              className="w-full hover:cursor-pointer"
              type="button"
              onClick={() => {
                axios
                  .delete(
                    `http://localhost:5000/api/housekeeping/${housekeepingId}`
                  )
                  .then(() => {
                    navigate("/admin/housekeeping/list");
                  });
              }}
            >
              Delete
            </Button>
            <Button
              variant={"outline"}
              type="button"
              className="w-full"
              asChild
            >
              <Link to={"/admin/housekeeping/list"}>Back</Link>
            </Button>
          </div>
        </form>
      </section>
    </>
  );
};

export default HousekeepingDetail;
