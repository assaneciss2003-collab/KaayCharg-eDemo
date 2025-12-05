import React, { useState, useEffect } from 'react';
import { Battery, Wifi, Droplets, Thermometer, Wind, MapPin, TrendingUp, Zap, Users, Leaf, Download, AlertTriangle, CheckCircle, Clock, BarChart3, FileText, Globe, Sun, Smartphone, Laptop, Tablet, CreditCard, X } from 'lucide-react';

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
const AfricanSensorCard = ({ icon: Icon, label, value, color }) => {
  const colorMap = {
    red: 'text-red-600 bg-red-50 border-red-200',
    blue: 'text-blue-600 bg-blue-50 border-blue-200',
    green: 'text-green-600 bg-green-50 border-green-200',
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


const KaayChargeDemo = () => {
  const [activeTab, setActiveTab] = useState('overview');
  // Ajout d'un état pour l'appareil sélectionné au lieu de document.getElementById
  const [selectedDevice, setSelectedDevice] = useState(null); 
  
  const [stationData, setStationData] = useState({
    battery: 87,
    temperature: 28,
    humidity: 65,
    airQuality: 'Bonne',
    activeUsers: 3,
    energyProduced: 2.4
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
        battery: Math.min(100, Math.max(0, prev.battery + Math.random() * 2 - 1)), // Légère variation réaliste
        temperature: 26 + Math.random() * 4,
        humidity: 60 + Math.random() * 10,
        airQuality: prev.airQuality,
        activeUsers: Math.floor(Math.random() * 5),
        energyProduced: 2 + Math.random() * 1
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (chargingSimulation.isActive && chargingSimulation.progress < 100) {
      const interval = setInterval(() => {
        setChargingSimulation(prev => {
          const newProgress = Math.min(100, prev.progress + 1);
          const newTimeRemaining = Math.max(0, prev.timeRemaining - (prev.device.time / 100)); // Simulation du temps
          
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
    { id: 1, name: 'Plateau Centre', lat: 14.6928, lng: -17.4467, status: 'active', users: 2, zone: 'Centre-ville', temp: 29.2, humidity: 68, airQuality: 48, pm25: 23, noise: 65 },
    { id: 2, name: 'Almadies', lat: 14.7392, lng: -17.5089, status: 'active', users: 1, zone: 'Résidentiel', temp: 27.8, humidity: 72, airQuality: 42, pm25: 18, noise: 52 },
    { id: 3, name: 'Parcelles Assainies', lat: 14.7644, lng: -17.4518, status: 'active', users: 0, zone: 'Populaire', temp: 30.1, humidity: 65, airQuality: 55, pm25: 31, noise: 72 },
    { id: 4, name: 'Ouakam', lat: 14.7247, lng: -17.4921, status: 'maintenance', users: 0, zone: 'Côtier', temp: 26.5, humidity: 78, airQuality: 38, pm25: 15, noise: 48 }
  ];

  const environmentalData = {
    temperature: {
      average: 28.4, min: 26.5, max: 30.1, trend: '+0.8°C', status: 'normal',
      zones: [
        { name: 'Plateau Centre', value: 29.2, alert: false },
        { name: 'Almadies', value: 27.8, alert: false },
        { name: 'Parcelles Assainies', value: 30.1, alert: true },
        { name: 'Ouakam', value: 26.5, alert: false }
      ]
    },
    // ... autres données utilisées dans les graphiques si besoin
  };

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

        {/* TAB: OTHERS (Placeholder) */}
        {['analytics', 'institutional', 'impact'].includes(activeTab) && (
            <div className="flex flex-col items-center justify-center py-20 bg-white/50 rounded-3xl border-4 border-dashed border-gray-300">
                <div className="text-gray-300 mb-4">
                    {activeTab === 'analytics' && <BarChart3 size={80} />}
                    {activeTab === 'institutional' && <Globe size={80} />}
                    {activeTab === 'impact' && <Leaf size={80} />}
                </div>
                <h3 className="text-2xl font-black text-gray-400">Module en cours de développement</h3>
                <p className="text-gray-500 mt-2">Cette section sera bientôt disponible pour la démo.</p>
            </div>
        )}

      </main>
    </div>
  );
};

export default KaayChargeDemo;