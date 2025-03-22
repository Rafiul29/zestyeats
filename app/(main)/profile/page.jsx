"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import OrderHistory from "@/components/OrderHistory";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const [isEditing, setEditing] = useState(false)
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");


  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("access_token");

      if (token) {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/users/profile/`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const data = await res.json();
          setFirstName(data.first_name);
          setLastName(data.last_name);
          setPhoneNumber(data.phone_number);
          setAddress(data.address);
          setProfileImage(data.profile_image);
          setUser(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      } else {
        setError("No access token found. Please log in.");
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, [isEditing]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = {
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
      address: address,
      profile_image: profileImage,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/update-profile/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      setSuccessMessage("Profile updated successfully!");
      setEditing(false)
      router.refresh()
    } catch (err) {
      setError(err.message);
    }
  };



  if (loading) {
    return <div className="text-center py-5">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 space-y-3">
      <div className="max-w-3xl mx-auto py-8 px-6 ">
        {error && <div className="py-1 text-red-500 text-sm">{error}</div>}

        {successMessage && (
          <div className="py-1 text-green-500 text-sm">{successMessage}</div>
        )}
        {!isEditing && <>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-black">
              Profile Information
            </h2>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-md text-back">First Name</p>
                <p className="text-sm text-gray-700">
                  {user.first_name || "not provided"}
                </p>
              </div>
              <div>
                <p className="text-md text-back">Last Name</p>
                <p className="text-sm text-gray-700">
                  {user.last_name || "not provided"}
                </p>
              </div>

              <div>
                <p className="text-md text-back">Email Address</p>
                <p className="text-sm text-gray-700">
                  {user.email || "not provided"}
                </p>
              </div>

              <div>
                <p className="text-md text-back">Phone Number</p>
                <p className="text-sm text-gray-700">
                  {user.phone_number || "not provided"}
                </p>
              </div>
              <div>
                <p className="text-md text-back">Address </p>
                <p className="text-sm text-gray-700">
                  {user.address || "not provided"}
                </p>
              </div>

            </div>
            <button onClick={() => setEditing(true)}
              className="px-4 py-2 bg-black text-white rounded hover:bg-gray-700"
            >
              Update Profile
            </button>
          </div>
        </>}


        {isEditing && (
          <>

            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-black">
                Update Profile
              </h2>
            </div>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="first_name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      First Name
                    </label>
                    <div className="mt-1">
                      <input
                        id="first_name"
                        type="text"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="outline-none w-full px-3 py-2 border border-gray-300 rounded-md sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="last_name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Last Name
                    </label>
                    <div className="mt-1">
                      <input
                        id="last_name"
                        type="text"
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="outline-none w-full px-3 py-2 border border-gray-300 rounded-md sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="phone_number"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Phone Number
                    </label>
                    <div className="mt-1">
                      <input
                        id="phone_number"
                        type="text"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="outline-none w-full px-3 py-2 border border-gray-300 rounded-md sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Address
                    </label>
                    <div className="mt-1">
                      <input
                        id="address"
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="outline-none w-full px-3 py-2 border border-gray-300 rounded-md sm:text-sm"
                      />
                    </div>
                  </div>

                </div>
                <button
                  className="px-4 py-2 bg-black text-white rounded hover:bg-gray-700"
                >
                 save
                </button>
              </div>
            </form>
          </>
        )}
      </div>
      <OrderHistory />
    </div>
  );
};

export default ProfilePage;
