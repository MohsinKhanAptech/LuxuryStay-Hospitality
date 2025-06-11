import { useEffect, useState } from "react";
import { z } from "zod";
import axios from "axios";

import { SiteHeader } from "@/components/site-header";
import {
  FeedbackDataTable,
  feedbackSchema,
} from "@/components/feedback-data-table";

function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState<z.infer<typeof feedbackSchema>[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get("http://localhost:5000/api/feedbacks/");
        if (res.status !== 200) throw new Error("Failed to fetch feedbacks");
        const parsed = z.array(feedbackSchema).parse(res.data);
        setFeedbacks(parsed);
      } catch (err: any) {
        setError(err.message || "Error fetching feedbacks");
      } finally {
        setLoading(false);
      }
    };
    fetchFeedbacks();
  }, []);

  return (
    <>
      <SiteHeader title={"Feedback List"} />
      <div className="flex flex-col flex-1">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col items-center justify-center w-full gap-4 py-4 md:gap-6 md:py-6">
            {loading && <div>Loading...</div>}
            {error && <div className="text-red-500">{error}</div>}
            {!loading && !error && <FeedbackDataTable data={feedbacks} />}
          </div>
        </div>
      </div>
    </>
  );
}

export default FeedbackList;
