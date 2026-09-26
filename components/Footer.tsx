export default function Footer() {
  return (
    <footer className="bg-black border-t border-zinc-900 px-6 py-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4 mt-auto">
      <div className="flex items-center gap-3">
        {/* Your custom logo image */}
        <img src="/logo.png" alt="FitLog Logo" className="h-6 w-auto object-contain grayscale opacity-70" />
        <span className="font-bold tracking-wider text-white uppercase">FitLog</span>
      </div>
      <p className="text-center">© 2026 FitLog — Workout Library. Train hard, log honest.</p>
    </footer>
  );
}