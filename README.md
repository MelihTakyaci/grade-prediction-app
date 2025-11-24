# GradePredict - Academic Grade Prediction App

A bilingual (English/Turkish) grade prediction web application using three different regression models to forecast student academic performance.

## 🎯 Features

- **Three Regression Models**: Linear, Polynomial, and Multiple Regression
- **Bilingual Support**: Full English and Turkish localization
- **Real-time Predictions**: Instant grade forecasting based on student data
- **Beautiful UI**: Modern glassmorphism design with smooth animations
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🚀 Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Python serverless functions (Vercel)
- **ML Models**: scikit-learn regression models (pickle format)

## 📊 Prediction Models

1. **Linear Regression**: Analyzes study hours to predict grades
2. **Polynomial Regression**: Uses course attempts with non-linear patterns
3. **Multiple Regression**: Combines study hours, attempts, and class year

## 🛠️ Installation & Local Development

### Prerequisites
- Node.js 18+ 
- Python 3.9+
- npm or yarn

### Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### Note for Local Development
The local version uses a Node.js subprocess to call Python. For production deployment, the app uses Vercel's Python runtime.

## 🌐 Deploy on Vercel

This app is optimized for Vercel deployment with Python serverless functions.

### Quick Deploy

1. **Connect to Vercel**:
   ```bash
   npm i -g vercel
   vercel
   ```

2. **Or use Vercel Dashboard**:
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository
   - Vercel will automatically detect the configuration
   - Click "Deploy"

### Configuration

The app includes:
- `vercel.json` - Specifies Python runtime for the API
- `api/predict.py` - Serverless Python function
- `api/requirements.txt` - Python dependencies
- `.vercelignore` - Excludes unnecessary files

Vercel will automatically:
- Build the Next.js app
- Install Python dependencies from `api/requirements.txt`
- Deploy the Python API endpoint as a serverless function

## 📦 Project Structure

```
├── app/
│   ├── api/predict/route.ts  (for local dev)
│   ├── page.tsx              (main UI)
│   ├── layout.tsx
│   └── globals.css
├── api/
│   ├── predict.py            (Vercel serverless function)
│   ├── requirements.txt      (Python dependencies)
│   ├── lin_reg.pkl          (Linear regression model)
│   ├── multi_reg.pkl        (Multiple regression model)
│   └── poly_model.pkl       (Polynomial model)
├── public/
│   ├── logo.png
│   └── DeuLogo.jpeg
└── vercel.json              (Vercel configuration)
```

## 🎨 UI Features

- Smooth scrolling navigation
- Floating logo animation
- Glassmorphism effects
- Language toggle (EN/TR)
- Empty state display
- Responsive grid layouts

## 📝 Input Parameters

- **Class Year**: 1st to 4th year (1-4)
- **Study Hours/Week**: 0-40 hours
- **Course Attempts**: 1-5 attempts

## 🔮 Output

- Numeric grade prediction (0-100)
- Turkish letter grade (AA to FF)
- Three simultaneous predictions from different models

## 🌍 Deployment Options

### ✅ Recommended: Vercel
- Native Python runtime support
- Zero configuration needed
- Automatic HTTPS
- Global CDN

### Alternative Options

#### Netlify (Requires Backend Separation)
- Deploy Next.js to Netlify
- Deploy Python API to Railway/Render/Fly.io
- Update API endpoint in frontend

#### Railway/Render
- Supports full-stack deployment
- Requires Dockerfile configuration

## 📄 License

MIT License - Feel free to use this project for learning and development!

## 👨‍💻 Author

Built with ❤️ for academic grade prediction

---

**Ready to deploy?** Push to GitHub and connect to Vercel for instant deployment!
