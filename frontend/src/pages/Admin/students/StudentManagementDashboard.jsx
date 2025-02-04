import { useEffect, useState } from "react";
import { Button, Modal, Table, TextInput } from "flowbite-react";
import { useSelector } from "react-redux";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function StudentManagementDashboard() {
  const { adminDetails } = useSelector((state) => state.admin);
  const [admissions, setAdmissions] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [totalAdmissions, setTotalAdmissions] = useState(0);
  const [lstMonthAdmissions, setLstMonthAdmissions] = useState(0);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [AdmissionuserIdToDelete, setAdmissionuserIdToDelete] = useState(null);

  const handleViewDetails = (admission) => {
    setSelectedUser(admission);
    setShowDetailsModal(true);
  };

  useEffect(() => {
    const fetchAllAdmissions = async () => {
      if (adminDetails.user.isAdmin) {
        try {
          const res = await fetch(`/api/backend4/getStudentAdmission`);
          const data = await res.json();
          console.log(data);
          if (!res.ok) {
            console.error(data.message || "Failed to fetch users.");
          } else {
            setAdmissions(data.admissions);
            setTotalAdmissions(data.totalAdmissions);
            setLstMonthAdmissions(data.lstMonthAdmissions);
          }
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      }
    };
    fetchAllAdmissions();
  }, []);

  const handleDeleteUserAdmission = async () => {
    try {
      const res = await fetch(
        `/api/backend4/deleteStudentAdmission/${AdmissionuserIdToDelete}`,
        {
          method: "DELETE",
        }
      );
      if (res.ok) {
        setAdmissions((prev) =>
          prev.filter((admission) => admission.id !== AdmissionuserIdToDelete)
        );
        setShowDeleteModal(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="table-auto container overflow-x-scroll md:mx-auto p-2 scrollbar scrollbar-track-blue-900 scrollbar-thumb-slate-700">
        <h1 className="text-xl font-bold m-4">Student Management Dashboard</h1>
        <div className="flex justify-between ">
          <div className="flex mx-auto">
            <TextInput
              type="text"
              rightIcon={AiOutlineSearch}
              placeholder="Search by name..."
              className="inline w-[200px] md:w-96 p-7"
            />
          </div>

          <div className="flex  gap-7 justify-center mb-6">
            <div className="flex p-6 gap-4 items-center bg-gradient-to-r from-blue-500 to-teal-400 rounded-lg shadow-lg">
              <h4 className="text-white font-medium text-lg">
                Total Admissions:
              </h4>
              <p className="text-3xl text-white font-semibold font-tw-cen">
                {totalAdmissions}
              </p>
            </div>

            <div className="flex p-4 gap-2 items-center bg-gradient-to-r from-green-500 to-teal-400 rounded-lg shadow-lg">
              <h4 className="text-white font-medium text-lg">
                Last 30 Days Admissions:
              </h4>
              <p className=" text-3xl text-white text-center font-semibold font-tw-cen">
                {lstMonthAdmissions}
              </p>
            </div>
          </div>
        </div>

        <Table hoverable className="w-full m-4 ">
          <Table.Head>
            <Table.HeadCell>Course Name</Table.HeadCell>
            <Table.HeadCell>Student Name</Table.HeadCell>
            <Table.HeadCell>Student Number</Table.HeadCell>
            <Table.HeadCell>View Details</Table.HeadCell>
            <Table.HeadCell>Total Fees</Table.HeadCell>
            <Table.HeadCell>Amount Paid</Table.HeadCell>
            <Table.HeadCell>Edit</Table.HeadCell>
            <Table.HeadCell>Delete</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {admissions.map((admission) => (
              <Table.Row key={admission.id}>
                <Table.Cell className="font-semibold text-black">
                  {admission.course_type}
                </Table.Cell>
                <Table.Cell className="font-semibold text-black">
                  {admission.student_name}
                </Table.Cell>
                <Table.Cell className="font-semibold text-black">
                  {admission.contact_number}
                </Table.Cell>
                <Table.Cell>
                  <Button
                    onClick={() => handleViewDetails(admission)}
                    color="blue"
                  >
                    View
                  </Button>
                </Table.Cell>
                <Table.Cell className=" text-black">
                  NPR. {admission.total_amount}
                </Table.Cell>
                <Table.Cell className=" text-black">
                  NPR. {admission.amount_paid}
                </Table.Cell>
                <Table.Cell>
                  <Link
                    to={`/update-student/${admission.id}`}
                    className="font-medium text-teal-500 hover:underline cursor-pointer"
                  >
                    Edit
                  </Link>
                </Table.Cell>
                <Table.Cell>
                  <span
                    onClick={() => {
                      setShowDeleteModal(true);
                      setAdmissionuserIdToDelete(admission.id);
                    }}
                    className="font-medium text-red-600 hover:underline cursor-pointer"
                  >
                    Delete
                  </span>
                </Table.Cell>
              </Table.Row>
            ))}
            {admissions.length === 0 && (
              <Table.Row>
                <Table.Cell colSpan="5" className="text-center">
                  No students found.
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>

        {/* Modal for user details */}
        {selectedUser && (
          <Modal
            show={showDetailsModal}
            size={window.innerWidth >= 768 ? "3xl" : "xl"}
            onClose={() => setShowDetailsModal(false)}
          >
            <Modal.Header>Student Details</Modal.Header>
            <Modal.Body>
              <div className="space-y-6">
                {/* Header Section */}
                <div className="text-center">
                  <h2 className="text-2xl font-bold">
                    {selectedUser.student_name}
                  </h2>
                  <p className="text-gray-500">ID: {selectedUser.id}</p>
                </div>

                {/* Personal Information */}
                <div className="bg-gray-100 p-4 rounded-lg shadow">
                  <h3 className="text-2xl font-bold mb-3">
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <p>
                      <strong>Date of Birth:</strong>{" "}
                      {new Date(selectedUser.dob).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Contact Number:</strong>{" "}
                      {selectedUser.contact_number}
                    </p>
                    <p>
                      <strong>Email:</strong> {selectedUser.email}
                    </p>
                    <p>
                      <strong>Address:</strong> {selectedUser.address}
                    </p>
                  </div>
                </div>

                {/* Course Details */}
                <div className="bg-gray-100 p-4 rounded-lg shadow">
                  <h3 className="text-2xl font-bold mb-3">
                    Course Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <p>
                      <strong>Time Slot:</strong> {selectedUser.time_slot}
                    </p>
                    <p>
                      <strong>Course Type:</strong> {selectedUser.course_type}
                    </p>
                    <p>
                      <strong>Course Duration:</strong>{" "}
                      {selectedUser.course_duration}
                    </p>
                    <p>
                      <strong>Total Amount: </strong>
                      {"NPR. "}
                      {selectedUser.total_amount}
                    </p>
                  </div>
                </div>
                {/*Education Background */}
                <div className="bg-gray-100 p-4 rounded-lg shadow">
                  <h3 className="text-2xl font-bold mb-3">
                    Educational Details
                  </h3>
                  <p>
                    <strong>Education Background:</strong>{" "}
                    {selectedUser.education_background}
                  </p>
                </div>

                {/* Parent Details */}
                <div className="bg-gray-100 p-4 rounded-lg shadow">
                  <h3 className="text-2xl font-bold mb-3">
                    Parent Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <p>
                      <strong>Parent Name:</strong> {selectedUser.parent_name}
                    </p>
                    <p>
                      <strong>Parent Contact:</strong>{" "}
                      {selectedUser.parent_number}
                    </p>
                    <p>
                      <strong>Relationship:</strong>{" "}
                      {selectedUser.parent_relationship}
                    </p>
                  </div>
                </div>

                {/* Metadata */}
                <div className="bg-gray-50 p-4 rounded-lg shadow text-sm">
                  <p>
                    <strong>Created At:</strong>{" "}
                    {new Date(selectedUser.created_at).toDateString()}
                  </p>
                  <p>
                    <strong>Updated At:</strong>{" "}
                    {new Date(selectedUser.updated_at).toDateString()}
                  </p>
                </div>
              </div>
              {/* Parent Details */}
              <div className="bg-gray-100 p-4 rounded-lg shadow">
                <h3 className="text-2xl font-bold mb-3">Payment Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <p>
                    <strong>Total Amount:</strong> {selectedUser.total_amount}
                  </p>
                  <p>
                    <strong>Amount Paid:</strong>{" "}
                    {selectedUser.amount_paid}
                  </p>

                  <p>
                    <strong>Payment Method:</strong>{" "}
                    {selectedUser.payment_method}
                  </p>
                  <p>
                    <strong>Billing Date :</strong>{" "}
                    {new Date(selectedUser.billing_date).toDateString()}
                  </p>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button color="gray" onClick={() => setShowDetailsModal(false)}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </div>
      <Modal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this admission ?{" "}
            </h3>
            <div className="flex justify-center gap-7">
              <Button onClick={handleDeleteUserAdmission} color="failure">
                Yes, I am sure
              </Button>
              <Button color="gray" onClick={() => setShowDeleteModal(false)}>
                No, Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
