-- phpMyAdmin SQL Dump
-- version 5.2.1-1.el7.remi
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 07, 2024 at 07:24 PM
-- Server version: 10.6.16-MariaDB-log
-- PHP Version: 8.2.14
SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cs340_martinz2`
--
-- CREATE DATABASE IF NOT EXISTS `cs340_martinz2` DEFAULT CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci;
USE `cs340_martinz2`;

-- --------------------------------------------------------

--
-- Table structure for table `Agents`
--

CREATE OR REPLACE TABLE `Agents` (
  `AgentID` int(11) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `PhoneNumber` int(11) NOT NULL,
  `AgencyName` varchar(100) DEFAULT NULL,
  `LicenseNumber` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `Agents`
--

INSERT INTO `Agents` (`AgentID`, `firstName`, `lastName`, `Email`, `PhoneNumber`, `AgencyName`, `LicenseNumber`) VALUES
(1, 'Jane ', 'Doe', 'john.smith@realty.com', 555, 'Sunny Realty', 'ABC12345'),
(2, 'John', 'Smith', 'jane.doe@example.com', 555, 'Urban Living Ltd', 'XYZ67890'),
(3, 'Emily', 'Turner', 'emily.turner@lake.com', 555, 'Lakeside Homes', 'LMN54321');

-- --------------------------------------------------------




--
-- Table structure for table `properties`
--

CREATE OR REPLACE TABLE `properties` (
  `PropertyID` int(11) NOT NULL,
  `Title` varchar(255) NOT NULL,
  `Address` varchar(255) NOT NULL,
  `City` varchar(100) NOT NULL,
  `State` varchar(100) NOT NULL,
  `Zipcode` varchar(100) NOT NULL,
  `Price` decimal(13,2) NOT NULL,
  `Description` text NOT NULL,
  `PropertyType` varchar(50) NOT NULL,
  `Bedroom` int(11) NOT NULL,
  `Bathroom` int(11) NOT NULL,
  `SquareFeet` int(11) NOT NULL,
  `YearBuilt` int(11) NOT NULL,
  `RenovationDetails` text NOT NULL,
  `UniqueFeature` text NOT NULL,
  `ListingDate` date NOT NULL,
  `AgentID` int(11) NOT NULL,
  `Review_ReviewID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `properties`
--

INSERT INTO `properties` (`PropertyID`, `Title`, `Address`, `City`, `State`, `Zipcode`, `Price`, `Description`, `PropertyType`, `Bedroom`, `Bathroom`, `SquareFeet`, `YearBuilt`, `RenovationDetails`, `UniqueFeature`, `ListingDate`, `AgentID`, `Review_ReviewID`) VALUES
(1, 'Downtown Loft', '456 Urban St', 'Metropolis', 'NY', '10001', 1200000.00, 'Modern loft in a central location', 'Apartment', 2, 2, 1500, 2015, 'New Roof (2018)', 'Rooftop access', '2024-02-15', 1, 1),
(2, 'Lakeside Cottage', '789 Lakeshore Blvd', 'Lakeview', 'MI', '48001', 300000.00, 'Cozy cottage with lakefront view', 'Cottage', 3, 2, 1800, 1980, 'Added sunroom (2019)', 'Private dock', '2024-03-21', 2, 2),
(3, 'Sunny Side Villa', '123 Sunflower Dr', 'Sunnyville', 'CA', '90210', 850000.00, 'Spacious villa with a sunny garden', 'Villa', 4, 3, 2500, 1998, 'New Kitchen (2020)', 'Solar panels', '2024-01-10', 3, 3);

-- --------------------------------------------------------

--
-- Table structure for table `Properties_Features`
--

