export default function MobileTabs({ activeTab, setActiveTab }) {
  return (
    <div className="flex md:hidden border-b border-gray-300 dark:border-gray-700">
      <button
        onClick={() => setActiveTab("source")}
        className={`flex-1 py-2 text-center ${
          activeTab === "source"
            ? "border-b-2 border-blue-600 text-blue-600 font-semibold"
            : "text-gray-500"
        }`}
      >
        Source
      </button>
      <button
        onClick={() => setActiveTab("chat")}
        className={`flex-1 py-2 text-center ${
          activeTab === "chat"
            ? "border-b-2 border-blue-600 text-blue-600 font-semibold"
            : "text-gray-500"
        }`}
      >
        Chat
      </button>
    </div>
  );
}
