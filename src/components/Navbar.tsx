import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, User, LogOut, Menu, X, Briefcase, PlusCircle } from 'lucide-react';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { cn } from '../lib/utils';

export default function Navbar() {
  const [user, setUser] = useState(auth.currentUser);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-black/5 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white font-bold text-xl">
              E
            </div>
            <span className="text-xl font-bold tracking-tight text-zinc-900">
              Encontre<span className="text-emerald-600">Um</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-600">
            <Link to="/search" className="hover:text-emerald-600 transition-colors">Empresas</Link>
            <Link to="/ads" className="hover:text-emerald-600 transition-colors">Anúncios</Link>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <Link 
                to="/business/new" 
                className="flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 transition-all shadow-sm"
              >
                <PlusCircle className="h-4 w-4" />
                Anunciar Empresa
              </Link>
              <div className="h-8 w-px bg-zinc-200" />
              <div className="flex items-center gap-3">
                <Link to="/profile" className="flex items-center gap-2 text-sm font-medium text-zinc-700 hover:text-emerald-600">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="" className="h-8 w-8 rounded-full border border-zinc-200" />
                  ) : (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 border border-zinc-200">
                      <User className="h-4 w-4 text-zinc-500" />
                    </div>
                  )}
                </Link>
                <button 
                  onClick={handleLogout}
                  className="text-zinc-500 hover:text-red-600 transition-colors"
                  title="Sair"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/auth" className="text-sm font-medium text-zinc-600 hover:text-emerald-600">Entrar</Link>
              <Link 
                to="/auth?mode=signup" 
                className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800 transition-all"
              >
                Criar Conta
              </Link>
            </>
          )}
        </div>

        <button 
          className="md:hidden text-zinc-600"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-zinc-100 bg-white px-4 py-6 space-y-4 animate-in slide-in-from-top duration-200">
          <Link to="/search" className="block text-lg font-medium text-zinc-900">Empresas</Link>
          <Link to="/ads" className="block text-lg font-medium text-zinc-900">Anúncios</Link>
          <div className="pt-4 border-t border-zinc-100 flex flex-col gap-4">
            {user ? (
              <>
                <Link to="/business/new" className="flex items-center gap-2 text-emerald-600 font-semibold">
                  <PlusCircle className="h-5 w-5" />
                  Anunciar Empresa
                </Link>
                <Link to="/profile" className="flex items-center gap-2 text-zinc-900 font-medium">
                  <User className="h-5 w-5" />
                  Meu Perfil
                </Link>
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-red-600 font-medium"
                >
                  <LogOut className="h-5 w-5" />
                  Sair
                </button>
              </>
            ) : (
              <>
                <Link to="/auth" className="block text-center rounded-full border border-zinc-200 py-3 font-medium">Entrar</Link>
                <Link to="/auth?mode=signup" className="block text-center rounded-full bg-zinc-900 text-white py-3 font-medium">Criar Conta</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
