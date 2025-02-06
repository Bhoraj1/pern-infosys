import React, { useState, useRef, useEffect } from "react";
import { Button, Label, TextInput, Card, Select } from "flowbite-react";
import { useReactToPrint } from "react-to-print";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function AdmissionBill() {
  const location = useLocation();
  const { formData } = location.state || {};
  const navigate = useNavigate();
  useEffect(() => {
    // console.log("Received formData:", formData);
  }, [formData]);
  const [billingData, setBillingData] = useState({
    student_name: formData?.student_name || "",
    student_number: formData?.contact_number || "",
    payment_method: "",
    amount: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const contentRef = useRef(null);

  const handleNextClick = () => {
    navigate("/dashboard?tab=student-dahsboard");
  };

  const handleInputChange = (e) => {
    setBillingData({ ...billingData, [e.target.id]: e.target.value });
  };

  const fullAmount = parseFloat(formData?.total_amount || 0);
  const paidAmount = parseFloat(billingData.amount || 0);
  const remainingAmount = fullAmount - paidAmount;
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedFormData = {
      ...formData,
      student_name: billingData.student_name,
      student_number: billingData.student_number,
      payment_method: billingData.payment_method,
      amount_paid: billingData.amount,
      remaining_amount: Math.max(remainingAmount, 0),
      billing_date: new Date().toLocaleDateString(),
    };
    try {
      const res = await fetch("/api/backend4/student-admission", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFormData),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Billing data saved successfully");
        setSubmitted(true);
      } else {
        toast.error("Error saving billing data:", data);
        setSubmitted(false);
      }
    } catch (error) {
      console.error("Error submitting billing data:", error);
    }
  };

  const reactToPrintFn = useReactToPrint({
    contentRef,
  });

  const getCurrentDate = () => {
    const date = new Date();
    return date.toLocaleDateString();
  };

  return (
    <div className="container flex justify-center items-center">
      <Card className="shadow-lg w-[600px] p-7">
        <h1 className="text-xl font-bold text-center">Billing Information</h1>
        {!submitted ? (
          <form onSubmit={handleSubmit}>
            <div
              className={`grid grid-cols-1 gap-4 md:grid-cols-2 ${
                !submitted && "mt-4"
              }`}
            >
              {/* Student Name */}
              <div>
                <Label value="Student Name" />
                <TextInput
                  id="studentName"
                  name="studentName"
                  type="text"
                  value={billingData.student_name}
                  placeholder="Enter student name"
                  required
                  onChange={handleInputChange}
                />
              </div>

              {/* Student Number */}
              <div>
                <Label value="Student Number" />
                <TextInput
                  id="student_number"
                  name="student_number"
                  type="tel"
                  value={billingData.student_number}
                  placeholder="Enter student number"
                  required
                  onChange={handleInputChange}
                />
              </div>

              {/* Payment Method */}
              <div>
                <Label htmlFor="paymentMethod" value="Method of Payment" />
                <Select
                  id="payment_method"
                  name="payment_method"
                  required
                  onChange={handleInputChange}
                >
                  <option value="">Select Payment Method</option>
                  <option value="cash">Cash</option>
                  <option value="khalti">Khalti</option>
                  <option value="phonePay">PhonePay</option>
                  <option value="eSewa">eSewa</option>
                </Select>
              </div>

              {/* Amount */}
              <div>
                <Label value="Paid Amount" />
                <TextInput
                  id="amount"
                  name="amount"
                  type="number"
                  placeholder="Enter amount"
                  required
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-4 text-center">
              <Button type="submit">Submit Payment</Button>
            </div>
          </form>
        ) : (
          <div
            ref={contentRef}
            className="p-8 rounded-lg w-full max-w-lg mx-auto bg-white print:w-[250px] print:p-2 print:text-xs print:font-normal print:leading-tight print:mx-auto print:my-4 print:shadow-none"
          >
            <h2 className="text-xl font-bold mb-4 text-center">
              Next Infosys Pvt.Ltd Payment Bill
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <p>
                <strong>Billing Date:</strong> {getCurrentDate()}
              </p>
              <p>
                <strong>Student Name:</strong> {billingData.student_name}
              </p>
              <p>
                <strong>Student Number:</strong> {billingData.student_number}
              </p>
              <p>
                <strong>Method of Payment:</strong> {billingData.payment_method}
              </p>
              <p>
                <strong>Amount Paid:</strong> NPR {billingData.amount}
              </p>
            </div>

            {/* Total and Remaining Amount */}
            <div className="flex justify-between items-center mt-8 border-t pt-4 shadow-lg rounded-lg">
              <div className="w-1/2 p-4 bg-gray-100 rounded-lg">
                <h3 className="font-semibold text-lg">Total Amount</h3>
                <p className="text-xl font-bold text-gray-800">
                  NPR {fullAmount}
                </p>
              </div>

              <div className="w-1/2 p-4 bg-gray-100 rounded-lg">
                <h3 className="font-semibold text-lg">Remaining Amount</h3>
                <p className="text-xl font-bold text-gray-800">
                  NPR {remainingAmount > 0 ? remainingAmount : "0"}
                </p>
              </div>
            </div>

            {/* Print Button */}
            <div className="flex pt-7 text-center justify-between">
              <Button
                className="bg-red-500 hover:bg-red-600 text-white print:hidden"
                onClick={reactToPrintFn}
              >
                Print Billing Details
              </Button>
              <Button onClick={handleNextClick}>Next</Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
