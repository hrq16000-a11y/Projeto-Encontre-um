import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, MapPin, Briefcase, Star, TrendingUp, ShieldCheck, Zap } from 'lucide-react';
import { CATEGORIES, CITIES } from '../constants';
import { motion } from 'motion/react';

export default function Home() {
  const [query, setQuery] = useState('');
  const [city, setCity] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(query)}&city=${encodeURIComponent(city)}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden bg-zinc-900">
        <div className="absolute inset-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=1920" 
            alt="Background" 
            className="h-full w-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/60 to-zinc-900" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight">
              Encontre os melhores <span className="text-emerald-500">profissionais</span> e <span className="text-emerald-500">empresas</span> perto de você.
            </h1>
            <p className="mt-6 text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto">
              O guia comercial mais completo do Brasil. Busque por categoria, cidade ou serviço e contrate com segurança.
            </p>
          </motion.div>

          <motion.form 
            onSubmit={handleSearch}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-col md:flex-row gap-2 p-2 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl"
          >
            <div className="flex-1 flex items-center bg-white rounded-xl px-4 py-3">
              <Search className="h-5 w-5 text-zinc-400 mr-3" />
              <input 
                type="text" 
                placeholder="O que você procura? (ex: Eletricista)" 
                className="w-full bg-transparent outline-none text-zinc-900 placeholder:text-zinc-400"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <div className="flex-1 flex items-center bg-white rounded-xl px-4 py-3">
              <MapPin className="h-5 w-5 text-zinc-400 mr-3" />
              <select 
                className="w-full bg-transparent outline-none text-zinc-900 appearance-none cursor-pointer"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              >
                <option value="">Em qual cidade?</option>
                {CITIES.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <button 
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 py-3 rounded-xl transition-all shadow-lg shadow-emerald-600/20"
            >
              Buscar Agora
            </button>
          </motion.form>

          <div className="flex flex-wrap justify-center gap-4 text-sm text-zinc-400">
            <span>Populares:</span>
            {CATEGORIES.slice(0, 5).map(cat => (
              <Link key={cat} to={`/search?category=${cat}`} className="hover:text-emerald-400 transition-colors underline underline-offset-4 decoration-zinc-700">
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-zinc-900">Por que usar o Encontre Um?</h2>
            <p className="mt-4 text-zinc-600 max-w-2xl mx-auto">
              Nossa plataforma foi desenhada para oferecer a melhor experiência de busca e divulgação comercial.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center space-y-4 p-8 rounded-3xl border border-zinc-100 hover:shadow-xl transition-all">
              <div className="h-16 w-16 flex items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                <Star className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900">Avaliações Reais</h3>
              <p className="text-zinc-600">Sistema de reputação estilo TripAdvisor para garantir a qualidade dos serviços prestados.</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4 p-8 rounded-3xl border border-zinc-100 hover:shadow-xl transition-all">
              <div className="h-16 w-16 flex items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <TrendingUp className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900">Foco em SEO</h3>
              <p className="text-zinc-600">Sua empresa indexada no Google com páginas otimizadas para atrair mais clientes organicamente.</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4 p-8 rounded-3xl border border-zinc-100 hover:shadow-xl transition-all">
              <div className="h-16 w-16 flex items-center justify-center rounded-2xl bg-purple-50 text-purple-600">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900">Segurança Total</h3>
              <p className="text-zinc-600">Verificação de profissionais e empresas para que você contrate com tranquilidade.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-24 bg-zinc-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-zinc-900">Categorias em Destaque</h2>
              <p className="mt-2 text-zinc-600">Explore os serviços mais buscados na plataforma.</p>
            </div>
            <Link to="/categories" className="text-emerald-600 font-semibold hover:underline">Ver todas</Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {CATEGORIES.slice(0, 10).map((cat, i) => (
              <Link 
                key={cat} 
                to={`/search?category=${cat}`}
                className="group flex flex-col items-center p-6 bg-white rounded-2xl border border-zinc-200 hover:border-emerald-500 hover:shadow-lg transition-all"
              >
                <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-zinc-50 text-zinc-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors mb-4">
                  <Briefcase className="h-6 w-6" />
                </div>
                <span className="font-semibold text-zinc-900 text-center">{cat}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-emerald-600 overflow-hidden relative">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 h-96 w-96 rounded-full bg-emerald-500/30 blur-3xl" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 h-96 w-96 rounded-full bg-emerald-400/20 blur-3xl" />
        
        <div className="mx-auto max-w-5xl px-4 text-center space-y-8 relative z-10">
          <h2 className="text-4xl font-bold text-white leading-tight">
            É proprietário de uma empresa ou profissional autônomo?
          </h2>
          <p className="text-xl text-emerald-50 text-zinc-100 max-w-2xl mx-auto">
            Aumente sua visibilidade online e receba mais contatos todos os dias. Cadastre-se agora e comece a aparecer para quem busca seus serviços.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Link 
              to="/auth?mode=signup" 
              className="bg-white text-emerald-600 font-bold px-10 py-4 rounded-full hover:bg-zinc-100 transition-all shadow-xl"
            >
              Cadastrar Gratuitamente
            </Link>
            <Link 
              to="/plans" 
              className="bg-emerald-700 text-white font-bold px-10 py-4 rounded-full hover:bg-emerald-800 transition-all border border-emerald-500/30"
            >
              Ver Planos Premium
            </Link>
          </div>
          <div className="flex items-center justify-center gap-8 pt-8 text-emerald-100 text-sm font-medium">
            <div className="flex items-center gap-2"><Zap className="h-4 w-4" /> Ativação Imediata</div>
            <div className="flex items-center gap-2"><TrendingUp className="h-4 w-4" /> SEO Otimizado</div>
            <div className="flex items-center gap-2"><Star className="h-4 w-4" /> Suporte Prioritário</div>
          </div>
        </div>
      </section>
    </div>
  );
}
