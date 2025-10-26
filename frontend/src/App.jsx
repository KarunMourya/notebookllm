import { useState } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

import FileUploader from "./components/FileUploader";
import PDFViewer from "./components/PDFViewer";
import ChatBox from "./components/ChatBox";
import ChatInput from "./components/ChatInput";
import MobileTabs from "./components/MobileTabs";


export default function App() {
  const [file, setFile] = useState(null);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [numPages, setNumPages] = useState(0);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [activeTab, setActiveTab] = useState("source");

  const uploadMutation = useMutation({
    mutationFn: async (pdfFile) => {
      const formData = new FormData();
      formData.append("file", pdfFile);
      const res = await axios.post("http://localhost:8000/upload/pdf", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    },
    onSuccess: () => setFileUploaded(true),
    onError: () => setFileUploaded(true),
  });

  const chatMutation = useMutation({
    mutationFn: async ({ question, file_id }) => {
      const res = await axios.post("http://localhost:8000/api/chat", {
        question,
        file_id,
      });
      return res.data;
    },
    onSuccess: (data) => {
      setMessages((prev) => [...prev, { role: "assistant", text: data.answer }]);
    },
  });

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      uploadMutation.mutate(selected);
    }
  };

  const handleAsk = () => {
    if (!fileUploaded || !question.trim()) return;
    setMessages((prev) => [...prev, { role: "user", text: question }]);
    chatMutation.mutate({ question  });
    setQuestion("");
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
      <MobileTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Sidebar / Source */}
      <aside
        className={`h-full flex flex-col justify-center border-gray-300 dark:border-gray-700 p-4 md:border-r md:w-1/4 lg:w-1/3 transition-all duration-300 ${
          activeTab === "source" ? "block" : "hidden md:flex"
        }`}
      >
        {!file ? (
          <FileUploader handleFileChange={handleFileChange} />
        ) : (
          <PDFViewer file={file} numPages={numPages} setNumPages={setNumPages} />
        )}
      </aside>

      {/* Chat Section */}
      <main
        className={`flex flex-col flex-1 p-6 transition-all duration-300 ${
          activeTab === "chat" ? "block" : "hidden md:flex"
        }`}
      >
        <ChatBox messages={messages} />
        <ChatInput
          question={question}
          setQuestion={setQuestion}
          handleAsk={handleAsk}
          disabled={!fileUploaded || chatMutation.isPending}
        />
      </main>
    </div>
  );
}
