import { useEffect, useState } from "react";
import { Table, Modal, Button } from "flowbite-react";
import { useSelector } from "react-redux";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Link } from "react-router-dom";

export default function TrainingDash() {
  const { adminDetails } = useSelector((state) => state.admin);
  const [trainings, setTraining] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [deleteTrainingId, setDeleteTrainingId] = useState("");
  useEffect(() => {
    const fetchTraining = async () => {
      try {
        const res = await fetch(`/api/backend6/getTrainings`);
        const data = await res.json();
        // console.log(data);
        if (!res.ok) {
          console.error(data.message || "Failed to fetch users.");
        } else {
          setTraining(data.trainings);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchTraining();
  }, []);

  const handleViewDetails = (training) => {
    setSelectedCourse(training);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCourse(null);
  };

  const handleDeleteTraining = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/backend6/deleteTraining/${deleteTrainingId}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        console.log("Error deleting training");
      } else {
        setTraining((prev) =>
          prev.filter((training) => training._id !== deleteTrainingId)
        );
        setShowModal(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="table-auto mt-7 overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300">
      {adminDetails.isAdmin && trainings.length > 0 ? (
        <>
          <h1 className="flex justify-center items-center text-2xl font-semibold mb-4">
            Course Management
          </h1>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Title</Table.HeadCell>
              <Table.HeadCell>Instructor</Table.HeadCell>
              <Table.HeadCell>Duration</Table.HeadCell>
              <Table.HeadCell>Fees</Table.HeadCell>
              <Table.HeadCell>Edit</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              <Table.HeadCell>Actions</Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {trainings.map((course) => (
                <Table.Row key={course._id}>
                  <Table.Cell className="font-medium text-gray-950">
                    {course.title}
                  </Table.Cell>
                  <Table.Cell>{course.instructorName}</Table.Cell>
                  <Table.Cell>{course.courseDuration}</Table.Cell>
                  <Table.Cell>NPR.{course.totalAmount}</Table.Cell>
                  <Table.Cell>
                    <Link
                      to={`/update-training/${course._id}`}
                      className="cursor-pointer text-blue-500 hover:underline"
                    >
                      Edit
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setDeleteTrainingId(course._id);
                      }}
                      className="font-medium text-red-500 hover:underline cursor-pointer"
                    >
                      Delete
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <Button onClick={() => handleViewDetails(course)}>
                      View Details
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </>
      ) : (
        <div className="text-center text-2xl mt-8 font-semibold text-black  dark:text-gray-400">
          There are no training yet !
        </div>
      )}

      {selectedCourse && (
        <Modal show={isModalOpen} onClose={handleCloseModal}>
          <Modal.Header>{selectedCourse.title}</Modal.Header>
          <Modal.Body>
            <p>
              <strong>Instructor:</strong> {selectedCourse.instructorName}
            </p>
            <p>
              <strong>Bio:</strong> {selectedCourse.instructorBio}
            </p>
            <p>
              <strong>Description:</strong> {selectedCourse.description}
            </p>
            <p>
              <strong>Duration:</strong> {selectedCourse.duration}
            </p>
            <p>
              <strong>Total Amount:</strong> NPR.{selectedCourse.totalAmount}
            </p>
            <h3 className="mt-4 font-semibold">Syllabus:</h3>
            <ul>
              {selectedCourse.syllabus.map((item, index) => (
                <li key={index}>- {item}</li>
              ))}
            </ul>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleCloseModal}>Close</Button>
          </Modal.Footer>
        </Modal>
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
              Are you sure you want to delete this Training ?{" "}
            </h3>
            <div className="flex justify-center gap-7">
              <Button color="failure" onClick={handleDeleteTraining}>
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
