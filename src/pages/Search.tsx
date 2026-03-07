import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search as SearchIcon, MapPin, Star, Filter, SlidersHorizontal, ChevronRight, Briefcase, Phone, Globe } from 'lucide-react';
import { db } from '../firebase';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { BusinessListing } from '../types';
import { CATEGORIES, CITIES } from '../constants';
import { cn } from '../lib/utils';

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [businesses, setBusinesses] = useState<BusinessListing[]>([]);
  const [loading, setLoading] = useState(true);
  
  const q = searchParams.get('q') || '';
  const city = searchParams.get('city') || '';
  const category = searchParams.get('category') || '';

  useEffect(() => {
    const fetchBusinesses = async () => {
      setLoading(true);
      try {
        // In a real app, we'd build a complex query here.
        // For now, let's fetch some data or use mock if empty.
        const businessesRef = collection(db, 'businesses');
        let firestoreQuery = query(businessesRef, limit(20));
        
        if (category) {
          firestoreQuery = query(businessesRef, where('category', '==', category), limit(20));
        } else if (city) {
          firestoreQuery = query(businessesRef, where('city', '==', city), limit(20));
        }

        const snapshot = await getDocs(firestoreQuery);
        const results = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as BusinessListing));
        
        if (results.length === 0) {
          // Mock data for demo if Firestore is empty
          setBusinesses([
            {
              id: '1',
              name: 'Eletricista Silva & Filhos',
              description: 'Especialistas em instalações elétricas residenciais e comerciais com mais de 15 anos de experiência.',
              category: 'Eletricista',
              city: 'São Paulo',
              address: 'Rua das Flores, 123',
              phone: '(11) 98888-8888',
              email: 'contato@silvaeletrica.com.br',
              website: 'www.silvaeletrica.com.br',
              rating: 4.8,
              reviewCount: 42,
              ownerId: 'owner1',
              plan: 'premium',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            },
            {
              id: '2',
              name: 'Encanador HidroFix',
              description: 'Reparos hidráulicos, caça vazamentos e desentupimento 24 horas.',
              category: 'Encanador',
              city: 'São Paulo',
              address: 'Av. Paulista, 1000',
              phone: '(11) 97777-7777',
              email: 'contato@hidrofix.com.br',
              website: 'www.hidrofix.com.br',
              rating: 4.5,
              reviewCount: 28,
              ownerId: 'owner2',
              plan: 'free',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            },
            {
              id: '3',
              name: 'TechAssist Informática',
              description: 'Conserto de notebooks, computadores e redes. Atendimento em domicílio.',
              category: 'Informática',
              city: 'Rio de Janeiro',
              address: 'Rua do Ouvidor, 50',
              phone: '(21) 96666-6666',
              email: 'suporte@techassist.com.br',
              website: 'www.techassist.com.br',
              rating: 4.9,
              reviewCount: 156,
              ownerId: 'owner3',
              plan: 'gold',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            }
          ].filter(b => {
            const matchesCategory = !category || b.category === category;
            const matchesCity = !city || b.city === city;
            const matchesQuery = !q || b.name.toLowerCase().includes(q.toLowerCase()) || b.description.toLowerCase().includes(q.toLowerCase());
            return matchesCategory && matchesCity && matchesQuery;
          }));
        } else {
          setBusinesses(results);
        }
      } catch (error) {
        console.error("Error fetching businesses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBusinesses();
  }, [q, city, category]);

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="bg-white border-b border-zinc-200 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
              <input 
                type="text" 
                placeholder="O que você procura?" 
                className="w-full pl-12 pr-4 py-3 bg-zinc-100 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
                value={q}
                onChange={(e) => setSearchParams({ q: e.target.value, city, category })}
              />
            </div>
            <div className="w-full md:w-64 relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
              <select 
                className="w-full pl-12 pr-4 py-3 bg-zinc-100 rounded-xl outline-none appearance-none cursor-pointer"
                value={city}
                onChange={(e) => setSearchParams({ q, city: e.target.value, category })}
              >
                <option value="">Todas as cidades</option>
                {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-64 space-y-8">
            <div>
              <h3 className="flex items-center gap-2 font-bold text-zinc-900 mb-4">
                <Filter className="h-4 w-4" /> Categorias
              </h3>
              <div className="space-y-2">
                <button 
                  onClick={() => setSearchParams({ q, city, category: '' })}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                    !category ? "bg-emerald-50 text-emerald-700 font-semibold" : "text-zinc-600 hover:bg-zinc-100"
                  )}
                >
                  Todas as categorias
                </button>
                {CATEGORIES.map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setSearchParams({ q, city, category: cat })}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                      category === cat ? "bg-emerald-50 text-emerald-700 font-semibold" : "text-zinc-600 hover:bg-zinc-100"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-zinc-900">
                {loading ? 'Buscando...' : `${businesses.length} resultados encontrados`}
              </h2>
              <button className="flex items-center gap-2 text-sm font-medium text-zinc-600 hover:text-zinc-900">
                <SlidersHorizontal className="h-4 w-4" /> Ordenar por: Relevância
              </button>
            </div>

            {loading ? (
              <div className="space-y-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-48 w-full bg-white rounded-3xl animate-pulse border border-zinc-100" />
                ))}
              </div>
            ) : businesses.length > 0 ? (
              <div className="space-y-6">
                {businesses.map(business => (
                  <Link 
                    key={business.id} 
                    to={`/business/${business.id}`}
                    className="group block bg-white rounded-3xl border border-zinc-200 overflow-hidden hover:border-emerald-500 hover:shadow-xl transition-all"
                  >
                    <div className="flex flex-col md:flex-row">
                      <div className="w-full md:w-64 h-48 bg-zinc-100 relative overflow-hidden">
                        <img 
                          src={`https://picsum.photos/seed/${business.id}/400/300`} 
                          alt={business.name}
                          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        {business.plan !== 'free' && (
                          <div className="absolute top-4 left-4 bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md shadow-lg">
                            Destaque
                          </div>
                        )}
                      </div>
                      <div className="flex-1 p-6 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between">
                            <div>
                              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">{business.category}</span>
                              <h3 className="text-xl font-bold text-zinc-900 mt-1">{business.name}</h3>
                            </div>
                            <div className="flex items-center gap-1 bg-zinc-50 px-2 py-1 rounded-lg">
                              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                              <span className="text-sm font-bold text-zinc-900">{business.rating}</span>
                              <span className="text-xs text-zinc-400">({business.reviewCount})</span>
                            </div>
                          </div>
                          <p className="mt-3 text-sm text-zinc-600 line-clamp-2 leading-relaxed">
                            {business.description}
                          </p>
                        </div>
                        
                        <div className="mt-6 flex flex-wrap items-center gap-6 text-xs text-zinc-500 font-medium">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-zinc-400" />
                            {business.city}
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-zinc-400" />
                            {business.phone}
                          </div>
                          {business.website && (
                            <div className="flex items-center gap-2">
                              <Globe className="h-4 w-4 text-zinc-400" />
                              {business.website}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="hidden md:flex flex-col items-center justify-center p-6 border-l border-zinc-100 bg-zinc-50/50 group-hover:bg-emerald-50/50 transition-colors">
                        <ChevronRight className="h-6 w-6 text-zinc-300 group-hover:text-emerald-500 transition-colors" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-24 bg-white rounded-3xl border border-zinc-100">
                <div className="h-20 w-20 bg-zinc-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <SearchIcon className="h-10 w-10 text-zinc-300" />
                </div>
                <h3 className="text-xl font-bold text-zinc-900">Nenhum resultado encontrado</h3>
                <p className="mt-2 text-zinc-600">Tente ajustar seus filtros ou buscar por termos diferentes.</p>
                <button 
                  onClick={() => setSearchParams({})}
                  className="mt-6 text-emerald-600 font-semibold hover:underline"
                >
                  Limpar todos os filtros
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
