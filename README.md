# Hygieia Frontend

This is the frontend portion of the Hygieia medical diagnostic platform. It's designed to work as a standalone static website that communicates with a separate backend API.

## 🌐 Live Demo

This frontend is hosted on GitHub Pages: [Your GitHub Pages URL]

## 🏗️ Architecture

- **Frontend**: Static HTML/CSS/JavaScript hosted on GitHub Pages
- **Backend**: Python Flask API (runs separately)
- **Communication**: RESTful API calls with CORS support

## 🚀 Running the Frontend

### Option 1: GitHub Pages (Recommended for Demo)
1. Fork this repository
2. Go to Settings → Pages
3. Select source branch (usually `main`)
4. Your site will be available at `https://yourusername.github.io/repository-name/frontend/`

### Option 2: Local Development
```bash
# Serve locally with Python
cd frontend
python -m http.server 8000
# Visit http://localhost:8000

# Or with Node.js
npx serve .
```

## 🔧 Backend Setup

The frontend requires the backend API to be running for diagnostic features to work.

### Start the Backend:
```bash
# Install dependencies (if not already done)
pip install flask flask-cors flask-sqlalchemy

# Start the backend API
python backend_api.py
```

The backend will run on `http://127.0.0.1:5000` by default.

### Backend Configuration:
Edit `js/app.js` to change the backend URL if needed:
```javascript
const HygieiaAPI = {
    baseURL: 'http://127.0.0.1:5000', // Change this to your backend URL
    // ...
};
```

## 📱 Features

### Frontend (Always Available):
- ✅ Medical information and education
- ✅ User interface and navigation
- ✅ Form validation
- ✅ Responsive design
- ✅ Accessibility features

### Backend-Dependent Features:
- 🔄 Dermatological image analysis
- 🔄 Heart disease risk assessment
- 🔄 Breast cancer risk evaluation
- 🔄 Diabetes screening
- 🔄 AI chatbot assistance
- 🔄 Blockchain verification

## 🟢 Backend Status Indicator

The frontend includes a real-time backend status indicator:
- **Green**: Backend is running and accessible
- **Red**: Backend is offline or unreachable

Click the status indicator for more details and troubleshooting.

## 🔗 API Endpoints

When the backend is running, these endpoints are available:

- `GET /api/health` - Backend health check
- `POST /api/dermatology/analyze` - Skin analysis
- `POST /api/heart-disease/analyze` - Heart risk assessment
- `POST /api/breast-cancer/analyze` - Breast cancer screening
- `POST /api/diabetes/analyze` - Diabetes risk evaluation
- `GET /api/results/{id}` - Get analysis results
- `GET /api/blockchain` - View verification ledger

## 🛡️ Security & Privacy

- All processing happens server-side
- No medical data stored in frontend
- CORS properly configured
- Medical disclaimers prominently displayed

## 📋 Medical Disclaimer

**Important**: This platform is for educational purposes only and should not replace professional medical advice. Always consult qualified healthcare providers for medical decisions.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with both frontend and backend
5. Submit a pull request

## 📄 License

[Your License Here]

## 📞 Support

For issues or questions:
- Check the backend status indicator
- Ensure the backend is running on the correct port
- Review browser console for error messages
- Open an issue on GitHub