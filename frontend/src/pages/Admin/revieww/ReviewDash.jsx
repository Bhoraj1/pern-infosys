import { Button, Modal, Table } from "flowbite-react";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useSelector } from "react-redux";
import { useReview } from "../../../store/ContextAPI";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ReviewDash() {
  const { adminDetails } = useSelector((state) => state.admin);
  const { reviews, setReviews } = useReview();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [reviewIdTodelete, setReviewIdTodelete] = useState(null);
  const handleDeleteReview = async () => {
    try {
      const res = await fetch(
        `/api/backend10/delete-review/${reviewIdTodelete}`,
        {
          method: "DELETE",
        }
      );
      if (res.ok) {
        setReviews((prev) =>
          prev.filter((review) => review.id !== reviewIdTodelete)
        );
        setShowModal(false);
        toast.success("Review Deleted Successfully!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500  ">
      {adminDetails.user.isAdmin && reviews?.length > 0 ? (
        <Table hoverable className="shadow-md">
          <Table.Head>
            <Table.HeadCell>Image</Table.HeadCell>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Rating</Table.HeadCell>
            <Table.HeadCell>Review</Table.HeadCell>
            <Table.HeadCell>Edit</Table.HeadCell>
            <Table.HeadCell>Delete</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {reviews.map((review) => (
              <Table.Row
                key={review.id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800 "
              >
                <Table.Cell>
                  <img
                    src={review.image}
                    alt={review.name}
                    className="w-10 h-10 object-cover bg-gray-500  rounded-full"
                  />
                </Table.Cell>
                <Table.Cell>{review.name}</Table.Cell>
                <Table.Cell>{review.rating}</Table.Cell>

                <Table.Cell>
                  <p>{review.review}</p>
                </Table.Cell>
                <Table.Cell>
                  <span
                    onClick={() => navigate(`/update-review/${review.id}`)}
                    className="hover:underline text-blue-800 cursor-pointer"
                  >
                    Edit
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <span
                    onClick={() => {
                      setShowModal(true);
                      setReviewIdTodelete(review.id);
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
          There are no review yet!
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
              <Button color="failure" onClick={handleDeleteReview}>
                Yes, I am sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
