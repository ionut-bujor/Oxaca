import { useState } from "react";

export interface CreateAlertFormValues {
  tableNumber: number;
  message: string;
}

interface CreateAlertFormProps {
  onSubmit: (values: CreateAlertFormValues) => void;
}

function CreateAlertForm({ onSubmit }: CreateAlertFormProps) {
  const [tableNumber, setTableNumber] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = (event: any) => {
    event.preventDefault();
    setError("");

    const parsedTable = parseInt(tableNumber, 10);
    if (Number.isNaN(parsedTable) || parsedTable <= 0) {
      setError("Please enter a valid table number.");
      return;
    }

    onSubmit({
      tableNumber: parsedTable,
      message: message.trim(),
    });

    setTableNumber("");
    setMessage("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm"
    >
      <h2 className="serif-text text-lg font-bold text-primary mb-4 uppercase tracking-wider">
        Place help alert
      </h2>
      <div className="flex flex-col gap-4">
        <div>
          <label
            htmlFor="alert-table"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            Table number *
          </label>
          <input
            id="alert-table"
            type="number"
            min={1}
            value={tableNumber}
            onChange={(event: any) => setTableNumber(event.target.value)}
            placeholder="e.g. 5"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            required
          />
        </div>
        <div>
          <label
            htmlFor="alert-message"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            Message (optional)
          </label>
          <input
            id="alert-message"
            type="text"
            value={message}
            onChange={(event: any) => setMessage(event.target.value)}
            placeholder="e.g. Customer needs help"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
          />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-primary text-white font-bold uppercase tracking-widest hover:bg-accent transition-all active:scale-[0.98] shadow-md shadow-primary/20"
        >
          Place alert
        </button>
      </div>
    </form>
  );
}

export default CreateAlertForm;

