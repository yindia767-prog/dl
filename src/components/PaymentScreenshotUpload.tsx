"use client";

import { useState } from "react";
import { Upload, CheckCircle2, Loader2, Camera } from "lucide-react";

interface Props {
  applicationId: string;
}

export default function PaymentScreenshotUpload({ applicationId }: Props) {
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (max 5MB for Base64 safety)
    if (file.size > 5 * 1024 * 1024) {
      setError("File is too large. Max 5MB allowed.");
      return;
    }

    setUploading(true);
    setError(null);

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result as string;
      
      try {
        const response = await fetch("/api/payment/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: applicationId,
            screenshot: base64String
          })
        });

        const data = await response.json();
        if (data.success) {
          setSuccess(true);
        } else {
          throw new Error(data.error || "Upload failed");
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setUploading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="mt-8 bg-white p-6 rounded-3xl shadow-xl border border-gray-100">
      <div className="flex items-center gap-3 mb-4">
        <Camera className="text-[#005dbe]" size={24} />
        <h3 className="text-lg font-bold text-gray-800">Upload Payment Screenshot</h3>
      </div>
      
      {!success ? (
        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            Please upload a screenshot of your payment confirmation for faster verification.
          </p>
          
          <div className="relative group">
            <input 
              type="file" 
              id="payment-upload" 
              className="hidden" 
              accept="image/*"
              onChange={handleFileChange}
              disabled={uploading}
            />
            <label 
              htmlFor="payment-upload"
              className={`flex flex-col items-center justify-center gap-3 w-full py-8 border-2 border-dashed rounded-2xl transition-all cursor-pointer ${
                uploading ? 'bg-gray-50 border-gray-200 cursor-not-allowed' : 'bg-blue-50/50 border-blue-200 hover:border-[#005dbe] hover:bg-blue-50'
              }`}
            >
              {uploading ? (
                <Loader2 className="animate-spin text-[#005dbe]" size={32} />
              ) : (
                <Upload className="text-[#005dbe]" size={32} />
              )}
              <span className="text-sm font-bold text-[#005dbe]">
                {uploading ? "Uploading Proof..." : "Click to Select Screenshot"}
              </span>
            </label>
          </div>
          
          {error && <p className="text-xs text-red-500 font-medium text-center">{error}</p>}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-6 animate-in fade-in zoom-in duration-300">
          <CheckCircle2 className="text-green-500 mb-3" size={48} />
          <h4 className="text-lg font-bold text-gray-900">Proof Submitted!</h4>
          <p className="text-sm text-gray-500 text-center mt-1">
            Thank you. Your payment is being verified by our team.
          </p>
          <a href="/" className="mt-6 text-sm font-bold text-[#005dbe] hover:underline">
            Return to Home
          </a>
        </div>
      )}
    </div>
  );
}
