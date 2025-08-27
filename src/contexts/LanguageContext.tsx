import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'hi' | 'es' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    'nav.home': 'Home',
    'nav.map': 'Food Map',
    'nav.dashboard': 'Dashboard',
    'nav.contribute': 'Contribute',
    'nav.profile': 'Profile',
    'hero.title': 'Fighting Hunger, Reducing Waste',
    'hero.subtitle': 'Connect surplus food with those in need through our intelligent platform',
    'hero.cta': 'Join the Movement',
    'stats.food_saved': 'Meals Saved',
    'stats.users': 'Active Users',
    'stats.locations': 'Partner Locations',
    'features.map.title': 'Interactive Food Map',
    'features.map.desc': 'Find nearby food sources and donation points',
    'features.ai.title': 'AI-Powered Matching',
    'features.ai.desc': 'Smart algorithms connect food with need',
    'features.community.title': 'Community Driven',
    'features.community.desc': 'Local volunteers and organizations working together',
    'contribute.title': 'Share Food, Share Hope',
    'contribute.desc': 'Your contribution can make a difference',
    'footer.mission': 'Building a world without hunger and food waste'
  },
  hi: {
    'nav.home': 'मुख्य',
    'nav.map': 'भोजन मानचित्र',
    'nav.dashboard': 'डैशबोर्ड',
    'nav.contribute': 'योगदान',
    'nav.profile': 'प्रोफ़ाइल',
    'hero.title': 'भूख से लड़ना, बर्बादी कम करना',
    'hero.subtitle': 'हमारे बुद्धिमान मंच के माध्यम से अतिरिक्त भोजन को जरूरतमंदों से जोड़ें',
    'hero.cta': 'आंदोलन में शामिल हों',
    'stats.food_saved': 'बचाए गए भोजन',
    'stats.users': 'सक्रिय उपयोगकर्ता',
    'stats.locations': 'साझीदार स्थान',
    'features.map.title': 'इंटरैक्टिव भोजन मानचित्र',
    'features.map.desc': 'पास के भोजन स्रोत और दान बिंदु खोजें',
    'features.ai.title': 'AI-संचालित मैचिंग',
    'features.ai.desc': 'स्मार्ट एल्गोरिदम भोजन को आवश्यकता से जोड़ते हैं',
    'features.community.title': 'समुदाय संचालित',
    'features.community.desc': 'स्थानीय स्वयंसेवक और संगठन मिलकर काम कर रहे हैं',
    'contribute.title': 'भोजन बांटें, आशा बांटें',
    'contribute.desc': 'आपका योगदान एक बदलाव ला सकता है',
    'footer.mission': 'भूख और भोजन की बर्बादी के बिना एक दुनिया का निर्माण'
  },
  es: {
    'nav.home': 'Inicio',
    'nav.map': 'Mapa de Comida',
    'nav.dashboard': 'Panel',
    'nav.contribute': 'Contribuir',
    'nav.profile': 'Perfil',
    'hero.title': 'Luchando contra el Hambre, Reduciendo el Desperdicio',
    'hero.subtitle': 'Conecta el exceso de comida con quienes lo necesitan a través de nuestra plataforma inteligente',
    'hero.cta': 'Únete al Movimiento',
    'stats.food_saved': 'Comidas Salvadas',
    'stats.users': 'Usuarios Activos',
    'stats.locations': 'Ubicaciones Socias',
    'features.map.title': 'Mapa Interactivo de Comida',
    'features.map.desc': 'Encuentra fuentes de comida cercanas y puntos de donación',
    'features.ai.title': 'Coincidencias Impulsadas por IA',
    'features.ai.desc': 'Algoritmos inteligentes conectan comida con necesidad',
    'features.community.title': 'Impulsado por la Comunidad',
    'features.community.desc': 'Voluntarios locales y organizaciones trabajando juntos',
    'contribute.title': 'Comparte Comida, Comparte Esperanza',
    'contribute.desc': 'Tu contribución puede hacer la diferencia',
    'footer.mission': 'Construyendo un mundo sin hambre ni desperdicio de alimentos'
  },
  fr: {
    'nav.home': 'Accueil',
    'nav.map': 'Carte Alimentaire',
    'nav.dashboard': 'Tableau de Bord',
    'nav.contribute': 'Contribuer',
    'nav.profile': 'Profil',
    'hero.title': 'Lutter contre la Faim, Réduire le Gaspillage',
    'hero.subtitle': 'Connectez les surplus alimentaires avec ceux qui en ont besoin grâce à notre plateforme intelligente',
    'hero.cta': 'Rejoignez le Mouvement',
    'stats.food_saved': 'Repas Sauvés',
    'stats.users': 'Utilisateurs Actifs',
    'stats.locations': 'Emplacements Partenaires',
    'features.map.title': 'Carte Alimentaire Interactive',
    'features.map.desc': 'Trouvez des sources de nourriture et des points de don à proximité',
    'features.ai.title': 'Correspondance IA',
    'features.ai.desc': 'Les algorithmes intelligents connectent la nourriture au besoin',
    'features.community.title': 'Dirigé par la Communauté',
    'features.community.desc': 'Bénévoles locaux et organisations travaillant ensemble',
    'contribute.title': 'Partagez la Nourriture, Partagez l\'Espoir',
    'contribute.desc': 'Votre contribution peut faire la différence',
    'footer.mission': 'Construire un monde sans faim ni gaspillage alimentaire'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}