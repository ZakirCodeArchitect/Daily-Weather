# 🌤️ WeatherAlert 24/7  
**Automated Weather Notification System**  
Stay ahead of the weather with **WeatherAlert 24/7**! This Node.js-based application fetches daily weather updates, including temperature and chances of rain, and delivers notifications via **SMS** and **email** every 24 hours.  

## 🚀 Features  
- **Daily Weather Updates**: Fetches real-time weather data using public APIs.  
- **Multi-Channel Notifications**: Sends updates via email and SMS.  
- **Error Logging**: Tracks runtime logs in the console and a log file.  
- **Customizable Location**: Configure the location for weather updates via `.env`.  
- **Efficient Scheduling**: Automatically sends notifications every 24 hours.  

---

## 🛠️ Tech Stack  
- **Node.js**: Application runtime.  
- **Axios**: HTTP client for API requests.  
- **Nodemailer**: Email notifications.  
- **D7SMS API**: SMS notifications.  
- **Winston**: Logging.  
- **dotenv**: Environment variable management.  

---

## 🧩 Architecture  
1. **Weather Data Collection**:  
   Fetches weather details (temperature, rain probability) using a public weather API like [WeatherAPI](https://www.weatherapi.com/).  
   
2. **Data Processing**:  
   Extracts and formats relevant weather data.  

3. **Notification Services**:  
   - **Email Alerts**: Sends weather updates to a configured email.  
   - **SMS Alerts**: Delivers weather notifications to a configured phone number.  

4. **Logging**:  
   Captures errors and activity logs in both console and `log.txt` file.  

---
## 📂 Project Structure (MVC Architecture)  

The project follows the **Model-View-Controller (MVC)** design pattern for better modularity and maintainability:  
```plaintext
weather-alert-24-7/
├── controllers/           # Handles the business logic and API integrations  
│   ├── weatherController.js  # Processes weather data and prepares notifications  
│   ├── notificationController.js  # Manages email and SMS notifications  
│   └── logController.js      # Handles logging functionality  
│
├── models/                # Defines data structures and schema (if any database is used)  
│   ├── weatherModel.js       # Parses and structures weather data  
│   └── notificationModel.js  # Structures notification data for email/SMS  
│
├── views/                 # Manages the user interface or response formatting  
│   ├── emailTemplate.js      # Defines the email body template  
│   └── smsTemplate.js        # Defines the SMS message format  
│
├── routes/                # Defines the application’s routes  
│   ├── weatherRoutes.js      # Routes for fetching weather data  
│   ├── notificationRoutes.js # Routes for notifications  
│   └── logRoutes.js          # Routes for accessing logs  
│
├── services/              # External service integration for APIs  
│   ├── weatherService.js     # Interacts with weather API  
│   ├── emailService.js       # Sends emails using Nodemailer or SendGrid  
│   └── smsService.js         # Sends SMS using D7SMS API  
│
├── config/                # Configuration files for the application  
│   ├── scheduler.js         # Handles task scheduling for 24-hour notifications  
│   ├── dotenvConfig.js      # Loads environment variables  
│   └── apiKeys.js           # Stores API keys securely (imported from .env)  
│
├── logs/                  # Contains log files  
│   └── log.txt              # Log file for runtime logs and errors  
│
├── public/                # Static files (if needed)  
│   └── assets/              # Images, icons, etc.  
│
├── app.js                 # Main application entry point  
├── .env                   # Environment variables  
├── .gitignore             # Specifies files and directories to ignore in Git  
├── package.json           # Project metadata and dependencies  
├── README.md              # Project documentation  
└── LICENSE                # License information  

---

## 🌐 API Endpoints  

Here are the detailed API endpoints, organized according to their functionality:  

---

### **Weather API Routes**  
Handles requests to fetch and process weather data.  

| Endpoint        | Method | Description                                  | Request Body Example                     | Response Example                      |  
|-----------------|--------|----------------------------------------------|------------------------------------------|---------------------------------------|  
| `/api/weather`  | GET    | Fetches current weather and forecast data   | `N/A`                                    | `{ "temperature": 28, "rain": false }` |  

---

### **Notification API Routes**  
Manages SMS and email notifications.  

#### Email Notifications  
| Endpoint              | Method | Description                                  | Request Body Example                      | Response Example                      |  
|-----------------------|--------|----------------------------------------------|-------------------------------------------|---------------------------------------|  
| `/api/notify/email`   | POST   | Sends a weather update via email            | `{ "email": "example@mail.com", "message": "Weather Update" }` | `{ "success": true, "status": "Email sent" }` |  

#### SMS Notifications  
| Endpoint              | Method | Description                                  | Request Body Example                      | Response Example                      |  
|-----------------------|--------|----------------------------------------------|-------------------------------------------|---------------------------------------|  
| `/api/notify/sms`     | POST   | Sends a weather update via SMS              | `{ "phone": "+1234567890", "message": "Weather Update" }` | `{ "success": true, "status": "SMS sent" }` |  

---

### **Log API Routes**  
Provides access to runtime logs for debugging and monitoring.  

| Endpoint         | Method | Description                                  | Request Body Example                      | Response Example                      |  
|------------------|--------|----------------------------------------------|-------------------------------------------|---------------------------------------|  
| `/api/logs`      | GET    | Retrieves logs from the server              | `N/A`                                     | `[{ "timestamp": "2024-12-18", "level": "info", "message": "Email sent" }]` |  

---

### **Error Handling**  
All endpoints return appropriate HTTP status codes:  

| Status Code | Description                             |  
|-------------|-----------------------------------------|  
| `200`       | Request was successful                 |  
| `400`       | Bad request, invalid input parameters  |  
| `500`       | Internal server error                  |  

---

### Example Usage  

#### **Fetch Weather Data**  
```bash  
curl -X GET http://localhost:3000/api/weather  

---

## 🌟 Getting Started  

### Prerequisites  
Ensure you have the following installed:  
- [Node.js](https://nodejs.org/) (v14 or higher)  
- An email account (e.g., Gmail for Nodemailer).  
- API keys for Weather and SMS services.  

### Installation  
1. Clone the repository:  
   ```bash
   git clone https://github.com/username/weather-alert-24-7.git
   cd weather-alert-24-7
