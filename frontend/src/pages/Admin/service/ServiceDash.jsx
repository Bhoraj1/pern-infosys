import { useState } from "react";
import { Table, Button, Modal } from "flowbite-react";
import { useSelector } from "react-redux";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useServices } from "../../../store/ContextAPI";

export default function ServicesDash() {
  const { adminDetails } = useSelector((state) => state.admin);
  const { services, setServices } = useServices();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteServiceId, setDeleteServiceId] = useState("");
  const [selectedService, setSelectedService] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);

  const handleViewDetails = (service) => {
    setSelectedService(service);
    setShowViewModal(true);
  };

  const handleDeleteService = async () => {
    setShowDeleteModal(false);
    try {
      const res = await fetch(
        `/api/backend7/delete-service/${deleteServiceId}`,
        {
          method: "DELETE",
        }
      );
      if (!res.ok) {
        console.log("Error deleting service");
      } else {
        setServices((prev) =>
          prev.filter((service) => service.id !== deleteServiceId)
        );
        setShowDeleteModal(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center mt-7 ">
        <h1 className="text-3xl font-bold">Total Services</h1>
      </div>
      <div className="table-auto md:mx-auto p-2 scrollbar scrollbar-track-blue-900 scrollbar-thumb-slate-700 ">
        {adminDetails.user.isAdmin && services.length > 0 ? (
          <Table hoverable className="w-full">
            <Table.Head>
              <Table.HeadCell>Created At</Table.HeadCell>
              <Table.HeadCell>Title</Table.HeadCell>
              <Table.HeadCell>View</Table.HeadCell>
              <Table.HeadCell>Edit</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {services.map((service) => (
                <Table.Row key={service.id}>
                  <Table.Cell>
                    {new Date(service.created_at).toDateString()}
                  </Table.Cell>
                  <Table.Cell className="font-semibold text-black">
                    {service.title}
                  </Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => handleViewDetails(service)}
                      className="bg-blue-950 rounded-full p-1 sm:p-2 text-white cursor-pointer"
                    >
                      Details
                    </span>
                  </Table.Cell>
                  <Table.Cell className="font-medium text-teal-500 hover:underline cursor-pointer">
                    <Link to={`/update-service/${service.id}`}>Edit</Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Button
                      color="failure"
                      onClick={() => {
                        setDeleteServiceId(service.id);
                        setShowDeleteModal(true);
                      }}
                    >
                      Delete
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        ) : (
          <div className="text-center text-2xl mt-8 font-semibold text-black  dark:text-gray-400">
            No services available
          </div>
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
              Are you sure you want to delete this service ?{" "}
            </h3>
            <div className="flex justify-center gap-7">
              <Button onClick={handleDeleteService} color="failure">
                Yes, I am sure
              </Button>
              <Button color="gray" onClick={() => setShowDeleteModal(false)}>
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
          {selectedService && (
            <div className="max-w-lg mx-auto p-3  bg-white  rounded-xl text-center">
              <img
                src={selectedService.image}
                alt="blog-image"
                className="mx-auto"
              />
              <p className=" p-3 text-gray-800 mb-2">
                {selectedService.description}
              </p>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}
