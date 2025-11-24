"use client";

import Image from "next/image";
import { useState } from "react";

interface ModelPrediction {
  name: string;
  prediction: number | null;
  features: string[];
  color: string;
  icon: string;
  explanation: string;
}

type Language = "en" | "tr";

interface Translations {
  en: {
    [key: string]: string;
  };
  tr: {
    [key: string]: string;
  };
}

const translations: Translations = {
  en: {
    // Header
    models: "Models",
    predict: "Predict",
    // Hero
    heroTitle: "Predict Your Academic Success",
    heroSubtitle: "Three AI models analyze your data to forecast final grades with precision.",
    // Form
    formTitle: "Enter Your Information",
    formSubtitle: "Provide your details once — we'll run three different prediction models",
    classYear: "Class Year",
    studyHours: "Study Hours/Week",
    courseAttempts: "Course Attempts",
    usedByLinear: "Used by: Linear, Multiple",
    usedByPoly: "Used by: Polynomial, Multiple",
    usedByMultiple: "Used by: Multiple Regression",
    predictButton: "Predict My Grade",
    calculating: "Calculating...",
    // Year options
    year1: "1st Year",
    year2: "2nd Year",
    year3: "3rd Year",
    year4: "4th Year",
    // Results
    resultsTitle: "Your Predictions",
    resultsSubtitle: "Three models, three perspectives on your performance",
    predictedGrade: "Predicted Grade",
    // Model names
    linearRegression: "Linear Regression",
    polynomialRegression: "Polynomial Regression",
    multipleRegression: "Multiple Regression",
    // Model explanations
    linearExplanation: "Uses a linear relationship between weekly study hours and final grade to make predictions.",
    polyExplanation: "Applies polynomial curve fitting to capture non-linear patterns in how repeated attempts affect performance.",
    multipleExplanation: "Combines multiple variables (study hours, attempts, and class year) using linear relationships to provide a comprehensive prediction.",
    // How it works
    howItWorksTitle: "How the Models Work",
    howItWorksSubtitle: "Understanding our three regression approaches",
    linearDesc: "A straight-line model that finds the best linear relationship between study hours and your grade. Assumes consistent effort yields proportional results.",
    polyDesc: "Uses curved fitting to model course attempts. Captures diminishing or accelerating returns as students retake the course.",
    multipleDesc: "Weighs all three factors (study hours, attempts, class year) simultaneously to create a multidimensional prediction model.",
    // Features
    featureStudyHours: "Study Hours",
    featureCourseAttempts: "Course Attempts",
    featureClassYear: "Class Year",
    featureAttempts: "Attempts",
    // Footer
    footer: "© 2024 GradePredict. All rights reserved.",
  },
  tr: {
    // Header
    models: "Modeller",
    predict: "Tahmin Et",
    // Hero
    heroTitle: "Akademik Başarınızı Tahmin Edin",
    heroSubtitle: "Üç yapay zeka modeli verilerinizi analiz ederek final notunuzu hassas bir şekilde tahmin eder.",
    // Form
    formTitle: "Bilgilerinizi Girin",
    formSubtitle: "Bilgilerinizi bir kez girin — üç farklı tahmin modeli çalıştıracağız",
    classYear: "Sınıf",
    studyHours: "Haftalık Çalışma Saati",
    courseAttempts: "Ders Tekrar Sayısı",
    usedByLinear: "Kullanan: Doğrusal, Çoklu",
    usedByPoly: "Kullanan: Polinom, Çoklu",
    usedByMultiple: "Kullanan: Çoklu Regresyon",
    predictButton: "Notumu Tahmin Et",
    calculating: "Hesaplanıyor...",
    // Year options
    year1: "1. Sınıf",
    year2: "2. Sınıf",
    year3: "3. Sınıf",
    year4: "4. Sınıf",
    // Results
    resultsTitle: "Tahminleriniz",
    resultsSubtitle: "Üç model, performansınıza üç farklı bakış açısı",
    predictedGrade: "Tahmin Edilen Not",
    // Model names
    linearRegression: "Doğrusal Regresyon",
    polynomialRegression: "Polinom Regresyon",
    multipleRegression: "Çoklu Regresyon",
    // Model explanations
    linearExplanation: "Haftalık çalışma saatleri ile final notu arasında doğrusal bir ilişki kullanarak tahmin yapar.",
    polyExplanation: "Ders tekrar sayısının performansa etkisindeki doğrusal olmayan kalıpları yakalamak için polinom eğri uydurması uygular.",
    multipleExplanation: "Kapsamlı bir tahmin sağlamak için birden fazla değişkeni (çalışma saati, tekrar sayısı ve sınıf) doğrusal ilişkiler kullanarak birleştirir.",
    // How it works
    howItWorksTitle: "Modeller Nasıl Çalışır",
    howItWorksSubtitle: "Üç regresyon yaklaşımımızı anlamak",
    linearDesc: "Çalışma saatleri ile notunuz arasındaki en iyi doğrusal ilişkiyi bulan düz çizgi modeli. Tutarlı çabanın orantılı sonuçlar verdiğini varsayar.",
    polyDesc: "Ders tekrar sayısını modellemek için eğri uydurma kullanır. Öğrenciler dersi tekrar aldıkça azalan veya artan getirileri yakalar.",
    multipleDesc: "Çok boyutlu bir tahmin modeli oluşturmak için üç faktörü (çalışma saati, tekrar sayısı, sınıf) aynı anda değerlendirir.",
    // Features
    featureStudyHours: "Çalışma Saati",
    featureCourseAttempts: "Ders Tekrarı",
    featureClassYear: "Sınıf",
    featureAttempts: "Tekrar",
    // Footer
    footer: "© 2024 GradePredict. Tüm hakları saklıdır.",
  },
};

