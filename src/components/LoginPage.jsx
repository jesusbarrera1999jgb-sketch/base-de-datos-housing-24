import React, { useState } from 'react';

export const LoginPage = ({ onLogin, backgroundUrl, isDarkMode, toggleDarkMode }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'guardia24' && password === 'adming1') {
      onLogin('admin');
    } else if (username === 'guardia' && password === 'guardia24') {
      onLogin('guest');
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };

  const inputClassName = "w-full px-5 py-4 bg-slate-50 dark:bg-black border border-slate-200 dark:border-slate-500 rounded-2xl focus:ring-2 focus:ring-slate-900 dark:focus:ring-white outline-none transition-all font-bold text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500";

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center relative transition-colors duration-500"
      style={{ backgroundImage: `url(${backgroundUrl})` }}
    >
      <div className="absolute inset-0 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-[2px]"></div>

      <div className="w-full max-w-md relative z-10 animate-in fade-in zoom-in-95 duration-700">
        <div className="bg-white dark:bg-slate-900/95 backdrop-blur-md p-10 rounded-[2.5rem] shadow-2xl border border-white/20 dark:border-slate-800 transition-colors">
          
          <div className="absolute top-6 right-6">
            <button 
              onClick={toggleDarkMode}
              className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              {isDarkMode ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 9H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M16.95 16.95l.707.707M7.05 7.05l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" /></svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
              )}
            </button>
          </div>

          <div className="flex flex-col items-center mb-10">
            <div className="w-16 h-16 bg-slate-900 dark:bg-white rounded-3xl flex items-center justify-center mb-6 shadow-xl rotate-3">
              <span className="text-white dark:text-slate-900 font-black text-3xl">H</span>
            </div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Housing <span className="text-slate-400 dark:text-slate-500 font-medium">24</span></h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium mt-2">Gestión de Acceso Residencial</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2 ml-1">Usuario</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={inputClassName}
                placeholder="Ingresa tu usuario"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2 ml-1">Contraseña</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={inputClassName}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" /></svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268-2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 text-red-500 text-sm py-3 px-4 rounded-xl border border-red-100 dark:border-red-900/50 flex items-center gap-2 font-bold">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {error}
              </div>
            )}

            <button 
              type="submit"
              className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black hover:shadow-xl active:scale-[0.98] transition-all tracking-widest uppercase"
            >
              Iniciar Sesión
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
