import { useState } from "react";

export default function Task2() {
  const [text, setText] = useState("");

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">

      <h1 className="text-3xl font-bold mb-6">Live Text Preview</h1>

      {/* Input Field */}
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type something..."
        className="border-2 border-gray-400 rounded-lg px-4 py-2 w-96 text-lg focus:outline-none focus:border-blue-500"
      />

      {/* Character Count */}
      <p className="text-sm text-gray-500 mt-2 self-end w-96">
        {text.length} characters
      </p>

      {/* Live Preview Text Area */}
      <div className="mt-6 w-96 min-h-32 border-2 border-blue-300 rounded-lg p-4 bg-white text-lg text-gray-700">
        {text === "" ? (
          <span className="text-gray-400 italic">Your text will appear here...</span>
        ) : (
          text
        )}
      </div>

    </div>
  );
}