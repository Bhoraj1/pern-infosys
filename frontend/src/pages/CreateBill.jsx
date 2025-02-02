import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Card, Table, Button } from "flowbite-react";
import { HiCreditCard, HiPrinter } from "react-icons/hi";
import toast from "react-hot-toast";
import { toPng } from "html-to-image";
export default function CreateBill() {
  const getCurrentDate = () => {
    const date = new Date();
    return date.toLocaleDateString();
  };
  const location = useLocation();
  const billRef = useRef(null);

  const { selectedStudent } = location.state || {};
  useEffect(() => {
    // console.log("Received formData:", selectedStudent);
  }, [selectedStudent]);

  const handleDownload = () => {
    if (!billRef.current) {
      toast.error("Failed to generate the image!");
      return;
    }

    toPng(billRef.current, { pixelRatio: 7 })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = `Next-Infosys-Bill-${Date.now()}.png`;
        link.click();
        toast.success("Bill PNG was successfully downloaded!");
      })
      .catch((error) => {
        console.error("Error generating image:", error);
        toast.error("An error occurred while generating the image.");
      });
  };

  return (
    <div className="max-w-lg mx-auto my-10 ">
      {/* Ref points to the content to print */}
      <div ref={billRef} className=" ">
        <Card className="">
          <div className=" flex justify-between items-center mb-4">
            <h2 className="text-2xl p-2 text-black font-extrabold ">
              <h1 className="ml-11">Next Infosys Pvt.Ltd</h1>
              🧾 Student Payment Bill
            </h2>
          </div>
          <p className="flex justify-center items-center">
            {new Date(getCurrentDate()).toDateString()}
          </p>
          <div className="mb-6 flex justify-center items-center">
            <Table hoverable={true}>
              <Table.Body>
                <Table.Row>
                  <Table.Cell className="font-semibold">
                    Student Name
                  </Table.Cell>
                  <Table.Cell> {selectedStudent?.name}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell className="font-semibold">
                    Student Number
                  </Table.Cell>
                  <Table.Cell> {selectedStudent?.phoneNumber}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell className="font-semibold">Course Name</Table.Cell>
                  <Table.Cell> {selectedStudent?.courseName}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell className="font-semibold">Email</Table.Cell>
                  <Table.Cell className="text-blue-500 underline">
                    {selectedStudent?.email}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell className="font-semibold">
                    Total Amount
                  </Table.Cell>
                  <Table.Cell className="text-green-600 font-bold">
                    $ {selectedStudent?.totalAmount}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell className="font-semibold">Duration</Table.Cell>
                  <Table.Cell> {selectedStudent?.courseDuration}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell className="font-semibold">
                    Payment Method
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex items-center gap-2">
                      <HiCreditCard className="text-gray-500" />
                      {selectedStudent?.paymentMethod}
                    </div>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>
        </Card>
      </div>

      {/* Print Button */}
      <div className="flex justify-end mt-4">
        <Button
          onClick={handleDownload}
          className="bg-blue-950"
          size="lg"
          icon={HiPrinter}
        >
          Download Bill
        </Button>
      </div>
    </div>
  );
}
