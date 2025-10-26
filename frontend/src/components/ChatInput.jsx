export default function ChatInput({
  question,
  setQuestion,
  handleAsk,
  disabled,
}) {
  return (
    <div className="flex gap-2">
      <input
        type="text"
        placeholder="Ask about the document..."
        className="flex-1 p-2 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring focus:ring-blue-500"
        disabled={disabled}
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleAsk()}
      />
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-400 dark:disabled:bg-gray-600"
        onClick={handleAsk}
        disabled={disabled}
      >
        Send
      </button>
    </div>
  );
}