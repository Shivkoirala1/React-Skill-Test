import { useState } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import Task2 from "./Task2";
import Task3 from "./Task3";
import AllProducts from "./AllProducts";
import Dashboard from "./Dashboard";

function CounterTask() {
  const [count, setCount] = useState(0);
  return (
    <div className="flex flex-col items-center">
      <div className="text-6xl font-bold mb-8 h-20">
        {count !== 0 && <span>{count}</span>}
      </div>
      <div className="flex gap-4">
        <button
          onClick={() => setCount(count - 1)}
          className={`bg-red-500 text-white text-2xl px-6 py-3 rounded-xl hover:bg-red-600 ${count === 0 ? "invisible" : ""}`}
        >
          −
        </button>
        <button
          onClick={() => setCount(count + 1)}
          className="bg-green-500 text-white text-2xl px-6 py-3 rounded-xl hover:bg-green-600"
        >
          +
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const location = useLocation();

  // Hide nav on dashboard and allproducts pages
  const hideNav =
    location.pathname === "/dashboard" ||
    location.pathname === "/allproducts";

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">

      {/* Navigation */}
      {!hideNav && (
        <div className="flex flex-wrap gap-3 mt-8 mb-10">
          <Link to="/">
            <button className={`px-5 py-2 rounded-xl font-bold ${location.pathname === "/" ? "bg-blue-500 text-white" : "bg-white text-blue-500 border border-blue-500"}`}>
              Task 1 - Counter
            </button>
          </Link>
          <Link to="/task2">
            <button className={`px-5 py-2 rounded-xl font-bold ${location.pathname === "/task2" ? "bg-blue-500 text-white" : "bg-white text-blue-500 border border-blue-500"}`}>
              Task 2 - Live Text
            </button>
          </Link>
          <Link to="/task3">
            <button className={`px-5 py-2 rounded-xl font-bold ${location.pathname === "/task3" ? "bg-blue-500 text-white" : "bg-white text-blue-500 border border-blue-500"}`}>
              Task 3 - Todo
            </button>
          </Link>
          <Link to="/allproducts">
            <button className="px-5 py-2 rounded-xl font-bold bg-white text-blue-500 border border-blue-500">
              Task 4 - Products
            </button>
          </Link>
          <Link to="/dashboard">
            <button className="px-5 py-2 rounded-xl font-bold bg-white text-blue-500 border border-blue-500">
              Task 4 - Dashboard
            </button>
          </Link>
        </div>
      )}

      {/* Routes */}
      <div className="w-full">
        <Routes>
          <Route path="/" element={<div className="flex justify-center mt-10"><CounterTask /></div>} />
          <Route path="/task2" element={<div className="flex justify-center mt-10"><Task2 /></div>} />
          <Route path="/task3" element={<Task3 />} />
          <Route path="/allproducts" element={<AllProducts />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>

    </div>
  );
}