CREATE OR REPLACE TABLE `Properties_Features` (
  `FeatureID` int(11) NOT NULL,
  `Feature` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `Properties_Features`
--

INSERT INTO `Properties_Features` (`FeatureID`, `Feature`) VALUES
(0, ' '),
(1, 'Swimming Pool'),
(2, 'Hardwood floors'),
(3, 'Granite Counterops'),
(4, 'Added watch tower');

-- --------------------------------------------------------

--
-- Table structure for table `Property_Feature_Comparisons`
--

CREATE OR REPLACE TABLE `Property_Feature_Comparisons` (
  `properties_PropertyID` int(11) NOT NULL,
  `Properties_Feature_FeatureID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `Property_Feature_Comparisons`
--

INSERT INTO `Property_Feature_Comparisons` (`properties_PropertyID`, `Properties_Feature_FeatureID`) VALUES
(1, 1),
(1, 2),
(2, 3),
(3, 4);

-- --------------------------------------------------------

--
-- Table structure for table `Reviews`
--

CREATE OR REPLACE TABLE `Reviews` (
  `ReviewID` int(11) NOT NULL,
  `Rating` int(11) DEFAULT NULL,
  `Comment` text NOT NULL,
  `ReviewDate` int(11) NOT NULL,
  `Agent_AgentID` int(11) NOT NULL,
  `properties_PropertyID` int(11) NOT NULL,
  `properties_Review_ReviewID` int(11) NOT NULL,
  `Users_UserID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `Reviews`
--

INSERT INTO `Reviews` (`ReviewID`, `Rating`, `Comment`, `ReviewDate`, `Agent_AgentID`, `properties_PropertyID`, `properties_Review_ReviewID`, `Users_UserID`) VALUES
(10, 5, 'Fantastic property and service!', 2024, 1, 1, 1, 1),
(11, 4, 'Great location, but noisy at night', 2024, 2, 2, 2, 2),
(12, 5, 'Perfect getaway, lovely views', 2024, 3, 3, 3, 3);

-- --------------------------------------------------------



--
-- Table structure for table `Users`
--

CREATE OR REPLACE TABLE `Users` (
  `UserID` int(11) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `PhoneNumber` int(11) NOT NULL,
  `Budget` decimal(10,2) NOT NULL,
  `PasswordHash` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`UserID`, `firstName`, `lastName`, `Email`, `PhoneNumber`, `Budget`, `PasswordHash`) VALUES
(1, 'Alice', 'Johnson', 'alice.johnson@mail.com', 555, 900000.00, '5f4dcc3b5aa765d61d8327deb882cf99'),
(2, 'Bob', 'Lee', 'bob.lee@mail.com', 555, 500000.00, '7c6a180b36896a0a8c02787eeafb0e4c'),
(3, 'Carol', 'Kim', 'carol.kim@mail.com', 555, 350000.00, 'e99a18c428cb38d5f260853678922e03');

-- --------------------------------------------------------

--
-- Table structure for table `Viewings`
--

CREATE OR REPLACE TABLE `Viewings` (
  `ViewingID` int(11) NOT NULL,
  `ViewingDate` datetime NOT NULL,
  `Comment` text NOT NULL,
  `properties_PropertyID` int(11) NOT NULL,
  `USER_UserID` int(11) NOT NULL,
  `Agents_AgentID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `Viewings`
--

INSERT INTO `Viewings` (`ViewingID`, `ViewingDate`, `Comment`, `properties_PropertyID`, `USER_UserID`, `Agents_AgentID`) VALUES
(1, '2020-02-15 00:00:00', 'Looking forward for the property', 1, 1, 1),
(2, '2024-02-16 00:00:00', 'Can’t wait to check this property out', 2, 2, 2),
(3, '2024-02-07 00:00:00', 'Love this house, dream house', 3, 3, 3);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Agents`
--
ALTER TABLE `Agents`
  ADD PRIMARY KEY (`AgentID`),
  ADD UNIQUE KEY `AgentID_UNIQUE` (`AgentID`);

--
-- Indexes for table `Customers`
--

--
-- Indexes for table `InvoiceDetails`
--

--
-- Indexes for table `Products`
--

--
-- Indexes for table `properties`
--
ALTER TABLE `properties`
  ADD PRIMARY KEY (`PropertyID`,`Review_ReviewID`);

--
-- Indexes for table `Properties_Features`
--
ALTER TABLE `Properties_Features`
  ADD PRIMARY KEY (`FeatureID`);

--
-- Indexes for table `Property_Feature_Comparisons`
--
ALTER TABLE `Property_Feature_Comparisons`
  ADD PRIMARY KEY (`properties_PropertyID`,`Properties_Feature_FeatureID`),
  ADD KEY `fk_Property_Feature_Comparison_Properties_Feature1_idx` (`Properties_Feature_FeatureID`);

--
-- Indexes for table `Reviews`
--
ALTER TABLE `Reviews`
  ADD PRIMARY KEY (`ReviewID`,`Agent_AgentID`,`properties_PropertyID`,`properties_Review_ReviewID`,`Users_UserID`),
  ADD UNIQUE KEY `ReviewID_UNIQUE` (`ReviewID`),
  ADD KEY `fk_Review_Agent1_idx` (`Agent_AgentID`),

  ADD KEY `fk_Review_properties1_idx` (`properties_PropertyID`,`properties_Review_ReviewID`),
  ADD KEY `fk_Reviews_Users1_idx` (`Users_UserID`);



--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`UserID`);

--
-- Indexes for table `Viewings`
--
ALTER TABLE `Viewings`
  ADD PRIMARY KEY (`ViewingID`,`properties_PropertyID`,`USER_UserID`,`Agents_AgentID`),
  ADD UNIQUE KEY `ViewingID_UNIQUE` (`ViewingID`),
  ADD KEY `fk_Viewings_properties1_idx` (`properties_PropertyID`),
  ADD KEY `fk_Viewings_USER1_idx` (`USER_UserID`),
  ADD KEY `fk_Viewings_Agents1_idx` (`Agents_AgentID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Agents`
--
ALTER TABLE `Agents`
  MODIFY `AgentID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

-- AUTO_INCREMENT for table `properties`
--
ALTER TABLE `properties`
  MODIFY `PropertyID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `Properties_Features`
--
ALTER TABLE `Properties_Features`
  MODIFY `FeatureID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `Reviews`
--
ALTER TABLE `Reviews`
  MODIFY `ReviewID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `UserID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `Viewings`
--
ALTER TABLE `Viewings`
  MODIFY `ViewingID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--



--
-- Constraints for table `Property_Feature_Comparisons`
--
ALTER TABLE `Property_Feature_Comparisons`
  ADD CONSTRAINT `fk_Property_Feature_Comparison_Properties_Feature1` FOREIGN KEY (`Properties_Feature_FeatureID`) REFERENCES `Properties_Features` (`FeatureID`) ON DELETE SET NULL ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Property_Feature_Comparison_properties` FOREIGN KEY (`properties_PropertyID`) REFERENCES `properties` (`PropertyID`) ON DELETE NO ACTION ON UPDATE NO ACTION,

--
-- Constraints for table `Reviews`
--
ALTER TABLE `Reviews`
  ADD CONSTRAINT `fk_Review_Agent1` FOREIGN KEY (`Agent_AgentID`) REFERENCES `Agents` (`AgentID`) ON DELETE SET NULL ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Review_properties1` FOREIGN KEY (`properties_PropertyID`,`properties_Review_ReviewID`) REFERENCES `properties` (`PropertyID`, `Review_ReviewID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Reviews_Users1` FOREIGN KEY (`Users_UserID`) REFERENCES `Users` (`UserID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `Viewings`
--
ALTER TABLE `Viewings`
  ADD CONSTRAINT `fk_Viewings_Agents1` FOREIGN KEY (`Agents_AgentID`) REFERENCES `Agents` (`AgentID`) ON DELETE SET NULL ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Viewings_USER1` FOREIGN KEY (`USER_UserID`) REFERENCES `Users` (`UserID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Viewings_properties1` FOREIGN KEY (`properties_PropertyID`) REFERENCES `properties` (`PropertyID`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

DESCRIBE `Agents`;
DESCRIBE `properties`;
DESCRIBE `Properties_Features`;
DESCRIBE `Property_Feature_Comparisons`;
DESCRIBE `Reviews`;
DESCRIBE `Users`;
DESCRIBE `Viewings`;

SELECT * FROM `Agents`;
SELECT * FROM `properties`;
SELECT * FROM `Properties_Features`;
SELECT * FROM `Property_Feature_Comparisons`;
SELECT * FROM `Reviews`;
SELECT * FROM `Users`;
SELECT * FROM `Viewings`;

SELECT AgentID, firstName, lastName FROM Agents;



SELECT properties.PropertyID, Reviews.ReviewID, properties.Adress, Reviews.Comment AS Review 
FROM properties 
INNER JOIN Reviews ON properties.PropertyID = Reviews.properties_PropertyID 
ORDER BY Adress, Review;

UPDATE properties SET Adress = '123 Main St', AgentID = 1 WHERE PropertyID = 1;


DELETE FROM Reviews WHERE properties_PropertyID = 1 AND ReviewID = 1;



/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
SET FOREIGN_KEY_CHECKS=1;
COMMIT;