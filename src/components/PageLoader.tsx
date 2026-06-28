export default function PageLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="text-center">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-cyan-200 border-t-cyan-600" />
        <p className="mt-4 text-sm text-slate-500">Loading TomorrowGrid…</p>
      </div>
    </div>
  );
}
