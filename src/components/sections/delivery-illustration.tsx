'use client'

import { motion } from 'framer-motion'

export function DeliveryIllustration() {
  return (
    <div className="relative w-full max-w-lg mx-auto">
      <svg viewBox="0 0 520 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto drop-shadow-2xl">
        <defs>
          <linearGradient id="truckGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#34D399" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>
          <linearGradient id="cabinGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#059669" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>
          <linearGradient id="bgCircle" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#064E3B" stopOpacity="0.08" />
          </linearGradient>
          <filter id="shadow" x="-10%" y="-10%" width="130%" height="130%">
            <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#064E3B" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* Background glow */}
        <circle cx="260" cy="190" r="170" fill="url(#bgCircle)" />

        {/* Ground shadow */}
        <ellipse cx="260" cy="340" rx="200" ry="20" fill="#064E3B" opacity="0.12" />

        {/* === WAREHOUSE (left) === */}
        <g opacity="0.35">
          {/* Warehouse body */}
          <rect x="20" y="160" width="140" height="130" rx="4" fill="#064E3B" />
          {/* Roof */}
          <path d="M10 160 L90 100 L170 160 Z" fill="#059669" />
          {/* Door */}
          <rect x="60" y="220" width="50" height="70" rx="2" fill="#10B981" opacity="0.5" />
          {/* Windows */}
          <rect x="30" y="180" width="20" height="20" rx="2" fill="rgba(255,255,255,0.15)" />
          <rect x="130" y="180" width="20" height="20" rx="2" fill="rgba(255,255,255,0.15)" />
          {/* Boxes inside warehouse */}
          <rect x="30" y="250" width="18" height="18" rx="2" fill="#F59E0B" opacity="0.6" />
          <rect x="52" y="255" width="18" height="13" rx="2" fill="#EF4444" opacity="0.6" />
        </g>

        {/* === DELIVERY TRUCK === */}
        <g filter="url(#shadow)">
          {/* Truck cargo body */}
          <rect x="210" y="165" width="140" height="85" rx="8" fill="url(#truckGrad)" />

          {/* Cargo body top accent */}
          <rect x="210" y="165" width="140" height="16" rx="8" fill="rgba(255,255,255,0.12)" />

          {/* TT/DI logo on truck body */}
          <rect x="253" y="192" width="54" height="36" rx="4" fill="rgba(255,255,255,0.15)" />
          <text x="280" y="207" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold" fontFamily="sans-serif" opacity="0.8">TT</text>
          <text x="280" y="222" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold" fontFamily="sans-serif" opacity="0.6">DI</text>

          {/* Cabin */}
          <rect x="350" y="195" width="60" height="55" rx="6" fill="url(#cabinGrad)" />

          {/* Cabin window */}
          <rect x="358" y="203" width="40" height="26" rx="4" fill="rgba(255,255,255,0.2)" />
          <rect x="362" y="207" width="14" height="18" rx="2" fill="rgba(255,255,255,0.08)" />
          <rect x="380" y="207" width="14" height="18" rx="2" fill="rgba(255,255,255,0.08)" />

          {/* Bumper */}
          <rect x="410" y="235" width="15" height="20" rx="3" fill="#047857" />
          <circle cx="418" cy="250" r="3" fill="#FBBF24" />

          {/* Headlight */}
          <rect x="406" y="218" width="8" height="8" rx="2" fill="#FDE68A" />
        </g>

        {/* Truck wheels */}
        <circle cx="250" cy="262" r="20" fill="#1E293B" />
        <circle cx="250" cy="262" r="8" fill="#475569" />
        <circle cx="250" cy="262" r="3" fill="#94A3B8" />
        <circle cx="370" cy="262" r="20" fill="#1E293B" />
        <circle cx="370" cy="262" r="8" fill="#475569" />
        <circle cx="370" cy="262" r="3" fill="#94A3B8" />

        {/* === BOXES ON TRUCK === */}
        <motion.g
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <rect x="220" y="125" width="28" height="28" rx="4" fill="#F59E0B" />
          <path d="M230 138 L234 142 L242 133" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
        </motion.g>
        <motion.g
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        >
          <rect x="253" y="120" width="32" height="32" rx="4" fill="#3B82F6" />
          <path d="M264 135 L269 140 L278 131" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
        </motion.g>
        <motion.g
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
        >
          <rect x="290" y="128" width="26" height="26" rx="4" fill="#EF4444" />
          <path d="M299 140 L303 144 L310 136" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
        </motion.g>
        <motion.g
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}
        >
          <rect x="320" y="122" width="24" height="30" rx="4" fill="#8B5CF6" />
          <path d="M328 136 L332 140 L339 132" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
        </motion.g>

        {/* === DELIVERED PACKAGES (right side) === */}
        <g>
          <rect x="445" y="268" width="28" height="24" rx="3" fill="#F59E0B" opacity="0.85" />
          <rect x="448" y="248" width="22" height="20" rx="3" fill="#3B82F6" opacity="0.85" />
          <rect x="450" y="232" width="18" height="16" rx="2" fill="#8B5CF6" opacity="0.85" />

          {/* Checkmark on top box */}
          <motion.g
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <path d="M455 239 L458 242 L464 236" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </motion.g>
        </g>

        {/* === MOTION LINES === */}
        <motion.g
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <line x1="185" y1="220" x2="205" y2="220" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="178" y1="237" x2="205" y2="237" stroke="#10B981" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
          <line x1="182" y1="254" x2="205" y2="254" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
        </motion.g>

        {/* === FLOATING ICONS (top-right) === */}
        <motion.g
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <circle cx="470" cy="100" r="20" fill="#10B981" opacity="0.15" />
          <text x="470" y="107" textAnchor="middle" fontSize="18">🥛</text>
        </motion.g>
        <motion.g
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        >
          <circle cx="430" cy="75" r="18" fill="#F59E0B" opacity="0.12" />
          <text x="430" y="82" textAnchor="middle" fontSize="16">☕</text>
        </motion.g>
        <motion.g
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        >
          <circle cx="490" cy="150" r="16" fill="#EF4444" opacity="0.12" />
          <text x="490" y="157" textAnchor="middle" fontSize="14">🍝</text>
        </motion.g>

        {/* === DELIVERY PATH (dotted) === */}
        <path d="M170 290 Q220 270 350 290 Q400 295 450 285" stroke="#10B981" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.25" fill="none" />

        {/* === PIN DROPS === */}
        <g opacity="0.6">
          <circle cx="460" cy="200" r="5" fill="#10B981" />
          <circle cx="460" cy="200" r="10" fill="#10B981" opacity="0.2" />
        </g>
      </svg>
    </div>
  )
}
