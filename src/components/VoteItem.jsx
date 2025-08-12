import React from "react";

export default function VoteItem({
  candidate,
  checked,
  disabled,
  onToggle,
}) {
  return (
    <label className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50">
      <input
        type="checkbox"
        className="size-5"
        checked={checked}
        disabled={disabled && !checked}
        onChange={() => onToggle(candidate.id)}
      />
      <img
        src={candidate.imageUrl}
        alt={candidate.name}
        className="w-14 h-14 object-cover rounded-md flex-none"
      />
      <div className="min-w-0">
        <p className="font-semibold truncate">{candidate.name}</p>
        {candidate.description && (
          <p className="text-sm text-gray-500 line-clamp-2">
            {candidate.description}
          </p>
        )}
      </div>
    </label>
  );
}
