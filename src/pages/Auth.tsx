import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { motion } from 'motion/react';
import { ShieldCheck, Star, TrendingUp, Search } from 'lucide-react';

export default function Auth() {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const mode = searchParams.get('mode') || 'login';

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) navigate('/profile');
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if user exists in Firestore
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        // Create new user profile
        await setDoc(userRef, {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          role: 'user', // Default role
          createdAt: serverTimestamp()
        });
      }

      navigate('/');
    } catch (err: any) {
      console.error("Auth error:", err);
      setError("Ocorreu um erro ao tentar entrar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col lg:flex-row">
      {/* Left Side - Info */}
      <div className="hidden lg:flex lg:w-1/2 bg-zinc-900 p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 h-96 w-96 rounded-full bg-emerald-600/20 blur-3xl" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-12">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white font-bold text-2xl">
              E
            </div>
            <span className="text-2xl font-bold tracking-tight text-white">
              Encontre<span className="text-emerald-600">Um</span>
            </span>
          </div>

          <h2 className="text-5xl font-bold text-white leading-tight mb-8">
            A maior vitrine comercial <br /> do Brasil espera por você.
          </h2>
          
          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="h-12 w-12 flex-shrink-0 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-emerald-500">
                <TrendingUp className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-white font-semibold">Visibilidade Orgânica</h4>
                <p className="text-zinc-400 text-sm mt-1">Sua empresa otimizada para aparecer nas primeiras buscas do Google.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="h-12 w-12 flex-shrink-0 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-blue-500">
                <Star className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-white font-semibold">Reputação e Confiança</h4>
                <p className="text-zinc-400 text-sm mt-1">Acumule avaliações positivas e torne-se referência no seu setor.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="h-12 w-12 flex-shrink-0 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-purple-500">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-white font-semibold">Segurança e Qualidade</h4>
                <p className="text-zinc-400 text-sm mt-1">Ambiente seguro para negociações e contratação de serviços.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-zinc-500 text-sm">
          © {new Date().getFullYear()} Encontre Um. O guia comercial definitivo.
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md space-y-8"
        >
          <div className="text-center">
            <h1 className="text-3xl font-bold text-zinc-900">
              {mode === 'signup' ? 'Crie sua conta' : 'Bem-vindo de volta'}
            </h1>
            <p className="mt-2 text-zinc-600">
              {mode === 'signup' 
                ? 'Comece a anunciar e buscar serviços hoje mesmo.' 
                : 'Acesse seu painel e gerencie seus anúncios.'}
            </p>
          </div>

          {error && (
            <div className="p-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <button 
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 px-4 py-4 border border-zinc-200 rounded-xl font-semibold text-zinc-700 hover:bg-zinc-50 transition-all disabled:opacity-50"
            >
              <img src="https://www.google.com/favicon.ico" alt="" className="h-5 w-5" />
              {loading ? 'Processando...' : 'Continuar com Google'}
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-100"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-4 text-zinc-400 font-medium">Foco em segurança</span>
            </div>
          </div>

          <p className="text-center text-sm text-zinc-500">
            Ao continuar, você concorda com nossos <br />
            <a href="#" className="text-emerald-600 font-medium hover:underline">Termos de Uso</a> e <a href="#" className="text-emerald-600 font-medium hover:underline">Política de Privacidade</a>.
          </p>

          <div className="pt-8 text-center">
            <p className="text-sm text-zinc-600">
              {mode === 'signup' ? 'Já tem uma conta?' : 'Ainda não tem conta?'}
              <button 
                onClick={() => navigate(`/auth?mode=${mode === 'signup' ? 'login' : 'signup'}`)}
                className="ml-2 text-emerald-600 font-bold hover:underline"
              >
                {mode === 'signup' ? 'Entrar agora' : 'Criar conta gratuita'}
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
