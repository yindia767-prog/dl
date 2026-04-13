"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import UPIPayment from "@/components/UPIPayment";
import PaymentScreenshotUpload from "@/components/PaymentScreenshotUpload";

interface Props {
  application: any;
  amount: number;
}

export default function PaymentContainer({ application, amount }: Props) {
  const [hasPaid, setHasPaid] = useState(false);

  return (
    <div className="w-full max-w-md">
      <AnimatePresence mode="wait">
        {!hasPaid ? (
          <motion.div
            key="payment"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="bg-[#005dbe] text-white p-6 rounded-t-3xl shadow-lg">
              <h3 className="text-lg font-bold">Application Summary</h3>
              <div className="flex justify-between items-center mt-2 opacity-90">
                <span className="text-sm">{application.licence_type}</span>
                <span className="font-bold text-xl">₹{amount}</span>
              </div>
            </div>
            <UPIPayment 
              amount={amount} 
              applicationId={application.id.toString()} 
              onStepComplete={() => setHasPaid(true)}
            />
          </motion.div>
        ) : (
          <motion.div
            key="upload"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <PaymentScreenshotUpload applicationId={application.id.toString()} />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="mt-8 text-center text-xs text-gray-400">
        Application ID: {application.id} | Service: {application.licence_type}
      </div>
    </div>
  );
}
