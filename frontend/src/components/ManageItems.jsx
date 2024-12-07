import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";
import Pagination from "./Pagination";

const ManageItems = () => {
  const [mockAuctions, setMockAuctions] = useState([
    {
      _id: "1",
      name: "Samsung Smart TV",
      category: { name: "Electronics" },
      bids: [{ bid: 550 }, { bid: 600 }, { bid: 650 }],
      status: "active",
      startingPrice: 500,
      winner: { bidder: { fullName: "John Doe" } },
      image: "https://via.placeholder.com/50?text=TV",
    },
    {
      _id: "2",
      name: "Gold Necklace",
      category: { name: "Jewelry" },
      bids: [{ bid: 1500 }, { bid: 1800 }, { bid: 2000 }],
      status: "active",
      startingPrice: 1400,
      winner: { bidder: { fullName: "Sarah Smith" } },
      image: "https://via.placeholder.com/50?text=Necklace",
    },
    {
      _id: "3",
      name: "Toyota Corolla",
      category: { name: "Automobile" },
      bids: [{ bid: 18000 }, { bid: 20000 }],
      status: "upcoming",
      startingPrice: 17000,
      winner: null,
      image: "https://via.placeholder.com/50?text=Car",
    },
    {
      _id: "4",
      name: "Signed Cricket Bat",
      category: { name: "Sports" },
      bids: [{ bid: 400 }, { bid: 450 }, { bid: 500 }],
      status: "active",
      startingPrice: 350,
      winner: { bidder: { fullName: "Chris Lee" } },
      image: "https://via.placeholder.com/50?text=Bat",
    },
    {
      _id: "5",
      name: "Luxury Watch",
      category: { name: "Accessories" },
      bids: [{ bid: 900 }, { bid: 1000 }],
      status: "active",
      startingPrice: 850,
      winner: { bidder: { fullName: "Alex Taylor" } },
      image: "https://via.placeholder.com/50?text=Watch",
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = mockAuctions.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const nextPage = () =>
    setCurrentPage((prev) =>
      Math.min(prev + 1, Math.ceil(mockAuctions.length / itemsPerPage))
    );

  const handleDeleteAuction = (id) => {
    setMockAuctions((prevAuctions) =>
      prevAuctions.filter((auction) => auction._id !== id)
    );
    toast.success("Item deleted.", { autoClose: 500 });
  };

  return (
    <div className="overflow-auto px-7 py-4 w-full bg-gradient-to-r from-dark-blue to-light-blue text-white rounded-2xl shadow-lg">
      <h2 className="text-white font-bold text-xl border-b-2 border-blue-300 pb-3 mb-5">
        Manage Items
      </h2>
      <div className="overflow-auto px-4 bg-blue-900 rounded-2xl border border-blue-400 shadow-md">
        <table className="text-left w-full border-collapse border-spacing-y-4">
          <thead>
            <tr className="bg-gradient-to-r from-blue-800 to-blue-600 text-white">
              <th className="px-5 py-3 rounded-l-lg">Product</th>
              <th className="px-5 py-3">Category</th>
              <th className="px-5 py-3">Bids</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Your Bid</th>
              <th className="px-5 py-3">Winner</th>
              <th className="px-5 py-3 rounded-r-lg">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((auction) => (
              <tr
                key={auction._id}
                className="bg-blue-700 text-white hover:bg-blue-600 transition-all"
              >
                <td className="px-5 py-3 flex items-center gap-2">
                  <img
                    src={auction.image}
                    alt="auction"
                    className="w-[50px] h-[50px] rounded-full border-2 border-blue-400"
                  />
                  {auction.name}
                </td>
                <td className="px-5 py-3">{auction.category.name}</td>
                <td className="px-5 py-3">{auction.bids.length}</td>
                <td className="px-5 py-3">
                  <span className="px-3 py-1 rounded-full bg-blue-500 border border-blue-300">
                    {auction.status}
                  </span>
                </td>
                <td className="px-5 py-3">{auction.startingPrice}</td>
                <td className="px-5 py-3">
                  {auction.winner?.bidder?.fullName || "----"}
                </td>
                <td className="px-5 py-3 flex gap-2">
                  <Link
                    className="text-blue-300 hover:text-white hover:bg-blue-500 px-2 py-1 rounded-lg transition"
                    to={`/single-auction-detail/${auction._id}`} // Fixed the URL by using template literals
                  >
                    <FaEye size={16} />
                  </Link>
                  {auction.status === "upcoming" && (
                    <Link
                      className="text-blue-300 hover:text-white hover:bg-blue-500 px-2 py-1 rounded-lg transition"
                      to={`/edit-auction/${auction._id}`} // Fixed the URL by using template literals
                    >
                      <FaRegEdit size={16} />
                    </Link>
                  )}
                  <button
                    className="text-red-400 hover:text-white hover:bg-red-500 px-2 py-1 rounded-lg transition"
                    onClick={() => handleDeleteAuction(auction._id)}
                  >
                    <MdDeleteForever size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        totalPosts={mockAuctions.length}
        postsPerPage={itemsPerPage}
        paginate={paginate}
        currentPage={currentPage}
        nextPage={nextPage}
        prevPage={prevPage}
      />
    </div>
  );
};

export default ManageItems;
