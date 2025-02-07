import { Button, Card, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

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

  const handleSearch = () => {
    if (searchKey.trim() === "") {
      toast.error("Please enter a search term");
      return;
    }

    fetch(`/api/backend4/getStudentAdmission?searchKey=${searchKey}`)
      .then((res) => res.json())
      .then((data) => {
        setStudents(data.admissions);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to fetch students");
      });
  };

  const handleStudentSelect = (student) => {
    setSelectedStudent(student);
    setStudents([]);
  };

  const remainingAmount =
    selectedStudent.total_amount - selectedStudent.amount_paid;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `/api/backend4/update-bill/${selectedStudent.id}`,
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
      }
      navigate(`/dashboard?tab=bill`, { state: { selectedStudent } });
    } catch (error) {
      toast.error("Failed to update Bill");
    }
  };

  return (
    <>
      <div className="container flex flex-col">
        <form
          className="flex justify-center items-center mt-7 mx-auto"
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          <TextInput
            type="text"
            placeholder="Search by Number....."
            value={searchKey}
            onChange={handleInputChange}
            className="inline w-56 lg:inline md:w-[540px] h-2 text-lg"
          />
          <Button type="submit" className="ml-2 mt-8 bg-blue-950">
            <AiOutlineSearch />
          </Button>
        </form>

        {searchKey && students.length > 0 ? (
          <div className="flex flex-col items-center justify-center">
            <ul className="flex flex-col justify-center items-center w-full max-w-xl p-4 md:block">
              {students
                .filter((item) => {
                  return searchKey.toLowerCase() === ""
                    ? item
                    : item.student_number
                        .toLowerCase()
                        .includes(searchKey.toLowerCase());
                })
                .map((student) => (
                  <li
                    key={student.id}
                    className="ml-28 sm:ml-0 cursor-pointer p-2 hover:bg-gray-200 hover:rounded-lg w-full"
                    onClick={() => handleStudentSelect(student)}
                  >
                    {student.student_number} - {student.student_name}
                  </li>
                ))}
            </ul>
          </div>
        ) : (
          <div className="flex justify-center items-center w-full">
            <p className="text-lg text-gray-600 m-3">No student found.</p>
          </div>
        )}

        <div className="flex justify-center pt-7">
          <Card className="flex flex-col gap-4 bg-white rounded-md shadow-md lg:w-[600px] w-[300px] md:ml-14">
            <form onSubmit={handleSubmit}>
              <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-4 lg:w-[550px]">
                <div>
                  <Label htmlFor="name" value="Name" />
                  <TextInput
                    id="student_name"
                    type="text"
                    placeholder="student Name"
                    required
                    value={selectedStudent?.student_name || ""}
                    onChange={handleFormChange}
                  />
                </div>
                <div>
                  <Label htmlFor="PhoneNumber" value="Phone Number" />
                  <TextInput
                    id="student_number"
                    type="number"
                    placeholder="student Number"
                    required
                    value={selectedStudent?.student_number || ""}
                    onChange={handleFormChange}
                  />
                </div>
                <div>
                  <Label htmlFor="email1" value="Email Address" />
                  <TextInput
                    id="email1"
                    type="email"
                    placeholder="email address"
                    required
                    value={selectedStudent?.email || ""}
                    onChange={handleFormChange}
                  />
                </div>
                <div>
                  <Label htmlFor="CourseDuration" value="Duration" />
                  <TextInput
                    id="course_duration"
                    type="text"
                    placeholder="Course Duration"
                    required
                    value={selectedStudent?.course_duration || ""}
                    onChange={handleFormChange}
                  />
                </div>

                <div>
                  <Label htmlFor="PaymentMethod" value="Payment Method" />
                  <TextInput
                    type="text"
                    id="payment_method"
                    placeholder="Payment Method"
                    value={selectedStudent.payment_method || ""}
                    onChange={handleFormChange}
                  />
                </div>
                <div>
                  <Label htmlFor="amountPaid" value="Amount Paid" />
                  <TextInput
                    id="amount_paid"
                    type="number"
                    placeholder="Amount paid"
                    required
                    value={selectedStudent.amount_paid || ""}
                    onChange={handleFormChange}
                  />
                  {selectedStudent.amount_paid != null && (
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
