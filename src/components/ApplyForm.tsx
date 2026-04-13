"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronRight, 
  ChevronLeft, 
  User, 
  MapPin, 
  Car, 
  CheckCircle2,
  AlertCircle,
  Loader2,
  UploadCloud,
  FileText,
  ImageIcon,
  PenLine
} from "lucide-react";

/**
 * Zod Schema for the Application Form
 */
const formSchema = z.object({
  // Step 1: Service
  state_id: z.string().min(1, "Please select a state"),
  rto_id: z.string().min(1, "Please select an RTO"),
  licence_type: z.string().min(1, "Please select licence type"),
  
  // Step 2: Personal
  name: z.string().min(2, "Name is required"),
  relation: z.string().min(1, "Relation is required"),
  full_name: z.string().min(2, "Relative's name is required"),
  gender: z.string().min(1, "Gender is required"),
  dob: z.string().min(1, "Date of birth is required").refine((val) => {
    const birthDate = new Date(val);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
    return age >= 18;
  }, "You must be at least 18 years old"),
  birth_place: z.string().optional(),
  birth_country: z.string().min(1, "Country of birth is required"),
  qualification: z.string().optional(),
  blood_group: z.string().optional(),
  
  // Step 3: Contact
  mobile: z.string().min(10, "Valid 10-digit mobile number required"),
  phone: z.string().optional(),
  email: z.string().email("Invalid email address"),
  em_mobile: z.string().optional(),
  identification_mark_1: z.string().optional(),
  identification_mark_2: z.string().optional(),
  
  // Step 4: Address
  current_address_type: z.string().optional(),
  current_state_id: z.string().min(1, "State is required"),
  current_landmark: z.string().min(1, "Landmark is required"),
  current_pin: z.string().min(6, "Valid PIN is required"),
  
  permanent_address_type: z.string().optional(),
  permanent_state_id: z.string().optional(),
  permanent_landmark: z.string().optional(),
  permanent_pin: z.string().optional(),
  
  // Step 5: Vehicles
  vehicle_class: z.array(z.string()).min(1, "Select at least one vehicle category"),
});

type FormValues = z.infer<typeof formSchema>;

const STEPS = [
  { id: 1, title: "Service", icon: Car },
  { id: 2, title: "Personal", icon: User },
  { id: 3, title: "Contact", icon: AlertCircle },
  { id: 4, title: "Address", icon: MapPin },
  { id: 5, title: "Vehicle", icon: CheckCircle2 },
  { id: 6, title: "Documents", icon: UploadCloud },
];

