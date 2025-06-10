import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import axios from "axios";

import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const RoomDetail = () => {
  const [form, setForm] = useState({
    roomType: "",
    availability: true,
    status: "",
    pricing: "",
    amenities: [""],
  });

  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;

  const [isLoading, setIsLoading] = useState(true);
  const [roomId, setRoomId] = useState<string | null>(null);
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
      setRoomId(idToFetch);

      axios
        .get(`http://localhost:5000/api/rooms/${idToFetch}`)
        .then((res) => {
          const room = res.data;

          setForm({
            roomType: room.roomType,
            availability: room.availability,
            status: room.status,
            pricing: room.pricing?.toString() ?? "",
            amenities: Array.isArray(room.amenities) && room.amenities.length > 0 ? room.amenities : [""],
          });
          setErrorMessage(null);
        })
        .catch((error) => {
          console.error("Failed to fetch room data:", error);
          setErrorMessage(
            "Failed to load room data. Please try again or check the network."
          );
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      console.warn(
        "No valid room ID found in location state. Cannot show room detail."
      );
      setErrorMessage("No room selected for detail. Returning to list.");
      setIsLoading(false);
      navigate("/admin/room/list");
    }
  }, [state, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-screen text-4xl text-center">
        Loading room data...
      </div>
    );
  }

  return (
    <>
      <SiteHeader title={"Room Detail"} />
      <section className="p-4 md:p-10">
        <form onSubmit={handleSubmit} className="bg-white p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            View Room Information
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
              <Label htmlFor="roomType">Room Type</Label>
              <Input
                type="text"
                id="roomType"
                value={form.roomType}
                disabled={true}
              />
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
              <Label htmlFor="pricing">Pricing</Label>
              <Input
                type="number"
                id="pricing"
                value={form.pricing}
                disabled={true}
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label>Amenities</Label>
              {form.amenities && form.amenities.length > 0 ? (
                form.amenities.map((amenity, idx) => (
                  <Input
                    key={idx}
                    type="text"
                    value={amenity}
                    disabled={true}
                    className="mb-2"
                  />
                ))
              ) : (
                <Input type="text" value="No Amenities" disabled={true} />
              )}
            </div>
            <div className="flex items-center gap-4 py-2">
              <Checkbox
                id="availability"
                checked={form.availability}
                className="w-4 h-4 rounded"
                disabled={true}
              />
              <Label htmlFor="availability">Available</Label>
            </div>
            <Button
              variant={"default"}
              className="w-full mt-4"
              type="button"
              asChild
            >
              <Link to={"/admin/room/edit"} state={roomId}>
                Edit
              </Link>
            </Button>
            <Button
              variant={"destructive"}
              className="w-full hover:cursor-pointer"
              type="button"
              onClick={() => {
                axios
                  .delete(`http://localhost:5000/api/rooms/${roomId}`)
                  .then(() => {
                    navigate("/admin/room/list");
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
              <Link to={"/admin/room/list"}>Back</Link>
            </Button>
          </div>
        </form>
      </section>
    </>
  );
};

export default RoomDetail;