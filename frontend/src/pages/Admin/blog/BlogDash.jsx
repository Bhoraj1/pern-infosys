import { Button, Modal, Table } from "flowbite-react";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useSelector } from "react-redux";
import { useBlog } from "../../../store/ContextAPI";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function BlogDash() {
  const { adminDetails } = useSelector((state) => state.admin);
  const { blogs, setBlogs } = useBlog();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [blogIdTodelete, setBlogIdTodelete] = useState(null);

  const handleDeleteBlog = async () => {
    try {
      const res = await fetch(`/api/backend11/delete-blog/${blogIdTodelete}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setBlogs((prev) => prev.filter((blog) => blog.id !== blogIdTodelete));
        setShowModal(false);
        toast.success("Blog Post Deleted Successfully!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleViewDetails = (blog) => {
    setSelectedTeam(blog);
    setShowViewModal(true);
  };

  return (
    <div className="table-auto overflow-x-scroll mt-3 md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500  ">
      {adminDetails.user.isAdmin && blogs.length > 0 ? (
        <Table hoverable className="shadow-md">
          <Table.Head>
            <Table.HeadCell>Created AT</Table.HeadCell>
            <Table.HeadCell>Posted By</Table.HeadCell>
            <Table.HeadCell>Title</Table.HeadCell>
            <Table.HeadCell>View</Table.HeadCell>
            <Table.HeadCell>Edit</Table.HeadCell>
            <Table.HeadCell>Delete</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {blogs.map((blog) => (
              <Table.Row
                key={blog.id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800 "
              >
                <Table.Cell>
                  {new Date(blog.created_at).toDateString()}
                </Table.Cell>
                <Table.Cell>{blog.name}</Table.Cell>
                <Table.Cell>{blog.title}</Table.Cell>

                <Table.Cell>
                  <span
                    onClick={() => handleViewDetails(blog)}
                    className="bg-blue-950 rounded-full p-1 sm:p-2 text-white cursor-pointer"
                  >
                    Details
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <span
                    onClick={() => navigate(`/update-blog/${blog.id}`)}
                    className="hover:underline text-blue-800 cursor-pointer"
                  >
                    Edit
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <span
                    onClick={() => {
                      setShowModal(true);
                      setBlogIdTodelete(blog.id);
                    }}
                    className="font-medium text-red-600 hover:underline cursor-pointer"
                  >
                    Delete
                  </span>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      ) : (
        <div className="text-center text-2xl mt-8 font-semibold text-black  dark:text-gray-400">
          There is no Blog post yet !
        </div>
      )}

      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this user ?{" "}
            </h3>
            <div className="flex justify-center gap-7">
              <Button color="failure" onClick={handleDeleteBlog}>
                Yes, I am sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        show={showViewModal}
        onClose={() => setShowViewModal(false)}
        popup
        size="xl"
        className="mt-20 sm:mt-0"
      >
        <Modal.Header />
        <Modal.Body>
          {selectedTeam && (
            <div className="max-w-lg mx-auto p-3  bg-white rounded-xl text-center">
              <img
                src={selectedTeam.image}
                alt="blog-image"
                className="mx-auto"
              />
              <h3 className="text-2xl font-bold mb-2">{selectedTeam.title}</h3>
              <p className="text-black font-semibold text-md mb-4">
                BY {selectedTeam.name.toUpperCase()}
              </p>

              <div className="p-4  rounded-lg shadow-sm">
                <div className="grid grid-cols-1 gap-3 text-left">
                  <p
                    className="curriculum-content"
                    dangerouslySetInnerHTML={{
                      __html: selectedTeam.description,
                    }}
                  ></p>
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}
