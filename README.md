
# Real-Time Webcam Object Detection 🚀

A full-stack application for real-time object detection using a webcam feed, powered by AWS Rekognition. Built for the AIWS Hackfest in just 6 hours, this project showcases seamless AWS integration, a responsive React frontend, and a robust Node.js backend, optimized for performance and scalability. 🌟

## Features ✨

- Live Webcam Capture: Streams webcam feed in the browser using WebRTC. 📸
- Real-Time Object Detection: Identifies objects with confidence scores via AWS Rekognition. 🧠
- Visual Feedback: Displays detected objects with bounding boxes and scores on a canvas. 🎨
- User-Friendly Interface: Intuitive controls for starting/stopping detection. 🖱️
- Optimized Performance: Image compression and throttled capture to minimize lag. ⚡

## AWS Services Used 🛠️

- AWS Rekognition: Detects and labels objects in webcam frames with high accuracy. 🔍
- Amazon S3: Temporarily stores captured images for processing. 📦

## AI Tools and Contributions 🤖

- AWS Rekognition: Pre-trained AI model for robust object detection. ✅
- Grok by xAI: Enhanced code readability with detailed comments, suggested optimizations (e.g., image compression, capture throttling), and structured this README for clarity. Grok ensured maintainable code without contributing to core functionality. 📝

## Tech Stack 💻

### Frontend
- React.js: Dynamic and responsive user interface. ⚛️
- Bootstrap: Clean, modern styling for a polished UI. 🎨
- HTML5 Canvas: Renders frames and draws detection boxes. 🖼️
- WebRTC: Enables real-time webcam access. 📹

### Backend
- Node.js with Express: Handles API requests and AWS integration. 🗄️
- AWS SDK for JavaScript: Communicates with S3 and Rekognition. 🌐
- Multer: Manages file uploads from the frontend. 📤
- Sharp: Compresses images to reduce latency. 🗜️

## Setup Instructions 🛠️

### Prerequisites
- Node.js (v16+) and npm installed. 🟢
- An AWS account with S3 and Rekognition access. ☁️
- AWS credentials (Access Key ID and Secret Access Key). 🔑
- A webcam-enabled device and modern browser (Chrome/Firefox). 🌍

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` directory:
   ```
   AWS_ACCESS_KEY_ID=your_access_key
   AWS_SECRET_ACCESS_KEY=your_secret_key
   AWS_REGION=us-east-1
   S3_BUCKET_NAME=your-bucket-name
   ```
4. Create an S3 bucket in AWS with the name in `.env`. Enable public read access for development. 📥
5. Start the backend server:
   ```bash
   node server.js
   ```
   Runs on `http://localhost:5000`. 🚀

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React application:
   ```bash
   npm start
   ```
4. Access at `http://localhost:3000`. 🌐

### Running the Application
- Open `http://localhost:3000` in your browser. 🖥️
- Grant webcam access. 📷
- Click "Start Detection" to capture frames every 5 seconds. 🔄
- View detected objects, confidence scores, and bounding boxes. 📊

## How It Works 🔧

1. React frontend captures webcam frames using WebRTC and renders them on a canvas. 🎥
2. Frames are compressed with `sharp` and sent to the backend via POST. 🗜️
3. Express backend uploads images to S3 using AWS SDK. 📤
4. AWS Rekognition analyzes images and returns detected objects. 🧠
5. Frontend updates UI with object names and bounding boxes. 🖼️
6. Temporary files are cleaned up asynchronously. 🧹

## Performance Optimizations ⚡

To address lag:
- Reduced Resolution: Webcam set to 320x240. 📏
- Image Compression: `sharp` reduces upload latency. 🗜️
- Throttled Capture: Frames every 5 seconds for balance. ⏱️
- Efficient Rendering: Uses `requestAnimationFrame` and React memoization. 🎨
- AWS Alignment: S3 and Rekognition in `us-east-1`. 🌍

## Scalability Potential 📈

Future enhancements:
- User Authentication: AWS Cognito for secure access. 🔒
- Data Persistence: AWS DynamoDB for detection history. 💾
- Custom Models: Train Rekognition for specific objects. 🧠
- Motion Detection: Trigger captures on scene changes. 🚨
- Notifications: AWS SNS for alerts. 📢

## AIWS Hackfest Context 🏆

Built for the AIWS Hackfest (6-hour duration) as a team of 4. Aligns with judging criteria:
- Innovation: Real-time detection with AWS workflow. 💡
- AWS Usage: Smart S3 and Rekognition integration. ☁️
- Full-Stack: Functional frontend and backend with polished UI. 🖥️
- Execution: Completed and optimized in 6 hours. ⏰
- Scalability: Ready for enterprise extensions. 📈

## Acknowledgments 🙌

- AWS: For robust AI and storage services. ☁️
- Grok by xAI: For code comments, optimizations, and README structuring. 🤖
- AIWS Hackfest Organizers: For an inspiring challenge. 🎉

## AI Usage Disclosure 📜

Grok by xAI was used to:
- Add detailed code comments for clarity. 📝
- Suggest optimizations (e.g., compression, throttling). ⚡
- Structure this README for hackathon compliance. 📋
- Ensure consistent code formatting. ✅

Grok supported documentation and optimization, not core functionality, per hackathon rules.

## Troubleshooting 🛠️

- Webcam Issues: Check browser camera permissions. 📷
- AWS Errors: Verify IAM permissions for S3/Rekognition. 🔑
- Lag: Reduce resolution, increase capture interval. ⚡
- CORS Errors: Ensure backend and S3 allow `http://localhost:3000`. 🌐

Contact jhashivam53741@gmail.com for support.

## Submission Checklist ✅

- [x] GitHub repo with code and README.
- [ ] Demo video (2-3 minutes) prepared.
- [x] AWS services (S3, Rekognition) listed.
- [x] AI usage (Grok) disclosed.

```

---

