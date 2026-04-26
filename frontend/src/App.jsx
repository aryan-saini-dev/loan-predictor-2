import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle, Sparkles, TrendingUp, Shield, Activity } from 'lucide-react';
import axios from 'axios';

// Spotlight Card Component with mouse tracking
function SpotlightCard({ children, className = '', delay = 0 }) {
  const cardRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/[0.06] backdrop-blur-sm transition-all duration-300 hover:border-white/[0.1] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_8px_40px_rgba(0,0,0,0.5),0_0_80px_rgba(94,106,210,0.1)] ${className}`}
    >
      {/* Spotlight effect */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(300px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(94,106,210,0.15), transparent 50%)`,
        }}
      />
      {/* Top highlight line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      {children}
    </motion.div>
  );
}

// Input Field Component
function InputField({ label, name, type = 'text', value, onChange, placeholder, required = false, min, max, step }) {
  return (
    <div className="space-y-2">
      <label className="block text-xs font-mono uppercase tracking-widest text-foreground-muted">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        min={min}
        max={max}
        step={step}
        className="w-full h-14 px-4 bg-[#0F0F12] border border-white/10 rounded-lg text-foreground placeholder:text-foreground-subtle/50 focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none transition-all duration-200 text-base font-medium"
      />
    </div>
  );
}

// Select Field Component
function SelectField({ label, name, value, onChange, options, required = false }) {
  return (
    <div className="space-y-2">
      <label className="block text-xs font-mono uppercase tracking-widest text-foreground-muted">
        {label}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full h-14 px-4 bg-[#0F0F12] border border-white/10 rounded-lg text-foreground focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none transition-all duration-200 text-base font-medium appearance-none cursor-pointer"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%238A8F98' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
          backgroundPosition: 'right 0.75rem center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '1.5em 1.5em',
          paddingRight: '2.5rem',
        }}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-[#0F0F12]">
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

// Animated Background Component
function AmbientBackground() {
  return (
    <>
      {/* Base gradient layer */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#0a0a0f_0%,#050506_50%,#020203_100%)]" />
      </div>

      {/* Animated gradient blobs */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[900px] h-[1400px] rounded-full bg-accent/25 blur-[150px] animate-float" />
        <div className="absolute top-[30%] left-[-10%] w-[600px] h-[800px] rounded-full bg-gradient-to-br from-violet-500/15 to-pink-500/10 blur-[120px] animate-float-slow" />
        <div className="absolute top-[20%] right-[-5%] w-[500px] h-[700px] rounded-full bg-gradient-to-br from-accent/12 to-blue-500/10 blur-[100px] animate-float-delayed" />
        <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-accent/10 blur-[120px] animate-pulse-glow" />
      </div>

      {/* Noise texture */}
      <div 
        className="fixed inset-0 z-[1] pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Grid overlay */}
      <div 
        className="fixed inset-0 z-[1] pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
        }}
      />
    </>
  );
}

