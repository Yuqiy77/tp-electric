"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

interface WebsiteContent {
  heroTitle: string;
  heroSubtitle: string;
  aboutText: string;
  contactPhone: string;
  contactEmail: string;
  contactAddress: string;
  businessHours: {
    weekdays: string;
    weekends: string;
  };
}

export default function ContentManagement() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [content, setContent] = useState<WebsiteContent>({
    heroTitle: "Reliable Appliances at Affordable Prices",
    heroSubtitle: "New & Refurbished Appliances | On-site Stove Repair",
    aboutText: "Looking for a reliable stove without breaking the bank? 🔥\n\nWe offer high-quality, second-hand stoves that have been carefully inspected and refurbished to ensure they're in top working condition. Whether you're upgrading your kitchen or need a dependable appliance, we've got the perfect stove for you at an unbeatable price.\n\nIn addition to selling stoves, we specialize in stove repairs. If your current stove isn't performing as it should, we can fix it quickly and affordably, so you can get back to cooking with confidence.",
    contactPhone: "(555) 123-4567",
    contactEmail: "info@tpelectric.com",
    contactAddress: "123 Main Street\nCity, State 12345",
    businessHours: {
      weekdays: "Mon - Fri: 9:00 AM - 9:00 PM",
      weekends: "Sat & Sun: 8:30 AM - 8:00 PM"
    }
  });
  const [isEditing, setIsEditing] = useState(false);
  const [tempContent, setTempContent] = useState<WebsiteContent>(content);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!session) {
    return null;
  }

  const handleSave = () => {
    setContent(tempContent);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempContent(content);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <Link href="/admin/dashboard" className="text-blue-600 hover:text-blue-800">
                ← Back to Dashboard
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">Content Management</h1>
            </div>
            {!isEditing ? (
              <button
                onClick={() => {
                  setTempContent(content);
                  setIsEditing(true);
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Edit Content
              </button>
            ) : (
              <div className="flex space-x-2">
                <button
                  onClick={handleCancel}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-6">
                Website Content
              </h3>

              <div className="space-y-6">
                {/* Hero Section */}
                <div>
                  <h4 className="text-md font-medium text-gray-900 mb-3">Hero Section</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Hero Title</label>
                      <input
                        type="text"
                        value={isEditing ? tempContent.heroTitle : content.heroTitle}
                        onChange={(e) => setTempContent({ ...tempContent, heroTitle: e.target.value })}
                        disabled={!isEditing}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Hero Subtitle</label>
                      <input
                        type="text"
                        value={isEditing ? tempContent.heroSubtitle : content.heroSubtitle}
                        onChange={(e) => setTempContent({ ...tempContent, heroSubtitle: e.target.value })}
                        disabled={!isEditing}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                      />
                    </div>
                  </div>
                </div>

                {/* About Section */}
                <div>
                  <h4 className="text-md font-medium text-gray-900 mb-3">About Section</h4>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">About Text</label>
                    <textarea
                      value={isEditing ? tempContent.aboutText : content.aboutText}
                      onChange={(e) => setTempContent({ ...tempContent, aboutText: e.target.value })}
                      disabled={!isEditing}
                      rows={6}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                    />
                  </div>
                </div>

                {/* Contact Information */}
                <div>
                  <h4 className="text-md font-medium text-gray-900 mb-3">Contact Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Phone</label>
                      <input
                        type="text"
                        value={isEditing ? tempContent.contactPhone : content.contactPhone}
                        onChange={(e) => setTempContent({ ...tempContent, contactPhone: e.target.value })}
                        disabled={!isEditing}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <input
                        type="email"
                        value={isEditing ? tempContent.contactEmail : content.contactEmail}
                        onChange={(e) => setTempContent({ ...tempContent, contactEmail: e.target.value })}
                        disabled={!isEditing}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700">Address</label>
                      <textarea
                        value={isEditing ? tempContent.contactAddress : content.contactAddress}
                        onChange={(e) => setTempContent({ ...tempContent, contactAddress: e.target.value })}
                        disabled={!isEditing}
                        rows={2}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                      />
                    </div>
                  </div>
                </div>

                {/* Business Hours */}
                <div>
                  <h4 className="text-md font-medium text-gray-900 mb-3">Business Hours</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Weekdays</label>
                      <input
                        type="text"
                        value={isEditing ? tempContent.businessHours.weekdays : content.businessHours.weekdays}
                        onChange={(e) => setTempContent({ 
                          ...tempContent, 
                          businessHours: { 
                            ...tempContent.businessHours, 
                            weekdays: e.target.value 
                          } 
                        })}
                        disabled={!isEditing}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Weekends</label>
                      <input
                        type="text"
                        value={isEditing ? tempContent.businessHours.weekends : content.businessHours.weekends}
                        onChange={(e) => setTempContent({ 
                          ...tempContent, 
                          businessHours: { 
                            ...tempContent.businessHours, 
                            weekends: e.target.value 
                          } 
                        })}
                        disabled={!isEditing}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 