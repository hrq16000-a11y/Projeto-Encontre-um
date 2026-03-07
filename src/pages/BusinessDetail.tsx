import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Star, MapPin, Phone, Globe, Mail, Clock, ShieldCheck, 
  MessageSquare, Share2, Heart, ChevronRight, Info, Award,
  CheckCircle2
} from 'lucide-react';
import { db } from '../firebase';
import { doc, getDoc, collection, query, where, getDocs, limit } from 'firebase/firestore';
import { BusinessListing, Review } from '../types';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export default function BusinessDetail() {
  const { id } = useParams();
  const [business, setBusiness] = useState<BusinessListing | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const docRef = doc(db, 'businesses', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setBusiness({ id: docSnap.id, ...docSnap.data() } as BusinessListing);
          
          // Fetch reviews
          const reviewsRef = collection(db, `businesses/${id}/reviews`);
          const reviewsSnap = await getDocs(query(reviewsRef, limit(10)));
          setReviews(reviewsSnap.docs.map(d => ({ id: d.id, ...d.data() } as Review)));
        } else {
          // Mock for demo
          setBusiness({
            id: id,
            name: 'Eletricista Silva & Filhos',
            description: 'Especialistas em instalações elétricas residenciais e comerciais com mais de 15 anos de experiência. Realizamos desde pequenos reparos até projetos elétricos completos para prédios e indústrias. Nossa equipe é certificada e segue todas as normas de segurança (NR-10). Atendimento rápido e orçamento sem compromisso em toda a grande São Paulo.',
            category: 'Eletricista',
            city: 'São Paulo',
            address: 'Rua das Flores, 123 - Pinheiros',
            phone: '(11) 98888-8888',
            email: 'contato@silvaeletrica.com.br',
            website: 'www.silvaeletrica.com.br',
            rating: 4.8,
            reviewCount: 42,
            ownerId: 'owner1',
            plan: 'premium',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          });
          
          setReviews([
            {
              id: 'r1',
              businessId: id,
              userId: 'u1',
              userName: 'Ricardo Oliveira',
              rating: 5,
              comment: 'Serviço excelente! O Sr. Silva foi muito atencioso e resolveu o problema do meu quadro de luz rapidamente. Preço justo.',
              createdAt: new Date().toISOString()
            },
            {
              id: 'r2',
              businessId: id,
              userId: 'u2',
              userName: 'Maria Santos',
              rating: 4,
              comment: 'Muito profissional. Chegou no horário combinado e deixou tudo limpo após o serviço.',
              createdAt: new Date().toISOString()
            }
          ]);
        }
      } catch (error) {
        console.error("Error fetching business details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  if (loading) return (
    <div className="flex h-[60vh] items-center justify-center">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent" />
    </div>
  );

  if (!business) return (
    <div className="mx-auto max-w-7xl px-4 py-24 text-center">
      <h2 className="text-2xl font-bold">Empresa não encontrada</h2>
      <Link to="/search" className="mt-4 text-emerald-600 hover:underline inline-block">Voltar para a busca</Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-zinc-50 pb-24">
      {/* Header / Cover */}
      <div className="relative h-64 md:h-96 bg-zinc-900">
        <img 
          src={`https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1920`} 
          alt={business.name}
          className="h-full w-full object-cover opacity-60"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full p-8">
          <div className="mx-auto max-w-7xl flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md">
                  {business.category}
                </span>
                {business.plan !== 'free' && (
                  <span className="bg-yellow-500 text-zinc-900 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md flex items-center gap-1">
                    <Award className="h-3 w-3" /> Verificado
                  </span>
                )}
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight">{business.name}</h1>
              <div className="flex items-center gap-4 text-zinc-300 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <span className="font-bold text-white">{business.rating}</span>
                  <span>({business.reviewCount} avaliações)</span>
                </div>
                <div className="h-1 w-1 rounded-full bg-zinc-600" />
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {business.city}
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white text-zinc-900 font-bold px-6 py-3 rounded-xl hover:bg-zinc-100 transition-all">
                <Share2 className="h-5 w-5" /> Compartilhar
              </button>
              <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-emerald-600 text-white font-bold px-8 py-3 rounded-xl hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-600/20">
                <Phone className="h-5 w-5" /> Ver Telefone
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-12">
            <section className="bg-white rounded-3xl p-8 border border-zinc-200 shadow-sm">
              <h2 className="text-2xl font-bold text-zinc-900 mb-6">Sobre a Empresa</h2>
              <p className="text-zinc-600 leading-relaxed text-lg">
                {business.description}
              </p>
              
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-xl bg-zinc-50 flex items-center justify-center text-zinc-400">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-zinc-900">Endereço</h4>
                    <p className="text-sm text-zinc-600">{business.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-xl bg-zinc-50 flex items-center justify-center text-zinc-400">
                    <Globe className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-zinc-900">Website</h4>
                    <a href={`https://${business.website}`} className="text-sm text-emerald-600 hover:underline">{business.website}</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-xl bg-zinc-50 flex items-center justify-center text-zinc-400">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-zinc-900">E-mail</h4>
                    <p className="text-sm text-zinc-600">{business.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-xl bg-zinc-50 flex items-center justify-center text-zinc-400">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-zinc-900">Horário</h4>
                    <p className="text-sm text-zinc-600">Seg - Sex: 08:00 - 18:00</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-3xl p-8 border border-zinc-200 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-zinc-900">Avaliações</h2>
                <button className="text-emerald-600 font-semibold hover:underline">Escrever avaliação</button>
              </div>
              
              <div className="space-y-8">
                {reviews.map(review => (
                  <div key={review.id} className="pb-8 border-b border-zinc-100 last:border-0 last:pb-0">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-zinc-100 flex items-center justify-center font-bold text-zinc-400">
                          {review.userName.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-bold text-zinc-900">{review.userName}</h4>
                          <p className="text-xs text-zinc-400">{new Date(review.createdAt).toLocaleDateString('pt-BR')}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={cn(
                              "h-4 w-4", 
                              i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-zinc-200"
                            )} 
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-zinc-600 leading-relaxed">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar Actions */}
          <div className="space-y-8">
            <div className="bg-zinc-900 rounded-3xl p-8 text-white space-y-6 shadow-xl sticky top-24">
              <h3 className="text-xl font-bold">Solicitar Orçamento</h3>
              <p className="text-zinc-400 text-sm">Envie uma mensagem direta para {business.name} e receba um orçamento personalizado.</p>
              
              <form className="space-y-4">
                <input 
                  type="text" 
                  placeholder="Seu nome" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-emerald-500 transition-all"
                />
                <input 
                  type="email" 
                  placeholder="Seu e-mail" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-emerald-500 transition-all"
                />
                <textarea 
                  placeholder="Descreva o que você precisa..." 
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-emerald-500 transition-all resize-none"
                />
                <button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2">
                  <MessageSquare className="h-5 w-5" /> Enviar Mensagem
                </button>
              </form>
              
              <div className="pt-4 flex items-center gap-3 text-xs text-zinc-500">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                Sua mensagem será enviada com segurança.
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-zinc-200 shadow-sm space-y-6">
              <h3 className="font-bold text-zinc-900">Destaques</h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-sm text-zinc-600">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" /> Atendimento em domicílio
                </li>
                <li className="flex items-center gap-3 text-sm text-zinc-600">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" /> Orçamento gratuito
                </li>
                <li className="flex items-center gap-3 text-sm text-zinc-600">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" /> Garantia de serviço
                </li>
                <li className="flex items-center gap-3 text-sm text-zinc-600">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" /> Aceita cartões
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
