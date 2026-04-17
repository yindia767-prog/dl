"use client";

import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { 
  CheckCircle2, 
  Smartphone, 
  ArrowRight, 
  ShieldCheck,
  CreditCard,
  Loader2,
  AlertCircle
} from "lucide-react";
import { motion } from "framer-motion";

interface PaymentPageProps {
  amount: number;
  applicationId: string;
  upiId?: string;
  onStepComplete?: () => void;
}

export default function UPIPayment({ amount = 375, applicationId, upiId = "paytm.s1yjhpw@pty", onStepComplete }: PaymentPageProps) {
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [status, setStatus] = useState<'pending' | 'verifying' | 'success'>('pending');

  // UPI Deep link format: upi://pay?pa=VPA&pn=NAME&am=AMOUNT&cu=CURRENCY&tn=NOTE
  const upiUrl = `upi://pay?pa=${upiId}&pn=DrivingLicence&am=${amount}&cu=INR&tn=DL-APP-${applicationId}`;

  useEffect(() => {
    if (timeLeft > 0 && status === 'pending') {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, status]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const verifyPayment = async () => {
    setStatus('verifying');
    // Mocking verification delay
    setTimeout(() => {
      setStatus('success');
    }, 3000);
  };

  if (status === 'success') {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center p-12 bg-white rounded-3xl shadow-xl text-center"
      >
        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 size={64} />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 font-ubuntu">Payment Successful!</h2>
        <p className="text-gray-600 mt-4 max-w-sm">
          Your application ID <strong>{applicationId}</strong> has been updated. 
          You will receive a confirmation email shortly.
        </p>
        <button 
          onClick={() => window.location.href = '/'}
          className="mt-10 px-8 py-3 bg-[#005dbe] text-white rounded-full font-bold hover:scale-105 transition-all"
        >
          Return to Home
        </button>
      </motion.div>
    );
  }

  return (
    <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
      <div className="bg-[#005dbe] p-6 text-white text-center">
        <h3 className="text-xl font-bold font-ubuntu">Scan & Pay via UPI</h3>
        <p className="text-blue-100 text-xs mt-1">Application ID: {applicationId}</p>
      </div>

      <div className="p-8 flex flex-col items-center">
        {/* Amount Display */}
        <div className="mb-8 text-center">
          <span className="text-gray-500 text-sm uppercase font-bold tracking-widest">Amount to Pay</span>
          <div className="text-4xl font-black text-gray-900 mt-1">₹{amount}.00</div>
        </div>

        {/* QR Code Container */}
        <div className="relative p-6 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200 group">
          <QRCodeSVG 
            value={upiUrl} 
            size={200}
            level="H"
            includeMargin={false}
          />
          <div className="absolute inset-0 flex items-center justify-center bg-white/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl backdrop-blur-[1px]">
             <Smartphone className="text-[#005dbe] animate-bounce" size={48} />
          </div>
        </div>

        {/* Timer */}
        <div className="mt-6 flex items-center gap-2 text-orange-600 font-medium bg-orange-50 px-4 py-2 rounded-full text-sm">
          <AlertCircle size={16} />
          QR expires in {formatTime(timeLeft)}
        </div>

        {/* Payment Apps Info */}
        <div className="w-full mt-10 space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <ShieldCheck className="text-green-500" size={20} />
              </div>
              <span className="text-sm font-semibold text-gray-700">Secure UPI Payment</span>
            </div>
            <div className="flex -space-x-2">
              <div className="w-6 h-6 rounded-full bg-blue-500 border-2 border-white"></div>
              <div className="w-6 h-6 rounded-full bg-purple-500 border-2 border-white"></div>
              <div className="w-6 h-6 rounded-full bg-green-500 border-2 border-white"></div>
            </div>
          </div>

          <button
            onClick={() => onStepComplete?.()}
            className="w-full py-4 bg-[#005dbe] text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-blue-700 transition-all shadow-lg active:scale-95"
          >
            I have completed payment
            <ArrowRight size={20} />
          </button>
        </div>

        <p className="mt-8 text-[10px] text-gray-400 text-center leading-relaxed">
          Open any UPI app like Google Pay, PhonePe, or Paytm and scan the QR code to complete the transaction. 
          Do not close this window until the payment is confirmed.
        </p>
      </div>
    </div>
  );
}
