import { Button } from "@/components/ui/button";
import { Bell, Menu, User, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUserStore } from "@/store/useUserStore";
import type { UserType } from "@/types/userTypes";
import { Loading } from "./Loading";

const LayoutHeader = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const token = useUserStore((state) => state.userToken);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return;

    const fetchUser = async () => {
      setIsLoading(true);

      try {
        const response = await axios.get("http://localhost:8080/api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data);
      } catch (error: any) {
        toast.error(error.response?.data?.message || error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [token]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/signin");

      toast.success("Logged out successfully!");
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  if (isLoading || !user) return <Loading />;

  return (
    <header className="bg-white border-b p-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          <h2 className="text-lg font-semibold">Dashboard Overview</h2>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center space-x-2 cursor-pointer">
                <p>{`${user?.firstName} ${user?.lastName}`}</p>
                <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <User className="h-4 w-4 text-muted-foreground" />
                </div>
                <ChevronDown className="h-4 w-4" />
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem onClick={() => console.log("Go to settings")}>
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default LayoutHeader;
