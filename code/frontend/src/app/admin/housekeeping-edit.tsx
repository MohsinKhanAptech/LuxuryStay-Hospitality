import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import axios from "axios";

import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const statusOptions = [
  { value: "pending", label: "Pending" },
  { value: "in progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
];

const HousekeepingEdit = () => {
  const [form, setForm] = useState({
    roomId: "",
    task: "",
    status: "pending",
    scheduledDate: "",
    assignedTo: "",
  });

  const [rooms, setRooms] = useState<{ value: string; label: string }[]>([]);
  const [users, setUsers] = useState<{ value: string; label: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [housekeepingId, setHousekeepingId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;

  useEffect(() => {
    // Fetch rooms and users for selection
    axios.get("http://localhost:5000/api/rooms/").then((res) => {
      setRooms(
        res.data.map((room: any) => ({
          value: room._id,
          label: room.roomType || room._id,
        }))
      );
    });
    axios.get("http://localhost:5000/api/users/").then((res) => {
      setUsers(
        res.data.map((user: any) => ({
          value: user._id,
          label:
            (user.personalInfo?.firstName || "") +
            " " +
            (user.personalInfo?.lastName || "") +
            (user.userType ? ` (${user.userType})` : ""),
        }))
      );
    });
  }, []);

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
        .get(`http://localhost:5000/api/housekeepings/${idToFetch}`)
        .then((res) => {
          const hk = res.data;
          setForm({
            roomId:
              typeof hk.roomId === "string" ? hk.roomId : hk.roomId?._id || "",
            task: hk.task,
            status: hk.status,
            scheduledDate: hk.scheduledDate
              ? new Date(hk.scheduledDate).toISOString().slice(0, 16)
              : "",
            assignedTo:
              typeof hk.assignedTo === "string"
                ? hk.assignedTo
                : hk.assignedTo?._id || "",
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
      setErrorMessage(
        "No housekeeping task selected for editing. Returning to list."
      );
      setIsLoading(false);
      navigate("/admin/housekeeping/list");
    }
  }, [state, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleStatusChange = (value: string) => {
    setForm((prev) => ({
      ...prev,
      status: value,
    }));
  };

  const handleRoomChange = (value: string) => {
    setForm((prev) => ({
      ...prev,
      roomId: value,
    }));
  };

  const handleAssignedToChange = (value: string) => {
    setForm((prev) => ({
      ...prev,
      assignedTo: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!housekeepingId) {
      setErrorMessage("Cannot update: Housekeeping ID is missing.");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = {
        roomId: form.roomId,
        task: form.task,
        status: form.status,
        scheduledDate: form.scheduledDate,
        assignedTo: form.assignedTo || undefined,
      };

      await axios.put(
        `http://localhost:5000/api/housekeepings/${housekeepingId}`,
        formData
      );

      navigate("/admin/housekeeping/list");
    } catch (error) {
      setErrorMessage(
        "Failed to update housekeeping task. Please check your input and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
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
      <SiteHeader title={"Housekeeping Edit"} />
      <section className="p-4 md:p-10">
        <form onSubmit={handleSubmit} className="bg-white p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Edit Housekeeping Task
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
              <Label htmlFor="roomId">Room</Label>
              <Combobox
                className="w-full"
                items={rooms}
                startValue={form.roomId}
                onChange={handleRoomChange}
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="task">Task</Label>
              <Input
                type="text"
                id="task"
                placeholder="Task Description"
                value={form.task}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="status">Status</Label>
              <Combobox
                className="w-full"
                items={statusOptions}
                startValue={form.status}
                onChange={handleStatusChange}
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="scheduledDate">Scheduled Date</Label>
              <Input
                type="datetime-local"
                id="scheduledDate"
                value={form.scheduledDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="assignedTo">Assign To</Label>
              <Combobox
                className="w-full"
                items={users}
                startValue={form.assignedTo}
                onChange={handleAssignedToChange}
              />
            </div>
            <Button
              className="w-full mt-4"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Updating..." : "Update Task"}
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

export default HousekeepingEdit;
