import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
// import { DataTable } from "@/components/data-table";

// import data from "./data.json";

function Dashboard() {
  return (
    <>
      <SiteHeader title={"Dashboard"} />
      <div className="flex flex-col flex-1">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <SectionCards />
            <div className="px-4 lg:px-6">
              <ChartAreaInteractive />
            </div>
            {/* <DataTable data={data} /> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
