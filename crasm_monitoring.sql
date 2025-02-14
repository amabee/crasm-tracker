-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 14, 2025 at 09:17 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `crasm_monitoring`
--

-- --------------------------------------------------------

--
-- Table structure for table `applications`
--

CREATE TABLE `applications` (
  `application_id` int(11) NOT NULL,
  `name_of_applicant` varchar(255) DEFAULT NULL,
  `provincial_office` int(11) NOT NULL,
  `date_received_by_po_from_so_applicant` date DEFAULT NULL,
  `type_of_application` varchar(100) DEFAULT NULL,
  `date_of_payment` date DEFAULT NULL,
  `or_number` varchar(100) DEFAULT NULL,
  `date_transmitted_to_ro` date DEFAULT NULL,
  `date_received_by_ro` date DEFAULT NULL,
  `ro_screener` date DEFAULT NULL,
  `date_forwarded_to_the_office_of_oic` date DEFAULT NULL,
  `oic_crasd` varchar(255) DEFAULT NULL,
  `feedbacks` text DEFAULT NULL,
  `date_forwarded_to_ord` date DEFAULT NULL,
  `date_application_approved_by_rd` date DEFAULT NULL,
  `for_issuance_of_crasm` date DEFAULT NULL,
  `for_transmittal_of_crasm` date DEFAULT NULL,
  `date_crasm_generated` date DEFAULT NULL,
  `date_forwarded_back_to_the_office_of_oic_cao` date DEFAULT NULL,
  `date_reviewed_and_initialed_by_oic_crasd` date DEFAULT NULL,
  `date_forwarded_back_to_ord` date DEFAULT NULL,
  `date_transmitted_back_to_po` date DEFAULT NULL,
  `date_received_by_po` date DEFAULT NULL,
  `date_released_to_so` date DEFAULT NULL,
  `remarks` text DEFAULT NULL,
  `date_created` datetime NOT NULL DEFAULT current_timestamp(),
  `last_updated` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `applications`
--

INSERT INTO `applications` (`application_id`, `name_of_applicant`, `provincial_office`, `date_received_by_po_from_so_applicant`, `type_of_application`, `date_of_payment`, `or_number`, `date_transmitted_to_ro`, `date_received_by_ro`, `ro_screener`, `date_forwarded_to_the_office_of_oic`, `oic_crasd`, `feedbacks`, `date_forwarded_to_ord`, `date_application_approved_by_rd`, `for_issuance_of_crasm`, `for_transmittal_of_crasm`, `date_crasm_generated`, `date_forwarded_back_to_the_office_of_oic_cao`, `date_reviewed_and_initialed_by_oic_crasd`, `date_forwarded_back_to_ord`, `date_transmitted_back_to_po`, `date_received_by_po`, `date_released_to_so`, `remarks`, `date_created`, `last_updated`) VALUES
(1, 'Jessane Grace', 3, NULL, 'JOB Application', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-02-14 15:36:35', NULL),
(2, 'Ghislaine Dedoldia', 2, NULL, 'Job Application', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-02-14 16:05:15', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `provincial_office`
--

CREATE TABLE `provincial_office` (
  `province_id` int(11) NOT NULL,
  `provincial_office` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `provincial_office`
--

INSERT INTO `provincial_office` (`province_id`, `provincial_office`, `created_at`, `updated_at`) VALUES
(1, 'Camiguin', '2025-01-10 06:56:09', NULL),
(2, 'Misamis Oriental', '2025-01-10 06:56:09', NULL),
(3, 'Lanao del Norte', '2025-01-10 06:56:39', NULL),
(4, 'Bukidnon', '2025-01-10 06:56:39', NULL),
(5, 'Misamis Occidental', '2025-01-10 06:56:56', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL,
  `session_data` text DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `expires_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`session_id`, `user_id`, `session_data`, `created_at`, `expires_at`) VALUES
('106ff62f4b6bee1b5052ff058896fedbb05560797084b88720dc2536a796e80c', 2, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjcmFzbS1tb25pdG9yaW5nIiwiaWF0IjoxNzM4MjA5MzQxLCJleHAiOjE3MzgyMTI5NDEsInN1YiI6MiwidXNlciI6eyJpZCI6MiwidXNlcm5hbWUiOiJ1c2VyIiwiZnVsbF9uYW1lIjoiWXZlcyBPd2VuIEJvbml0YSIsImVtYWlsIjoieXZlc21lbjE5OThAZ21haWwuY29tIiwidXNlcl90eXBlX2lkIjoxfX0.ZLGQsk-SgmXw1pfpflPt7AdjPswC7WLXdXbSQwnFfrU', '2025-01-30 11:55:41', '2025-01-30 12:55:41'),
('1114628a9d18d62f981f5f2a7772bd2a6bb908f9c92b92cfb65a7fc3f738829c', 2, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjcmFzbS1tb25pdG9yaW5nIiwiaWF0IjoxNzM4MjA5MDg1LCJleHAiOjE3MzgyMTI2ODUsInN1YiI6MiwidXNlciI6eyJpZCI6MiwidXNlcm5hbWUiOiJ1c2VyIiwiZnVsbF9uYW1lIjoiWXZlcyBPd2VuIEJvbml0YSIsImVtYWlsIjoieXZlc21lbjE5OThAZ21haWwuY29tIiwidXNlcl90eXBlX2lkIjoxfX0.PAvx6-sTv9pTwonVv16GD6gp8AZLFgsSg84QqiaaF8Y', '2025-01-30 11:51:25', '2025-01-30 12:51:25'),
('255c5bf248077511fdacfeee98300a78444ce1e85b22ddfae2e131a8021b45b9', 2, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjcmFzbS1tb25pdG9yaW5nIiwiaWF0IjoxNzM4MjA3NzAzLCJleHAiOjE3MzgyMTEzMDMsInN1YiI6MiwidXNlciI6eyJpZCI6MiwidXNlcm5hbWUiOiJ1c2VyIiwiZnVsbF9uYW1lIjoiWXZlcyBPd2VuIEJvbml0YSIsImVtYWlsIjoieXZlc21lbjE5OThAZ21haWwuY29tIiwidXNlcl90eXBlX2lkIjoxfX0.gCksQ-MyW3slmEj1sCsqbQ0QeWfNlLTVkPzS1R0MmB4', '2025-01-30 11:28:23', '2025-01-30 12:28:23'),
('3295bec15cfb1332127fe08435e0806fb65539f3f0dd859c63a0d74c0bae9e02', 2, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjcmFzbS1tb25pdG9yaW5nIiwiaWF0IjoxNzM4MjA4NTAwLCJleHAiOjE3MzgyMTIxMDAsInN1YiI6MiwidXNlciI6eyJpZCI6MiwidXNlcm5hbWUiOiJ1c2VyIiwiZnVsbF9uYW1lIjoiWXZlcyBPd2VuIEJvbml0YSIsImVtYWlsIjoieXZlc21lbjE5OThAZ21haWwuY29tIiwidXNlcl90eXBlX2lkIjoxfX0.WdIZ_kqNeho4PcNIEiB6rLsyMVtioK73QoNEcoTY-oI', '2025-01-30 11:41:40', '2025-01-30 12:41:40'),
('3aa6a5af0aeb9d609b22a88d69cca63c545b70f06f0e05ce2a92b5f9970d5d0a', 2, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjcmFzbS1tb25pdG9yaW5nIiwiaWF0IjoxNzM4MjA4NDE4LCJleHAiOjE3MzgyMTIwMTgsInN1YiI6MiwidXNlciI6eyJpZCI6MiwidXNlcm5hbWUiOiJ1c2VyIiwiZnVsbF9uYW1lIjoiWXZlcyBPd2VuIEJvbml0YSIsImVtYWlsIjoieXZlc21lbjE5OThAZ21haWwuY29tIiwidXNlcl90eXBlX2lkIjoxfX0.URpMoJgrZAJ9t4rH9PvZbap2WhiI9U_Ewenr4raKKug', '2025-01-30 11:40:18', '2025-01-30 12:40:18'),
('611fba475394233de2487bb43eb021bc6f98146ace6d0b6242a309867ced6823', 2, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjcmFzbS1tb25pdG9yaW5nIiwiaWF0IjoxNzM4MjA3OTgxLCJleHAiOjE3MzgyMTE1ODEsInN1YiI6MiwidXNlciI6eyJpZCI6MiwidXNlcm5hbWUiOiJ1c2VyIiwiZnVsbF9uYW1lIjoiWXZlcyBPd2VuIEJvbml0YSIsImVtYWlsIjoieXZlc21lbjE5OThAZ21haWwuY29tIiwidXNlcl90eXBlX2lkIjoxfX0.FooqpCm7djRmyhrMr4JD5Ptwr63_sTTI3_XGG0p_e_A', '2025-01-30 11:33:01', '2025-01-30 12:33:01'),
('61c932eae16ce435e9f274030266a4d22a7f6a9b57fe7582d6f79d6942fb2024', 2, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjcmFzbS1tb25pdG9yaW5nIiwiaWF0IjoxNzM4MjA4NTE4LCJleHAiOjE3MzgyMTIxMTgsInN1YiI6MiwidXNlciI6eyJpZCI6MiwidXNlcm5hbWUiOiJ1c2VyIiwiZnVsbF9uYW1lIjoiWXZlcyBPd2VuIEJvbml0YSIsImVtYWlsIjoieXZlc21lbjE5OThAZ21haWwuY29tIiwidXNlcl90eXBlX2lkIjoxfX0.D7_NpUMlKs7g9XFYcdwnWJrl_Fekpb1HAXVleLfteWE', '2025-01-30 11:41:58', '2025-01-30 12:41:58'),
('62f4647b17b717a371cfe71a939a15b386c8342f40c65584c65a5f41a47cd262', 2, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjcmFzbS1tb25pdG9yaW5nIiwiaWF0IjoxNzM4MjA4MDM3LCJleHAiOjE3MzgyMTE2MzcsInN1YiI6MiwidXNlciI6eyJpZCI6MiwidXNlcm5hbWUiOiJ1c2VyIiwiZnVsbF9uYW1lIjoiWXZlcyBPd2VuIEJvbml0YSIsImVtYWlsIjoieXZlc21lbjE5OThAZ21haWwuY29tIiwidXNlcl90eXBlX2lkIjoxfX0.EaPv94TohGbtGjY-lf5tn-nB4MHLt0ANlQUkS4lgJuY', '2025-01-30 11:33:57', '2025-01-30 12:33:57'),
('6d35e56299aed6496023c621ecc3ffc0bd91dfc88ab996d5fbedef689b77a955', 2, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjcmFzbS1tb25pdG9yaW5nIiwiaWF0IjoxNzM4MjA4NzQ5LCJleHAiOjE3MzgyMTIzNDksInN1YiI6MiwidXNlciI6eyJpZCI6MiwidXNlcm5hbWUiOiJ1c2VyIiwiZnVsbF9uYW1lIjoiWXZlcyBPd2VuIEJvbml0YSIsImVtYWlsIjoieXZlc21lbjE5OThAZ21haWwuY29tIiwidXNlcl90eXBlX2lkIjoxfX0.UvBMPu7H1B6JKvWFIDUPI_VxjTxi5tgusGVig3ixAJw', '2025-01-30 11:45:49', '2025-01-30 12:45:49'),
('6d5d2053512220898c9968c6210f68e46d8d25e63adfefdb6e9482bec1171d0c', 2, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjcmFzbS1tb25pdG9yaW5nIiwiaWF0IjoxNzM4MjA3OTA0LCJleHAiOjE3MzgyMTE1MDQsInN1YiI6MiwidXNlciI6eyJpZCI6MiwidXNlcm5hbWUiOiJ1c2VyIiwiZnVsbF9uYW1lIjoiWXZlcyBPd2VuIEJvbml0YSIsImVtYWlsIjoieXZlc21lbjE5OThAZ21haWwuY29tIiwidXNlcl90eXBlX2lkIjoxfX0.OM83jdUn9Prd0m3nsH-hcMjd643eGTnplT2du78N-ag', '2025-01-30 11:31:44', '2025-01-30 12:31:44'),
('9d32a7a8adb10fdd9466f6a5bc0be20f39e67db6956ee1490c6f0e3589a19430', 2, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjcmFzbS1tb25pdG9yaW5nIiwiaWF0IjoxNzM2NjU0OTczLCJleHAiOjE3MzY2NTg1NzMsInN1YiI6MiwidXNlciI6eyJpZCI6MiwidXNlcm5hbWUiOiJ1c2VyIiwiZnVsbF9uYW1lIjoiWXZlcyBPd2VuIEJvbml0YSIsImVtYWlsIjoieXZlc21lbjE5OThAZ21haWwuY29tIiwidXNlcl90eXBlX2lkIjoxfX0.mVYCcEHIh0dCQNLmVbnUKGFNb3v085_o4EEVA9KQeOs', '2025-01-12 12:09:33', '2025-01-12 13:09:33'),
('b80fa72deba11a75e5b618f61f8fe63c2f25215f057455f292158217eb5fe2af', 2, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjcmFzbS1tb25pdG9yaW5nIiwiaWF0IjoxNzM4MjA4NTI0LCJleHAiOjE3MzgyMTIxMjQsInN1YiI6MiwidXNlciI6eyJpZCI6MiwidXNlcm5hbWUiOiJ1c2VyIiwiZnVsbF9uYW1lIjoiWXZlcyBPd2VuIEJvbml0YSIsImVtYWlsIjoieXZlc21lbjE5OThAZ21haWwuY29tIiwidXNlcl90eXBlX2lkIjoxfX0.KVlPO-kMhN5T2zxE9ojCsQFyaXmJzIOIpZ30nLkI0P0', '2025-01-30 11:42:04', '2025-01-30 12:42:04'),
('d6f6382961586461d313c432109e8812a399bef1791509234dff1a3973834f66', 2, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjcmFzbS1tb25pdG9yaW5nIiwiaWF0IjoxNzM4MjA5MDQwLCJleHAiOjE3MzgyMTI2NDAsInN1YiI6MiwidXNlciI6eyJpZCI6MiwidXNlcm5hbWUiOiJ1c2VyIiwiZnVsbF9uYW1lIjoiWXZlcyBPd2VuIEJvbml0YSIsImVtYWlsIjoieXZlc21lbjE5OThAZ21haWwuY29tIiwidXNlcl90eXBlX2lkIjoxfX0.QzVgzzDLL6gdVA02JY8zi6ZSs46pgEq7_XrHbGK5UZA', '2025-01-30 11:50:40', '2025-01-30 12:50:40'),
('e45e4d98d13e3fc93f4d1f0115727bcba73d6dc716579fc5cace81a4fcecbbf9', 2, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjcmFzbS1tb25pdG9yaW5nIiwiaWF0IjoxNzM4MjA4MTQ2LCJleHAiOjE3MzgyMTE3NDYsInN1YiI6MiwidXNlciI6eyJpZCI6MiwidXNlcm5hbWUiOiJ1c2VyIiwiZnVsbF9uYW1lIjoiWXZlcyBPd2VuIEJvbml0YSIsImVtYWlsIjoieXZlc21lbjE5OThAZ21haWwuY29tIiwidXNlcl90eXBlX2lkIjoxfX0.rMiXLtDmJ9qGHrM8CE1PVszlmicfKSQQFKAIl1bdEDs', '2025-01-30 11:35:46', '2025-01-30 12:35:46'),
('f18e9111b4b9bec64f465586e61e83a54ed634403bc06d76fad4a90213ea014e', 2, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjcmFzbS1tb25pdG9yaW5nIiwiaWF0IjoxNzM4MjA4Nzg3LCJleHAiOjE3MzgyMTIzODcsInN1YiI6MiwidXNlciI6eyJpZCI6MiwidXNlcm5hbWUiOiJ1c2VyIiwiZnVsbF9uYW1lIjoiWXZlcyBPd2VuIEJvbml0YSIsImVtYWlsIjoieXZlc21lbjE5OThAZ21haWwuY29tIiwidXNlcl90eXBlX2lkIjoxfX0.FN45ze7W6yyVK7sJfR3Xs8Xw5rCYqtc3tFOpj4wXnzg', '2025-01-30 11:46:27', '2025-01-30 12:46:27');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `province_id` int(11) DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(500) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `user_type_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `is_active` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `province_id`, `username`, `password`, `full_name`, `email`, `user_type_id`, `created_at`, `updated_at`, `is_active`) VALUES
(2, 1, 'user', '81c1eed552b280dabcd1b935770f2ddd7c9b89ac', 'Yves Owen Bonita', 'yvesmen1998@gmail.com', 1, '2025-01-10 06:59:27', '2025-02-14 05:21:41', 1),
(13, 3, 'sgorra048', 'bac1c1878168149d87d75543d011186a06e8f43e', 'Shan Gorra', 'shma.gorra.coc@phinmaed.com', 4, '2025-02-14 02:56:05', '2025-02-14 05:41:52', 1),
(14, NULL, 'psho069', '83f889b62a5ba8eaaa3aa2f6715a6b9e1ee8aaed', 'Paul Sho', 'joda.orencio.coc@phinmaed.com', 2, '2025-02-14 03:03:21', '2025-02-14 06:59:25', 1),
(19, 2, 'jdee400', 'f622af3fab4095bb6563a1ccd74eb8ce57fca5de', 'John Dee', 'johndee@gmail.com', 5, '2025-02-14 03:32:59', '2025-02-14 05:47:47', 1);

-- --------------------------------------------------------

--
-- Table structure for table `usertypes`
--

CREATE TABLE `usertypes` (
  `user_type_id` int(11) NOT NULL,
  `user_type_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `usertypes`
--

INSERT INTO `usertypes` (`user_type_id`, `user_type_name`) VALUES
(1, 'Admin'),
(4, 'Collecting Officer'),
(3, 'OIC/CAO'),
(5, 'Provincial'),
(2, 'RD');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `applications`
--
ALTER TABLE `applications`
  ADD PRIMARY KEY (`application_id`),
  ADD KEY `provincial_office` (`provincial_office`);

--
-- Indexes for table `provincial_office`
--
ALTER TABLE `provincial_office`
  ADD PRIMARY KEY (`province_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD KEY `user_type_id` (`user_type_id`),
  ADD KEY `province_id` (`province_id`);

--
-- Indexes for table `usertypes`
--
ALTER TABLE `usertypes`
  ADD PRIMARY KEY (`user_type_id`),
  ADD UNIQUE KEY `user_type_name` (`user_type_name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `applications`
--
ALTER TABLE `applications`
  MODIFY `application_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `provincial_office`
--
ALTER TABLE `provincial_office`
  MODIFY `province_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `usertypes`
--
ALTER TABLE `usertypes`
  MODIFY `user_type_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `applications`
--
ALTER TABLE `applications`
  ADD CONSTRAINT `applications_ibfk_1` FOREIGN KEY (`provincial_office`) REFERENCES `provincial_office` (`province_id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`user_type_id`) REFERENCES `usertypes` (`user_type_id`),
  ADD CONSTRAINT `users_ibfk_2` FOREIGN KEY (`province_id`) REFERENCES `provincial_office` (`province_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
