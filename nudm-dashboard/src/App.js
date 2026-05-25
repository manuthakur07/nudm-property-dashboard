import React, { useMemo, useState } from "react";
import KPIcards from "./components/KPIcards";
import Charts from "./components/Charts";
import ChatBot from "./components/ChatBot";
import data from "./data/properties.json";

function App() {

  const [city, setCity] = useState("All");

  const cities = [
    "All",
    ...new Set(data.map((item) => item.tenant)),
  ];

  const filteredData =
    city === "All"
      ? data
      : data.filter((item) => item.tenant === city);

  const totalProperties = filteredData.length;

  const approved = filteredData.filter(
    (item) => item.status === "Approved"
  ).length;

  const rejected = filteredData.filter(
    (item) => item.status === "Rejected"
  ).length;

  const totalCollection = filteredData
    .reduce((sum, item) => sum + item.collection_inr, 0)
    .toFixed(2);

  const chartData = useMemo(() => {

    const grouped = {};

    data.forEach((item) => {

      if (!grouped[item.tenant]) {
        grouped[item.tenant] = 0;
      }

      grouped[item.tenant] += item.collection_inr;

    });

    return Object.keys(grouped).map((city) => ({
      name: city,
      value: grouped[city],
    }));

  }, []);

  const summary = useMemo(() => {

    const citySummary = {};

    data.forEach((item) => {

      if (!citySummary[item.tenant]) {

        citySummary[item.tenant] = {
          total: 0,
          approved: 0,
          rejected: 0,
          pending: 0,
          collection: 0,
        };
      }

      citySummary[item.tenant].total += 1;

      if (item.status === "Approved") {
        citySummary[item.tenant].approved += 1;
      }

      if (item.status === "Rejected") {
        citySummary[item.tenant].rejected += 1;
      }

      if (item.status === "Pending") {
        citySummary[item.tenant].pending += 1;
      }

      citySummary[item.tenant].collection += item.collection_inr;

    });

    return citySummary;

  }, []);

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 p-8 relative overflow-hidden">

      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl"></div>

      <div className="relative z-10">

        <div className="bg-white/10 backdrop-blur-xl text-white p-10 rounded-[35px] shadow-[0_20px_60px_rgba(0,0,0,0.5)] mb-10 border border-white/20 hover:scale-[1.01] transition duration-500 relative overflow-hidden">

          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-purple-500/20"></div>

          <div className="relative z-10 flex justify-between items-center">

            <div>

              <h1 className="text-6xl font-black tracking-tight drop-shadow-lg">
                Property Tax Dashboard
              </h1>

              <p className="mt-4 text-blue-100 text-xl">
                Smart Urban Analytics Platform
              </p>

            </div>

            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="bg-white/20 backdrop-blur-lg text-white px-6 py-4 rounded-2xl border border-white/20 shadow-xl outline-none font-semibold hover:bg-white/30 transition duration-300"
            >
              {cities.map((cityName) => (
                <option
                  key={cityName}
                  className="text-black"
                >
                  {cityName}
                </option>
              ))}
            </select>

          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          <KPIcards
            title="Total Properties"
            value={totalProperties}
          />

          <KPIcards
            title="Approved"
            value={approved}
          />

          <KPIcards
            title="Rejected"
            value={rejected}
          />

          <KPIcards
            title="Total Collection"
            value={`₹ ${totalCollection}`}
          />

        </div>

        <Charts chartData={chartData} />

        <ChatBot summary={summary} />

      </div>

    </div>
  );
}

export default App;