export default function ApplyForm() {
  const [step, setStep] = useState(1);
  const [states, setStates] = useState<any[]>([]);
  const [rtos, setRtos] = useState<any[]>([]);
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingRtos, setLoadingRtos] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gender: "1",
      current_address_type: "town",
      permanent_address_type: "town",
      vehicle_class: [],
      state_id: "",
      rto_id: "",
      licence_type: "Learning Licence"
    }
  });

  const selectedState = watch("state_id");
  const isAddressSame = useState(false);

  // Fetch States on mount
  useEffect(() => {
    async function fetchStates() {
      setLoadingStates(true);
      try {
        const res = await fetch("/api/states");
        const data = await res.json();
        if (Array.isArray(data)) {
          setStates(data);
        } else {
          console.error("States data is not an array:", data);
          setStates([]);
        }
      } catch (err) {
        console.error("Failed to fetch states", err);
        setStates([]);
      } finally {
        setLoadingStates(false);
      }
    }
    fetchStates();
  }, []);

  // Fetch RTOs when state changes
  useEffect(() => {
    if (!selectedState) {
      setRtos([]);
      return;
    }
    async function fetchRtos() {
      setLoadingRtos(true);
      try {
        const stateObj = states.find(s => s.name === selectedState);
        if(!stateObj) return;
        
        const res = await fetch(`/api/rto?stateId=${stateObj.id}`);
        const data = await res.json();
        
        if (Array.isArray(data)) {
          setRtos(data);
        } else {
          console.error("RTO data is not an array:", data);
          setRtos([]);
        }
      } catch (err) {
        console.error("Failed to fetch RTOs", err);
        setRtos([]);
      } finally {
        setLoadingRtos(false);
      }
    }
    fetchRtos();
  }, [selectedState, states]);

  const nextStep = async () => {
    let fieldsToValidate: any[] = [];
    if (step === 1) fieldsToValidate = ["state_id", "rto_id", "licence_type"];
    else if (step === 2) fieldsToValidate = ["name", "relation", "full_name", "gender", "dob", "qualification", "birth_country"];
    else if (step === 3) fieldsToValidate = ["mobile", "email"];
    else if (step === 4) fieldsToValidate = ["current_state_id", "current_landmark", "current_pin"];

    const isValid = await trigger(fieldsToValidate as any);
    if (isValid) setStep(s => s + 1);
  };

  const prevStep = () => setStep(s => s - 1);

  const handleCopyAddress = (checked: boolean) => {
    if (checked) {
      const currentValues = watch();
      setValue("permanent_state_id", currentValues.current_state_id);
      setValue("permanent_address_type", currentValues.current_address_type);
      setValue("permanent_landmark", currentValues.current_landmark);
      setValue("permanent_pin", currentValues.current_pin);
    }
  };

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        // Redirect to the payment page with the new application ID
        window.location.href = `/payment?id=${result.id}`;
      } else {
        throw new Error(result.error || "Submission failed");
      }
    } catch (err: any) {
      console.error("Submission error:", err);
      alert(`Error: ${err.message}`);
    }
  };

  return (
    <div className="max-w-4xl w-[95%] md:w-full mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 my-10">
      {/* Header / Progress */}
      <div className="bg-[#005dbe] p-6 md:p-8 text-white relative">
        <div className="relative z-10 text-center md:text-left">
          <h2 className="text-xl md:text-2xl font-bold font-ubuntu">Driving Licence Application</h2>
          <p className="text-blue-100 text-xs md:text-sm mt-1">Complete all steps to proceed to payment</p>
        </div>
        
        {/* Step Indicator */}
        <div className="flex justify-between mt-10 relative z-10 px-1 md:px-2">
          {STEPS.map((s) => (
            <div key={s.id} className="flex flex-col items-center flex-1 group">
              <div className={`w-7 h-7 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all ${step >= s.id ? 'bg-white text-[#005dbe] scale-110 shadow-lg' : 'bg-blue-400 text-blue-100'}`}>
                <s.icon size={14} className="md:w-5 md:h-5" />
              </div>
              <span className={`mt-2 text-[6px] md:text-[9px] font-bold uppercase md:tracking-wider text-center px-0.5 break-words leading-[8px] md:leading-normal ${step >= s.id ? 'text-white' : 'text-blue-300'}`}>
                {s.title}
              </span>
            </div>
          ))}
        </div>

        {/* Decorative Background */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="p-8">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-bold text-gray-800 font-ubuntu flex items-center gap-2">
                <Car className="text-[#005dbe]" /> Service Selection
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Select State</label>
                  <select 
                    {...register("state_id")} 
                    className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-[#005dbe] transition-all bg-gray-50 text-gray-900"
                  >
                    <option value="">Select State</option>
                    {states.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                  </select>
                  {errors.state_id && <p className="text-xs text-red-500">{errors.state_id.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Select RTO</label>
                  <div className="relative">
                    <select 
                      {...register("rto_id")} 
                      disabled={!selectedState || loadingRtos}
                      className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-[#005dbe] transition-all bg-gray-50 text-gray-900 disabled:bg-gray-200 text-gray-900"
                    >
                      <option value="">{loadingRtos ? "Loading..." : "Select RTO"}</option>
                      {rtos.map((r, i) => <option key={i} value={r.id}>{r.name} ({r.id})</option>)}
                    </select>
                    {loadingRtos && <Loader2 className="absolute right-8 top-3.5 animate-spin text-[#005dbe]" size={20} />}
                  </div>
                  {errors.rto_id && <p className="text-xs text-red-500">{errors.rto_id.message}</p>}
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-semibold text-gray-700">Licence Type</label>
                  <select 
                    {...register("licence_type")} 
                    className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-[#005dbe] transition-all bg-gray-50 text-gray-900"
                  >
                    <option value="Learning Licence">Learning Licence</option>
                    <option value="Permanent Licence">Permanent Licence</option>
                    <option value="Renew Licence">Renew Licence</option>
                    <option value="Duplicate Licence">Duplicate Licence</option>
                    <option value="IDP Licence">International Driving Permit (IDP)</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-bold text-gray-800 font-ubuntu flex items-center gap-2">
                <User className="text-[#005dbe]" /> Personal Details
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Applicant Full Name</label>
                  <input {...register("name")} className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 focus:ring-2 focus:ring-[#005dbe] outline-none" />
                  {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Relation</label>
                  <select {...register("relation")} className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 focus:ring-2 focus:ring-[#005dbe] outline-none">
                    <option value="">Select Relation</option>
                    <option value="Father">Father</option>
                    <option value="Mother">Mother</option>
                    <option value="Husband">Husband</option>
                    <option value="Guardian">Guardian</option>
                  </select>
                  {errors.relation && <p className="text-xs text-red-500">{errors.relation.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Relative's Name</label>
                  <input {...register("full_name")} className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 focus:ring-2 focus:ring-[#005dbe] outline-none" />
                  {errors.full_name && <p className="text-xs text-red-500">{errors.full_name.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Gender</label>
                  <div className="flex gap-4 p-3 bg-gray-50 text-gray-900 rounded-xl border border-gray-200">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" value="1" {...register("gender")} className="text-[#005dbe]" /> Male
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" value="2" {...register("gender")} className="text-[#005dbe]" /> Female
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" value="3" {...register("gender")} className="text-[#005dbe]" /> Other
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Date of Birth</label>
                  <input type="date" {...register("dob")} className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 focus:ring-2 focus:ring-[#005dbe] outline-none" />
                  {errors.dob && <p className="text-xs text-red-500">{errors.dob.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Birth Place</label>
                  <input {...register("birth_place")} className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 focus:ring-2 focus:ring-[#005dbe] outline-none" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Country of Birth</label>
                  <select {...register("birth_country")} className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 focus:ring-2 focus:ring-[#005dbe] outline-none">
                    <option value="INDIA">INDIA</option>
                    <option value="USA">USA</option>
                    <option value="UK">UK</option>
                    <option value="OTHER">OTHER</option>
                  </select>
                  {errors.birth_country && <p className="text-xs text-red-500">{errors.birth_country.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Qualification</label>
                  <select {...register("qualification")} className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 focus:ring-2 focus:ring-[#005dbe] outline-none">
                    <option value="">Select Qualification</option>
                    <option value="10th PASSED">10th PASSED</option>
                    <option value="12th PASSED">12th PASSED</option>
                    <option value="GRADUATE">GRADUATE</option>
                    <option value="POST GRADUATE">POST GRADUATE</option>
                    <option value="BELOW 8th">BELOW 8th</option>
                  </select>
                  {errors.qualification && <p className="text-xs text-red-500">{errors.qualification.message}</p>}
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-bold text-gray-800 font-ubuntu flex items-center gap-2">
                <AlertCircle className="text-[#005dbe]" /> Contact Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Mobile Number (Primary)</label>
                  <input {...register("mobile")} maxLength={10} className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 focus:ring-2 focus:ring-[#005dbe] outline-none" placeholder="10 Digit Mobile No" />
                  {errors.mobile && <p className="text-xs text-red-500">{errors.mobile.message}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Emergency Mobile Number</label>
                  <input {...register("em_mobile")} maxLength={10} className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 focus:ring-2 focus:ring-[#005dbe] outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Email Address</label>
                  <input {...register("email")} type="email" className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 focus:ring-2 focus:ring-[#005dbe] outline-none" placeholder="example@email.com" />
                  {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Identification Mark 1</label>
                  <input {...register("identification_mark_1")} className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 focus:ring-2 focus:ring-[#005dbe] outline-none" placeholder="Visible mark or mole" />
                </div>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-bold text-gray-800 font-ubuntu flex items-center gap-2">
                <MapPin className="text-[#005dbe]" /> Address Details
              </h3>
              
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-6">
                <h4 className="font-bold text-[#005dbe]">Present Address</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">State / UT</label>
                    <select {...register("current_state_id")} className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 outline-none">
                      <option value="">Select State</option>
                      {states.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Pincode</label>
                    <input {...register("current_pin")} maxLength={6} className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 outline-none" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-semibold text-gray-700">House No / Flat / Landmark</label>
                    <input {...register("current_landmark")} className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 outline-none" />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-bold text-gray-800 font-ubuntu">Select Class of Vehicles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "MCWOG (Motor Cycle without Gear)",
                  "MCWG (Motor Cycle with Gear)",
                  "LMV (Light Motor Vehicle)",
                  "LMV-NT (3 Wheeler)",
                  "LMV-Tractor"
                ].map((v, i) => (
                  <label key={i} className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 hover:bg-blue-50 transition-colors cursor-pointer group">
                    <input 
                      type="checkbox" 
                      value={v} 
                      {...register("vehicle_class")} 
                      className="w-5 h-5 rounded border-gray-300 text-[#005dbe]"
                    />
                    <span className="text-sm font-medium">{v}</span>
                  </label>
                ))}
              </div>
              {errors.vehicle_class && <p className="text-xs text-red-500">{errors.vehicle_class.message}</p>}
            </motion.div>
          )}

          {step === 6 && (
            <motion.div
              key="step6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-bold text-gray-800 font-ubuntu flex items-center gap-2">
                <UploadCloud className="text-[#005dbe]" /> Document Uploads
              </h3>
              <p className="text-sm text-gray-500">Please select clear scanned copies or photos of your documents.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { id: "adhaar", label: "Aadhaar Card", icon: <FileText size={20} /> },
                  { id: "pancard", label: "PAN Card", icon: <FileText size={20} /> },
                  { id: "photo", label: "Passport Photo", icon: <ImageIcon size={20} /> },
                  { id: "signature", label: "Signature", icon: <PenLine size={20} /> },
                ].map((doc) => (
                  <div key={doc.id} className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">{doc.label}</label>
                    <div className="relative group">
                      <input 
                        type="file" 
                        id={doc.id}
                        className="hidden" 
                        accept="image/*,.pdf"
                        onChange={(e) => console.log(`Selected ${doc.id}`)}
                      />
                      <label 
                        htmlFor={doc.id}
                        className="flex items-center gap-3 w-full p-4 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 hover:border-[#005dbe] hover:bg-blue-50 transition-all cursor-pointer group"
                      >
                        <div className="bg-white p-2 rounded-lg shadow-sm text-gray-400 group-hover:text-[#005dbe]">
                          {doc.icon}
                        </div>
                        <span className="text-sm text-gray-500 group-hover:text-gray-700 font-medium truncate">Click to Select {doc.label}</span>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="mt-8 md:mt-12 flex justify-between border-t border-gray-100 pt-6 md:pt-8">
          <button
            type="button"
            onClick={prevStep}
            className={`flex items-center px-4 md:px-6 py-2 md:py-3 rounded-full font-bold text-xs md:text-sm transition-all ${step === 1 ? 'opacity-0 cursor-default' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            disabled={step === 1}
          >
            <ChevronLeft className="mr-1 md:mr-2 w-4 h-4 md:w-5 md:h-5" /> Back
          </button>
          
          {step < STEPS.length ? (
            <button
              type="button"
              onClick={nextStep}
              className="flex items-center px-5 md:px-8 py-2 md:py-3 bg-[#005dbe] text-white rounded-full font-bold text-xs md:text-sm shadow-lg shadow-blue-200 hover:shadow-blue-300 hover:scale-105 transition-all whitespace-nowrap"
            >
              Next Step <ChevronRight className="ml-1 md:ml-2 w-4 h-4 md:w-5 md:h-5" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center px-6 md:px-10 py-2 md:py-3 bg-green-600 text-white rounded-full font-bold text-xs md:text-sm shadow-lg shadow-green-200 hover:bg-green-700 hover:scale-105 transition-all disabled:opacity-50 whitespace-nowrap"
            >
              {isSubmitting ? <Loader2 className="animate-spin" /> : "Proceed to Payment"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
