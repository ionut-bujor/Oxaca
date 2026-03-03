import type { Alert } from '../types';

interface AlertCardProps {
  alert: Alert;
  onResolve?: (id: number) => void;
}

function AlertCard({ alert, onResolve }: AlertCardProps) {
  const isActive = alert.status === 'ACTIVE';
  const time = new Date(alert.createdAt).toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="flex flex-col sm:flex-row bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
      <div className="flex-grow">
        <div className="flex flex-wrap items-center gap-2">
          <span className="serif-text text-xl font-bold text-primary">
            Table {alert.tableNumber}
          </span>
          <span
            className={`px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded border ${
              isActive
                ? 'bg-amber-500/10 text-amber-700 border-amber-500/30'
                : 'bg-slate-100 text-slate-600 border-slate-200'
            }`}
          >
            {alert.status}
          </span>
        </div>
        {alert.message && (
          <p className="text-sm text-slate-600 mt-2">{alert.message}</p>
        )}
        <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
          <span className="material-symbols-outlined text-sm">schedule</span>
          {time}
        </p>
      </div>
      {isActive && onResolve && (
        <div className="mt-4 sm:mt-0 sm:ml-4 flex items-center">
          <button
            type="button"
            onClick={() => onResolve(alert.id)}
            aria-label={`Resolve alert for table ${alert.tableNumber}`}
            className="px-4 py-2 rounded-xl bg-primary text-white text-sm font-bold uppercase tracking-wider hover:bg-accent transition-all active:scale-95 shadow-md shadow-primary/20"
          >
            Resolve
          </button>
        </div>
      )}
    </div>
  );
}

export default AlertCard;
