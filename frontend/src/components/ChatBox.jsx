export default function ChatBox({ messages }) {
  return (
    <div className="flex-1 overflow-y-auto mb-4 space-y-3">
      {messages.map((m, i) => (
        <div
          key={i}
          className={`p-3 rounded-xl ${
            m.role === "user"
              ? "bg-blue-600 text-white ml-auto"
              : "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-100 mr-auto"
          } max-w-[75%]`}
        >
          {m.text}
        </div>
      ))}
    </div>
  );
}
