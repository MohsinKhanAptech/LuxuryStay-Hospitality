import { useState } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";

import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Combobox } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const UserAdd = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    userType: "",
    accessLevel: 0,
    password: "",
    roomType: "",
    isActive: true,
    smoking: false,
  });

  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
        password: form.password,
        isActive: form.isActive,
        accessLevel: form.accessLevel,
        preferences: {
          roomType: form.roomType,
          smoking: form.smoking,
        },
      };

      console.log(formData);
      await axios.post("http://localhost:5000/api/users/", formData);
      navigate("/admin/user/list");
    } catch (error) {
      console.error("Error adding user:", error);
      setErrorMessage(
        "Failed to add user. Please check your input and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SiteHeader title={"User Add"} />
      <section className="p-4 md:p-10">
        <form onSubmit={handleSubmit} className="bg-white p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Add New User
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
            <div className="flex gap-4">
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
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
              />
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
            <div className="flex items-center gap-4 py-2">
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
              {isSubmitting ? "Adding User..." : "Add User"}
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

export default UserAdd;
