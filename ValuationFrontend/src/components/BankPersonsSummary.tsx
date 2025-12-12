import React, { useMemo, useState } from "react";
import type { Case } from "../types";

export default function BankPersonsSummary({ cases }: { cases: Case[] }) {
  const bankPersons = useMemo(() => {
    const set = new Set<string>();
    cases.forEach((c) => {
      if (c.bankPersonName && c.bankPersonName.trim() !== "") {
        set.add(c.bankPersonName);
      }
    });
    return Array.from(set);
  }, [cases]);

  const [person, setPerson] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [search, setSearch] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("all");

  const personCases = person
    ? cases.filter((c) => c.bankPersonName === person)
    : [];

  const dateFiltered = personCases.filter((c) => {
    if (!startDate || !endDate) return true;
    const d = new Date(c.date);
    return d >= new Date(startDate) && d <= new Date(endDate);
  });

  const filteredCases = dateFiltered.filter((c) => {
    const term = search.toLowerCase();
    const matchSearch =
      c.clientName?.toLowerCase().includes(term) ||
      String(c.srNo).includes(term);

    const matchStatus =
      paymentFilter === "all" || c.paymentStatus === paymentFilter;

    return matchSearch && matchStatus;
  });

  const totalCases = filteredCases.length;
  const totalPayment = filteredCases.reduce(
    (sum, c) => sum + Number(c.valuationPayment || 0),
    0
  );

  const paymentDone = filteredCases.reduce((sum, c) => {
    return c.paymentStatus === "Paid"
      ? sum + Number(c.valuationPayment || 0)
      : sum;
  }, 0);

  const pending = totalPayment - paymentDone;

  return (
    <div className="space-y-6">

      {/* HEADING SECTION */}
      <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-[#0052CC]/5 to-[#00C2A8]/5">
  <h2 className="text-gray-900 text-xl font-semibold !text-2xl">
     Bank Person Summary
  </h2>
  <p className="text-gray-600 mt-1">
    View cases and payment details for bank partners
  </p>
</div>


      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">

        {/* BANK PERSON DROPDOWN */}
        <div className="mb-6">
          <label className="block text-gray-600 text-sm mb-1">
            Select Bank Person
          </label>
          <select
            value={person}
            onChange={(e) => setPerson(e.target.value)}
            className="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-[#0052CC]"
          >
            <option value="">Choose Bank Person</option>
            {bankPersons.map((bp) => (
              <option key={bp} value={bp}>
                {bp}
              </option>
            ))}
          </select>
        </div>

        {!person ? (
          <p className="text-gray-500">Select a bank person to view summary.</p>
        ) : (
          <>
            {/* SUMMARY CARDS — 2 IN A ROW */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">

              <div className="p-5 rounded-xl shadow bg-gradient-to-r from-[#0052CC] to-[#00C2A8] text-white text-center">
  <p className="text-sm opacity-90">Total Cases</p>
  <h3 className="text-2xl font-semibold">{totalCases}</h3>
</div>


             <div className="p-5 rounded-xl shadow bg-gradient-to-r from-[#0052CC] to-[#00C2A8] text-white text-center">
  <p className="text-sm opacity-90">Total Payment</p>
  <h3 className="text-2xl font-semibold">{totalPayment}</h3>
</div>


              <div className="p-5 rounded-xl shadow bg-gradient-to-r from-[#0052CC] to-[#00C2A8] text-white text-center">
  <p className="text-sm opacity-90">Payment Done</p>
  <h3 className="text-2xl font-semibold">{paymentDone}</h3>
</div>

             <div className="p-5 rounded-xl shadow bg-gradient-to-r from-[#0052CC] to-[#00C2A8] text-white text-center">
  <p className="text-sm opacity-90">Pending</p>
  <h3 className="text-2xl font-semibold">{pending}</h3>
</div>

            </div>

            {/* FILTERS — ONE LINE */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">

              <div>
                <label className="block text-sm mb-1 text-gray-600">Search</label>
                <input
                  type="text"
                  placeholder="Client or Case ID"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-[#0052CC]"
                />
              </div>

              <div>
                <label className="block text-sm mb-1 text-gray-600">
                  Payment Status
                </label>
                <select
                  value={paymentFilter}
                  onChange={(e) => setPaymentFilter(e.target.value)}
                  className="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-[#0052CC]"
                >
                  <option value="all">All</option>
                  <option value="Paid">Paid</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>

              {/* DATE RANGE */}
              <div>
                <label className="block text-sm mb-1 text-gray-600">Date Range</label>
                <div className="flex gap-2">
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-1/2 p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-[#0052CC]"
                  />
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-1/2 p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-[#0052CC]"
                  />
                </div>
              </div>

            </div>

            {/* TABLE WITH DATE COLUMN */}
            <div className="overflow-hidden border rounded-xl shadow">
              <table className="w-full text-sm">
                <thead className="bg-gradient-to-r from-[#0052CC] to-[#00C2A8] text-white">
                  <tr>
                    <th className="p-3">Case ID</th>
                                        <th className="p-3">Date</th>
                    <th className="p-3">Client</th>
                    <th className="p-3">Payment</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredCases.map((c) => (
                    <tr key={c.id} className="hover:bg-gray-50 border-b">
                      <td className="p-3">{c.srNo}</td>
                      <td className="p-3">{c.date}</td>
                      <td className="p-3">{c.clientName}</td>
                      <td className="p-3">₹{c.valuationPayment}</td>
                      <td className="p-3">
                        {c.paymentStatus === "Paid" ? (
                          <span className="text-green-600 font-semibold">Paid</span>
                        ) : (
                          <span className="text-red-600 font-semibold">Pending</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>

          </>
        )}
      </div>
    </div>
  );
}
