import { useState } from "react";
import { X } from "lucide-react";
import { captureUserDetails } from '../../services'

export default function BenchmarkSnapshotModal({
    onClose,
}) {
    const [formData, setFormData] = useState({
        email: "",
        firstName: "",
        lastName: "",
        company: "",
        industry: "",
        subCategory: "",
        employees: "",
        country: "",
        phone: "",
        snapshotName: "Benchmark Snapshot — 2025",
        updates: false,
    });

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;

        setFormData((previousData) => ({
            ...previousData,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log("Snapshot form data:", formData);

        // if (!formData.user_email || !formData?.file_name) return;

        const res = await captureUserDetails(formData);
        if (!res?.data?.ok) return;

        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-6">
            <div className="relative max-h-[95vh] w-full max-w-[850px] overflow-y-auto rounded-2xl bg-white shadow-2xl">
                {/* Header */}
                <div className="border-b border-slate-200 px-7 py-6 sm:px-9">
                    <button
                        type="button"
                        onClick={onClose}
                        className="absolute right-6 top-6 flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-sm text-slate-500 transition hover:bg-slate-100"
                    >
                        <X size={17} />
                    </button>

                    <p className="text-xs font-extrabold uppercase tracking-wide text-emerald-700">
                        Keep it
                    </p>

                    <h2 className="mt-2 pr-12 text-3xl font-black text-slate-800">
                        Get your Benchmark Snapshot
                    </h2>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                        Enter your details to download a PDF with your results, three
                        takeaways and questions for your leadership team or board.
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    <div className="px-7 py-6 sm:px-9">
                        <p className="mb-6 text-xs text-slate-500">
                            <span className="font-bold text-red-500">*</span> indicates
                            required information
                        </p>

                        {/* Email */}
                        <div className="mb-5">
                            <label className="mb-2 block text-sm font-bold text-slate-700">
                                Email address <span className="text-red-500">*</span>
                            </label>

                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="h-11 w-full rounded-lg border border-slate-300 px-4 text-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                            />

                            <p className="mt-2 text-xs text-slate-500">
                                Your PDF brings the key figures and takeaways together in one
                                place.
                            </p>
                        </div>

                        {/* First name and last name */}
                        <div className="grid gap-5 md:grid-cols-2">
                            <div>
                                <label className="mb-2 block text-sm font-bold text-slate-700">
                                    First Name <span className="text-red-500">*</span>
                                </label>

                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                    className="h-11 w-full rounded-lg border border-slate-300 px-4 text-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-bold text-slate-700">
                                    Last Name <span className="text-red-500">*</span>
                                </label>

                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                    className="h-11 w-full rounded-lg border border-slate-300 px-4 text-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                                />
                            </div>
                        </div>

                        {/* Company and Industry */}
                        <div className="mt-5 grid gap-5 md:grid-cols-2">
                            <div>
                                <label className="mb-2 block text-sm font-bold text-slate-700">
                                    Company or Organization{" "}
                                    <span className="text-red-500">*</span>
                                </label>

                                <input
                                    type="text"
                                    name="company"
                                    value={formData.company}
                                    onChange={handleChange}
                                    required
                                    className="h-11 w-full rounded-lg border border-slate-300 px-4 text-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-bold text-slate-700">
                                    Industry <span className="text-red-500">*</span>
                                </label>

                                <select
                                    name="industry"
                                    value={formData.industry}
                                    onChange={handleChange}
                                    required
                                    className="h-11 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                                >
                                    <option value="Human services">Human services</option>
                                    <option value="Education">Education</option>
                                    <option value="Healthcare">Healthcare</option>
                                    <option value="Arts and culture">Arts and culture</option>
                                </select>
                            </div>
                        </div>

                        {/* Sub-category */}
                        <div className="mt-5 grid gap-5 md:grid-cols-2">
                            <div />

                            <div>
                                <label className="mb-2 block text-sm font-bold text-slate-700">
                                    Sub-category <span className="text-red-500">*</span>
                                </label>

                                <select
                                    name="subCategory"
                                    value={formData.subCategory}
                                    onChange={handleChange}
                                    required
                                    className="h-11 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                                >
                                    <option value="Human Service Organizations">
                                        Human Service Organizations
                                    </option>
                                    <option value="Care Facilities">Care Facilities</option>
                                    <option value="Housing Services">Housing Services</option>
                                </select>

                                <p className="mt-2 text-xs text-slate-500">
                                    NTEE code: P20{" "}
                                    <a
                                        href="#code-guide"
                                        className="ml-2 text-emerald-700 underline"
                                    >
                                        Code guide
                                    </a>
                                </p>
                            </div>
                        </div>

                        {/* Employees and country */}
                        <div className="mt-5 grid gap-5 md:grid-cols-2">
                            <div>
                                <label className="mb-2 block text-sm font-bold text-slate-700">
                                    Number of Employees{" "}
                                    <span className="text-red-500">*</span>
                                </label>

                                <select
                                    name="employees"
                                    value={formData.employees}
                                    onChange={handleChange}
                                    required
                                    className="h-11 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                                >
                                    <option value="1-9">1–9</option>
                                    <option value="10-19">10–19</option>
                                    <option value="20-49">20–49</option>
                                    <option value="50-99">50–99</option>
                                    <option value="100+">100+</option>
                                </select>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-bold text-slate-700">
                                    Country <span className="text-red-500">*</span>
                                </label>

                                <select
                                    name="country"
                                    value={formData.country}
                                    onChange={handleChange}
                                    required
                                    className="h-11 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                                >
                                    <option value="">Select a country</option>
                                    <option value="India">India</option>
                                    <option value="United States">United States</option>
                                    <option value="United Kingdom">United Kingdom</option>
                                    <option value="Australia">Australia</option>
                                    <option value="Canada">Canada</option>
                                </select>
                            </div>
                        </div>

                        {/* Phone and snapshot name */}
                        <div className="mt-5 grid gap-5 md:grid-cols-2">
                            <div>
                                <label className="mb-2 block text-sm font-bold text-slate-700">
                                    Business Phone <span className="text-red-500">*</span>
                                </label>

                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    className="h-11 w-full rounded-lg border border-slate-300 px-4 text-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                                />

                                <p className="mt-2 text-xs text-slate-500">
                                    Include your country code.
                                </p>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-bold text-slate-700">
                                    Snapshot name{" "}
                                    <span className="font-normal text-slate-400">
                                        Optional
                                    </span>
                                </label>

                                <input
                                    type="text"
                                    name="snapshotName"
                                    value={formData.snapshotName}
                                    onChange={handleChange}
                                    className="h-11 w-full rounded-lg border border-slate-300 px-4 text-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                                />
                            </div>
                        </div>

                        {/* Updates checkbox */}
                        <label className="mt-6 flex cursor-pointer items-start gap-3 rounded-xl border border-slate-300 p-4 transition hover:bg-slate-50">
                            <input
                                type="checkbox"
                                name="updates"
                                checked={formData.updates}
                                onChange={handleChange}
                                className="mt-1 h-5 w-5 accent-emerald-600"
                            />

                            <span>
                                <span className="block text-sm font-bold text-slate-700">
                                    Send me nonprofit insights and Sage updates
                                </span>

                                <span className="mt-1 block text-xs text-slate-500">
                                    Optional. You can unsubscribe at any time.
                                </span>
                            </span>
                        </label>

                        <p className="mt-7 text-xs text-slate-500">
                            Your details remain on this browser session.{" "}
                            <a
                                href="#privacy"
                                className="text-emerald-700 underline"
                            >
                                Privacy and legal information
                            </a>
                        </p>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-end gap-5 border-t border-slate-200 px-7 py-5 sm:px-9">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-full px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-100"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="rounded-full bg-emerald-600 px-6 py-3 text-sm font-extrabold text-white shadow-md transition hover:bg-emerald-700 active:scale-95"
                        >
                            Download PDF
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}