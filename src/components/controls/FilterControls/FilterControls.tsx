import React from "react";
import { Filter, Download } from "../../ui/icons";

interface FilterControlsProps {
  filteredCount: number;
  selectedCount: number;
  filterScore: number;
  onFilterChange: (score: number) => void;
}

export const FilterControls: React.FC<FilterControlsProps> = ({
  filteredCount,
  filterScore,
  onFilterChange,
}) => {
  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "16px",
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
        padding: "24px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "16px",
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <h3
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              color: "#111827",
              margin: 0,
            }}
          >
            {filteredCount} Matched Candidates
          </h3>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Filter
              style={{ width: "16px", height: "16px", color: "#6b7280" }}
            />
            <label
              style={{
                fontSize: "14px",
                fontWeight: "500",
                color: "#374151",
              }}
            >
              Min Score:
            </label>
            <select
              value={filterScore}
              onChange={(e) => onFilterChange(Number(e.target.value))}
              style={{
                padding: "4px 12px",
                border: "1px solid #d1d5db",
                borderRadius: "8px",
                outline: "none",
                transition: "all 0.2s ease",
              }}
            >
              <option value={0}>All</option>
              <option value={70}>70+</option>
              <option value={80}>80+</option>
              <option value={90}>90+</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
