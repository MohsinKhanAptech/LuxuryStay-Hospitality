# LuxuryStay API

## Overview
LuxuryStay API is a Node.js application that provides a set of RESTful APIs for managing a hospitality system. The API allows for the management of various entities such as users, bookings, rooms, bills, feedback, housekeeping tasks, maintenance requests, and system settings.

## Features
- **User Management**: Create, retrieve, update, and delete user accounts.
- **Booking Management**: Handle bookings including check-in and check-out processes.
- **Room Management**: Manage room details, availability, and pricing.
- **Bill Management**: Generate and manage bills associated with bookings.
- **Feedback Management**: Collect and manage guest feedback.
- **Housekeeping Management**: Schedule and track housekeeping tasks.
- **Maintenance Management**: Report and manage maintenance requests.
- **System Settings**: Configure system-wide settings such as room rates and policies.

## Project Structure
```
luxurystay-api
├── src
│   ├── controllers          # Contains controller files for handling API requests
│   ├── models               # Contains Mongoose models for data representation
│   ├── routes               # Contains route definitions for API endpoints
│   ├── index.ts             # Entry point of the application
│   └── types                # Custom types and interfaces
├── package.json             # NPM configuration file
├── tsconfig.json            # TypeScript configuration file
└── README.md                # Project documentation
```

## Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd luxurystay-api
   ```
3. Install dependencies:
   ```
   npm install
   ```

## Usage
1. Start the application:
   ```
   npm start
   ```
2. The API will be available at `http://localhost:5000`.

## API Documentation
Refer to the individual controller files for detailed API endpoints and their usage.

## License
This project is licensed under the MIT License.