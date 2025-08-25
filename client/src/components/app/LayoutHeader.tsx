import { Button } from "@/components/ui/button";
import { Bell, Menu, User, ChevronDown, Inbox } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useUserStore } from "@/store/useUserStore";
import type { UserType } from "@/types/userTypes";
import { Loading } from "./Loading";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchData } from "@/constants/fetchData";
import type { NotificationType } from "@/types/notifications";

type DataType = {
  user: UserType;
  notifications: NotificationType[];
};

const LayoutHeader = () => {
  const token = useUserStore((state) => state.userToken);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const { data, isLoading } = useQuery<DataType>({
    queryKey: ["user-info-notification"],
    queryFn: fetchData("http://localhost:8080/api/user", token),
    enabled: !!token,
  });

  const readNotificationsMutation = useMutation({
    mutationFn: async () =>
      axios.put(
        `http://localhost:8080/api/read-notification`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-info-notification"] });
    },
  });

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/signin");

      toast.success("Logged out successfully!");
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const handleReadNotification = async () => {
    setOpen(!open);

    if (data?.notifications.some((n) => !n.read)) {
      readNotificationsMutation.mutate();
    }
  };

  if (isLoading || !data) return <Loading />;

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
          <div className="relative" ref={dropdownRef}>
            {/* Bell button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleReadNotification}
              className="relative">
              <Bell className="h-5 w-5" />
              {data?.notifications.some((n) => !n.read) && (
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
              )}
            </Button>

            {/* Dropdown */}
            {open && (
              <div className="absolute right-0 mt-2 w-96 bg-white border rounded-lg shadow-xl z-50">
                <div className="p-3 border-b font-bold text-lg">
                  Notifications
                </div>
                {data?.notifications.length === 0 ? (
                  <div className="p-6 flex flex-col items-center justify-center text-gray-500 text-sm">
                    <Inbox className="h-8 w-8 mb-2 text-gray-400" />
                    <p>No notifications yet</p>
                  </div>
                ) : (
                  <ul className="max-h-72 overflow-y-auto">
                    {data?.notifications.map((n) => (
                      <li
                        key={n._id}
                        className={`p-3 border-b text-sm ${
                          !n.read ? "bg-gray-100 font-medium" : "bg-white"
                        }`}>
                        <div>{`${n.title}: ${n.message}`}</div>
                        <div className="text-xs text-gray-400">
                          {new Date(n.createdAt).toLocaleDateString()}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center space-x-2 cursor-pointer">
                <p>{`${data?.user.firstName} ${data?.user.lastName}`}</p>
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
