import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "flowbite-react";
import { HiPrinter, HiDownload } from "react-icons/hi";
import { FaRegBuilding, FaPhoneAlt, FaGlobe } from "react-icons/fa";
import toast from "react-hot-toast";
import { toPng } from "html-to-image";
import { useReactToPrint } from "react-to-print";

export default function CreateBill() {
  const location = useLocation();
  const billRef = useRef(null);
  const { selectedStudent } = location.state || {};

  const invoiceNumber = `INV-${Math.floor(100000 + Math.random() * 900000)}`;
  const dueDate = new Date(
    new Date().setDate(new Date().getDate() + 7)
  ).toLocaleDateString();

  const reactToPrintFn = useReactToPrint({
    contentRef: billRef,
  });

  const handleDownload = () => {
    if (!billRef.current) {
      toast.error("Failed to generate the image!");
      return;
    }

    toPng(billRef.current, {
      pixelRatio: 3,
      backgroundColor: "#ffffff",
      style: { margin: "0 auto" },
    })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = `NextInfosys-Invoice-${invoiceNumber}.png`;
        link.click();
        toast.success("Invoice downloaded successfully!");
      })
      .catch((error) => {
        console.error("Error generating image:", error);
        toast.error("Error generating invoice image");
      });
  };

  return (
    <div className="max-w-3xl mx-auto my-10 p-4">
      <div
        ref={billRef}
        className="bg-white rounded-xl shadow-2xl p-8 border border-gray-100"
      >
        <div className="flex justify-between items-start mb-8 border-b-2 border-indigo-100 pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3 mb-4">
              <FaRegBuilding className="w-8 h-8 text-blue-950" />
              <h1 className="text-3xl font-bold text-blue-950">
                Next Infosys Pvt.Ltd
              </h1>
            </div>
            <div className="space-y-1 text-sm text-gray-600">
              <p className="flex items-center gap-2">
                <FaPhoneAlt className="w-4 h-4" />
                081534134
              </p>
              <p className="flex items-center gap-2">
                <FaGlobe className="w-4 h-4" />
                www.nextinfosys.com
              </p>
            </div>
          </div>

          <div className="text-right space-y-2">
            <h2 className="text-2xl font-bold text-[#F79F35]">INVOICE</h2>
            <div className="space-y-1 text-sm">
              <p className="font-semibold">Invoice #: {invoiceNumber}</p>
              <p>Issued: {new Date().toLocaleDateString()}</p>
              <p>Due: {dueDate}</p>
            </div>
          </div>
        </div>

        {/* Bill To Section */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Bill To:
            </h3>
            <p className="font-medium text-gray-700">
              {selectedStudent?.student_name}
            </p>
            <p className="text-gray-600">{selectedStudent?.email}</p>
            <p className="text-gray-600">{selectedStudent?.student_number}</p>
          </div>
          <div className="text-right">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Course Details
            </h3>
            <p className="text-gray-700">{selectedStudent?.course_type}</p>
            <p className="text-gray-600">{selectedStudent?.course_duration}</p>
          </div>
        </div>

        <div className="mb-8">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-indigo-50">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Description
                  </th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 text-gray-700">
                    {selectedStudent?.course_type} Course Fee
                  </td>
                  <td className="py-3 px-4 text-right text-gray-700">
                    ${selectedStudent?.total_amount}
                  </td>
                </tr>
                <tr className="bg-indigo-50">
                  <td className="py-3 px-4 font-semibold text-gray-800">
                    Total Due
                  </td>
                  <td className="py-3 px-4 text-right font-bold text-indigo-600">
                    ${selectedStudent?.amount_paid}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500 border-t border-gray-100 pt-4">
          <p>Thank you for choosing Next Infosys Pvt.Ltd</p>
          <p>Please make payment by the due date to avoid late fees</p>
        </div>
      </div>

      <div className="flex justify-end gap-4 mt-6">
        <Button
          onClick={handleDownload}
          gradientMonochrome="info"
          size="lg"
          className="shadow-lg hover:shadow-xl transition-shadow"
          icon={HiDownload}
        >
          Download Invoice
        </Button>

        <Button
          gradientMonochrome="cyan"
          size="lg"
          className="shadow-lg hover:shadow-xl transition-shadow"
          icon={HiPrinter}
          onClick={reactToPrintFn}
        >
          Print Invoice
        </Button>
      </div>
    </div>
  );
}
