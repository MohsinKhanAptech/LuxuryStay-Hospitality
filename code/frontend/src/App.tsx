import { Link } from "react-router";

function App() {
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <h1 className="text-5xl font-bold">LuxuryStar Hospitality</h1>
      <br />
      <Link to={"/admin"}>Go to admin</Link>
    </div>
  );
}

export default App;
