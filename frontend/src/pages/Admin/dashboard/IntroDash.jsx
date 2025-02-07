import React from "react";
import {
  FaDollarSign,
  FaUserAlt,
  FaUsers,
  FaRegMoneyBillAlt,
} from "react-icons/fa";

export default function IntroDash() {
  return (
    <div className="mt-12">
      <div className="mb-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {/* Today's Money */}
        <div className="relative flex flex-col bg-white text-gray-700 shadow-md rounded-xl p-4">
          <div className="absolute -mt-4 grid h-16 w-16 place-items-center bg-gradient-to-tr from-blue-600 to-blue-400 text-white rounded-xl mx-4">
            <FaDollarSign className="w-6 h-6" />
          </div>
          <div className="text-right">
            <p className="text-sm text-blue-gray-600">Today's Money</p>
            <h4 className="text-2xl font-semibold text-blue-gray-900">$53k</h4>
          </div>
          <div className="border-t m-3 border-blue-gray-50 p-4">
            <p className="text-base text-blue-gray-600">
              <strong className="text-green-500">+55%</strong> than last week
            </p>
          </div>
        </div>

        {/* Today's Users */}
        <div className="relative flex flex-col bg-white text-gray-700 shadow-md rounded-xl p-4">
          <div className="absolute -mt-4 grid h-16 w-16 place-items-center bg-gradient-to-tr from-pink-600 to-pink-400 text-white rounded-xl mx-4">
            <FaUserAlt className="w-6 h-6" />
          </div>
          <div className="text-right">
            <p className="text-sm text-blue-gray-600">Today's Users</p>
            <h4 className="text-2xl font-semibold text-blue-gray-900">2,300</h4>
          </div>
          <div className="border-t m-3 border-blue-gray-50 p-4">
            <p className="text-base text-blue-gray-600">
              <strong className="text-green-500">+3%</strong> than last month
            </p>
          </div>
        </div>

        {/* New Clients */}
        <div className="relative flex flex-col bg-white text-gray-700 shadow-md rounded-xl p-4">
          <div className="absolute -mt-4 grid h-16 w-16 place-items-center bg-gradient-to-tr from-green-600 to-green-400 text-white rounded-xl mx-4">
            <FaUsers className="w-6 h-6" />
          </div>
          <div className="text-right">
            <p className="text-sm text-blue-gray-600">New Clients</p>
            <h4 className="text-2xl font-semibold text-blue-gray-900">3,462</h4>
          </div>
          <div className="border-t m-3 border-blue-gray-50 p-4">
            <p className="text-base text-blue-gray-600">
              <strong className="text-red-500">-2%</strong> than yesterday
            </p>
          </div>
        </div>

        <div className="relative flex flex-col bg-white text-gray-700 shadow-md rounded-xl p-4">
          <div className="absolute -mt-4 grid h-16 w-16 place-items-center bg-gradient-to-tr from-orange-600 to-orange-400 text-white rounded-xl mx-4">
            <FaRegMoneyBillAlt className="w-6 h-6" />
          </div>
          <div className="text-right">
            <p className="text-sm text-blue-gray-600">Sales</p>
            <h4 className="text-2xl font-semibold text-blue-gray-900">
              $20,500
            </h4>
          </div>
          <div className="border-t m-3 border-blue-gray-50 p-4">
            <p className="text-base text-blue-gray-600">
              <strong className="text-green-500">+18%</strong> than last quarter
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
