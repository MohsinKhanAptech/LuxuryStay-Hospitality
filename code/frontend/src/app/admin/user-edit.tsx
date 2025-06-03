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
    accessLevel: "",
    password: "",
    roomType: "",
    isActive: true,
    smoking: false,
  });

  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const { _id } = state;
    let user: any;

    axios
      .get(`http://localhost:5000/api/users/${_id}`)
      .then((res) => {
        user = res.data;
      })
      .catch((e: any) => {
        console.log(e);
      })
      .finally(() => {
        setIsLoading(false);
        console.log(user);
      });

    if (user) {
      setForm({
        firstName: user.personalInfo.firstName,
        lastName: user.personalInfo.lastName,
        email: user.personalInfo.email,
        phone: user.personalInfo.phone,
        address: user.personalInfo.address || "",
        userType: user.userType,
        accessLevel: user.accessLevel,
        password: user.password,
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
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
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
        preferences: {
          roomType: form.roomType,
          smoking: form.smoking,
        },
      };
      console.log(formData);
      await axios.post("http://localhost:5000/api/users/", formData);
      navigate("/admin/user");
      // Optionally redirect or show success message
    } catch (err: any) {
      // Handle error
      console.log(err);
    }
  };

  if (isLoading) {
    return <div className="w-full h-full text-4xl text-center">Loading...</div>;
  }

  return (
    <>
      <SiteHeader title={"User Add"} />
      <section>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6 p-10">
            <div className="flex gap-4">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  type="text"
                  id="firstName"
                  placeholder="First Name"
                  value={form.firstName}
                  onChange={handleChange}
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
                />
              </div>
            </div>
            <div className="grid w-full items-center gap-1.5 hidden">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
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
                  className="w-4 h-4"
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
                  className="w-4 h-4"
                />
                <Label htmlFor="smoking">Client Smokes</Label>
              </div>
            </div>
            <Button className="w-full" type="submit">
              Submit
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
