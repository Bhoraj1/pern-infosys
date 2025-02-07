import { Table, Modal, Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function DashUsers() {
  const { adminDetails } = useSelector((state) => state.admin);
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [lstMonthUsers, setLstMonthUsers] = useState(0);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userIdTodelete, setUserIdTodelete] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      if (adminDetails.user.isAdmin) {
        try {
          const res = await fetch(`/api/backend/getinquirys`);
          const data = await res.json();
          if (!res.ok) {
            console.error(data.message || "Failed to fetch users.");
          } else {
            setUsers(data.inquarys);
            setTotalUsers(data.totalUsers);
            setLstMonthUsers(data.lstMonthUsers);
            if (data.inquarys.length < 9) {
              setShowMore(false);
            }
          }
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      }
    };
    fetchUsers();
  }, []);

  const handleShowMore = async () => {
    const startIndex = users.length;
    try {
      const res = await fetch(
        `/api/backend/getinquirys?username=${adminDetails.isAdmin}&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => [...prev, ...data.users]);
        if (data.users.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteInquiry = async () => {
    try {
      const res = await fetch(`/api/backend/deleteInquiry/${userIdTodelete}`, {
        method: "DELETE",
      });
      // const data = await res.json();
      if (res.ok) {
        setUsers((prev) => prev.filter((user) => user.id !== userIdTodelete));
        setShowModal(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="table-auto mt-7 mx-auto p-2 overflow-x-scroll md:overflow-x-hidden scrollbar scrollbar-track-gray-400 scrollbar-thumb-slate-700">
        <div className="flex gap-7 justify-center mb-6">
          <div className="flex p-6 gap-4 items-center bg-gradient-to-r from-blue-500 to-teal-400 rounded-lg shadow-lg">
            <h4 className="text-white font-medium text-lg">Total Inquiries:</h4>
            <p className="text-3xl text-white font-semibold font-tw-cen">
              {totalUsers}
            </p>
          </div>

          <div className="flex p-6 gap-4 items-center bg-gradient-to-r from-green-500 to-teal-400 rounded-lg shadow-lg">
            <h4 className="text-white font-medium text-lg">
              Last 30 Days Inquiries:
            </h4>
            <p className="text-3xl text-white text-center font-semibold font-tw-cen">
              {lstMonthUsers}
            </p>
          </div>
        </div>

        {users.length > 0 ? (
          <>
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell>Inquiry Date</Table.HeadCell>
                <Table.HeadCell>Name</Table.HeadCell>
                <Table.HeadCell>Email</Table.HeadCell>
                <Table.HeadCell>Number</Table.HeadCell>
                <Table.HeadCell>Services</Table.HeadCell>
                <Table.HeadCell>Message</Table.HeadCell>
                <Table.HeadCell>Delete</Table.HeadCell>
              </Table.Head>

              {users.map((user) => {
                return (
                  <>
                    <Table.Body key={user.id} className="divide-y">
                      <Table.Row className="bg-white hover:bg-gray-100">
                        <Table.Cell>
                          {new Date(user.createdAt).toDateString()}
                        </Table.Cell>
                        <Table.Cell className="font-medium text-blue-950">
                          {user.name}
                        </Table.Cell>
                        <Table.Cell>{user.email}</Table.Cell>
                        <Table.Cell>{user.number}</Table.Cell>
                        <Table.Cell>{user.services}</Table.Cell>
                        <Table.Cell>{user.message}</Table.Cell>
                        <Table.Cell>
                          <span
                            onClick={() => {
                              setShowModal(true);
                              setUserIdTodelete(user.id);
                            }}
                            className="font-medium text-red-600 hover:underline cursor-pointer"
                          >
                            Delete
                          </span>
                        </Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </>
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
          <p className="text-center text-3xl p-7 ">
            There is not Inquiry users yet !
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
                Are you sure you want to delete this inquiry ?{" "}
              </h3>
              <div className="flex justify-center gap-7">
                <Button color="failure" onClick={handleDeleteInquiry}>
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
