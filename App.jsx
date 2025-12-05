import React, { useState, useEffect } from 'react';
import { Battery, Wifi, Droplets, Thermometer, Wind, MapPin, TrendingUp, Zap, Users, Leaf, Download, AlertTriangle, CheckCircle, Clock, BarChart3, FileText, Globe, Sun, Smartphone, Laptop, Tablet, CreditCard, X, Shield, Activity, PieChart, Info, Database, ChevronRight } from 'lucide-react';

// --- Composants UI Internes ---

// Carte statistique avec motifs africains
const AfricanStatCard = ({ icon: Icon, title, value, pattern, colorFrom, colorTo, trend }) => (
  <div className={`relative overflow-hidden rounded-3xl p-6 text-white shadow-xl bg-gradient-to-br ${colorFrom} ${colorTo}`}>
    <div className="absolute top-0 right-0 p-4 opacity-10">
      <Icon size={100} />
    </div>
    {/* Motif décoratif en fond */}
    <div className="absolute inset-0 opacity-10 pointer-events-none">
       <svg width="100%" height="100%">
         <pattern id={`pattern-${title}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            {pattern === 'circles' && <circle cx="10" cy="10" r="2" fill="currentColor" />}
            {pattern === 'triangles' && <path d="M10 0 L20 20 L0 20 Z" fill="currentColor" />}
            {pattern === 'diamonds' && <rect x="5" y="5" width="10" height="10" transform="rotate(45 10 10)" fill="currentColor" />}
            {pattern === 'waves' && <path d="M0 10 Q5 5 10 10 T20 10" fill="none" stroke="currentColor" strokeWidth="2" />}
         </pattern>
         <rect width="100%" height="100%" fill={`url(#pattern-${title})`} />
       </svg>
    </div>
    
    <div className="relative z-10">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
          <Icon size={32} />
        </div>
        {trend && (
          <div className="flex items-center space-x-1 bg-white/20 px-3 py-1 rounded-full text-sm font-bold backdrop-blur-sm">
            <TrendingUp size={14} />
            <span>{trend}</span>
          </div>
        )}
      </div>
      <h3 className="text-lg font-medium text-white/80 mb-1">{title}</h3>
      <p className="text-4xl font-black tracking-tight">{value}</p>
    </div>
  </div>
);

// Carte capteur
const AfricanSensorCard = ({ icon: Icon, label, value, color, subtext }) => {
  const colorMap = {
    red: 'text-red-600 bg-red-50 border-red-200',
    blue: 'text-blue-600 bg-blue-50 border-blue-200',
    green: 'text-green-600 bg-green-50 border-green-200',
    orange: 'text-orange-600 bg-orange-50 border-orange-200',
    purple: 'text-purple-600 bg-purple-50 border-purple-200',
  };
  const theme = colorMap[color] || colorMap.blue;

  return (
    <div className={`flex items-center p-4 rounded-2xl border-2 ${theme} transition-transform hover:scale-105`}>
      <div className={`p-3 rounded-xl mr-4 bg-white shadow-sm`}>
        <Icon size={24} className={theme.split(' ')[0]} />
      </div>
      <div>
        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">{label}</p>
        <p className="text-2xl font-black text-gray-800">{value}</p>
        {subtext && <p className="text-xs font-medium opacity-70 mt-1">{subtext}</p>}
      </div>
    </div>
  );
};

// Carte fonctionnalité
const AfricanFeatureCard = ({ title, description, icon, pattern }) => (
  <div className="bg-white rounded-2xl p-6 shadow-lg border-l-8 border-orange-500 hover:shadow-2xl transition-all group relative overflow-hidden">
     <div className="absolute right-0 top-0 opacity-5 transform translate-x-1/3 -translate-y-1/3 transition-transform group-hover:scale-110">
        <div className="text-9xl grayscale">{icon}</div>
     </div>
    <div className="text-4xl mb-4 relative z-10">{icon}</div>
    <h3 className="text-xl font-bold text-blue-900 mb-2 relative z-10">{title}</h3>
    <p className="text-gray-600 relative z-10">{description}</p>
  </div>
);

// Composant Barre de Progression Stylisée (Nouveau pour Institutions)
const StatProgressBar = ({ label, value, max, unit, colorClass, status }) => {
  const percentage = Math.min(100, Math.max(0, (parseFloat(value) / max) * 100));
  
  return (
    <div className="mb-6">
      <div className="flex justify-between items-end mb-2">
        <span className="font-bold text-gray-700 text-lg">{label}</span>
        <div className="flex items-center gap-2">
            {status && (
                <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${status === 'Bon' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {status === 'Bon' ? <CheckCircle size={12}/> : <AlertTriangle size={12}/>}
                    {status}
                </span>
            )}
            <span className="font-black text-gray-800 text-xl">{value}{unit}</span>
        </div>
      </div>
      <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
        <div 
            className={`h-full rounded-full ${colorClass}`} 
            style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};


const KaayCharge = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedDevice, setSelectedDevice] = useState(null); 
  
  const [stationData, setStationData] = useState({
    battery: 87,
    temperature: 28,
    humidity: 65,
    airQuality: 'Bonne',
    activeUsers: 3,
    energyProduced: 2.4,
    co2Saved: 145,
    noise: 55
  });

  const [chargingSimulation, setChargingSimulation] = useState({
    isActive: false,
    device: null,
    paymentMethod: null,
    progress: 0,
    timeRemaining: 0,
    cost: 0
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStationData(prev => ({
        ...prev,
        battery: Math.min(100, Math.max(0, prev.battery + Math.random() * 2 - 1)),
        temperature: 26 + Math.random() * 4,
        humidity: 60 + Math.random() * 10,
        activeUsers: Math.floor(Math.random() * 8),
        energyProduced: prev.energyProduced + 0.01,
        noise: 50 + Math.random() * 20
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (chargingSimulation.isActive && chargingSimulation.progress < 100) {
      const interval = setInterval(() => {
        setChargingSimulation(prev => {
          const newProgress = Math.min(100, prev.progress + 1);
          const newTimeRemaining = Math.max(0, prev.timeRemaining - (prev.device.time / 100)); 
          
          if (newProgress >= 100) {
            return { ...prev, progress: 100, timeRemaining: 0 };
          }
          
          return { ...prev, progress: newProgress, timeRemaining: newTimeRemaining };
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [chargingSimulation.isActive, chargingSimulation.progress]);

  const devices = [
    { id: 'smartphone', name: 'Smartphone', icon: <Smartphone />, price: 100, time: 30, power: '5W', description: 'Recharge rapide USB' },
    { id: 'tablet', name: 'Tablette', icon: <Tablet />, price: 150, time: 45, power: '10W', description: 'Recharge standard' },
    { id: 'laptop', name: 'Ordinateur', icon: <Laptop />, price: 300, time: 90, power: '45W', description: 'Recharge USB-C rapide' },
    { id: 'powerbank', name: 'Power Bank', icon: <Battery />, price: 200, time: 60, power: '18W', description: 'Recharge complète' }
  ];

  const paymentMethods = [
    { id: 'wave', name: 'Wave', icon: '🌊', color: 'from-blue-500 to-cyan-400', description: 'Paiement mobile instantané' },
    { id: 'orange', name: 'Orange Money', icon: '🟠', color: 'from-orange-600 to-amber-500', description: 'Transfert d\'argent mobile' },
    { id: 'coins', name: 'Pièces', icon: '💰', color: 'from-yellow-500 to-amber-600', description: 'Monnaie locale acceptée' }
  ];

  const stations = [
    { id: 1, name: 'Plateau Centre', lat: 14.6928, lng: -17.4467, status: 'active', users: 2, zone: 'Centre-ville', temp: 29.2, humidity: 68, airQuality: 48, pm25: 23, noise: 65, revenue: 15000 },
    { id: 2, name: 'Almadies', lat: 14.7392, lng: -17.5089, status: 'active', users: 1, zone: 'Résidentiel', temp: 27.8, humidity: 72, airQuality: 42, pm25: 18, noise: 52, revenue: 22500 },
    { id: 3, name: 'Parcelles Assainies', lat: 14.7644, lng: -17.4518, status: 'active', users: 5, zone: 'Populaire', temp: 30.1, humidity: 65, airQuality: 55, pm25: 31, noise: 72, revenue: 8400 },
    { id: 4, name: 'Ouakam', lat: 14.7247, lng: -17.4921, status: 'maintenance', users: 0, zone: 'Côtier', temp: 26.5, humidity: 78, airQuality: 38, pm25: 15, noise: 48, revenue: 0 }
  ];

  const alerts = [
    { id: 1, type: 'critical', title: 'Température élevée', location: 'Parcelles Assainies', value: '30.1°C', time: 'Il y a 15 min' },
    { id: 2, type: 'warning', title: "Qualité de l'air modérée", location: 'Plateau Centre', value: 'PM2.5: 23 µg/m³', time: 'Il y a 45 min' },
    { id: 3, type: 'warning', title: 'Niveau sonore élevé', location: 'Parcelles Assainies', value: '72 dB', time: 'Il y a 1h' },
  ];

  const startCharging = (deviceId, paymentMethodId) => {
    if(!deviceId) {
        alert("Veuillez d'abord sélectionner un appareil !");
        return;
    }
    const device = devices.find(d => d.id === deviceId);
    const paymentMethod = paymentMethods.find(p => p.id === paymentMethodId);
    
    setChargingSimulation({
      isActive: true,
      device: device,
      paymentMethod: paymentMethod,
      progress: 0,
      timeRemaining: device.time,
      cost: device.price
    });
  };

  const cancelCharging = () => {
    setChargingSimulation({
      isActive: false, device: null, paymentMethod: null, progress: 0, timeRemaining: 0, cost: 0
    });
    setSelectedDevice(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-amber-50 to-orange-50 relative overflow-hidden font-sans">
      {/* Background Shapes */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-10 left-10 text-8xl text-blue-900">◆</div>
        <div className="absolute top-40 right-20 text-9xl text-orange-600">☀</div>
        <div className="absolute bottom-20 left-40 text-7xl text-blue-800">●</div>
        <div className="absolute bottom-40 right-10 text-8xl text-orange-500">◆</div>
        <div className="absolute top-1/2 left-1/4 text-6xl text-blue-700">⚡</div>
        <div className="absolute top-1/3 right-1/3 text-9xl text-amber-600">◆</div>
        <div className="absolute bottom-0 left-0 right-0 h-32">
          <svg className="w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,60 Q300,20 600,60 T1200,60 L1200,120 L0,120 Z" fill="currentColor" className="text-blue-200 opacity-20"/>
            <path d="M0,80 Q300,40 600,80 T1200,80 L1200,120 L0,120 Z" fill="currentColor" className="text-blue-300 opacity-20"/>
          </svg>
        </div>
      </div>

      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 shadow-2xl border-b-8 border-orange-500 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full">
            <pattern id="pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <rect x="20" y="20" width="25" height="25" fill="none" stroke="currentColor" strokeWidth="2" transform="rotate(45 32.5 32.5)"/>
              <rect x="60" y="60" width="25" height="25" fill="none" stroke="currentColor" strokeWidth="2" transform="rotate(45 72.5 72.5)"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#pattern)"/>
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-6 py-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-amber-100 border-4 border-orange-400 shadow-2xl overflow-hidden flex items-center justify-center">
                   <span className="text-4xl">⚡</span>
                </div>
              </div>
              <div>
                <h1 className="text-4xl font-black text-white drop-shadow-lg tracking-tight">
                  <span className="text-orange-400">Kaay</span>Chargé
                </h1>
                <p className="text-base text-blue-200 font-semibold">Borne solaire autonome & Capteurs</p>
                <p className="text-sm text-orange-300 font-bold">🇸🇳 Une solution au service du Sénégal</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 bg-orange-400 px-6 py-3 rounded-full border-4 border-orange-300 shadow-lg animate-pulse hover:animate-none transition-all">
              <div className="w-4 h-4 bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.8)]"></div>
              <span className="text-base font-black text-blue-900">Système Actif</span>
            </div>
          </div>
        </div>
        <div className="h-3 bg-gradient-to-r from-orange-400 via-blue-500 to-orange-400"></div>
      </header>

      {/* Navigation */}
      <div className="bg-white shadow-xl border-b-4 border-blue-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex space-x-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
            {[
              { id: 'overview', label: 'Accueil', icon: Sun },
              { id: 'charging', label: 'Recharge', icon: Battery },
              { id: 'stations', label: 'Stations', icon: MapPin },
              { id: 'analytics', label: 'Environnement', icon: Wind },
              { id: 'institutional', label: 'Institutions', icon: Users },
              { id: 'impact', label: 'Impact', icon: Leaf }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-4 font-bold transition-all border-b-4 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-blue-900 border-orange-500 bg-gradient-to-t from-orange-50 to-white'
                    : 'text-gray-500 border-transparent hover:text-blue-700 hover:bg-blue-50'
                }`}
              >
                <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-orange-500' : ''}`} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-8 relative z-10 pb-20">
        
        {/* TAB: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <AfricanStatCard icon={Battery} title="Batterie Moyenne" value={`${Math.round(stationData.battery)}%`} pattern="circles" colorFrom="from-green-600" colorTo="to-emerald-800" trend="+2%" />
              <AfricanStatCard icon={Users} title="Utilisateurs Actifs" value={stationData.activeUsers} pattern="triangles" colorFrom="from-blue-600" colorTo="to-cyan-800" trend="+12%" />
              <AfricanStatCard icon={Zap} title="Énergie Produite" value={`${stationData.energyProduced.toFixed(1)} kWh`} pattern="diamonds" colorFrom="from-yellow-500" colorTo="to-orange-700" trend="+8%" />
              <AfricanStatCard icon={MapPin} title="Stations Actives" value="4" pattern="waves" colorFrom="from-red-600" colorTo="to-pink-800" trend="100%" />
            </div>

            <div className="bg-white rounded-3xl shadow-2xl p-8 border-8 border-orange-200 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400 opacity-5 rounded-full -mr-32 -mt-32"></div>
              <h2 className="text-3xl font-black text-gray-800 mb-6 flex items-center relative z-10">
                <div className="w-3 h-12 bg-gradient-to-b from-yellow-500 via-orange-500 to-red-500 mr-4 rounded-full"></div>
                Monitoring en Temps Réel - Plateau Centre
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                <AfricanSensorCard icon={Thermometer} label="Température" value={`${stationData.temperature.toFixed(1)}°C`} color="red" />
                <AfricanSensorCard icon={Droplets} label="Humidité" value={`${Math.round(stationData.humidity)}%`} color="blue" />
                <AfricanSensorCard icon={Wind} label="Qualité de l'Air" value={stationData.airQuality} color="green" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AfricanFeatureCard title="100% Autonome" description="Fonctionnement entièrement solaire sans dépendance au réseau électrique" icon="☀️" pattern="sun" />
              <AfricanFeatureCard title="Données en Temps Réel" description="Capteurs environnementaux de pointe pour une surveillance continue" icon="📊" pattern="bars" />
              <AfricanFeatureCard title="Recharge Multi-Appareils" description="Ports USB standards et recharge rapide pour tous vos appareils" icon="🔌" pattern="zigzag" />
              <AfricanFeatureCard title="Paiement Flexible" description="Accepte pièces de monnaie et mobile money pour une accessibilité maximale" icon="💳" pattern="dots" />
            </div>
          </div>
        )}

        {/* TAB: CHARGING */}
        {activeTab === 'charging' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {!chargingSimulation.isActive ? (
              <>
                {/* STEP 1: Select Device */}
                <div className="bg-white rounded-3xl shadow-2xl p-8 border-8 border-orange-200">
                  <h2 className="text-3xl font-black text-gray-800 mb-6 flex items-center">
                    <div className="w-3 h-12 bg-gradient-to-b from-green-500 to-emerald-700 mr-4 rounded-full"></div>
                    1. Choisissez votre appareil
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {devices.map(device => (
                      <div
                        key={device.id}
                        onClick={() => setSelectedDevice(device.id)}
                        className={`
                          relative overflow-hidden rounded-2xl p-6 border-4 cursor-pointer transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl
                          ${selectedDevice === device.id 
                            ? 'bg-blue-50 border-blue-600 ring-4 ring-blue-200 shadow-xl scale-105' 
                            : 'bg-white border-orange-100 hover:border-orange-400'}
                        `}
                      >
                         {selectedDevice === device.id && (
                           <div className="absolute top-2 right-2 text-blue-600">
                             <CheckCircle size={24} fill="currentColor" className="text-white"/>
                           </div>
                         )}
                        <div className={`text-6xl mb-4 text-center ${selectedDevice === device.id ? 'text-blue-600' : 'text-gray-400'}`}>
                          {device.icon}
                        </div>
                        <h3 className="text-xl font-black text-gray-800 text-center mb-2">{device.name}</h3>
                        <p className="text-sm text-gray-600 text-center mb-4">{device.description}</p>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center bg-gray-50 rounded-lg p-2">
                            <span className="text-sm text-gray-600 font-bold">Prix:</span>
                            <span className="font-black text-orange-600">{device.price} FCFA</span>
                          </div>
                          <div className="flex justify-between items-center bg-gray-50 rounded-lg p-2">
                            <span className="text-sm text-gray-600 font-bold">Durée:</span>
                            <span className="font-black text-gray-700">{device.time} min</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* STEP 2: Select Payment */}
                <div className={`bg-white rounded-3xl shadow-2xl p-8 border-8 border-orange-200 transition-all duration-500 ${!selectedDevice ? 'opacity-50 grayscale pointer-events-none' : ''}`}>
                  <h2 className="text-3xl font-black text-gray-800 mb-6 flex items-center">
                    <div className="w-3 h-12 bg-gradient-to-b from-blue-500 to-cyan-700 mr-4 rounded-full"></div>
                    2. Mode de paiement
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {paymentMethods.map(method => (
                      <button
                        key={method.id}
                        onClick={() => startCharging(selectedDevice, method.id)}
                        className={`bg-gradient-to-br ${method.color} rounded-2xl p-6 text-white text-left cursor-pointer hover:shadow-2xl hover:scale-105 transition-all relative overflow-hidden group border-4 border-transparent hover:border-white/50`}
                      >
                         <div className="absolute top-0 right-0 p-4 opacity-20 transform group-hover:rotate-12 transition-transform">
                            <span className="text-6xl">{method.icon}</span>
                         </div>
                         <div className="relative z-10">
                            <div className="text-4xl mb-2">{method.icon}</div>
                            <h3 className="text-2xl font-black mb-1">{method.name}</h3>
                            <p className="text-white/80 font-medium text-sm">{method.description}</p>
                            <div className="mt-4 inline-flex items-center space-x-2 bg-white/20 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md">
                               <span>Payer maintenant</span>
                               <Zap size={12} fill="currentColor"/>
                            </div>
                         </div>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              // ACTIVE CHARGING SIMULATION
              <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border-8 border-blue-500 animate-in zoom-in duration-300">
                <div className="bg-blue-900 p-8 text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-900 opacity-90"></div>
                    <div className="relative z-10 flex justify-between items-center">
                        <div>
                            <h2 className="text-3xl font-black mb-2">Recharge en cours...</h2>
                            <p className="text-blue-200 flex items-center gap-2">
                               {chargingSimulation.device.icon}
                               {chargingSimulation.device.name} via {chargingSimulation.paymentMethod.name}
                            </p>
                        </div>
                        <div className="animate-spin text-orange-400">
                           <Sun size={48} />
                        </div>
                    </div>
                </div>
                
                <div className="p-10 space-y-10">
                  <div className="relative pt-6">
                     <div className="flex justify-between mb-2 text-xl font-bold text-gray-700">
                        <span>Progression</span>
                        <span>{chargingSimulation.progress}%</span>
                     </div>
                     <div className="h-6 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                        <div 
                           className="h-full bg-gradient-to-r from-green-400 to-emerald-600 transition-all duration-300 relative"
                           style={{ width: `${chargingSimulation.progress}%` }}
                        >
                            <div className="absolute inset-0 bg-white/30 w-full h-full animate-[shimmer_2s_infinite]"></div>
                        </div>
                     </div>
                  </div>

                  <div className="grid grid-cols-2 gap-8 text-center">
                     <div className="p-4 bg-orange-50 rounded-2xl border-2 border-orange-100">
                        <div className="text-orange-600 mb-2 flex justify-center"><Clock size={32}/></div>
                        <div className="text-3xl font-black text-gray-800">{Math.ceil(chargingSimulation.timeRemaining)}</div>
                        <div className="text-sm font-bold text-gray-500 uppercase">Minutes Restantes</div>
                     </div>
                     <div className="p-4 bg-green-50 rounded-2xl border-2 border-green-100">
                         <div className="text-green-600 mb-2 flex justify-center"><Zap size={32}/></div>
                         <div className="text-3xl font-black text-gray-800">OK</div>
                         <div className="text-sm font-bold text-gray-500 uppercase">Voltage Stable</div>
                     </div>
                  </div>

                  {chargingSimulation.progress === 100 ? (
                      <div className="text-center space-y-4 animate-bounce">
                          <div className="inline-block p-4 bg-green-100 text-green-600 rounded-full">
                              <CheckCircle size={48} />
                          </div>
                          <h3 className="text-2xl font-black text-gray-800">Recharge Terminée !</h3>
                          <button 
                            onClick={cancelCharging}
                            className="bg-blue-900 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-800 shadow-lg hover:shadow-xl transition-all"
                          >
                            Nouvelle Recharge
                          </button>
                      </div>
                  ) : (
                      <button 
                        onClick={cancelCharging}
                        className="w-full py-4 border-2 border-red-100 text-red-500 font-bold rounded-xl hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
                      >
                        <X size={20} />
                        Arrêter la recharge (Urgence)
                      </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB: STATIONS */}
        {activeTab === 'stations' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4">
              {stations.map(station => (
                  <div key={station.id} className="bg-white rounded-2xl shadow-lg border-l-8 overflow-hidden hover:shadow-2xl transition-all" 
                       style={{ borderColor: station.status === 'active' ? '#22c55e' : '#f97316'}}>
                      <div className="p-6">
                          <div className="flex justify-between items-start mb-4">
                              <div>
                                  <div className="flex items-center gap-2 mb-1">
                                    <h3 className="text-xl font-black text-gray-800">{station.name}</h3>
                                    <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${station.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                                        {station.status === 'active' ? 'En service' : 'Maintenance'}
                                    </span>
                                  </div>
                                  <p className="text-gray-500 text-sm flex items-center gap-1"><MapPin size={14}/> {station.zone}</p>
                              </div>
                              <div className="bg-gray-100 p-2 rounded-lg text-center min-w-[60px]">
                                  <div className="text-xs text-gray-500 font-bold">AIR</div>
                                  <div className={`font-black ${station.airQuality < 50 ? 'text-green-600' : 'text-orange-500'}`}>{station.airQuality}</div>
                              </div>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-gray-100">
                             <div className="text-center">
                                 <Thermometer size={16} className="mx-auto text-red-500 mb-1"/>
                                 <span className="font-bold text-gray-700">{station.temp}°C</span>
                             </div>
                             <div className="text-center border-l border-gray-100">
                                 <Droplets size={16} className="mx-auto text-blue-500 mb-1"/>
                                 <span className="font-bold text-gray-700">{station.humidity}%</span>
                             </div>
                             <div className="text-center border-l border-gray-100">
                                 <Users size={16} className="mx-auto text-purple-500 mb-1"/>
                                 <span className="font-bold text-gray-700">{station.users}</span>
                             </div>
                          </div>
                      </div>
                  </div>
              ))}
          </div>
        )}

        {/* TAB: ANALYTICS / ENVIRONMENT */}
        {activeTab === 'analytics' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                <div className="bg-white rounded-3xl shadow-2xl p-8 border-8 border-green-200">
                     <h2 className="text-3xl font-black text-gray-800 mb-6 flex items-center">
                        <div className="w-3 h-12 bg-gradient-to-b from-green-600 to-teal-500 mr-4 rounded-full"></div>
                        Analyse Environnementale
                     </h2>
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="col-span-1 md:col-span-2 space-y-4">
                           <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
                              <h3 className="flex items-center gap-2 font-bold text-green-800 mb-4">
                                <Activity size={20} /> Qualité de l'air (Temps Réel)
                              </h3>
                              <div className="h-40 flex items-end justify-between gap-2">
                                 {[45, 60, 35, 80, 55, 40, 30].map((h, i) => (
                                    <div key={i} className="w-full bg-green-200 rounded-t-lg relative group">
                                       <div style={{height: `${h}%`}} className={`absolute bottom-0 w-full rounded-t-lg transition-all ${h > 60 ? 'bg-orange-400' : 'bg-green-500'}`}></div>
                                       <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs py-1 px-2 rounded">{h} AQI</div>
                                    </div>
                                 ))}
                              </div>
                              <div className="flex justify-between mt-2 text-xs text-gray-500 font-medium">
                                 <span>Lun</span><span>Mar</span><span>Mer</span><span>Jeu</span><span>Ven</span><span>Sam</span><span>Dim</span>
                              </div>
                           </div>
                        </div>
                        <div className="space-y-4">
                            <AfricanSensorCard icon={Wind} label="Niveau Sonore" value={`${Math.round(stationData.noise)} dB`} subtext="Zone Calme" color="purple" />
                            <AfricanSensorCard icon={Sun} label="UV Index" value="8" subtext="Élevé - Protection requise" color="orange" />
                        </div>
                     </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="bg-white rounded-2xl p-6 shadow-lg border-l-8 border-blue-500">
                      <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2"><Droplets size={20} className="text-blue-500"/> Précipitations</h3>
                      <p className="text-gray-600">Aucune pluie prévue pour les prochaines 48h. Humidité stable favorable au maintien des équipements.</p>
                   </div>
                   <div className="bg-white rounded-2xl p-6 shadow-lg border-l-8 border-yellow-500">
                      <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2"><Sun size={20} className="text-yellow-500"/> Ensoleillement</h3>
                      <p className="text-gray-600">Production solaire optimale. 9.8 heures d'ensoleillement direct enregistrées aujourd'hui à Dakar.</p>
                   </div>
                </div>
            </div>
        )}

        {/* TAB: INSTITUTIONAL */}
        {activeTab === 'institutional' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                 {/* 1. Header Card */}
                 <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white rounded-3xl shadow-2xl p-8 relative overflow-hidden flex flex-col justify-center h-48">
                    <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-30"><Globe size={120} /></div>
                    <div className="relative z-10">
                        <h2 className="text-4xl font-black mb-2">Portail Institutionnel</h2>
                        <p className="text-white/90 text-xl font-medium">Données environnementales pour les décideurs</p>
                    </div>
                 </div>

                 {/* 2. Top Stats Grid */}
                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white p-4 rounded-2xl shadow-md border-2 border-orange-100">
                        <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white mb-2 shadow-lg">
                            <Thermometer size={20} />
                        </div>
                        <p className="text-sm font-bold text-gray-500 mb-1">Température Moyenne</p>
                        <p className="text-3xl font-black text-gray-800">28.4°C</p>
                    </div>
                    <div className="bg-white p-4 rounded-2xl shadow-md border-2 border-green-100">
                         <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center text-white mb-2 shadow-lg">
                            <Wind size={20} />
                        </div>
                        <p className="text-sm font-bold text-gray-500 mb-1">Qualité de l'Air</p>
                        <p className="text-3xl font-black text-gray-800">Bon</p>
                    </div>
                    <div className="bg-white p-4 rounded-2xl shadow-md border-2 border-blue-100">
                         <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center text-white mb-2 shadow-lg">
                            <Droplets size={20} />
                        </div>
                        <p className="text-sm font-bold text-gray-500 mb-1">Humidité Moyenne</p>
                        <p className="text-3xl font-black text-gray-800">70.8%</p>
                    </div>
                    <div className="bg-white p-4 rounded-2xl shadow-md border-2 border-purple-100">
                         <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center text-white mb-2 shadow-lg">
                            <BarChart3 size={20} />
                        </div>
                        <p className="text-sm font-bold text-gray-500 mb-1">Niveau Sonore</p>
                        <p className="text-3xl font-black text-gray-800">59.3 dB</p>
                    </div>
                 </div>

                 {/* 3. Detailed Metrics Section */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Temperature Panel */}
                    <div className="bg-orange-50 rounded-3xl p-6 border-4 border-orange-100 shadow-lg">
                        <div className="flex items-center gap-3 mb-6">
                             <Thermometer className="text-red-500" size={28}/>
                             <h3 className="text-2xl font-black text-gray-800">Température par Zone</h3>
                        </div>
                        {stations.map(station => (
                            <StatProgressBar 
                                key={station.id}
                                label={station.name}
                                value={station.temp}
                                max={50}
                                unit="°C"
                                colorClass="bg-gradient-to-r from-blue-400 via-purple-400 to-red-500"
                            />
                        ))}
                    </div>

                    {/* Air Quality Panel */}
                    <div className="bg-green-50 rounded-3xl p-6 border-4 border-green-100 shadow-lg">
                        <div className="flex items-center gap-3 mb-6">
                             <Wind className="text-green-600" size={28}/>
                             <h3 className="text-2xl font-black text-gray-800">Qualité de l'Air par Zone</h3>
                        </div>
                        {stations.map(station => (
                            <StatProgressBar 
                                key={station.id}
                                label={station.name}
                                value={station.airQuality} // Assuming lower is better for simplified view or matching mocked data
                                max={100} // AQI max
                                unit=""
                                status={station.airQuality < 50 ? 'Bon' : 'Modéré'}
                                colorClass={station.airQuality < 50 ? "bg-green-500" : "bg-orange-500"}
                            />
                        ))}
                    </div>
                 </div>

                 {/* 4. Alerts Panel */}
                 <div className="bg-orange-50 rounded-3xl p-8 border-4 border-orange-200 shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4">
                        <span className="bg-orange-200 text-orange-800 px-4 py-2 rounded-full font-bold shadow-sm">
                            {alerts.length} alertes
                        </span>
                    </div>
                    <div className="flex items-center gap-3 mb-6">
                         <div className="w-2 h-8 bg-orange-600 rounded-full"></div>
                         <h3 className="text-2xl font-black text-gray-800">Alertes Actives</h3>
                    </div>
                    <div className="space-y-4">
                        {alerts.map(alert => (
                            <div key={alert.id} className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-orange-500 flex justify-between items-start">
                                <div>
                                    <h4 className="font-bold text-lg text-gray-800">{alert.title}</h4>
                                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                                        <MapPin size={14} className="text-pink-500"/>
                                        <span className="font-semibold text-gray-700">{alert.location}</span>
                                    </div>
                                    <div className="mt-2 font-black text-gray-800 text-lg">{alert.value}</div>
                                </div>
                                <span className="text-xs font-bold text-gray-400">{alert.time}</span>
                            </div>
                        ))}
                    </div>
                 </div>

                 {/* 5. API & Reports Section */}
                 <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl p-8 shadow-2xl text-white relative overflow-hidden border-4 border-yellow-400">
                    <div className="flex items-center gap-3 mb-8 relative z-10">
                         <div className="bg-white/20 p-2 rounded-lg"><Database size={24}/></div>
                         <h3 className="text-2xl font-black">API Ouverte & Rapports</h3>
                    </div>

                    <div className="bg-white/10 rounded-xl p-6 backdrop-blur-md border border-white/20 mb-8 relative z-10">
                        <h4 className="font-bold mb-4 opacity-90">Accès API</h4>
                        <div className="bg-black/30 rounded-lg p-4 font-mono text-sm text-pink-200 mb-4 flex items-center gap-2">
                            <span className="text-white font-bold">GET</span> /api/v1/environmental-data
                        </div>
                        <button className="bg-white text-purple-700 font-bold px-6 py-3 rounded-xl hover:bg-gray-100 transition-colors shadow-lg">
                            Documentation
                        </button>
                    </div>

                    <div className="space-y-3 relative z-10">
                        <button className="w-full bg-white/10 hover:bg-white/20 border border-white/30 rounded-xl p-4 flex items-center justify-between transition-all group">
                             <div className="flex items-center gap-3">
                                 <FileText size={20}/>
                                 <span className="font-bold">Rapport Hebdomadaire</span>
                             </div>
                             <ChevronRight className="opacity-50 group-hover:translate-x-1 transition-transform"/>
                        </button>
                        <button className="w-full bg-white/10 hover:bg-white/20 border border-white/30 rounded-xl p-4 flex items-center justify-between transition-all group">
                             <div className="flex items-center gap-3">
                                 <BarChart3 size={20}/>
                                 <span className="font-bold">Analyse Mensuelle</span>
                             </div>
                             <ChevronRight className="opacity-50 group-hover:translate-x-1 transition-transform"/>
                        </button>
                        <button className="w-full bg-white/10 hover:bg-white/20 border border-white/30 rounded-xl p-4 flex items-center justify-between transition-all group">
                             <div className="flex items-center gap-3">
                                 <AlertTriangle size={20}/>
                                 <span className="font-bold">Alertes Environnementales</span>
                             </div>
                             <ChevronRight className="opacity-50 group-hover:translate-x-1 transition-transform"/>
                        </button>
                    </div>
                 </div>
                 
                 {/* Footer Style */}
                 <div className="mt-12 bg-blue-900 rounded-t-3xl p-8 text-center text-white relative overflow-hidden -mx-6 -mb-8 pb-12">
                     <div className="flex items-center justify-center gap-2 mb-2">
                        <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center text-blue-900">
                             <Globe size={16}/>
                        </div>
                        <span className="font-black text-xl text-orange-400">KaayChargé</span>
                     </div>
                     <p className="text-blue-300 font-bold text-sm uppercase tracking-wider mb-4">Infrastructure du Futur</p>
                     <p className="text-white/80 font-medium text-sm">Une solution numérique au service des citoyens et de l'État</p>
                     <div className="mt-4 text-xs text-blue-400 font-mono">Made in Senegal SN with ❤️ • © 2024</div>
                 </div>

            </div>
        )}

        {/* TAB: IMPACT */}
        {activeTab === 'impact' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
               <div className="text-center mb-8">
                  <h2 className="text-4xl font-black text-green-800 mb-2">Notre Impact Écologique</h2>
                  <p className="text-xl text-green-600">Contribuer à un Sénégal plus vert, une charge à la fois.</p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <AfricanStatCard icon={Leaf} title="CO2 Évité" value={`${stationData.co2Saved} kg`} pattern="leaves" colorFrom="from-green-600" colorTo="to-green-800" />
                  <AfricanStatCard icon={Sun} title="Énergie Propre" value="1.2 MWh" pattern="sun" colorFrom="from-yellow-500" colorTo="to-orange-600" />
                  <AfricanStatCard icon={Users} title="Citoyens Connectés" value="1,240" pattern="triangles" colorFrom="from-blue-600" colorTo="to-indigo-700" />
               </div>

               <div className="bg-green-900 rounded-3xl p-10 text-white relative overflow-hidden shadow-2xl">
                   <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                       <div className="bg-white/10 p-6 rounded-full backdrop-blur-md border-4 border-white/20">
                          <Leaf size={64} className="text-green-300" />
                       </div>
                       <div>
                          <h3 className="text-3xl font-bold mb-2">Équivalent Arbres Plantés</h3>
                          <div className="text-6xl font-black text-green-300 mb-2">124</div>
                          <p className="text-green-100 text-lg">Grâce à l'utilisation de l'énergie solaire pour recharger vos appareils, vous avez contribué à réduire l'empreinte carbone équivalente à la plantation d'une petite forêt urbaine.</p>
                       </div>
                   </div>
               </div>
            </div>
        )}

      </main>
    </div>
  );
};

export default KaayCharge;