// Main App Component
function App() {
  const [formData, setFormData] = useState({
    age: '',
    income: '',
    loan_amount: '',
    credit_score: '',
    employment_years: '',
    education_level: '',
    housing_status: ''
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const response = await axios.post(`${apiUrl}/predict`, {
        age: parseInt(formData.age),
        income: parseFloat(formData.income),
        loan_amount: parseFloat(formData.loan_amount),
        credit_score: parseInt(formData.credit_score),
        employment_years: parseFloat(formData.employment_years),
        education_level: parseInt(formData.education_level),
        housing_status: parseInt(formData.housing_status)
      });
      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.detail || 'An error occurred during prediction');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      age: '', income: '', loan_amount: '', credit_score: '',
      employment_years: '', education_level: '', housing_status: ''
    });
    setResult(null);
    setError('');
  };

  const educationOptions = [
    { value: '', label: 'Select Education' },
    { value: '0', label: 'High School' },
    { value: '1', label: "Bachelor's Degree" },
    { value: '2', label: "Master's Degree" },
    { value: '3', label: 'PhD' },
  ];

  const housingOptions = [
    { value: '', label: 'Select Housing' },
    { value: '0', label: 'Rent' },
    { value: '1', label: 'Mortgage' },
    { value: '2', label: 'Own' },
  ];

  return (
    <div className="min-h-screen bg-bg-base text-foreground relative overflow-x-hidden">
      <AmbientBackground />

      <div className="relative z-10">
        {/* Main Content */}
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-16 md:mb-20"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-xs font-mono uppercase tracking-widest text-accent">AI-Powered Risk Assessment</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-tight mb-6">
              <span className="gradient-text">Loan Default</span>
              <br />
              <span className="gradient-text-accent">Risk Prediction</span>
            </h1>
            
            <p className="text-lg md:text-xl text-foreground-muted max-w-2xl mx-auto leading-relaxed">
              Advanced machine learning system for accurate financial risk assessment and loan approval decisions.
            </p>
          </motion.div>

          {/* Form Section */}
          <SpotlightCard className="max-w-4xl mx-auto" delay={0.2}>
            <div className="p-6 md:p-10">
              {!result ? (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <InputField
                      label="Age"
                      name="age"
                      type="number"
                      value={formData.age}
                      onChange={handleInputChange}
                      placeholder="25"
                      required
                      min="18"
                      max="100"
                    />
                    <InputField
                      label="Annual Income ($)"
                      name="income"
                      type="number"
                      value={formData.income}
                      onChange={handleInputChange}
                      placeholder="50000"
                      required
                      min="0"
                      step="0.01"
                    />
                    <InputField
                      label="Loan Amount ($)"
                      name="loan_amount"
                      type="number"
                      value={formData.loan_amount}
                      onChange={handleInputChange}
                      placeholder="10000"
                      required
                      min="0"
                      step="0.01"
                    />
                    <InputField
                      label="Credit Score"
                      name="credit_score"
                      type="number"
                      value={formData.credit_score}
                      onChange={handleInputChange}
                      placeholder="650"
                      required
                      min="300"
                      max="850"
                    />
                    <InputField
                      label="Employment Years"
                      name="employment_years"
                      type="number"
                      value={formData.employment_years}
                      onChange={handleInputChange}
                      placeholder="5"
                      required
                      min="0"
                      step="0.1"
                    />
                    <SelectField
                      label="Education Level"
                      name="education_level"
                      value={formData.education_level}
                      onChange={handleInputChange}
                      options={educationOptions}
                      required
                    />
                    <SelectField
                      label="Housing Status"
                      name="housing_status"
                      value={formData.housing_status}
                      onChange={handleInputChange}
                      options={housingOptions}
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-center pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="group relative px-8 py-4 bg-accent text-white font-medium rounded-lg overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_0_1px_rgba(94,106,210,0.5),0_4px_12px_rgba(94,106,210,0.3),inset_0_1px_0_0_rgba(255,255,255,0.2)] hover:shadow-[0_0_0_1px_rgba(94,106,210,0.6),0_8px_24px_rgba(94,106,210,0.4),inset_0_1px_0_0_rgba(255,255,255,0.25)]"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        {loading ? (
                          <>
                            <Activity className="w-5 h-5 animate-spin" />
                            Analyzing...
                          </>
                        ) : (
                          <>
                            <TrendingUp className="w-5 h-5" />
                            Predict Risk
                          </>
                        )}
                      </span>
                    </button>
                  </div>
                </form>
              ) : (
                /* Result Display */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="text-center"
                >
                  <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6 ${result.prediction === 0 ? 'bg-emerald-500/10 border border-emerald-500/30' : 'bg-rose-500/10 border border-rose-500/30'}`}>
                    {result.prediction === 0 ? (
                      <CheckCircle className="w-10 h-10 text-emerald-500" />
                    ) : (
                      <AlertCircle className="w-10 h-10 text-rose-500" />
                    )}
                  </div>

                  <h2 className={`text-3xl md:text-4xl font-semibold tracking-tight mb-2 ${result.prediction === 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {result.risk_level}
                  </h2>
                  <p className="text-foreground-muted text-lg mb-8">{result.status}</p>

                  {/* Probability Display */}
                  <div className="max-w-xs mx-auto mb-8">
                    <div className="flex items-baseline justify-center gap-1 mb-2">
                      <span className={`text-5xl md:text-6xl font-bold tracking-tight ${result.prediction === 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {(result.probability * 100).toFixed(1)}
                      </span>
                      <span className={`text-2xl font-medium ${result.prediction === 0 ? 'text-emerald-400/70' : 'text-rose-400/70'}`}>%</span>
                    </div>
                    <p className="text-sm font-mono uppercase tracking-widest text-foreground-muted">Risk Probability</p>
                  </div>

                  {/* Probability Bar */}
                  <div className="max-w-md mx-auto mb-8">
                    <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${result.probability * 100}%` }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                        className={`h-full rounded-full ${result.prediction === 0 ? 'bg-gradient-to-r from-emerald-500 to-emerald-400' : 'bg-gradient-to-r from-rose-500 to-rose-400'}`}
                      />
                    </div>
                    <div className="flex justify-between mt-2 text-xs font-mono uppercase tracking-wider text-foreground-muted">
                      <span>Low Risk</span>
                      <span>High Risk</span>
                    </div>
                  </div>

                  {/* New Assessment Button */}
                  <button
                    onClick={resetForm}
                    className="px-6 py-3 bg-white/5 border border-white/10 rounded-lg text-foreground font-medium transition-all duration-200 hover:bg-white/[0.08] hover:border-white/15"
                  >
                    New Assessment
                  </button>
                </motion.div>
              )}

              {/* Error Display */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30"
                  >
                    <div className="flex items-center gap-3">
                      <AlertCircle className="w-5 h-5 text-rose-500 flex-shrink-0" />
                      <p className="text-rose-400 text-sm">{error}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </SpotlightCard>

          {/* Feature Cards */}
          <div className="grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto mt-8">
            {[
              { icon: Shield, title: 'Secure', desc: 'Bank-level encryption' },
              { icon: Activity, title: 'Real-time', desc: 'Instant predictions' },
              { icon: Sparkles, title: 'AI Powered', desc: 'ML-based analysis' },
            ].map((feature, i) => (
              <SpotlightCard key={feature.title} delay={0.3 + i * 0.1} className="p-5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{feature.title}</h3>
                    <p className="text-sm text-foreground-muted">{feature.desc}</p>
                  </div>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-white/[0.06] mt-16">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-foreground-muted">
                Loan Risk Prediction System
              </p>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-foreground-subtle">
                <Shield className="w-4 h-4" />
                <span>Secure & Confidential</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
