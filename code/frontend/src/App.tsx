import { Link } from "react-router";

import { Button } from "@/components/ui/button";

function App() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen gap-4">
      <h1 className="text-5xl font-bold">LuxuryStar Hospitality</h1>

      <Button asChild>
        <Link to={"/admin/login"}>Login to Dashboard</Link>
      </Button>
    </div>
  );
}

export default App;
