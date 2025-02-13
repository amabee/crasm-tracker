"use client";

import DataTable from "./datatable";
import { motion } from "framer-motion";

export default function ApplicationsPage() {
  console.log("Rendering ApplicationsPage");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      className="flex-1 space-y-4 p-4 md:p-8 pt-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div
        className="flex items-center justify-between space-y-2"
        variants={itemVariants}
      >
        <div>
          <motion.h2
            className="text-3xl font-bold tracking-tight"
            variants={itemVariants}
          >
            Applications
          </motion.h2>
          <motion.p className="text-muted-foreground" variants={itemVariants}>
            Here's a list of all applications in the CRASM Tracker
          </motion.p>
        </div>
      </motion.div>
      <motion.div variants={itemVariants}>
        <DataTable />
      </motion.div>
    </motion.div>
  );
}
