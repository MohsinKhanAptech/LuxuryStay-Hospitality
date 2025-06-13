import { Link } from "react-router";

import { Button } from "@/components/ui/button";

function App() {
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <h1 className="text-5xl font-bold">LuxuryStar Hospitality</h1>
      <br />

      <Button asChild>
        <Link to={"/admin/login"}>Login to Dashboard</Link>
      </Button>
    </div>
  );
}

export default App;
