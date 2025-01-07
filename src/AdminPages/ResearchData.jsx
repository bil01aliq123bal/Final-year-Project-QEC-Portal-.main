import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../utilis/baseUrl"; // Adjust the import according to your project structure
import ConfirmDeleteModal from "./Delete/ConfirmDelete"; // Import the modal component

const AdminFileManagement = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [selectedFileKey, setSelectedFileKey] = useState(null); // Store the file key to be deleted
  const navigate = useNavigate();
  const searchInputRef = useRef(null); // Create a ref for the input element

  // Fetch files from the server
  useEffect(() => {
    const fetchFiles = async () => {
      setLoading(true);
      try {
        const token = JSON.parse(localStorage.getItem("loginData"))?.token;
        if (!token) {
          toast.error("You are not authenticated. Please log in.");
          navigate("/login");
          return;
        }

        const response = await axios.get("/file/files", {
          headers: { Authorization: `Bearer ${token}` },
          params: { q: searchQuery }, // Use the current search query
        });

        setFiles(response.data.data || []);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error("Failed to fetch files.");
      }
    };

    fetchFiles();
  }, [navigate, searchQuery]);

  // Handle search query change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Trigger search when button is clicked
  const handleSearchClick = (event) => {
    event.preventDefault();
    setSearchQuery(searchQuery); // Ensure the query is set
  };

  // Open the confirmation modal
  const openModal = (fileKey) => {
    setSelectedFileKey(fileKey);
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFileKey(null);
  };

  // Confirm the delete action
  const handleDeleteAction = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("loginData"))?.token;
      if (!token) {
        toast.error("You are not authenticated. Please log in.");
        navigate("/login");
        return;
      }

      // Send DELETE request to backend
      const response = await axios.delete("/file/delete", {
        headers: { Authorization: `Bearer ${token}` },
        params: { key: selectedFileKey },
      });

      toast.success(response.data.message || "File deleted successfully.");

      // Reload files after deletion
      setFiles((prevFiles) =>
        prevFiles.filter((file) => file.key !== selectedFileKey)
      );
      closeModal(); // Close the modal after deletion
    } catch (error) {
      toast.error("Failed to delete the file.");
      closeModal(); // Close the modal even on failure
    }
  };

  // Fetch the signed URL for the file
  const handleViewAction = async (fileKey) => {
    try {
      const token = JSON.parse(localStorage.getItem("loginData"))?.token;
      if (!token) {
        toast.error("You are not authenticated. Please log in.");
        navigate("/login");
        return;
      }

      const response = await axios.get("/file/signed-url", {
        headers: { Authorization: `Bearer ${token}` },
        params: { key: fileKey },
      });

      const { url } = response.data.data;
      window.open(url, "_blank"); // Open the file in a new tab
    } catch (error) {
      toast.error("Failed to fetch the signed URL.");
    }
  };

  // Verify the file
  const handleVerifyAction = async (fileKey) => {
    try {
      const token = JSON.parse(localStorage.getItem("loginData"))?.token;
      if (!token) {
        toast.error("You are not authenticated. Please log in.");
        navigate("/login");
        return;
      }

      const response = await axios.put(
        "/file/verify",
        { key: fileKey },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success(response.data.message || "File verified successfully.");

      // Update the files state
      setFiles((prevFiles) =>
        prevFiles.map((file) =>
          file.key === fileKey ? { ...file, status: "verified" } : file
        )
      );
    } catch (error) {
      toast.error("Failed to verify the file.");
    }
  };

  return (
    <div className="mr-6 mt-10">
      <div className="bg-gradient-to-r from-purple-600 to-purple-900 rounded-2xl mt-2 w-full max-w-screen-xl mx-auto py-10 px-5 sm:px-10">
        <h1 className="text-2xl text-white sm:text-3xl font-bold text-purple-950 mb-8 text-center">
          File Management
        </h1>

        <div className="mb-6 flex justify-center sm:justify-start w-full">
          <div className="border border-purple-500 p-0 rounded-lg bg-purple-100">
            <input
              ref={searchInputRef} // Attach the ref to the input
              type="text"
              name="search"
              placeholder="Search for a file"
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full sm:w-64 md:w-80 lg:w-96 px-4 py-2 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {files.length > 0 ? (
              files.map((file) => (
                <div
                  key={file._id}
                  className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="mb-4">
                    <h3 className="font-bold text-xs text-purple-700">{file.key}</h3>
                    <div className="text-sm text-gray-500">
                      <div className="text-base font-medium text-black">Size: </div>
                      {file.size} KB
                    </div>
                    <div className="text-sm text-gray-500">
                      <div className="text-base font-medium text-black">MIME Type: </div>
                      {file.mimetype || "N/A"}
                    </div>
                    <div className="text-sm text-gray-500">
                      <div className="text-base font-medium text-black">Status: </div>
                      <span
                        className={`font-bold ${
                          file.status === "verified"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {file.status}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <p className="text-xs text-gray-400">
                      {new Date(file.createdAt).toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(file.updatedAt).toLocaleString()}
                    </p>
                  </div>

                  <div className="flex justify-end space-x-2 mt-4">
                    <button
                      onClick={() => handleViewAction(file.key)} // View file action
                      className="px-2 py-2 text-white bg-purple-500 rounded-lg hover:bg-purple-700"
                    >
                      View
                    </button>
                    <button
                      onClick={() => openModal(file.key)} // Open the modal on click
                      className="px-2 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleVerifyAction(file.key)} // Verify file action
                      disabled={file.status === "verified"}
                      className={`px-2 py-2 text-white ${
                        file.status === "verified"
                          ? "bg-gray-400"
                          : "bg-green-500 hover:bg-green-700"
                      } rounded-lg`}
                    >
                      {file.status === "verified" ? "Verified" : "Verify"}
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500">
                No files available.
              </div>
            )}
          </div>
        )}

        {/* Modal */}
        <ConfirmDeleteModal
          isOpen={isModalOpen}
          onConfirm={handleDeleteAction}
          onCancel={closeModal}
        />
      </div>
    </div>
  );
};

export default AdminFileManagement;
