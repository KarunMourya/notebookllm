export default function FileUploader({ handleFileChange }) {
  return (
    <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-400 dark:border-gray-500 rounded-xl p-20 cursor-pointer hover:border-blue-500 transition">
      <input
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={handleFileChange}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12 mb-2 text-gray-500 dark:text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12V4m0 0l4 4m-4-4L8 8"
        />
      </svg>
      <span>Upload PDF</span>
    </label>
  );
}
