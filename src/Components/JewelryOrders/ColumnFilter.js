import React from "react";
export const ColumnFilter = ({ column }) => {
  const { filterValue, setFilter } = column;
  return (
    <span>
      Filter:{" "}
      <input
        // addded this style to prevent over input flow
        style={{ width: "100%" }}
        value={filterValue || ""}
        onChange={(e) => setFilter(e.target.value)}
        placeholder=" Filter Row"
      />
    </span>
  );
};
