"use client";
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Clock, CheckCircle } from "lucide-react";
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
import { AvatarFallback } from "@radix-ui/react-avatar";

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

const applicationData = [
  { name: "Jan", applications: 20 },
  { name: "Feb", applications: 35 },
  { name: "Mar", applications: 25 },
  { name: "Apr", applications: 45 },
  { name: "May", applications: 35 },
  { name: "Jun", applications: 55 },
];

const recentApplicants = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Software Engineer",
    status: "pending",
    date: "2024-02-13",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Product Manager",
    status: "completed",
    date: "2024-02-12",
  },
  {
    id: 3,
    name: "Emma Davis",
    role: "UX Designer",
    status: "pending",
    date: "2024-02-11",
  },
  // Add more applicants as needed up to 20
];

const AdminDashboard = () => {
  const stats = [
    {
      title: "All Applicants",
      value: "156",
      icon: <Users className="h-5 w-5 text-muted-foreground" />,
      description: "Total applications received",
    },
    {
      title: "Pending Applications",
      value: "43",
      icon: <Clock className="h-5 w-5 text-muted-foreground" />,
      description: "Awaiting review",
    },
    {
      title: "Completed Applications",
      value: "113",
      icon: <CheckCircle className="h-5 w-5 text-muted-foreground" />,
      description: "Successfully processed",
    },
  ];

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
              {recentApplicants.map((applicant) => (
                <RecentApplicantCard key={applicant.id} applicant={applicant} />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-full lg:col-span-7">
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <ApplicationChart />
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

const ApplicationChart = () => {
  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer>
        <LineChart
          data={applicationData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
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
  );
};

const RecentApplicantCard = ({ applicant }) => {
  const statusColor = {
    pending: "bg-yellow-100 text-yellow-800",
    completed: "bg-green-100 text-green-800",
  };

  return (
    <div className="p-4 border-b last:border-b-0 hover:bg-gray-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Avatar className="h-10 w-10 bg-gray-200">
            <AvatarFallback>
              {" "}
              {applicant.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">{applicant.name}</h3>
            <p className="text-sm text-gray-500">{applicant.role}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className={statusColor[applicant.status]}>
            {applicant.status.charAt(0).toUpperCase() +
              applicant.status.slice(1)}
          </Badge>
          <span className="text-sm text-gray-500">
            {new Date(applicant.date).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
