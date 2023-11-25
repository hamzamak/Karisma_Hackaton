import React from "react";
function PageIcon({ icon }) {
  return (
    <div className="flex flex-row justify-between items-center">

      <div className="bg-[#0069e9] p-2 rounded-md text-white text-2xl max-md:text-lg">
        {icon}
      </div>
    </div>

  );
}

export default PageIcon;
