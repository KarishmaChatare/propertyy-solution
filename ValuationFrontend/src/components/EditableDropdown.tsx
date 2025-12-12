import { useState } from "react";

interface EditableDropdownProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}

export function EditableDropdown({ label, value, onChange, options }: EditableDropdownProps) {
  const [query, setQuery] = useState(value);
  const [open, setOpen] = useState(false);

  const filtered = options.filter(o =>
    o.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (val: string) => {
    onChange(val);
    setQuery(val);
    setOpen(false);
  };

  return (
    <div className="relative">
      <label className="block text-gray-700 mb-2">{label}</label>

      <input
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          onChange(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        className="w-full px-4 py-2 border border-gray-300 rounded-xl"
        placeholder="Select or type…"
      />

      {open && (
        <ul className="absolute bg-white border w-full rounded-xl shadow-md max-h-40 overflow-auto z-20">
          {filtered.length === 0 && (
            <li className="p-2 text-gray-500">No matches</li>
          )}

          {filtered.map((opt) => (
            <li
              key={opt}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(opt)}
            >
              {opt}
            </li>
          ))}

          {!options.includes(query) && query.trim() !== "" && (
            <li
              onClick={() => handleSelect(query)}
              className="p-2 bg-blue-50 hover:bg-blue-100 cursor-pointer text-blue-700"
            >
              Use “{query}”
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
