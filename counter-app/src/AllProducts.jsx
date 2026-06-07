import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  const filtered = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-8">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">All Products</h1>
        <Link to="/">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            ← Back
          </button>
        </Link>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border-2 border-gray-300 rounded-lg px-4 py-2 w-full max-w-md mb-8 focus:outline-none focus:border-blue-400"
      />

      {/* Loading */}
      {loading && (
        <div className="flex justify-center mt-20">
          <p className="text-gray-500 text-xl animate-pulse">Loading products...</p>
        </div>
      )}

      {/* Grid */}
      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl shadow p-4 flex flex-col">
              <img
                src={product.image}
                alt={product.title}
                className="h-40 object-contain mb-4"
              />
              <h2 className="text-sm font-bold mb-1 line-clamp-2">{product.title}</h2>
              <p className="text-xs text-gray-400 mb-2 capitalize">{product.category}</p>
              <p className="text-lg font-bold text-blue-500 mt-auto">${product.price}</p>
            </div>
          ))}
        </div>
      )}

      {/* No results */}
      {!loading && filtered.length === 0 && (
        <p className="text-center text-gray-400 italic mt-10">No products found.</p>
      )}

    </div>
  );
}