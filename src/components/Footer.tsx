import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-zinc-900 text-zinc-400 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white font-bold text-xl">
                E
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Encontre<span className="text-emerald-600">Um</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed">
              O maior guia comercial e marketplace de serviços do Brasil. Conectando você aos melhores profissionais e empresas da sua região.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-emerald-500 transition-colors"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="hover:text-emerald-500 transition-colors"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="hover:text-emerald-500 transition-colors"><Twitter className="h-5 w-5" /></a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6">Plataforma</h3>
            <ul className="space-y-4 text-sm">
              <li><Link to="/search" className="hover:text-white transition-colors">Buscar Empresas</Link></li>
              <li><Link to="/ads" className="hover:text-white transition-colors">Classificados</Link></li>
              <li><Link to="/categories" className="hover:text-white transition-colors">Categorias</Link></li>
              <li><Link to="/cities" className="hover:text-white transition-colors">Cidades</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6">Para Empresas</h3>
            <ul className="space-y-4 text-sm">
              <li><Link to="/auth?mode=signup" className="hover:text-white transition-colors">Cadastrar Empresa</Link></li>
              <li><Link to="/plans" className="hover:text-white transition-colors">Planos de Anúncio</Link></li>
              <li><Link to="/seo-tips" className="hover:text-white transition-colors">Dicas de SEO</Link></li>
              <li><Link to="/support" className="hover:text-white transition-colors">Suporte</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6">Contato</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3"><Phone className="h-4 w-4" /> (11) 99999-9999</li>
              <li className="flex items-center gap-3"><Mail className="h-4 w-4" /> contato@encontreum.com.br</li>
              <li className="flex items-center gap-3"><MapPin className="h-4 w-4" /> São Paulo, SP</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-zinc-800 text-center text-xs">
          <p>© {new Date().getFullYear()} Encontre Um - Todos os direitos reservados. Feito com foco em SEO e Conversão.</p>
        </div>
      </div>
    </footer>
  );
}
