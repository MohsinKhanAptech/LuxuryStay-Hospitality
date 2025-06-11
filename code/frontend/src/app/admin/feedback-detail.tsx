import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import axios from "axios";

import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const FeedbackDetail = () => {
  const [form, setForm] = useState({
    guestName: "",
    guestEmail: "",
    rating: 0,
    comment: "",
    date: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;

  const [isLoading, setIsLoading] = useState(true);
  const [feedbackId, setFeedbackId] = useState<string | null>(null);
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
      setFeedbackId(idToFetch);

      axios
        .get(`http://localhost:5000/api/feedbacks/${idToFetch}`)
        .then((res) => {
          const feedback = res.data;
          let guestName = "";
          let guestEmail = "";

          // guestId is always populated (object) because of .populate('guestId') in backend
          if (
            feedback.guestId &&
            typeof feedback.guestId === "object" &&
            feedback.guestId.personalInfo
          ) {
            guestName = `${feedback.guestId.personalInfo.firstName || ""} ${
              feedback.guestId.personalInfo.lastName || ""
            }`.trim();
            guestEmail = feedback.guestId.personalInfo.email || "";
          } else if (
            feedback.guestId &&
            typeof feedback.guestId === "object" &&
            feedback.guestId.email
          ) {
            // fallback if guestId is populated but not with personalInfo
            guestName = feedback.guestId.name || "";
            guestEmail = feedback.guestId.email || "";
          } else if (typeof feedback.guestId === "string") {
            guestName = feedback.guestId;
          }

          setForm({
            guestName,
            guestEmail,
            rating: feedback.rating,
            comment: feedback.comment,
            date: feedback.date ? new Date(feedback.date).toLocaleString() : "",
          });
          setErrorMessage(null);
        })
        .catch((error) => {
          setErrorMessage(
            "Failed to load feedback data. Please try again or check the network."
          );
          console.log(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setErrorMessage("No feedback selected for detail. Returning to list.");
      setIsLoading(false);
      navigate("/admin/feedback/list");
    }
  }, [state, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      <SiteHeader title={"Feedback Detail"} />
      <section className="p-4 md:p-10">
        <form onSubmit={handleSubmit} className="p-6 bg-white">
          <h2 className="mb-6 text-2xl font-bold text-gray-800">
            View Feedback Information
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
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="guestName">Guest Name</Label>
                <Input
                  type="text"
                  id="guestName"
                  value={form.guestName}
                  disabled={true}
                />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="guestEmail">Guest Email</Label>
                <Input
                  type="email"
                  id="guestEmail"
                  value={form.guestEmail}
                  disabled={true}
                />
              </div>
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="rating">Rating</Label>
              <Input
                type="number"
                id="rating"
                value={form.rating}
                disabled={true}
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="comment">Comment</Label>
              <Input
                type="text"
                id="comment"
                value={form.comment}
                disabled={true}
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="date">Date</Label>
              <Input type="text" id="date" value={form.date} disabled={true} />
            </div>
            <Button
              variant={"default"}
              className="w-full mt-4"
              type="button"
              asChild
            >
              <Link to={"/admin/feedback/edit"} state={feedbackId}>
                Edit
              </Link>
            </Button>
            <Button
              variant={"destructive"}
              className="w-full hover:cursor-pointer"
              type="button"
              onClick={() => {
                axios
                  .delete(`http://localhost:5000/api/feedbacks/${feedbackId}`)
                  .then(() => {
                    navigate("/admin/feedback/list");
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
              <Link to={"/admin/feedback/list"}>Back</Link>
            </Button>
          </div>
        </form>
      </section>
    </>
  );
};

export default FeedbackDetail;