export default function Home() {
  const [language, setLanguage] = useState<Language>("en");
  const [classYear, setClassYear] = useState<number>(1);
  const [studyHours, setStudyHours] = useState<number>(8);
  const [attempts, setAttempts] = useState<number>(1);
  
  const t = translations[language];

  // Scroll functions for navigation
  const scrollToModels = () => {
    const modelsSection = document.getElementById('models-section');
    modelsSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToPredict = () => {
    const predictSection = document.getElementById('predict-section');
    predictSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  
  const [predictions, setPredictions] = useState<ModelPrediction[]>([
    {
      name: t.linearRegression,
      prediction: null,
      features: [t.featureStudyHours],
      color: "from-blue-500/80 to-cyan-500/80",
      icon: "schedule",
      explanation: t.linearExplanation,
    },
    {
      name: t.polynomialRegression,
      prediction: null,
      features: [t.featureCourseAttempts],
      color: "from-purple-500/80 to-pink-500/80",
      icon: "replay",
      explanation: t.polyExplanation,
    },
    {
      name: t.multipleRegression,
      prediction: null,
      features: [t.featureStudyHours, t.featureAttempts, t.featureClassYear],
      color: "from-primary/80 to-indigo-500/80",
      icon: "analytics",
      explanation: t.multipleExplanation,
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(true); // Changed to true to show empty state on initial load

  const getLetterGrade = (score: number): string => {
    if (score >= 90) return "AA";
    if (score >= 85) return "BA";
    if (score >= 80) return "BB";
    if (score >= 75) return "CB";
    if (score >= 70) return "CC";
    if (score >= 65) return "DC";
    if (score >= 60) return "DD";
    if (score >= 50) return "FD";
    return "FF";
  };

  async function calculatePredictions() {
    setLoading(true);
    try {
      // Call API for each model with appropriate features
      const results = await Promise.all([
        // Linear Regression: only study hours
        fetch("/api/predict", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ features: [studyHours] }),
        }).then((r) => r.json()),
        // Polynomial Regression: only attempts
        fetch("/api/predict", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ features: [attempts] }),
        }).then((r) => r.json()),
        // Multiple Regression: all three features
        fetch("/api/predict", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ features: [studyHours, attempts, classYear] }),
        }).then((r) => r.json()),
      ]);

      const t = translations[language];
      setPredictions([
        {
          name: t.linearRegression,
          prediction: results[0].prediction !== undefined ? Math.max(0, Math.min(100, Math.round(results[0].prediction))) : null,
          features: [t.featureStudyHours],
          color: "from-blue-500/80 to-cyan-500/80",
          icon: "schedule",
          explanation: t.linearExplanation,
        },
        {
          name: t.polynomialRegression,
          prediction: results[1].prediction !== undefined ? Math.max(0, Math.min(100, Math.round(results[1].prediction))) : null,
          features: [t.featureCourseAttempts],
          color: "from-purple-500/80 to-pink-500/80",
          icon: "replay",
          explanation: t.polyExplanation,
        },
        {
          name: t.multipleRegression,
          prediction: results[2].prediction !== undefined ? Math.max(0, Math.min(100, Math.round(results[2].prediction))) : null,
          features: [t.featureStudyHours, t.featureAttempts, t.featureClassYear],
          color: "from-primary/80 to-indigo-500/80",
          icon: "analytics",
          explanation: t.multipleExplanation,
        },
      ]);
      setShowResults(true);
    } catch (e) {
      console.error(e);
      alert("Prediction failed: " + String(e));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-primary/20 rounded-full filter blur-3xl opacity-40"></div>
        <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-purple-600/20 rounded-full filter blur-3xl opacity-40"></div>
      </div>

      <div className="flex flex-col container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header / TopNavBar */}
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-white/10 px-4 sm:px-10 py-4">
          <div className="flex items-center gap-4 text-white">
            <div className="size-10 text-primary">
              <Image src="/logo.png" alt="GradePredict Logo" width={55} height={55} />
            </div>
            <h2 className="text-white text-xl font-bold leading-tight tracking-[-0.015em]">GradePredict</h2>
          </div>
          <div className="hidden md:flex flex-1 justify-end gap-8">
            <div className="flex items-center gap-4">
              <button 
                onClick={scrollToModels}
                className="text-white/80 hover:text-white transition-colors text-sm font-medium leading-normal cursor-pointer"
              >
                {t.models}
              </button>
              <button 
                onClick={scrollToPredict}
                className="px-4 py-2 rounded-lg bg-primary/20 hover:bg-primary/30 text-white text-sm font-medium transition-colors cursor-pointer border border-primary/50"
              >
                {t.predict}
              </button>
            </div>
            <div className="flex items-center gap-3">
              {/* Language Toggle */}
              <button
                onClick={() => setLanguage(language === "en" ? "tr" : "en")}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white text-sm font-medium"
              >
                <span className="material-symbols-outlined text-lg">language</span>
                <span>{language === "en" ? "TR" : "EN"}</span>
              </button>
            </div>
          </div>
        </header>

        <main className="flex flex-col items-center w-full max-w-6xl mx-auto py-12 md:py-20 space-y-16 md:space-y-24">
          {/* Hero Section */}
          <section className="w-full @container">
            <div className="flex flex-col gap-10 @[864px]:flex-row @[864px]:items-center">
              <div className="flex flex-col gap-6 text-center @[864px]:text-left @[864px]:flex-1">
                <div className="flex flex-col gap-3">
                  <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:leading-tight">
                    {t.heroTitle}
                  </h1>
                  <h2 className="text-white/70 text-base font-normal leading-normal @[480px]:text-lg">
                    {t.heroSubtitle}
                  </h2>
                </div>
              </div>
              <div className="w-full aspect-square @[864px]:w-2/5 flex items-center justify-center">
                <div className="relative group">
                  {/* Animated glow background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary via-purple-500 to-blue-500 rounded-full blur-2xl opacity-50 group-hover:opacity-75 animate-pulse"></div>
                  
                  {/* Rotating border effect */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-purple-500 to-blue-500 animate-[spin_3s_linear_infinite] opacity-60"></div>
                  
                  {/* Glass morphism container */}
                  <div className="relative glassmorphism rounded-full p-4 backdrop-blur-xl border-2 border-white/20 shadow-2xl transform transition-all duration-500 group-hover:scale-105 group-hover:rotate-3 animate-[float_6s_ease-in-out_infinite]">
                    <Image 
                      className="object-cover rounded-full ring-4 ring-white/10 shadow-xl" 
                      alt="AI visualization" 
                      src="/DeuLogo.png" 
                      width={400} 
                      height={400} 
                    />
                  </div>
                  
                  {/* Sparkle effects */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary/60 rounded-full blur-md animate-ping"></div>
                  <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-purple-500/60 rounded-full blur-md animate-ping delay-75"></div>
                </div>
              </div>
            </div>
          </section>

          {/* Input Form Section */}
          <section id="predict-section" className="w-full flex flex-col items-center gap-6">
            <div className="text-center space-y-2">
              <h2 className="text-white text-2xl font-bold leading-tight tracking-[-0.015em]">{t.formTitle}</h2>
              <p className="text-white/60 text-sm">{t.formSubtitle}</p>
            </div>
            <div className="glassmorphism rounded-xl p-6 md:p-8 w-full max-w-2xl space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Class Year */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-white/80" htmlFor="class-year">
                    {t.classYear}
                  </label>
                  <select
                    id="class-year"
                    value={classYear}
                    onChange={(e) => setClassYear(Number(e.target.value))}
                    className="w-full h-12 px-4 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option value={1} className="bg-gray-800">{t.year1}</option>
                    <option value={2} className="bg-gray-800">{t.year2}</option>
                    <option value={3} className="bg-gray-800">{t.year3}</option>
                    <option value={4} className="bg-gray-800">{t.year4}</option>
                  </select>
                  <p className="text-xs text-white/50">{t.usedByMultiple}</p>
                </div>

                {/* Study Hours */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-white/80 flex justify-between" htmlFor="study-hours">
                    {t.studyHours} <span className="text-white font-bold">{studyHours} {language === "en" ? "hrs" : "saat"}</span>
                  </label>
                  <input
                    className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-blue-500 mt-5"
                    id="study-hours"
                    max={40}
                    min={0}
                    type="range"
                    value={studyHours}
                    onChange={(e) => setStudyHours(Number(e.target.value))}
                  />
                  <p className="text-xs text-white/50">{t.usedByLinear}</p>
                </div>

                {/* Course Attempts */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-white/80 flex justify-between" htmlFor="attempts">
                    {t.courseAttempts} <span className="text-white font-bold">{attempts}</span>
                  </label>
                  <input
                    className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-purple-500 mt-5"
                    id="attempts"
                    max={5}
                    min={1}
                    type="range"
                    value={attempts}
                    onChange={(e) => setAttempts(Number(e.target.value))}
                  />
                  <p className="text-xs text-white/50">{t.usedByPoly}</p>
                </div>
              </div>

              <button
                onClick={calculatePredictions}
                disabled={loading}
                className="w-full flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="truncate">{loading ? t.calculating : t.predictButton}</span>
              </button>
            </div>
          </section>

          {/* Prediction Cards Section */}
          {showResults && (
            <section className="w-full flex flex-col items-center gap-6">
              <div className="text-center space-y-2">
                <h2 className="text-white text-2xl font-bold leading-tight tracking-[-0.015em]">{t.resultsTitle}</h2>
                <p className="text-white/60 text-sm">{t.resultsSubtitle}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                {predictions.map((model, idx) => (
                  <div key={idx} className={`p-1 rounded-xl bg-gradient-to-br ${model.color}`}>
                    <div className="glassmorphism rounded-lg p-6 space-y-4 h-full flex flex-col">
                      {/* Model Header */}
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-3xl text-white">{model.icon}</span>
                        <h3 className="text-white text-lg font-bold">{model.name}</h3>
                      </div>

                      {/* Features Used */}
                      <div className="flex flex-wrap gap-2">
                        {model.features.map((feature, i) => (
                          <span key={i} className="px-2 py-1 bg-white/10 rounded text-xs text-white/80">
                            {feature}
                          </span>
                        ))}
                      </div>

                      {/* Prediction Display */}
                      <div className="flex-1 flex flex-col items-center justify-center py-4">
                        <p className="text-white/60 text-sm mb-2">{t.predictedGrade}</p>
                        <div className="text-6xl font-black text-white tracking-tighter">
                          {model.prediction !== null ? model.prediction : "--"}
                          <span className="text-primary text-3xl">/100</span>
                        </div>
                        {model.prediction !== null && (
                          <div className="mt-3 px-4 py-2 bg-white/10 rounded-lg">
                            <p className="text-white text-xl font-bold">{getLetterGrade(model.prediction)}</p>
                          </div>
                        )}
                      </div>

                      {/* Explanation */}
                      <p className="text-white/70 text-xs leading-relaxed">{model.explanation}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Model Explanation Section */}
          <section id="models-section" className="w-full flex flex-col items-center gap-6">
            <div className="text-center space-y-2">
              <h2 className="text-white text-2xl font-bold leading-tight tracking-[-0.015em]">{t.howItWorksTitle}</h2>
              <p className="text-white/60 text-sm">{t.howItWorksSubtitle}</p>
            </div>
            <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="glassmorphism rounded-lg p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-2xl text-blue-400">schedule</span>
                  <h3 className="text-white font-bold text-sm">{t.linearRegression}</h3>
                </div>
                <p className="text-white/70 text-xs leading-relaxed">
                  {t.linearDesc}
                </p>
              </div>

              <div className="glassmorphism rounded-lg p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-2xl text-purple-400">replay</span>
                  <h3 className="text-white font-bold text-sm">{t.polynomialRegression}</h3>
                </div>
                <p className="text-white/70 text-xs leading-relaxed">
                  {t.polyDesc}
                </p>
              </div>

              <div className="glassmorphism rounded-lg p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-2xl text-primary">analytics</span>
                  <h3 className="text-white font-bold text-sm">{t.multipleRegression}</h3>
                </div>
                <p className="text-white/70 text-xs leading-relaxed">
                  {t.multipleDesc}
                </p>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="w-full text-center py-8 border-t border-white/10 mt-12">
          <p className="text-sm text-white/60">{t.footer}</p>
        </footer>
      </div>
    </div>
  );
}
