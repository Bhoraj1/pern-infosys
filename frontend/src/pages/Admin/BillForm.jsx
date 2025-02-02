import { Button, Card, Label, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

// Debounce function to delay API requests
const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

export default function BillForm() {
  const navigate = useNavigate();
  const [searchKey, setSearchKey] = useState("");
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState({});
  const handleInputChange = (e) => {
    setSearchKey(e.target.value);
  };

  const handleFormChange = (e) => {
    setSelectedStudent({ ...selectedStudent, [e.target.id]: e.target.value });
  };
  // console.log(selectedStudent);

  const fetchStudents = async () => {
    try {
      const res = await fetch(`/api/backend5/search/${searchKey}`);
      const data = await res.json();
      // console.log(data);
      if (data) {
        setStudents(data);
      } else {
        setStudents(null);
        console.error("No student found.");
      }
    } catch (error) {
      setStudents(null);
      console.log(error);
    }
  };

  const debouncedFetchStudents = debounce(fetchStudents, 200);

  // Trigger search on every key press (debounced)
  useEffect(() => {
    debouncedFetchStudents(searchKey);
    // Clear students when searchKey is empty
    if (!searchKey) {
      setStudents([]);
    }
  }, [searchKey]);

  const handleStudentSelect = (student) => {
    setSelectedStudent(student);
    setStudents([]); // Clear the search results after selection
    // setSearchKey(""); // Clear the search input field
  };

  const remainingAmount =
    selectedStudent.totalAmount - selectedStudent.amountPaid;
  console.log(selectedStudent._id);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      navigate(`/dashboard?tab=bill`, { state: { selectedStudent } });
      const res = await fetch(
        `/api/backend5/update-bill/${selectedStudent._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selectedStudent),
        }
      );

      if (!res.ok) {
        toast.error("Failed to update bill");
        return;
      } else {
        toast.success("Bill Updated successfully");
        // navigate("/dashboard?tab=services");
      }
    } catch (error) {
      toast.error("Failed to update Bill");
    }
  };

  return (
    <>
      <div className=" container flex flex-col ">
        <form className="flex justify-center items-center m-16  mx-auto  ">
          <TextInput
            type="text"
            placeholder="Search by Number....."
            rightIcon={AiOutlineSearch}
            value={searchKey}
            onChange={handleInputChange}
            className="inline w-56 lg:inline md:w-[540px] h-3 text-lg "
          />
        </form>
        {/* Real-Time Results */}
        {students?.length > 0 ? (
          <div className="flex flex-col items-center  justify-center ">
            <ul className=" flex flex-col justify-center items-center w-full max-w-xl p-4 md:block">
              {students.map((student) => (
                <li
                  key={student._id}
                  className=" justify-center cursor-pointer p-2 hover:bg-gray-200 hover:rounded-lg w-full"
                  onClick={() => handleStudentSelect(student)}
                >
                  {student.phoneNumber} - {student.name}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="flex justify-center items-center w-full">
            <p className="text-lg text-gray-600">No student found.</p>
          </div>
        )}
        <div className="flex justify-center pt-7">
          <Card className="flex flex-col gap-4 bg-white rounded-md shadow-md lg:w-[600px] w-[300px] md:ml-14">
            <form onSubmit={handleSubmit}>
              <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-4 lg:w-[550px]">
                <div>
                  <Label htmlFor="name" value="Name" />
                  <TextInput
                    id="name"
                    type="text"
                    placeholder="student Name"
                    required
                    value={selectedStudent?.name}
                    onChange={handleFormChange}
                  />
                </div>
                <div>
                  <Label htmlFor="PhoneNumber" value="Phone Number" />
                  <TextInput
                    id="PhoneNumber"
                    type="number"
                    placeholder="student Number"
                    required
                    value={selectedStudent?.phoneNumber}
                    onChange={handleFormChange}
                  />
                </div>
                <div>
                  <Label htmlFor="email1" value="Email Address" />
                  <TextInput
                    id="email1"
                    type="email"
                    placeholder=" email address"
                    required
                    value={selectedStudent?.email}
                    onChange={handleFormChange}
                  />
                </div>
                <div>
                  <Label htmlFor="CourseDuration" value="Duration" />
                  <TextInput
                    id="courseDuration"
                    type="text"
                    placeholder=" Course Duration"
                    required
                    value={selectedStudent?.courseDuration}
                    onChange={handleFormChange}
                  />
                </div>

                <div>
                  <Label htmlFor="PaymentMethod" value="Payment Method" />
                  <TextInput
                    type="text"
                    id="paymentMethod"
                    placeholder="Payment Method"
                    value={selectedStudent.paymentMethod}
                    onChange={handleFormChange}
                  />
                </div>
                <div>
                  <Label htmlFor="amountPaid" value="Amount Paid" />
                  <TextInput
                    id="amountPaid"
                    type="number"
                    placeholder="Amount paid"
                    required
                    value={selectedStudent.amountPaid}
                    onChange={handleFormChange}
                  />
                  {selectedStudent.amountPaid != null && (
                    <p className="text-sm text-red-600">
                      Remaining Amount: {remainingAmount}
                    </p>
                  )}
                </div>
              </div>
              <Button type="submit" className="bg-blue-950 mt-3">
                Update a bill
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </>
  );
}
