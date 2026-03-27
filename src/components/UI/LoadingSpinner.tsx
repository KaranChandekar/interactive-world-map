"use client";

export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-2 border-blue-500/20" />
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-blue-500 animate-spin" />
        <div className="absolute inset-2 rounded-full border-2 border-transparent border-t-blue-400 animate-spin" style={{ animationDuration: "1.5s" }} />
        <div className="absolute inset-4 rounded-full bg-blue-500/10" />
      </div>
      <p className="text-sm text-gray-400 font-medium">Loading globe...</p>
    </div>
  );
}
