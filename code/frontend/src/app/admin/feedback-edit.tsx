import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import axios from "axios";

import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const FeedbackEdit = () => {
  const [form, setForm] = useState({
    guestId: "",
    rating: 1,
    comment: "",
    date: "",
  });

  const [guests, setGuests] = useState<{ value: string; label: string }[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackId, setFeedbackId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Fetch guest list for combobox
  useEffect(() => {
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
      } catch {
        setGuests([]);
      }
    };
    fetchGuests();
  }, []);

  // Fetch feedback data for editing
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
      setFeedbackId(idToFetch);

      axios
        .get(`http://localhost:5000/api/feedbacks/${idToFetch}`)
        .then((res) => {
          const feedback = res.data;
          let guestId = "";
          if (
            feedback.guestId &&
            typeof feedback.guestId === "object" &&
            feedback.guestId._id
          ) {
            guestId = feedback.guestId._id;
          } else if (typeof feedback.guestId === "string") {
            guestId = feedback.guestId;
          }
          setForm({
            guestId,
            rating: feedback.rating,
            comment: feedback.comment,
            date: feedback.date ? feedback.date.slice(0, 10) : "",
          });
          setErrorMessage(null);
        })
        .catch(() => {
          setErrorMessage(
            "Failed to load feedback data. Please try again or check the network."
          );
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setErrorMessage("No feedback selected for editing. Returning to list.");
      setIsLoading(false);
      navigate("/admin/feedback/list");
    }
  }, [state, navigate]);

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

    if (!feedbackId) {
      setErrorMessage("Cannot update: Feedback ID is missing.");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = {
        guestId: form.guestId,
        rating: form.rating,
        comment: form.comment,
        date: form.date ? new Date(form.date) : undefined,
      };

      await axios.put(
        `http://localhost:5000/api/feedbacks/${feedbackId}`,
        formData
      );

      navigate("/admin/feedback/list");
    } catch (error) {
      setErrorMessage(
        "Failed to update feedback. Please check your input and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-screen text-4xl text-center">
        Loading feedback data...
      </div>
    );
  }

  return (
    <>
      <SiteHeader title={"Edit Feedback"} />
      <section className="p-4 md:p-10">
        <form onSubmit={handleSubmit} className="p-6 bg-white">
          <h2 className="mb-6 text-2xl font-bold text-gray-800">
            Edit Feedback Information
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
              {isSubmitting ? "Updating..." : "Update Feedback"}
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

export default FeedbackEdit;
