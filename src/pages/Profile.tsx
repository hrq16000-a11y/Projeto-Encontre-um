import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { UserProfile } from '../types';
import { User, Mail, Calendar, Shield, Briefcase } from 'lucide-react';

export default function Profile() {
  const [user, setUser] = useState(auth.currentUser);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        const docRef = doc(db, 'users', u.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfile({ uid: docSnap.id, ...docSnap.data() } as UserProfile);
        }
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return (
    <div className="flex h-[60vh] items-center justify-center">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent" />
    </div>
  );

  if (!user) return (
    <div className="mx-auto max-w-7xl px-4 py-24 text-center">
      <h2 className="text-2xl font-bold">Você precisa estar logado</h2>
      <a href="/auth" className="mt-4 text-emerald-600 hover:underline inline-block">Ir para login</a>
    </div>
  );

  return (
    <div className="min-h-screen bg-zinc-50 py-12">
      <div className="mx-auto max-w-4xl px-4">
        <div className="bg-white rounded-3xl border border-zinc-200 overflow-hidden shadow-sm">
          <div className="h-32 bg-emerald-600" />
          <div className="px-8 pb-8">
            <div className="relative -mt-12 mb-6">
              {user.photoURL ? (
                <img src={user.photoURL} alt="" className="h-24 w-24 rounded-2xl border-4 border-white shadow-lg" />
              ) : (
                <div className="h-24 w-24 rounded-2xl border-4 border-white bg-zinc-100 flex items-center justify-center shadow-lg">
                  <User className="h-10 w-10 text-zinc-400" />
                </div>
              )}
            </div>
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h1 className="text-3xl font-bold text-zinc-900">{user.displayName || 'Usuário'}</h1>
                <p className="text-zinc-500 flex items-center gap-2 mt-1">
                  <Mail className="h-4 w-4" /> {user.email}
                </p>
              </div>
              <div className="flex gap-3">
                <button className="bg-zinc-900 text-white font-bold px-6 py-2 rounded-xl text-sm hover:bg-zinc-800 transition-all">
                  Editar Perfil
                </button>
              </div>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-100">
                <div className="flex items-center gap-3 text-zinc-400 mb-2">
                  <Shield className="h-4 w-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Tipo de Conta</span>
                </div>
                <p className="font-bold text-zinc-900 capitalize">{profile?.role || 'Usuário'}</p>
              </div>
              <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-100">
                <div className="flex items-center gap-3 text-zinc-400 mb-2">
                  <Calendar className="h-4 w-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Membro desde</span>
                </div>
                <p className="font-bold text-zinc-900">
                  {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString('pt-BR') : 'Recentemente'}
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-100">
                <div className="flex items-center gap-3 text-zinc-400 mb-2">
                  <Briefcase className="h-4 w-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Empresas</span>
                </div>
                <p className="font-bold text-zinc-900">0 Cadastradas</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl p-8 border border-zinc-200 shadow-sm">
            <h3 className="text-xl font-bold mb-6">Minhas Empresas</h3>
            <div className="text-center py-12 text-zinc-400">
              <p>Você ainda não cadastrou nenhuma empresa.</p>
              <a href="/business/new" className="mt-4 text-emerald-600 font-bold hover:underline inline-block">Anunciar agora</a>
            </div>
          </div>
          <div className="bg-white rounded-3xl p-8 border border-zinc-200 shadow-sm">
            <h3 className="text-xl font-bold mb-6">Minhas Avaliações</h3>
            <div className="text-center py-12 text-zinc-400">
              <p>Você ainda não fez nenhuma avaliação.</p>
              <a href="/search" className="mt-4 text-emerald-600 font-bold hover:underline inline-block">Buscar empresas</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
