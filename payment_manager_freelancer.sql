-- phpMyAdmin SQL Dump
-- version 4.9.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Oct 02, 2022 at 07:12 AM
-- Server version: 10.3.36-MariaDB-log
-- PHP Version: 7.4.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `carats7_payment_manager_freelancer`
--

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `SKU` int(11) DEFAULT NULL,
  `ItemUrl` varchar(1500) DEFAULT NULL,
  `Supplier` varchar(250) DEFAULT NULL,
  `Description` varchar(2000) DEFAULT NULL,
  `Cost_USD` decimal(10,2) DEFAULT NULL,
  `Shipping_USD` decimal(10,2) DEFAULT NULL,
  `IsrealSellingPriceUSD` decimal(10,2) DEFAULT NULL,
  `₪_Rate` decimal(10,2) DEFAULT NULL,
  `Remark` decimal(10,2) DEFAULT NULL,
  `MethodPaid` varchar(100) DEFAULT NULL,
  `MethodPaidInfo` varchar(1000) DEFAULT NULL,
  `Reshimon` int(200) DEFAULT NULL,
  `Amount_paid_supplier_ILS` decimal(10,2) DEFAULT NULL,
  `PaidSupplier` varchar(10) DEFAULT NULL,
  `PaidShipping` tinytext DEFAULT NULL,
  `VATPaidSupplierILS` decimal(10,2) DEFAULT NULL,
  `ReportedVATForVatBack` text DEFAULT NULL,
  `ReportedVatExport` mediumtext DEFAULT NULL,
  `CD2U_Invoice` varchar(15) DEFAULT NULL,
  `PaymnetILReport` char(10) DEFAULT NULL,
  `PaidIsreal` text DEFAULT NULL,
  `PaymentType` varchar(30) DEFAULT NULL,
  `CheckInfo` varchar(3000) DEFAULT NULL COMMENT 'On the original sell spreadsheet we put all the information into CheckInfo\r\nregarding the checks\r\nin the process of moving into managing the data from the front end\r\nWe decided to break up both types of checks to  Regular & Vat',
  `CheckRegular` char(50) DEFAULT NULL COMMENT 'On the original sell spreadsheet we put all the information into CheckInfo\r\nregarding the checks\r\nin the process of moving into managing the data from the front end\r\nWe decided to break up both types of checks to  Regular & Vat',
  `CheckVat` char(50) DEFAULT NULL COMMENT 'On the original sell spreadsheet we put all the information into CheckInfo\r\nregarding the checks\r\nin the process of moving into managing the data from the front end\r\nWe decided to break up both types of checks to  Regular & Vat',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `SKU`, `ItemUrl`, `Supplier`, `Description`, `Cost_USD`, `Shipping_USD`, `IsrealSellingPriceUSD`, `₪_Rate`, `Remark`, `MethodPaid`, `MethodPaidInfo`, `Reshimon`, `Amount_paid_supplier_ILS`, `PaidSupplier`, `PaidShipping`, `VATPaidSupplierILS`, `ReportedVATForVatBack`, `ReportedVatExport`, `CD2U_Invoice`, `PaymnetILReport`, `PaidIsreal`, `PaymentType`, `CheckInfo`, `CheckRegular`, `CheckVat`, `created_at`, `updated_at`) VALUES
(100, 19000281, '', 'DBC', '18k White Rhombus Diamond Multi-Stone Set Marquise Hexagram Star of David Pendant (0.76 Ct H VS Clarity)\n6 stones(diamonds)', '1270.00', '71.00', '1416.43', '3.29', NULL, NULL, NULL, 19076562, NULL, 'Yes', 'Yes', '7000.00', 'Yes', 'yes', '5734', 'J9', 'Yes', 'Cash', 'רגיל-10413\nמע\"מ-691.05', NULL, NULL, '2022-05-24 21:00:00', '2022-09-23 05:40:27'),
(13131, 19000052, '', 'dave', '18k White Gold Round &  Pear Cut Diamonds Pendant (Blue & White Diamonds, VS Clarity)Multiple Stones stones(diamonds)', '700.00', '71.00', '1166.98', '3.17', NULL, NULL, NULL, 194841094, '660.00', 'Yes', NULL, '541.97', NULL, 'yes', '5736', 'J9', 'Yes', 'Cash', 'רגיל -3187.75\nציק-541.97', NULL, NULL, '2025-05-21 21:00:00', '2022-09-22 14:31:19');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Supplier` (`Supplier`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
