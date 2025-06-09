import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import axios from "axios";

import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const UserDetail = () => {
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
        "No valid user ID found in location state. Cannot show user detail."
      );
      setErrorMessage("No user selected for detail. Returning to list.");
      setIsLoading(false);
      navigate("/admin/user/list");
    }
  }, [state, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
            View User Information
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
                  value={form.firstName}
                  disabled={true}
                />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  type="text"
                  id="lastName"
                  value={form.lastName}
                  disabled={true}
                />
              </div>
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                value={form.email}
                disabled={true}
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="phone">Phone</Label>
              <Input type="tel" id="phone" value={form.phone} disabled={true} />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="address">Address</Label>
              <Input
                type="text"
                id="address"
                value={form.address}
                disabled={true}
              />
            </div>
            <div className="grid w-full items-center gap-6 md:gap-4 md:grid-cols-2">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="userType">User Type</Label>
                <Input
                  type="text"
                  id="userType"
                  value={form.userType}
                  disabled={true}
                />
              </div>

              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="accessLevel">Access Level</Label>
                <Input
                  type="number"
                  id="accessLevel"
                  value={form.accessLevel}
                  disabled={true}
                />
              </div>
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="roomType">Preferred Room Type</Label>
              <Input
                type="text"
                id="roomType"
                value={form.roomType}
                disabled={true}
              />
            </div>
            <div className="flex flex-wrap items-center gap-6 py-2">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="isActive"
                  checked={form.isActive}
                  className="w-4 h-4 rounded"
                  disabled={true}
                />
                <Label htmlFor="isActive">Is Active</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="smoking"
                  checked={form.smoking}
                  className="w-4 h-4 rounded"
                  disabled={true}
                />
                <Label htmlFor="smoking">Client Smokes</Label>
              </div>
            </div>
            <Button
              variant={"default"}
              className="w-full mt-4"
              type="button"
              asChild
            >
              <Link to={"/admin/user/edit"} state={userId}>
                Edit
              </Link>
            </Button>
            <Button
              variant={"destructive"}
              className="w-full hover:cursor-pointer"
              type="button"
              onClick={() => {
                axios
                  .delete(`http://localhost:5000/api/users/${userId}`)
                  .then(() => {
                    navigate("/admin/user/list");
                  });
              }}
            >
              Delete
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

export default UserDetail;
