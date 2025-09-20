import { FileText, Sparkles } from 'lucide-react';
import React, { useState } from 'react'

const ReviewResumse = () => {
  const [input, setInput] = useState("");
  const [object, setObject] = useState("");
  const onSubmitHandler = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700">
      <form
        onSubmit={(e) => onSubmitHandler(e)}
        className="w-full max-w-lg p-4 bg-white rounded-lg boder border-gray-200"
      >
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 text-[#00DA83]" />
          <h1 className="text-xl font-semibold">
            {" "}
            Resume Review
          </h1>
        </div>

        <p className="mt-5 text-sm font-medum">Upload Resume</p>

        <input
          onChange={(e) => setInput(e.target.files[0])}
          type="file"
          accept="application/pdf"
          className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-mdborder border-gray-300 text-gray-600"
          required
        />

        <p className="mt-5 text-sm font-medum">Supports PDF removal only</p>
        <textarea
          onChange={(e) => setObject(e.target.value)}
          rows={4}
          value={object}
          className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-mdborder border-gray-300"
          placeholder="e.g., watch or spoon, Only single object name"
          required
        />

        <button className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#00DA83] to-[#009BB3] text-white px-4 py-2 mt-6 text-sm rounded-lg curosr-pointer">
          <FileText className="w-5" />
          Review Resume
        </button>
      </form>
      {/* right Col*/}
      <div className="w-full max-w-lg p-4 bg-white ronded-lg rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px]">
        <div className="flex items-center gap-3">
          <FileText className="w-5 h-5 text-[#00DA83]" />
          <h1 className="text-xl font-semibold">Analysis Results</h1>
        </div>
        <div className="flex-1 flex jutsify-center items-center">
          <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
            <FileText className="w-9 h-9 " />
            <p>Upload a pdf and click "Review Resume" to get started</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewResumse