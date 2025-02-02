import { Table, Modal, Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function Admissions() {
  const { adminDetails } = useSelector((state) => state.admin);
  const [admissions, setAdmissions] = useState([]);
  const [totalAdmissions, setTotalAdmissions] = useState(0);
  const [lstMonthAdmissions, setLstMonthAdmissions] = useState(0);
  const [showMore, setShowMore] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [admissionIdToDelete, setAdmissionIdToDelete] = useState(null);

  useEffect(() => {
    const fetchAllAdmissions = async () => {
      if (adminDetails.isAdmin) {
        try {
          const res = await fetch(`/api/backend2/getadmissions`);
          const data = await res.json();
          console.log("API is working", data);
          if (!res.ok) {
            console.error(data.message || "Failed to fetch users.");
          } else {
            setAdmissions(data.admissions);
            setTotalAdmissions(data.totalAdmissions);
            setLstMonthAdmissions(data.lstMonthAdmissions);
            if (data.admissions.length < 9) {
              setShowMore(false);
            }
          }
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      }
    };
    fetchAllAdmissions();
  }, []);

  const handleShowMore = async () => {
    const startIndex = admissions.length;
    try {
      const res = await fetch(
        `/api/backend2/getadmissions?username=${adminDetails.isAdmin}&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setAdmissions((prev) => [...prev, ...data.admissions]);
        if (data.admissions.length >= 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteAdmission = async () => {
    try {
      const res = await fetch(
        `/api/backend2/deleteadmission/${admissionIdToDelete}`,
        {
          method: "DELETE",
        }
      );
      // const data = await res.json();
      // console.log(data);
      if (res.ok) {
        setAdmissions((prev) =>
          prev.filter((admission) => admission._id !== admissionIdToDelete)
        );
        setShowModal(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="table-auto mt-10 mx-auto p-2 scrollbar scrollbar-track-blue-900 scrollbar-thumb-slate-700">
        <div className="flex gap-7 justify-center mb-6 ml-10">
          <div className="flex p-6 gap-4 items-center bg-gradient-to-r from-blue-500 to-teal-400 rounded-lg shadow-lg">
            <h4 className="text-white font-medium text-lg">
              Total Admissions:
            </h4>
            <p className="text-3xl text-white font-semibold font-tw-cen">
              {totalAdmissions}
            </p>
          </div>

          <div className="flex p-6 gap-4 items-center bg-gradient-to-r from-green-500 to-teal-400 rounded-lg shadow-lg">
            <h4 className="text-white font-medium text-lg">
              Last 30 Days Admissions
            </h4>
            <p className="text-3xl text-white text-center font-semibold font-tw-cen">
              {lstMonthAdmissions}
            </p>
          </div>
        </div>

        {admissions.length > 0 ? (
          <>
            <Table key={admissions._id} hoverable className="">
              <Table.Head>
                <Table.HeadCell>Created At</Table.HeadCell>
                <Table.HeadCell>Name</Table.HeadCell>
                <Table.HeadCell>Parents Name</Table.HeadCell>
                <Table.HeadCell>email</Table.HeadCell>
                <Table.HeadCell>Number</Table.HeadCell>
                <Table.HeadCell>Address</Table.HeadCell>
                <Table.HeadCell>Course Name</Table.HeadCell>
                <Table.HeadCell>Delete</Table.HeadCell>
              </Table.Head>

              {admissions.map((admission) => {
                return (
                  <Table.Body className="divide-y" key={admission._id}>
                    <Table.Row className="bg-white hover:bg-gray-100">
                      <Table.Cell>
                        {new Date(admission.createdAt).toDateString()}
                      </Table.Cell>
                      <Table.Cell className="font-medium text-blue-950">
                        {admission.name}
                      </Table.Cell>
                      <Table.Cell>{admission.parentName}</Table.Cell>
                      <Table.Cell>{admission.email}</Table.Cell>
                      <Table.Cell>{admission.number}</Table.Cell>
                      <Table.Cell>{admission.address}</Table.Cell>
                      <Table.Cell>{admission.courseName}</Table.Cell>
                      <Table.Cell>
                        <span
                          onClick={() => {
                            setShowModal(true);
                            setAdmissionIdToDelete(admission._id);
                          }}
                          className="font-medium text-red-600 hover:underline cursor-pointer"
                        >
                          Delete
                        </span>
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                );
              })}
            </Table>
            {showMore && (
              <button
                onClick={handleShowMore}
                className="w-full text-teal-700 text-center text-sm py-7"
              >
                Show More
              </button>
            )}
          </>
        ) : (
          <p className="text-center text-3xl p-7">
            There is not admissions yet !
          </p>
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
                Are you sure you want to delete this admission ?{" "}
              </h3>
              <div className="flex justify-center gap-7">
                <Button onClick={handleDeleteAdmission} color="failure">
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
    </>
  );
}
