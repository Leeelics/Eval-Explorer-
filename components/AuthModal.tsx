
import React from 'react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (provider: 'google' | 'github') => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative glass-card w-full max-w-md rounded-3xl p-8 border border-white/10 shadow-2xl animate-in zoom-in-95 duration-200">
        <button onClick={onClose} className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors">
          <i className="fas fa-times"></i>
        </button>

        <div className="text-center mb-8">
          <div className="bg-blue-600 w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-600/20">
            <i className="fas fa-user-shield text-white text-xl"></i>
          </div>
          <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
          <p className="text-slate-400 text-sm mt-2">Sign in to contribute to the research hub</p>
        </div>

        <div className="space-y-4">
          <button 
            onClick={() => onLogin('google')}
            className="w-full bg-white hover:bg-slate-100 text-slate-900 font-bold py-3 rounded-xl flex items-center justify-center gap-3 transition-all transform active:scale-[0.98]"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="Google" />
            Continue with Google
          </button>
          
          <button 
            onClick={() => onLogin('github')}
            className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-3 transition-all border border-slate-600 transform active:scale-[0.98]"
          >
            <i className="fab fa-github text-xl"></i>
            Continue with GitHub
          </button>
        </div>

        <p className="text-slate-500 text-[10px] text-center mt-8 px-8 leading-relaxed">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
