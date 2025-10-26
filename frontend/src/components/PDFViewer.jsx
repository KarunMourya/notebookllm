import { Document, Page } from "react-pdf";
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PDFViewer({ file, numPages, setNumPages }) {
  return (
    <div className="flex-1 overflow-y-auto mt-4 border border-gray-300 dark:border-gray-700 rounded-lg">
      <Document
        file={file}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        loading={<p className="text-center py-6 text-gray-500">Loading PDF...</p>}
      >
        {Array.from({ length: numPages }, (_, i) => (
          <Page key={i + 1} pageNumber={i + 1} width={300} />
        ))}
      </Document>
    </div>
  );
}
