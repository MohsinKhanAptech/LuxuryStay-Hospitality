import { useState } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";

import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Combobox } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const statusOptions = [
  { value: "cleaning", label: "Cleaning" },
  { value: "occupied", label: "Occupied" },
  { value: "available", label: "Available" },
  { value: "maintenance", label: "Maintenance" },
];

const RoomAdd = () => {
  const [form, setForm] = useState({
    roomType: "",
    availability: true,
    status: "",
    pricing: "",
    amenities: [""],
  });

  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleStatusChange = (value: string) => {
    setForm((prev) => ({
      ...prev,
      status: value,
    }));
  };

  const handleAmenityChange = (index: number, value: string) => {
    setForm((prev) => {
      const newAmenities = [...prev.amenities];
      newAmenities[index] = value;
      return { ...prev, amenities: newAmenities };
    });
  };

  const addAmenity = () => {
    setForm((prev) => ({
      ...prev,
      amenities: [...prev.amenities, ""],
    }));
  };

  const removeAmenity = (index: number) => {
    setForm((prev) => {
      const newAmenities = prev.amenities.filter((_, i) => i !== index);
      return { ...prev, amenities: newAmenities };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const formData = {
        roomType: form.roomType,
        availability: form.availability,
        status: form.status,
        pricing: Number(form.pricing),
        amenities: form.amenities.filter((a) => a.trim() !== ""),
      };

      await axios.post("http://localhost:5000/api/rooms/", formData);
      navigate("/admin/room/list");
    } catch (error) {
      setErrorMessage(
        "Failed to add room. Please check your input and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SiteHeader title={"Room Add"} />
      <section className="p-4 md:p-10">
        <form onSubmit={handleSubmit} className="bg-white p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Add New Room
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
                placeholder="Room Type"
                value={form.roomType}
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
              <Label htmlFor="pricing">Pricing</Label>
              <Input
                type="number"
                id="pricing"
                placeholder="Pricing"
                value={form.pricing}
                onChange={handleChange}
                min="0"
                required
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label>Amenities</Label>
              {form.amenities.map((amenity, idx) => (
                <div key={idx} className="flex items-center gap-2 mb-2">
                  <Input
                    type="text"
                    value={amenity}
                    placeholder="Amenity"
                    onChange={(e) => handleAmenityChange(idx, e.target.value)}
                  />
                  {form.amenities.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => removeAmenity(idx)}
                      className="px-2"
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={addAmenity}
                className="mt-2"
              >
                Add Amenity
              </Button>
            </div>
            <div className="flex items-center gap-4 py-2">
              <Checkbox
                id="availability"
                checked={form.availability}
                onCheckedChange={(checked) =>
                  setForm((prev) => ({ ...prev, availability: !!checked }))
                }
                className="w-4 h-4 rounded"
              />
              <Label htmlFor="availability">Available</Label>
            </div>
            <Button
              className="w-full mt-4"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Adding Room..." : "Add Room"}
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

export default RoomAdd;