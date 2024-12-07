import { useState } from "react";
import { Link } from "react-router-dom"; // Import Link
import { FaEye } from "react-icons/fa";
import "./BidsItem.css"; // Ensure this CSS is correctly set up

// Dummy card component to display added items
const BidCard = ({ bid }) => {
  return (
    <div className="bg-theme-bg2 p-4 rounded-lg mb-4 shadow-lg">
      <h3 className="font-bold">{bid.product}</h3>
      <p><strong>Category:</strong> {bid.category}</p>
      <p><strong>Status:</strong> {bid.status}</p>
      <p><strong>Bid:</strong> ${bid.bid}</p>
      <p><strong>Your Bid:</strong> ${bid.yourBid}</p>
      <Link
        className="text-theme-color hover:text-white hover:bg-theme-color rounded-lg border-2 border-theme-color p-2 transition-all"
        to={`/single-auction-detail/${bid.id}`} // Corrected template string
      >
        <FaEye size={24} />
      </Link>
    </div>
  );
};

const BidsItem = () => {
  const [product, setProduct] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [bid, setBid] = useState("");
  const [yourBid, setYourBid] = useState("");

  const [bids, setBids] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "product") setProduct(value);
    if (name === "category") setCategory(value);
    if (name === "status") setStatus(value);
    if (name === "bid") setBid(value);
    if (name === "yourBid") setYourBid(value);
  };

  const handleAddItem = () => {
    if (
      !product ||
      !category ||
      !status ||
      isNaN(bid) ||
      isNaN(yourBid) ||
      bid <= 0 ||
      yourBid <= 0
    ) {
      alert("Please fill in all fields with valid data.");
      return;
    }

    const newBid = {
      id: Date.now(),
      product,
      category,
      status,
      bid: parseFloat(bid),
      yourBid: parseFloat(yourBid),
    };

    setBids((prevBids) => [...prevBids, newBid]);

    setProduct("");
    setCategory("");
    setStatus("");
    setBid("");
    setYourBid("");
  };

  return (
    <div className="overflow-auto px-7 py-4 w-full bg-theme-bg text-white rounded-2xl">
      <h2 className="text-black font-bold text-xl border-b border-border-info-color pb-3 mb-5">
        Add Bids Item
      </h2>

      <div className="bg-theme-bg2 rounded-2xl max-h-[750px] p-6 border border-border-info-color">
        {/* Form for adding new bid */}
        <div className="mb-6">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="product"
              value={product}
              onChange={handleInputChange}
              placeholder="Product"
              className="p-3 bg-theme-bg border rounded"
            />
            <input
              type="text"
              name="category"
              value={category}
              onChange={handleInputChange}
              placeholder="Category"
              className="p-3 bg-theme-bg border rounded"
            />
            <input
              type="text"
              name="status"
              value={status}
              onChange={handleInputChange}
              placeholder="Status"
              className="p-3 bg-theme-bg border rounded"
            />
            <input
              type="number"
              name="bid"
              value={bid}
              onChange={handleInputChange}
              placeholder="Bid"
              className="p-3 bg-theme-bg border rounded"
            />
            <input
              type="number"
              name="yourBid"
              value={yourBid}
              onChange={handleInputChange}
              placeholder="Your Bid"
              className="p-3 bg-theme-bg border rounded"
            />
          </div>

          <button
            onClick={handleAddItem}
            className="mt-4 w-full bg-theme-color text-white p-3 rounded-lg"
          >
            Add Item
          </button>
        </div>

        {/* Display added bids as cards */}
        <div className="mt-6">
          {bids.length === 0 ? (
            <p>No bids added yet.</p>
          ) : (
            bids.map((bid) => <BidCard key={bid.id} bid={bid} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default BidsItem;
