"use client";
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Clock, CheckCircle, MapPin, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useOverview } from "@/hooks/oiccaoHooks/useOverView";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 },
};

const RecentApplicantCard = ({ applicant }) => {
  const statusColor = {
    "in progress": "bg-amber-100 text-amber-700 border-amber-200",
    complete: "bg-emerald-100 text-emerald-700 border-emerald-200",
  };

  // Updated with more saturated colors for better visibility
  const avatarColors = [
    "bg-blue-200 text-blue-800",
    "bg-green-200 text-green-800",
    "bg-purple-200 text-purple-800",
    "bg-pink-200 text-pink-800",
    "bg-indigo-200 text-indigo-800",
    "bg-orange-200 text-orange-800",
    "bg-teal-200 text-teal-800",
    "bg-red-200 text-red-800",
  ];

  const getAvatarColor = (name) => {
    const index = name
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return avatarColors[index % avatarColors.length];
  };

  const readableDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const [bgColor, textColor] = getAvatarColor(applicant.name).split(" ");

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative px-6 py-4 border-b last:border-b-0 hover:bg-slate-50/50 transition-colors duration-200"
    >
      <div
        className={`absolute left-0 top-0 h-full w-1 ${
          applicant.status.toLowerCase() === "complete"
            ? "bg-emerald-500"
            : "bg-amber-500"
        }`}
      />

      <div className="flex items-center gap-4">
        <Avatar className="h-12 w-12">
          <AvatarImage
            src={`https://placehold.co/800@2x/FFAC1C/FFF?text=${applicant.name
              ?.split(" ")
              .map((n) => n[0])
              .join("")}`}
          />
          <AvatarFallback
            className={`${bgColor} ${textColor} font-medium text-center`}
          >
            {applicant.name
              ?.split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-semibold text-slate-800 leading-none">
              {applicant.name}
            </h3>
            <Badge
              className={`px-2 py-0.5 text-xs font-medium border pointer-events-none ${
                statusColor[applicant.status.toLowerCase()]
              }`}
            >
              {applicant.status}
            </Badge>
          </div>

          <div className="flex items-center justify-between text-sm text-slate-500">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              <span className="font-medium">{applicant.province}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>{readableDate(applicant.date_created)}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const RDDashboard = () => {
  const { data, isLoading, error } = useOverview();

  const formatMonthlyData = (monthlyData) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const formattedData = months.map((name, index) => ({
      name,
      applications: 0,
      month: index + 1,
    }));

    monthlyData?.forEach((item) => {
      formattedData[item.month - 1].applications = Number(item.total);
    });

    return formattedData;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg">Loading dashboard data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-500">
          Error loading dashboard: {error.message}
        </div>
      </div>
    );
  }

  const stats = [
    {
      title: "All Applicants",
      value: data?.total_applications || 0,
      icon: <Users className="h-5 w-5 text-muted-foreground" />,
      description: "Total applications received",
    },
    {
      title: "Pending Applications",
      value: data?.pending_applications || 0,
      icon: <Clock className="h-5 w-5 text-muted-foreground" />,
      description: "Awaiting review",
    },
    {
      title: "Completed Applications",
      value:
        (data?.total_applications || 0) - (data?.pending_applications || 0),
      icon: <CheckCircle className="h-5 w-5 text-muted-foreground" />,
      description: "Successfully processed",
    },
  ];

  const chartData = formatMonthlyData(data?.monthly_applications);

  return (
    <div className="space-y-8 p-4">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
      >
        {stats.map((stat, index) => (
          <motion.div key={index} variants={item}>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                {stat.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-12"
      >
        <Card className="col-span-full lg:col-span-5">
          <CardHeader>
            <CardTitle>Recent Applications</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="max-h-[500px] overflow-y-auto">
              {data?.recent_applications?.map((application, index) => (
                <RecentApplicantCard
                  key={application.application_id || index}
                  applicant={{
                    id: application.application_id,
                    name: application.name_of_applicant,
                    status: application.status,
                    date_created: application.date_created,
                    province: application.provincial_name,
                  }}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-full lg:col-span-7">
          <CardHeader>
            <CardTitle>
              Monthly Applications ({new Date().getFullYear()})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full h-[400px]">
              <ResponsiveContainer>
                <LineChart
                  data={chartData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    className="stroke-gray-200"
                  />
                  <XAxis dataKey="name" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="applications"
                    stroke="#2563eb"
                    strokeWidth={2}
                    dot={{ fill: "#2563eb" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default RDDashboard;
