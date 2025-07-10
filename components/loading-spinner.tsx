export default function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-indigo-200 rounded-full animate-spin"></div>
          <div className="absolute top-0 left-0 w-20 h-20 border-4 border-transparent border-t-indigo-600 rounded-full animate-spin"></div>
        </div>
        <div className="mt-6">
          <h2 className="text-2xl font-bold gradient-text mb-2">Loading Outfit Builder</h2>
          <p className="text-gray-600">Preparing your fashion workspace...</p>
        </div>
      </div>
    </div>
  )
}
