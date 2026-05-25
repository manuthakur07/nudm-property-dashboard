import React from "react";
import { FaBuilding } from "react-icons/fa";

const KPIcards = ({ title, value }) => {

  return (

    <div className="group bg-white/10 backdrop-blur-xl rounded-[30px] p-8 border border-white/20 shadow-[0_15px_35px_rgba(0,0,0,0.4)] hover:-translate-y-3 hover:rotate-1 hover:shadow-[0_25px_50px_rgba(59,130,246,0.5)] transition duration-500 cursor-pointer relative overflow-hidden">

      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>

      <div className="relative z-10 flex justify-between items-start">

        <div>

          <h2 className="text-blue-100 text-sm uppercase tracking-[3px] font-semibold">
            {title}
          </h2>

          <p className="text-5xl font-black text-white mt-5 drop-shadow-lg">
            {value}
          </p>

        </div>

        <div className="bg-gradient-to-r from-cyan-400 to-blue-500 p-5 rounded-2xl shadow-2xl group-hover:scale-110 transition duration-500">

          <FaBuilding className="text-white text-4xl" />

        </div>

      </div>

    </div>
  );
};

export default KPIcards;