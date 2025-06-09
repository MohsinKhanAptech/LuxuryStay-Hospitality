import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import axios from "axios";

import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Combobox } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const UserEdit = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    userType: "",
    accessLevel: 0,
    roomType: "",
    isActive: true,
    smoking: false,
  });

  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let idToFetch: string | null = null;

    if (state) {
      if (typeof state === "string") {
        idToFetch = state;
      } else if (typeof state === "object" && state._id) {
        idToFetch = state._id;
      }
    }

    if (idToFetch) {
      setUserId(idToFetch);

      axios
        .get(`http://localhost:5000/api/users/${idToFetch}`)
        .then((res) => {
          const user = res.data;

          setForm({
            firstName: user.personalInfo.firstName,
            lastName: user.personalInfo.lastName,
            email: user.personalInfo.email,
            phone: user.personalInfo.phone,
            address: user.personalInfo.address || "",
            userType: user.userType,
            accessLevel: user.accessLevel,
            isActive: user.isActive,
            roomType:
              user.preferences && user.preferences.roomType
                ? user.preferences.roomType
                : "",
            smoking:
              user.preferences && user.preferences.smoking
                ? user.preferences.smoking
                : false,
          });
          setErrorMessage(null);
        })
        .catch((error) => {
          console.error("Failed to fetch user data:", error);
          setErrorMessage(
            "Failed to load user data. Please try again or check the network."
          );
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      console.warn(
        "No valid user ID found in location state. Cannot edit user."
      );
      setErrorMessage("No user selected for editing. Returning to list.");
      setIsLoading(false);
      navigate("/admin/user/list");
    }
  }, [state, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [id]:
        type === "checkbox"
          ? checked
          : id === "accessLevel"
          ? Number(value)
          : value,
    }));
  };

  const handleUserTypeChange = (value: string) => {
    setForm((prev) => ({
      ...prev,
      userType: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!userId) {
      console.error("No user ID available for update. Cannot submit form.");
      setErrorMessage("Cannot update: User ID is missing.");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = {
        userType: form.userType,
        personalInfo: {
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          address: form.address,
        },
        accessLevel: form.accessLevel,
        isActive: form.isActive,
        preferences: {
          roomType: form.roomType,
          smoking: form.smoking,
        },
      };

      console.log("Submitting form data:", formData);
      await axios.put(`http://localhost:5000/api/users/${userId}`, formData);

      navigate("/admin/user/list");
    } catch (error) {
      console.error("Error updating user:", error);
      setErrorMessage(
        "Failed to update user. Please check your input and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-screen text-4xl text-center">
        Loading user data...
      </div>
    );
  }

  return (
    <>
      <SiteHeader title={"User Edit"} />
      <section className="p-4 md:p-10">
        <form onSubmit={handleSubmit} className="bg-white p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Edit User Information
          </h2>

          {errorMessage && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
              role="alert"
            >
              <span className="block sm:inline">{errorMessage}</span>
            </div>
          )}

          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  type="text"
                  id="firstName"
                  placeholder="First Name"
                  value={form.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  type="text"
                  id="lastName"
                  placeholder="Last Name"
                  value={form.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="phone">Phone</Label>
              <Input
                type="tel"
                id="phone"
                placeholder="Phone"
                value={form.phone}
                onChange={handleChange}
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="address">Address</Label>
              <Input
                type="text"
                id="address"
                placeholder="Address"
                value={form.address}
                onChange={handleChange}
              />
            </div>
            <div className="grid w-full items-center gap-6 md:gap-4 md:grid-cols-2">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="userType">User Type</Label>
                <Combobox
                  className="w-full"
                  items={[
                    { value: "admin", label: "Admin" },
                    { value: "manager", label: "Manager" },
                    { value: "receptionist", label: "Receptionist" },
                    { value: "housekeeping", label: "Housekeeping" },
                    { value: "guest", label: "Guest" },
                  ]}
                  startValue={form.userType}
                  onChange={handleUserTypeChange}
                />
              </div>

              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="accessLevel">Access Level</Label>
                <Input
                  type="number"
                  id="accessLevel"
                  placeholder="Access Level"
                  value={form.accessLevel}
                  onChange={handleChange}
                  min="0"
                />
              </div>
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="roomType">Preferred Room Type</Label>
              <Input
                type="text"
                id="roomType"
                placeholder="Room Type"
                value={form.roomType}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-wrap items-center gap-6 py-2">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="isActive"
                  checked={form.isActive}
                  onCheckedChange={(checked) =>
                    setForm((prev) => ({ ...prev, isActive: !!checked }))
                  }
                  className="w-4 h-4 rounded"
                />
                <Label htmlFor="isActive">Is Active</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="smoking"
                  checked={form.smoking}
                  onCheckedChange={(checked) =>
                    setForm((prev) => ({ ...prev, smoking: !!checked }))
                  }
                  className="w-4 h-4 rounded"
                />
                <Label htmlFor="smoking">Client Smokes</Label>
              </div>
            </div>
            <Button
              className="w-full mt-4"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Updating..." : "Update User"}
            </Button>
            <Button
              variant={"outline"}
              type="button"
              className="w-full"
              asChild
            >
              <Link to={"/admin/user/list"}>Back</Link>
            </Button>
          </div>
        </form>
      </section>
    </>
  );
};

export default UserEdit;
