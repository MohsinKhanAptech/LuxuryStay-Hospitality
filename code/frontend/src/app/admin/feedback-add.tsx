import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";

import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Combobox } from "@/components/ui/combobox";

const FeedbackAdd = () => {
  const [form, setForm] = useState({
    guestId: "",
    rating: 5,
    comment: "",
    date: "",
  });

  const [guests, setGuests] = useState<{ value: string; label: string }[]>([]);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    // Fetch guests for the combobox
    const fetchGuests = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users/");
        if (Array.isArray(res.data)) {
          setGuests(
            res.data
              .filter((u) => u.userType === "guest")
              .map((u) => ({
                value: u._id,
                label:
                  u.personalInfo?.firstName && u.personalInfo?.lastName
                    ? `${u.personalInfo.firstName} ${u.personalInfo.lastName} (${u.personalInfo.email})`
                    : u.personalInfo?.email || u._id,
              }))
          );
        }
      } catch (e) {
        setGuests([]);
      }
    };
    fetchGuests();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [id]: type === "number" ? Number(value) : value,
    }));
  };

  const handleGuestChange = (value: string) => {
    setForm((prev) => ({
      ...prev,
      guestId: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const formData = {
        guestId: form.guestId,
        rating: form.rating,
        comment: form.comment,
        date: form.date ? new Date(form.date) : undefined,
      };

      await axios.post("http://localhost:5000/api/feedbacks/", formData);
      navigate("/admin/feedback/list");
    } catch (error) {
      setErrorMessage(
        "Failed to add feedback. Please check your input and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SiteHeader title={"Add Feedback"} />
      <section className="p-4 md:p-10">
        <form onSubmit={handleSubmit} className="p-6 bg-white">
          <h2 className="mb-6 text-2xl font-bold text-gray-800">
            Add New Feedback
          </h2>

          {errorMessage && (
            <div
              className="relative px-4 py-3 mb-4 text-red-700 bg-red-100 border border-red-400 rounded"
              role="alert"
            >
              <span className="block sm:inline">{errorMessage}</span>
            </div>
          )}

          <div className="flex flex-col gap-6">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="guestId">Guest</Label>
              <Combobox
                className="w-full"
                items={guests}
                startValue={form.guestId}
                onChange={handleGuestChange}
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="rating">Rating</Label>
              <Input
                type="number"
                id="rating"
                placeholder="Rating (1-5)"
                value={form.rating}
                min={1}
                max={5}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="comment">Comment</Label>
              <textarea
                id="comment"
                placeholder="Feedback comment"
                value={form.comment}
                onChange={handleChange}
                required
                className="border rounded px-3 py-2 min-h-[80px]"
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="date">Date</Label>
              <Input
                type="date"
                id="date"
                value={form.date}
                onChange={handleChange}
              />
            </div>
            <Button
              className="w-full mt-4"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Adding Feedback..." : "Add Feedback"}
            </Button>
            <Button
              variant={"outline"}
              type="button"
              className="w-full"
              asChild
            >
              <Link to={"/admin/feedback/list"}>Back</Link>
            </Button>
          </div>
        </form>
      </section>
    </>
  );
};

export default FeedbackAdd;
