import { useEffect, useState } from "react";
import { View } from "react-native";
import Notification from "../../assets/Icon/Notification.svg";
import PersonIcon from "../../assets/Icon/PersonIcon.svg";
import { Text14, Text16, Text16Bold } from "../../components/ui/Typography";
import apiClient from "../../hooks/apiClient";

// Animated Skeleton Component
const NotificationSkeleton = () => {
  return (
    <View className="flex-1 mt-14">
      {/* Today Section Skeleton */}
      <View className="h-6 w-20 bg-gray-200 rounded mb-3 animate-pulse"></View>
      <View className="mt-3">
        {[...Array(3)].map((_, index) => (
          <View
            key={index}
            className="flex-row justify-between bg-white p-4 mb-3 rounded-xl"
          >
            {/* Left side */}
            <View className="flex-row flex-1">
              <View>
                <View className="rounded-md p-2 bg-gray-200 w-10 h-10 animate-pulse"></View>
              </View>
              <View className="ml-3 flex-1">
                <View className="h-5 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></View>
                <View className="h-4 bg-gray-200 rounded w-full animate-pulse"></View>
              </View>
            </View>

            {/* Right side */}
            <View className="flex flex-col items-end">
              <View className="w-2 h-2 bg-gray-200 rounded-full mb-1 animate-pulse"></View>
              <View className="h-3 bg-gray-200 rounded w-12 animate-pulse"></View>
            </View>
          </View>
        ))}
      </View>

      {/* Earlier Section Skeleton */}
      <View className="h-6 w-20 bg-gray-200 rounded mb-3 mt-4 animate-pulse"></View>
      <View className="mt-4">
        {[...Array(2)].map((_, index) => (
          <View
            key={index}
            className="flex-row justify-between bg-white p-4 mb-2 rounded-xl shadow-sm"
          >
            {/* Left side */}
            <View className="flex-row flex-1">
              <View>
                <View className="rounded-md p-2 bg-gray-200 w-10 h-10 animate-pulse"></View>
              </View>
              <View className="ml-3 flex-1">
                <View className="h-5 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></View>
                <View className="h-4 bg-gray-200 rounded w-full animate-pulse"></View>
              </View>
            </View>

            {/* Right side */}
            <View className="flex flex-col items-end">
              <View className="w-2 h-2 bg-gray-200 rounded-full mb-1 animate-pulse"></View>
              <View className="h-3 bg-gray-200 rounded w-12 animate-pulse"></View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

// If you need a custom animation (in case Tailwind's animate-pulse doesn't work)
const AnimatedSkeleton = () => {
  return (
    <View className="flex-1 mt-14">
      {/* Today Section Skeleton */}
      <View className="h-6 w-20 bg-gray-200 rounded mb-3 opacity-50"></View>
      <View className="mt-3">
        {[...Array(3)].map((_, index) => (
          <View
            key={index}
            className="flex-row justify-between bg-white p-4 mb-3 rounded-xl"
          >
            {/* Left side */}
            <View className="flex-row flex-1">
              <View>
                <View className="rounded-md p-2 bg-gray-200 w-10 h-10 opacity-50"></View>
              </View>
              <View className="ml-3 flex-1">
                <View className="h-5 bg-gray-200 rounded w-3/4 mb-2 opacity-50"></View>
                <View className="h-4 bg-gray-200 rounded w-full opacity-50"></View>
              </View>
            </View>

            {/* Right side */}
            <View className="flex flex-col items-end">
              <View className="w-2 h-2 bg-gray-200 rounded-full mb-1 opacity-50"></View>
              <View className="h-3 bg-gray-200 rounded w-12 opacity-50"></View>
            </View>
          </View>
        ))}
      </View>

      {/* Earlier Section Skeleton */}
      <View className="h-6 w-20 bg-gray-200 rounded mb-3 mt-4 opacity-50"></View>
      <View className="mt-4">
        {[...Array(2)].map((_, index) => (
          <View
            key={index}
            className="flex-row justify-between bg-white p-4 mb-2 rounded-xl shadow-sm"
          >
            {/* Left side */}
            <View className="flex-row flex-1">
              <View>
                <View className="rounded-md p-2 bg-gray-200 w-10 h-10 opacity-50"></View>
              </View>
              <View className="ml-3 flex-1">
                <View className="h-5 bg-gray-200 rounded w-3/4 mb-2 opacity-50"></View>
                <View className="h-4 bg-gray-200 rounded w-full opacity-50"></View>
              </View>
            </View>

            {/* Right side */}
            <View className="flex flex-col items-end">
              <View className="w-2 h-2 bg-gray-200 rounded-full mb-1 opacity-50"></View>
              <View className="h-3 bg-gray-200 rounded w-12 opacity-50"></View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const NotificationList = () => {
  const [notifications, setNotifications] = useState([]);
  const [groupedNotifications, setGroupedNotifications] = useState({
    today: [],
    earlier: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to group notifications by date
  const groupNotificationsByDate = (notifications) => {
    const today = new Date();
    const todayStart = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    const grouped = {
      today: [],
      earlier: [],
    };

    notifications.forEach((notification) => {
      const notificationDate = new Date(notification.created_at);

      if (notificationDate >= todayStart) {
        grouped.today.push(notification);
      } else {
        grouped.earlier.push(notification);
      }
    });

    return grouped;
  };

  // Function to format time from ISO string
  const formatTime = (isoString) => {
    const date = new Date(isoString);
    return date
      .toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
      .toUpperCase();
  };

  // Function to get icon based on notification type
  const getNotificationIcon = (type) => {
    switch (type) {
      case "project_created":
        return <PersonIcon />;
      default:
        return <Notification />;
    }
  };

  // Function to get background color based on notification type
  const getNotificationBgColor = (type) => {
    switch (type) {
      case "project_created":
        return "bg-[#DFF8E9]";
      default:
        return "bg-[#E6F6FF]";
    }
  };

  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.get(
        "/api/v1/notifications/notifications"
      );
      setNotifications(response.data);
      setGroupedNotifications(groupNotificationsByDate(response.data));
    } catch (err) {
      setError(err.message || "Failed to fetch notifications");
      console.error("Error fetching notifications:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // Show skeleton loading state
  if (loading) {
    return <NotificationSkeleton />;
    // OR use the non-animated version:
    // return <AnimatedSkeleton />;
  }

  // Show error state
  if (error) {
    return (
      <View className="flex-1 mt-14 justify-center items-center">
        <Text16 className="text-red-500">Error: {error}</Text16>
      </View>
    );
  }

  return (
    <View className="flex-1 mt-14">
      {/* Today Section */}
      {groupedNotifications.today.length > 0 && (
        <>
          <Text16Bold>Today</Text16Bold>
          <View className="mt-3">
            {groupedNotifications.today.map((notification) => (
              <View
                key={notification.id}
                className="flex-row justify-between bg-white p-4 mb-3 rounded-xl"
              >
                {/* Left side */}
                <View className="flex-row flex-1">
                  <View>
                    <View
                      className={`rounded-md p-2 ${getNotificationBgColor(
                        notification.type
                      )}`}
                    >
                      {getNotificationIcon(notification.type)}
                    </View>
                  </View>
                  <View className="ml-3 flex-1">
                    <Text16Bold numberOfLines={1}>
                      {notification.title}
                    </Text16Bold>
                    <Text14 numberOfLines={1}>
                      {notification.project.name} -{" "}
                      {notification.project.design_type}
                    </Text14>
                  </View>
                </View>

                {/* Right side (time and read status) */}
                <View className="flex flex-col items-end">
                  {!notification.is_read && (
                    <View className="w-2 h-2 bg-primary rounded-full mb-1"></View>
                  )}
                  <Text14 className="text-[#A5A5A5] text-[10px] shrink-0">
                    {formatTime(notification.created_at)}
                  </Text14>
                </View>
              </View>
            ))}
          </View>
        </>
      )}

      {/* Earlier Section */}
      {groupedNotifications.earlier.length > 0 && (
        <>
          <Text16Bold className="mt-4">Earlier</Text16Bold>
          <View className="mt-4">
            {groupedNotifications.earlier.map((notification) => (
              <View
                key={notification.id}
                className="flex-row justify-between bg-white p-4 mb-2 rounded-xl shadow-sm"
              >
                {/* Left side */}
                <View className="flex-row flex-1">
                  <View>
                    <View
                      className={`rounded-md p-2 ${getNotificationBgColor(
                        notification.type
                      )}`}
                    >
                      {getNotificationIcon(notification.type)}
                    </View>
                  </View>
                  <View className="ml-3 flex-1">
                    <Text16Bold numberOfLines={1}>
                      {notification.title}
                    </Text16Bold>
                    <Text14 numberOfLines={1}>
                      {notification.project.name} -{" "}
                      {notification.project.design_type}
                    </Text14>
                  </View>
                </View>

                {/* Right side (time and read status) */}
                <View className="flex flex-col items-end">
                  {!notification.is_read && (
                    <View className="w-2 h-2 bg-primary rounded-full mb-1"></View>
                  )}
                  <Text14 className="text-[#A5A5A5] text-[10px] shrink-0">
                    {formatTime(notification.created_at)}
                  </Text14>
                </View>
              </View>
            ))}
          </View>
        </>
      )}

      {/* Empty state */}
      {notifications.length === 0 && !loading && (
        <View className="flex-1 justify-center items-center">
          <Text16>No notifications found</Text16>
        </View>
      )}
    </View>
  );
};

export default NotificationList;
