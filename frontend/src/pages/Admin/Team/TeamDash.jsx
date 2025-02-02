import { Button, Modal, Table } from "flowbite-react";
import { useState } from "react";
import { FaFacebook, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useSelector } from "react-redux";
import { useTeams } from "../../../store/ContextAPI";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function TeamDash() {
  const { adminDetails } = useSelector((state) => state.admin);
  const { teams, setTeams } = useTeams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);

  const handleViewDetails = (team) => {
    setSelectedTeam(team);
    setShowViewModal(true);
  };

  const [teamIdTodelete, setTeamIdTodelete] = useState(null);

  const handleDeleteTeamMember = async () => {
    try {
      const res = await fetch(
        `api/backend9/delete-teamMember/${teamIdTodelete}`,
        {
          method: "DELETE",
        }
      );
      if (res.ok) {
        setTeams((prev) => prev.filter((team) => team._id !== teamIdTodelete));
        setShowModal(false);
        toast.success("Team Member Deleted Successfully!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500  ">
      {adminDetails?.isAdmin && teams.length > 0 ? (
        <Table hoverable className="shadow-md">
          <Table.Head>
            <Table.HeadCell>Image</Table.HeadCell>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Number</Table.HeadCell>
            <Table.HeadCell>View</Table.HeadCell>
            <Table.HeadCell>Edit</Table.HeadCell>
            <Table.HeadCell>Delete</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {teams.map((user) => (
              <Table.Row
                key={user._id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800 "
              >
                <Table.Cell>
                  <img
                    src={user.image}
                    alt={user.name}
                    className="w-10 h-10 object-cover bg-gray-500  rounded-full"
                  />
                </Table.Cell>
                <Table.Cell>{user.name}</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>{user.phoneNumber}</Table.Cell>
                <Table.Cell>
                  <span
                    onClick={() => handleViewDetails(user)}
                    className="bg-blue-950 rounded-full p-2 text-white cursor-pointer"
                  >
                    View Details
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <span
                    onClick={() => navigate(`/update-teamMember/${user._id}`)}
                    className="hover:underline text-blue-800 cursor-pointer"
                  >
                    Edit
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <span
                    onClick={() => {
                      setShowModal(true);
                      setTeamIdTodelete(user._id);
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
          There are no team yet !
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
              <Button color="failure" onClick={handleDeleteTeamMember}>
                Yes, I am sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* second modal */}
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
            <div className="max-w-lg mx-auto p-3  bg-white  rounded-xl text-center">
              <img
                src={selectedTeam.image}
                alt="blog-image"
                className="mx-auto rounded-xl"
              />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {selectedTeam.name}
              </h3>
              <p className="text-gray-500 text-sm mb-4">
                ({selectedTeam.department})
              </p>

              <div className="p-4 bg-gray-100 rounded-lg shadow-sm">
                <div className="grid grid-cols-1 gap-3 text-left">
                  <p>
                    <strong className="text-gray-700">Bio:</strong>{" "}
                    {selectedTeam.bio}
                  </p>
                  <p>
                    <strong className="text-gray-700">Description:</strong>{" "}
                    {selectedTeam.description}
                  </p>
                  <p>
                    <strong className="text-gray-700">Email:</strong>{" "}
                    {selectedTeam.email}
                  </p>
                  <p>
                    <strong className="text-gray-700">Contact:</strong>{" "}
                    {selectedTeam.phoneNumber}
                  </p>
                </div>
              </div>

              {/* Social Media Icons */}
              <h3 className="text-xl font-semibold">Social Media icons</h3>
              <div className="flex justify-center gap-4 mt-4">
                {selectedTeam.socialMedia?.facebook && (
                  <a
                    href={selectedTeam.socialMedia.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 transition"
                  >
                    <FaFacebook size={28} />
                  </a>
                )}
                {selectedTeam.socialMedia?.twitter && (
                  <a
                    href={selectedTeam.socialMedia.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-600 transition"
                  >
                    <FaTwitter size={28} />
                  </a>
                )}
                {selectedTeam.socialMedia?.linkedin && (
                  <a
                    href={selectedTeam.socialMedia.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 hover:text-blue-900 transition"
                  >
                    <FaLinkedin size={28} />
                  </a>
                )}
                {selectedTeam.socialMedia?.github && (
                  <a
                    href={selectedTeam.socialMedia.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-900 hover:text-gray-600 transition"
                  >
                    <FaGithub size={28} />
                  </a>
                )}
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}
