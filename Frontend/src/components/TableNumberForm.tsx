import React from "react";

interface TableNumberFormProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  loading?: boolean;
  errorMessage?: string | null;
  submitLabel?: string;
}

const TableNumberForm: React.FC<TableNumberFormProps> = ({
  value,
  onChange,
  onSubmit,
  loading = false,
  errorMessage = null,
  submitLabel = "View Orders",
}) => {
  const tableOk = Number.isInteger(Number(value)) && Number(value) > 0;

  return (
    <div className="rounded-2xl border border-slate-100 p-6 bg-slate-50 max-w-xl">
      <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-6">
        Enter Table Number
      </h2>

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="e.g. 12"
        type="number"
        min={1}
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
      />

      {!tableOk && value !== "" && (
        <p className="text-red-600 text-sm mt-2">Please enter a valid table number.</p>
      )}

      {errorMessage && <p className="text-red-600 text-sm mt-3">{errorMessage}</p>}

      <button
        disabled={!tableOk || loading}
        onClick={onSubmit}
        className="w-full mt-6 bg-primary text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-accent transition-all shadow-xl shadow-primary/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Loading..." : submitLabel}
      </button>
    </div>
  );
};

export default TableNumberForm;
