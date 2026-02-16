import React, { useState, useEffect } from 'react';

const Documentation = ({ onBack }) => {
    const [activeSection, setActiveSection] = useState('overview');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [theme, setTheme] = useState('dark');
    const [searchQuery, setSearchQuery] = useState('');

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    // Effect to handle scroll spy
    useEffect(() => {
        const handleScroll = () => {
            const sections = ['overview', 'usp', 'business', 'problem', 'audience', 'installation', 'tech-stack', 'implementation', 'roadmap'];
            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top >= 0 && rect.top <= 300) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        // Initial check
        handleScroll();

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id) => {
        setActiveSection(id);
        const element = document.getElementById(id);
        if (element) {
            const offset = 80;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            setIsMenuOpen(false);
        }
    };

    const isDark = theme === 'dark';

    // Styles Configuration
    const styles = {
        bg: isDark ? 'bg-[#18181b]' : 'bg-white',
        textMain: isDark ? 'text-[#f4f4f5]' : 'text-gray-900',
        textSecondary: isDark ? 'text-[#a1a1aa]' : 'text-gray-600',
        border: isDark ? 'border-[#27272a]' : 'border-gray-200',
        sidebarBg: isDark ? 'bg-[#18181b]' : 'bg-gray-50',
        navBg: isDark ? 'bg-[#18181b]/90' : 'bg-white/90',
        cardBg: isDark ? 'bg-[#202022]' : 'bg-white',
        codeBg: isDark ? 'bg-[#0f0f11]' : 'bg-gray-900',
        accent: 'text-[#22d3ee]',
        accentBorder: 'border-[#22d3ee]',
        heading: isDark ? 'text-white' : 'text-gray-900',
        tableHeader: isDark ? 'bg-[#202022] text-gray-200' : 'bg-gray-100 text-gray-700',
        tableRowEven: isDark ? 'bg-[#1a1a1d]' : 'bg-white',
        tableRowOdd: isDark ? 'bg-[#18181b]' : 'bg-gray-50',
    };

    const sections = [
        { id: 'overview', title: 'Project Overview' },
        { id: 'usp', title: 'USP & Differentiation' },
        { id: 'business', title: 'Business Idea (DAO)' },
        { id: 'problem', title: 'Problem Addressed' },
        { id: 'audience', title: 'Target Audience' },
        { id: 'installation', title: 'Installation & Setup' },
        { id: 'tech-stack', title: 'Technology Stack' },
        { id: 'implementation', title: 'Implementation Details' },
        { id: 'roadmap', title: 'Future Roadmap' },
    ];

    const filteredSections = sections.filter(s =>
        s.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className={`min-h-screen flex flex-col ${styles.bg} ${styles.textMain} font-sans selection:bg-[#22d3ee] selection:text-black transition-colors duration-300`}>
            {/* Header / Navbar */}
            <nav className={`fixed w-full z-50 border-b ${styles.border} ${styles.navBg} backdrop-blur-md transition-colors duration-300`}>
                <div className="w-full px-4 md:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo Area - Left Aligned */}
                        <div className="flex items-center gap-3 cursor-pointer" onClick={onBack}>
                            <div className="w-8 h-8 bg-gradient-to-tr from-[#22d3ee] to-[#3b82f6] rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/20">
                                <span className="text-black font-bold text-lg">A</span>
                            </div>
                            <span className={`font-bold text-xl tracking-tight ${styles.heading}`}>Anveshak Docs</span>
                        </div>

                        {/* Right Actions */}
                        <div className="flex items-center gap-4">
                            {/* Search Input */}
                            <div className="hidden md:flex items-center relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search docs..."
                                    className={`pl-10 pr-4 py-1.5 rounded-lg border ${styles.border} ${isDark ? 'bg-[#27272a] text-gray-200 placeholder-gray-500' : 'bg-gray-100 text-gray-900 placeholder-gray-500'} text-sm focus:outline-none focus:ring-1 focus:ring-[#22d3ee] w-64 transition-all`}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>

                            {/* Theme Toggle */}
                            <button
                                onClick={toggleTheme}
                                className={`p-2 rounded-lg transition-colors ${isDark ? 'bg-[#27272a] text-yellow-400 hover:bg-[#3f3f46]' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                            >
                                {isDark ? (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                                ) : (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                                )}
                            </button>

                            <button
                                onClick={onBack}
                                className={`text-sm font-medium ${styles.textSecondary} hover:${styles.textMain} transition-colors hidden sm:block`}
                            >
                                ← Back to App
                            </button>

                            {/* Mobile Menu Button */}
                            <button className="md:hidden p-2 text-gray-400" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="flex flex-1 w-full pt-16 max-w-[1920px] mx-auto">

                {/* Left Sidebar (Navigation) */}
                <aside className={`fixed md:sticky top-16 left-0 h-[calc(100vh-4rem)] w-64 border-r ${styles.border} ${styles.sidebarBg} overflow-y-auto z-40 transition-transform duration-300 md:translate-x-0 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <div className="p-6 space-y-8">
                        <div>
                            <h5 className="text-xs font-bold text-[#22d3ee] uppercase tracking-wider mb-4">Documentation</h5>
                            <ul className={`space-y-1 border-l ${styles.border} ml-1`}>
                                {filteredSections.length > 0 ? filteredSections.map(section => (
                                    <li key={section.id} className="-ml-px">
                                        <button
                                            onClick={() => scrollToSection(section.id)}
                                            className={`block w-full text-left pl-4 py-1.5 text-sm border-l hover:border-[#22d3ee] transition-all ${activeSection === section.id ? 'text-[#22d3ee] border-[#22d3ee] font-medium' : `${styles.textSecondary} border-transparent hover:${styles.textMain}`}`}
                                        >
                                            {section.title}
                                        </button>
                                    </li>
                                )) : (
                                    <li className={`pl-4 py-2 text-sm ${styles.textSecondary}`}>
                                        No results found
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 w-full min-w-0">
                    <div className="max-w-4xl mx-auto p-6 md:p-12 space-y-20">

                        {/* 1. Project Overview */}
                        <section id="overview" className="scroll-mt-24">
                            <div className="flex gap-2 mb-6">
                                <span className="px-2.5 py-1 rounded-full bg-[#22d3ee]/10 text-[#22d3ee] text-xs font-semibold border border-[#22d3ee]/20">Concept</span>
                                <span className="px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-semibold border border-purple-500/20">ICP Native</span>
                            </div>
                            <h1 className={`text-4xl md:text-5xl font-extrabold ${styles.heading} mb-6 tracking-tight leading-tight`}>
                                1. Project Overview & Scope
                            </h1>
                            <p className={`text-lg ${styles.textSecondary} leading-relaxed mb-8`}>
                                AnveshakAI is a decentralized, privacy-first AI knowledge assistant built entirely on the <strong>Internet Computer Protocol (ICP)</strong>. Unlike traditional AI chatbots that run on centralized servers (like AWS/Google Cloud) where user data is opaque, AnveshakAI runs as a "Canister" (smart contract) on the blockchain.
                            </p>

                            <div className={`${styles.cardBg} border ${styles.border} rounded-xl p-6 md:p-8 shadow-sm`}>
                                <h3 className={`${styles.heading} text-xl font-bold mb-4 flex items-center gap-2`}>
                                    <span className="text-[#22d3ee]">●</span> Scope
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex gap-3">
                                        <div className="mt-1 w-1.5 h-1.5 rounded-full bg-[#22d3ee] shrink-0"></div>
                                        <div>
                                            <strong className={styles.textMain}>Personalized Knowledge Base:</strong>
                                            <p className={`text-sm ${styles.textSecondary} mt-1`}>Users can upload documents (PDFs, text, code) to create a custom knowledge base.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <div className="mt-1 w-1.5 h-1.5 rounded-full bg-[#22d3ee] shrink-0"></div>
                                        <div>
                                            <strong className={styles.textMain}>Hybrid AI Engine:</strong>
                                            <p className={`text-sm ${styles.textSecondary} mt-1`}>Combines the reasoning power of Google Gemini (LLM) with the decentralized storage and execution of ICP.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <div className="mt-1 w-1.5 h-1.5 rounded-full bg-[#22d3ee] shrink-0"></div>
                                        <div>
                                            <strong className={styles.textMain}>Crypto-Economic Integrated:</strong>
                                            <p className={`text-sm ${styles.textSecondary} mt-1`}>Uses Cycles (ICP's compute currency) for usage metering and Internet Identity for secure, anonymous login.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <div className="mt-1 w-1.5 h-1.5 rounded-full bg-[#22d3ee] shrink-0"></div>
                                        <div>
                                            <strong className={styles.textMain}>Governance:</strong>
                                            <p className={`text-sm ${styles.textSecondary} mt-1`}>Includes an SNS (Service Nervous System) module, allowing the community to vote on upgrades.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* 2. USP */}
                        <section id="usp" className={`scroll-mt-24 border-t ${styles.border} pt-12`}>
                            <h2 className={`text-3xl font-bold ${styles.heading} mb-8`}>2. USP & Differentiation</h2>
                            <div className={`overflow-x-auto rounded-lg border ${styles.border} mb-8 shadow-sm`}>
                                <table className="w-full text-left text-sm">
                                    <thead className={`text-xs uppercase ${styles.tableHeader}`}>
                                        <tr>
                                            <th className="px-6 py-4 font-bold tracking-wider">Feature</th>
                                            <th className="px-6 py-4 font-bold tracking-wider">Traditional AI</th>
                                            <th className="px-6 py-4 font-bold text-[#22d3ee] tracking-wider">AnveshakAI</th>
                                        </tr>
                                    </thead>
                                    <tbody className={`divide-y ${styles.border}`}>
                                        <tr className={styles.tableRowOdd}>
                                            <td className={`px-6 py-4 font-medium ${styles.heading}`}>Hosting</td>
                                            <td className={`px-6 py-4 ${styles.textSecondary}`}>Centralized Servers</td>
                                            <td className="px-6 py-4 text-[#22d3ee] font-medium">100% On-Chain (ICP)</td>
                                        </tr>
                                        <tr className={styles.tableRowEven}>
                                            <td className={`px-6 py-4 font-medium ${styles.heading}`}>Privacy</td>
                                            <td className={`px-6 py-4 ${styles.textSecondary}`}>Company owns your chats</td>
                                            <td className="px-6 py-4 text-[#22d3ee] font-medium">User owns data (Encrypted)</td>
                                        </tr>
                                        <tr className={styles.tableRowOdd}>
                                            <td className={`px-6 py-4 font-medium ${styles.heading}`}>Login</td>
                                            <td className={`px-6 py-4 ${styles.textSecondary}`}>Email / Phone</td>
                                            <td className="px-6 py-4 text-[#22d3ee] font-medium">Internet Identity (Anon)</td>
                                        </tr>
                                        <tr className={styles.tableRowEven}>
                                            <td className={`px-6 py-4 font-medium ${styles.heading}`}>Payment</td>
                                            <td className={`px-6 py-4 ${styles.textSecondary}`}>Credit Card Subscription</td>
                                            <td className="px-6 py-4 text-[#22d3ee] font-medium">Cycles & Tokens (Pay-per-use/DAO)</td>
                                        </tr>
                                        <tr className={styles.tableRowOdd}>
                                            <td className={`px-6 py-4 font-medium ${styles.heading}`}>Uptime</td>
                                            <td className={`px-6 py-4 ${styles.textSecondary}`}>Prone to outages</td>
                                            <td className="px-6 py-4 text-[#22d3ee] font-medium">Censorship Resistant</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className={`p-6 rounded-lg border-l-4 ${styles.accentBorder} ${isDark ? 'bg-[#22d3ee]/5' : 'bg-[#22d3ee]/10'}`}>
                                <h4 className={`text-lg font-bold ${isDark ? 'text-[#22d3ee]' : 'text-blue-600'} mb-2`}>Key USP: "Sovereign AI"</h4>
                                <p className={styles.textMain}>You don't just use the AI; you own your interactions and data on an immutable ledger.</p>
                            </div>
                        </section>

                        {/* 3. Business Idea */}
                        <section id="business" className={`scroll-mt-24 border-t ${styles.border} pt-12`}>
                            <h2 className={`text-3xl font-bold ${styles.heading} mb-6`}>3. Business Idea: The Sovereign Knowledge Protocol</h2>
                            <p className={`${styles.textSecondary} mb-8`}>
                                AnveshakAI shifts the AI paradigm from a "rented service" to a "sovereign asset". It democratizes access to advanced AI while ensuring data privacy. The model fits the <strong>"Decentralized AI Utility DAO"</strong>.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className={`p-6 rounded-xl border ${styles.border} ${styles.cardBg}`}>
                                    <div className="text-3xl mb-4">💳</div>
                                    <h3 className={`font-bold ${styles.heading} mb-2`}>1. Pay in Crypto</h3>
                                    <p className={`text-sm ${styles.textSecondary}`}>Users pay in Cycles/Tokens for premium AI services (Privacy+ tier).</p>
                                </div>
                                <div className={`p-6 rounded-xl border ${styles.border} ${styles.cardBg}`}>
                                    <div className="text-3xl mb-4">🗳️</div>
                                    <h3 className={`font-bold ${styles.heading} mb-2`}>2. DAO Governance</h3>
                                    <p className={`text-sm ${styles.textSecondary}`}>Token holders vote on AI model integrations and treasury management via SNS.</p>
                                </div>
                                <div className={`p-6 rounded-xl border ${styles.border} ${styles.cardBg}`}>
                                    <div className="text-3xl mb-4">🛠️</div>
                                    <h3 className={`font-bold ${styles.heading} mb-2`}>3. Builder Economy</h3>
                                    <p className={`text-sm ${styles.textSecondary}`}>Developers earn by providing specialized "System Prompts" or fine-tuned modules.</p>
                                </div>
                            </div>
                        </section>

                        {/* 4. Problem Addressed */}
                        <section id="problem" className={`scroll-mt-24 border-t ${styles.border} pt-12`}>
                            <h2 className={`text-3xl font-bold ${styles.heading} mb-8`}>4. Problem Addressed</h2>

                            <div className="space-y-6">
                                <div className={`group p-6 border ${styles.border} rounded-xl hover:border-red-500/50 transition-colors`}>
                                    <h3 className="text-xl font-bold text-red-400 mb-2">The "Black Box" Privacy Dilemma</h3>
                                    <p className={styles.textSecondary}>When you upload sensitive documents to standard AI, you hand data to a centralized corp. AnveshakAI creates a "sovereign enclave" that you control.</p>
                                </div>
                                <div className={`group p-6 border ${styles.border} rounded-xl hover:border-orange-500/50 transition-colors`}>
                                    <h3 className="text-xl font-bold text-orange-400 mb-2">Platform Risk & Censorship</h3>
                                    <p className={styles.textSecondary}>Centralized APIs can ban users arbitrarily. AnveshakAI runs as "Unstoppable Code" on the blockchain. No single entity can shut it down.</p>
                                </div>
                                <div className={`group p-6 border ${styles.border} rounded-xl hover:border-green-500/50 transition-colors`}>
                                    <h3 className="text-xl font-bold text-green-400 mb-2">Subscription Fatigue</h3>
                                    <p className={styles.textSecondary}>Instead of a flat $20/month for unused capacity, the "Cycles" model allows for granular pay-as-you-go micro-payments.</p>
                                </div>
                            </div>
                        </section>

                        {/* 5. Target Audience */}
                        <section id="audience" className={`scroll-mt-24 border-t ${styles.border} pt-12`}>
                            <h2 className={`text-3xl font-bold ${styles.heading} mb-6`}>5. Target Audience</h2>
                            <p className={`${styles.textSecondary} mb-8`}>
                                Designed for those who cannot compromise on <strong>Data Sovereignty, Privacy, or Reliability</strong>.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className={`p-5 rounded-lg border ${styles.border} ${styles.cardBg}`}>
                                    <span className="text-xs font-bold text-blue-400 uppercase tracking-wide">Privacy-Critical</span>
                                    <h4 className={`text-lg font-bold ${styles.heading} mt-1 mb-2`}>High-Risk Professionals</h4>
                                    <p className={`text-sm ${styles.textSecondary}`}>Lawyers, Doctors, Researchers handling confidential data.</p>
                                </div>
                                <div className={`p-5 rounded-lg border ${styles.border} ${styles.cardBg}`}>
                                    <span className="text-xs font-bold text-purple-400 uppercase tracking-wide">Builders</span>
                                    <h4 className={`text-lg font-bold ${styles.heading} mt-1 mb-2`}>Web3 & DAO Ecosystem</h4>
                                    <p className={`text-sm ${styles.textSecondary}`}>Smart Contract Devs, DAO Contributors needing governable knowledge bases.</p>
                                </div>
                                <div className={`p-5 rounded-lg border ${styles.border} ${styles.cardBg}`}>
                                    <span className="text-xs font-bold text-green-400 uppercase tracking-wide">Sovereign</span>
                                    <h4 className={`text-lg font-bold ${styles.heading} mt-1 mb-2`}>Enterprise Intranets</h4>
                                    <p className={`text-sm ${styles.textSecondary}`}>Corporate R&D and Gov agencies needing compliant, locally-hosted AI.</p>
                                </div>
                                <div className={`p-5 rounded-lg border ${styles.border} ${styles.cardBg}`}>
                                    <span className="text-xs font-bold text-yellow-400 uppercase tracking-wide">Freedom</span>
                                    <h4 className={`text-lg font-bold ${styles.heading} mt-1 mb-2`}>Freedom Tech Users</h4>
                                    <p className={`text-sm ${styles.textSecondary}`}>Journalists, Activists requiring censorship resistance and anonymity.</p>
                                </div>
                            </div>
                        </section>

                        {/* 6. CLI Guide (Replaces/Augments Installation) */}
                        <section id="installation" className={`scroll-mt-24 border-t ${styles.border} pt-12`}>
                            <h2 className={`text-3xl font-bold ${styles.heading} mb-6`}>CLI Installation & Usage Guide</h2>
                            <p className={`${styles.textSecondary} mb-8`}>
                                AnveshakAI provides a powerful terminal-based interface for developers who prefer command-line interactions.
                            </p>

                            <div className="space-y-8">
                                {/* Prerequisites */}
                                <div>
                                    <h3 className={`text-xl font-semibold ${styles.heading} mb-3 flex items-center gap-2`}>
                                        <span className="text-[#22d3ee]">01.</span> Prerequisites
                                    </h3>
                                    <ul className={`list-disc pl-5 ${styles.textSecondary} space-y-2`}>
                                        <li><strong>Node.js</strong> (v18 or higher) installed.</li>
                                        <li><strong>npm</strong> (Node Package Manager).</li>
                                        <li>A valid <strong>Google Gemini API Key</strong>.</li>
                                    </ul>
                                </div>

                                {/* Installation */}
                                <div>
                                    <h3 className={`text-xl font-semibold ${styles.heading} mb-3 flex items-center gap-2`}>
                                        <span className="text-[#22d3ee]">02.</span> Installation
                                    </h3>
                                    <div className={`${styles.codeBg} rounded-xl border ${styles.border} p-6 font-mono text-sm overflow-x-auto shadow-sm`}>
                                        <div className="flex gap-2 mb-2">
                                            <span className="text-gray-500"># 1. Clone the repository</span>
                                        </div>
                                        <p className="text-gray-300 mb-4">
                                            <span className="text-purple-400">git</span> clone https://github.com/ChinmayBhattt/AnveshakAI-Decentralized-AI-Assistant.git
                                        </p>

                                        <div className="flex gap-2 mb-2">
                                            <span className="text-gray-500"># 2. Navigate to the CLI directory</span>
                                        </div>
                                        <p className="text-gray-300 mb-4">
                                            <span className="text-purple-400">cd</span> AnveshakAI-Decentralized-AI-Assistant/cli
                                        </p>

                                        <div className="flex gap-2 mb-2">
                                            <span className="text-gray-500"># 3. Install dependencies</span>
                                        </div>
                                        <p className="text-gray-300">
                                            <span className="text-yellow-400">npm</span> install
                                        </p>
                                    </div>
                                </div>

                                {/* Usage */}
                                <div>
                                    <h3 className={`text-xl font-semibold ${styles.heading} mb-3 flex items-center gap-2`}>
                                        <span className="text-[#22d3ee]">03.</span> Usage
                                    </h3>
                                    <div className={`${styles.codeBg} rounded-xl border ${styles.border} p-6 font-mono text-sm overflow-x-auto shadow-sm`}>
                                        <div className="flex gap-2 mb-2">
                                            <span className="text-gray-500"># Start the CLI</span>
                                        </div>
                                        <p className="text-gray-300 mb-6">
                                            <span className="text-green-400">npm</span> start
                                        </p>

                                        <div className="flex gap-2 mb-2">
                                            <span className="text-gray-500"># Supported Commands</span>
                                        </div>
                                        <ul className="text-gray-400 space-y-1">
                                            <li>• Interact normally to chat with the AI.</li>
                                            <li>• Type <span className="text-red-400">'exit'</span> or <span className="text-red-400">'quit'</span> to close the session.</li>
                                        </ul>
                                    </div>

                                    <div className={`mt-6 p-4 rounded-lg border-l-4 border-yellow-500 ${isDark ? 'bg-yellow-500/10' : 'bg-yellow-50'}`}>
                                        <p className={`text-sm ${styles.textSecondary}`}>
                                            <strong>Note:</strong> On first run, you will be prompted to enter your <strong>Gemini API Key</strong>. This is stored securely on your local machine.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* 7. Tech Stack */}
                        <section id="tech-stack" className={`scroll-mt-24 border-t ${styles.border} pt-12`}>
                            <h2 className={`text-3xl font-bold ${styles.heading} mb-6`}>Technology Stack</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    { title: "Infrastructure", desc: "Internet Computer Protocol (ICP)", icon: "🌐" },
                                    { title: "Backend", desc: "Rust (Compiled to Wasm)", icon: "🦀" },
                                    { title: "Frontend", desc: "React, Vite, Tailwind (On-Chain)", icon: "🎨" },
                                    { title: "AI Engine", desc: "Google Gemini (HTTPS Outcalls)", icon: "🧠" },
                                    { title: "Auth", desc: "Internet Identity (Chain-Key Crypto)", icon: "🔐" },
                                    { title: "Database", desc: "HNSW Vector DB (On-Chain)", icon: "💾" },
                                ].map((item, i) => (
                                    <div key={i} className={`p-4 border ${styles.border} rounded-lg ${styles.cardBg} hover:border-[#22d3ee]/50 transition-colors`}>
                                        <div className="text-2xl mb-2">{item.icon}</div>
                                        <h4 className={`font-bold ${styles.heading} mb-1`}>{item.title}</h4>
                                        <p className={`text-sm ${styles.textSecondary}`}>{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* 8. Implementation */}
                        <section id="implementation" className={`scroll-mt-24 border-t ${styles.border} pt-12`}>
                            <h2 className={`text-3xl font-bold ${styles.heading} mb-6`}>Implementation Details</h2>
                            <ul className={`space-y-4 ${styles.textSecondary}`}>
                                <li className="flex gap-4">
                                    <div className="min-w-[4px] bg-blue-500 rounded-full"></div>
                                    <div>
                                        <strong className={styles.textMain}>Backend (The Brain):</strong> Built in Rust using `ic-cdk`. It handles logic, vector similarity search, and direct HTTPS calls to Google Gemini without oracles.
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <div className="min-w-[4px] bg-green-500 rounded-full"></div>
                                    <div>
                                        <strong className={styles.textMain}>Data & Storage:</strong> Data is stored in canister stable memory (`StableBTreeMap`) ensuring persistence across upgrades.
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <div className="min-w-[4px] bg-purple-500 rounded-full"></div>
                                    <div>
                                        <strong className={styles.textMain}>Auth:</strong> Internet Identity uses Delegated Identity on the IC, allowing secure, passwordless authentication via Passkeys.
                                    </div>
                                </li>
                            </ul>
                        </section>

                        {/* 9. Roadmap */}
                        <section id="roadmap" className={`scroll-mt-24 border-t ${styles.border} pt-12 pb-20`}>
                            <h2 className={`text-3xl font-bold ${styles.heading} mb-8`}>Future Scope</h2>
                            <div className={`space-y-8 border-l ${styles.border} ml-3 pl-8 relative`}>
                                <div className="relative">
                                    <span className={`absolute -left-[38px] top-1 h-5 w-5 rounded-full border-2 border-[#22d3ee] ${styles.bg}`}></span>
                                    <h4 className={`text-xl font-bold ${styles.heading}`}>Phase 2: Autonomous Agent DAO</h4>
                                    <p className={`${styles.textSecondary} mt-2`}>AI agents that can own wallets and execute transactions on user behalf (e.g., "Anveshak, buy this NFT").</p>
                                </div>
                                <div className="relative">
                                    <span className={`absolute -left-[38px] top-1 h-5 w-5 rounded-full border-2 ${isDark ? 'border-gray-600' : 'border-gray-400'} ${styles.bg}`}></span>
                                    <h4 className={`text-xl font-bold ${styles.heading}`}>Phase 3: Compute Marketplace</h4>
                                    <p className={`${styles.textSecondary} mt-2`}>Move AI inference On-Chain. Run open-source models (Llama 3) on ICP for 100% air-gapped privacy.</p>
                                </div>
                                <div className="relative">
                                    <span className={`absolute -left-[38px] top-1 h-5 w-5 rounded-full border-2 ${isDark ? 'border-gray-600' : 'border-gray-400'} ${styles.bg}`}></span>
                                    <h4 className={`text-xl font-bold ${styles.heading}`}>Phase 4: Knowledge Tokenization</h4>
                                    <p className={`${styles.textSecondary} mt-2`}>Experts can "stake" specialized datasets. Others pay for access, earning the uploader royalties.</p>
                                </div>
                                <div className="relative">
                                    <span className={`absolute -left-[38px] top-1 h-5 w-5 rounded-full border-2 ${isDark ? 'border-gray-600' : 'border-gray-400'} ${styles.bg}`}></span>
                                    <h4 className={`text-xl font-bold ${styles.heading}`}>Phase 5: Cross-Chain Intelligence</h4>
                                    <p className={`${styles.textSecondary} mt-2`}>Using Chain Key Technology, the AI can read/write data to Ethereum, Bitcoin, and Solana.</p>
                                </div>
                            </div>
                        </section>

                    </div>
                </main>

                {/* Right Sidebar (Table of Contents) */}
                <aside className={`fixed right-0 top-16 bottom-0 w-64 border-l ${styles.border} ${styles.sidebarBg} hidden xl:block z-30 p-6 overflow-y-auto`}>
                    <h5 className={`text-xs font-bold ${styles.heading} uppercase tracking-wider mb-4`}>On This Page</h5>
                    <nav className="space-y-1">
                        {filteredSections.slice(0, 8).map(section => (
                            <button
                                key={section.id}
                                onClick={() => scrollToSection(section.id)}
                                className={`block w-full text-left py-1.5 text-sm transition-colors ${activeSection === section.id ? 'text-[#22d3ee] font-medium' : `${styles.textSecondary} hover:${styles.textMain}`}`}
                            >
                                {section.title}
                            </button>
                        ))}
                    </nav>

                    <div className={`mt-8 pt-8 border-t ${styles.border}`}>
                        <h5 className={`text-xs font-bold ${styles.heading} uppercase tracking-wider mb-4`}>Community</h5>
                        <div className="space-y-3">
                            <a href="https://github.com/Hackers-Unity" target="_blank" rel="noopener noreferrer" className={`flex items-center text-sm ${styles.textSecondary} hover:${styles.textMain} transition-colors`}>
                                <span className="mr-2">GitHub</span> ↗
                            </a>
                            <a href="https://discord.com/invite/xcNNqdDhce" target="_blank" rel="noopener noreferrer" className={`flex items-center text-sm ${styles.textSecondary} hover:${styles.textMain} transition-colors`}>
                                <span className="mr-2">Discord</span> ↗
                            </a>
                            <a href="https://x.com/Hackers_Unity" target="_blank" rel="noopener noreferrer" className={`flex items-center text-sm ${styles.textSecondary} hover:${styles.textMain} transition-colors`}>
                                <span className="mr-2">Twitter</span> ↗
                            </a>
                            <a href="https://www.instagram.com/hackerunity/" target="_blank" rel="noopener noreferrer" className={`flex items-center text-sm ${styles.textSecondary} hover:${styles.textMain} transition-colors`}>
                                <span className="mr-2">Instagram</span> ↗
                            </a>
                            <a href="https://www.linkedin.com/company/hackerunity/" target="_blank" rel="noopener noreferrer" className={`flex items-center text-sm ${styles.textSecondary} hover:${styles.textMain} transition-colors`}>
                                <span className="mr-2">LinkedIn</span> ↗
                            </a>
                        </div>
                    </div>
                </aside>

            </div>
        </div>
    );
};

// ... (keeping existing imports)

const TerminalDemo = () => {
    const [lines, setLines] = useState([
        { type: 'command', text: 'git clone https://github.com/ChinmayBhattt/AnveshakAI.git', prompt: '~' },
    ]);
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        const steps = [
            {
                delay: 1000,
                action: () => setLines(prev => [...prev, { type: 'output', text: 'Cloning into \'AnveshakAI-Decentralized-AI-Assistant\'...', color: 'text-gray-400' }])
            },
            {
                delay: 800,
                action: () => setLines(prev => [...prev, { type: 'output', text: 'remote: Enumerating objects: 142, done.', color: 'text-gray-400' }])
            },
            {
                delay: 800,
                action: () => setLines(prev => [...prev, { type: 'output', text: 'remote: Total 142 (delta 35), reused 112 (delta 22)', color: 'text-gray-400' }])
            },
            {
                delay: 500,
                action: () => setLines(prev => [...prev, { type: 'command', text: 'cd AnveshakAI-Decentralized-AI-Assistant/cli', prompt: '~' }])
            },
            {
                delay: 800,
                action: () => setLines(prev => [...prev, { type: 'command', text: 'npm install', prompt: '~/AnveshakAI/cli' }])
            },
            {
                delay: 1000,
                action: () => setLines(prev => [...prev, { type: 'output', text: 'added 245 packages in 3s', color: 'text-green-400' }])
            },
            {
                delay: 500,
                action: () => setLines(prev => [...prev, { type: 'command', text: 'npm start', prompt: '~/AnveshakAI/cli' }])
            },
            {
                delay: 1000,
                action: () => setLines(prev => [...prev, {
                    type: 'output',
                    html: `
     _                                   _   
    / \\     _ __   __   __   ___   ___  | |__  
   / _ \\   | '_ \\  \\ \\ / /  / _ \\ / __| | '_ \\ 
  / ___ \\  | | | |  \\ V /  |  __/ \\__ \\ | | | |
 /_/   \\_\\ |_| |_|   \\_/    \\___| |___/ |_| |_|
                                               
   Welcome to AnveshakAI - CLI Edition
   • Terminal-based interaction
   • Secure API Key Management
                    `,
                    color: 'text-cyan-400'
                }])
            },
            {
                delay: 500,
                action: () => setLines(prev => [...prev, { type: 'output', text: '? Select a Gemini Model: gemini-3.0-flash', color: 'text-white' }])
            }
        ];

        let timeoutId;

        const runStep = (index) => {
            if (index >= steps.length) return;
            timeoutId = setTimeout(() => {
                steps[index].action();
                runStep(index + 1);
            }, steps[index].delay);
        };

        runStep(0);

        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <div className="w-full rounded-xl overflow-hidden shadow-2xl bg-[#0d1117] border border-gray-800 font-mono text-sm my-8 transform hover:scale-[1.01] transition-transform duration-300">
            {/* Terminal Header */}
            <div className="bg-[#161b22] px-4 py-2 flex items-center gap-2 border-b border-gray-800">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                </div>
                <div className="flex-1 text-center text-gray-500 text-xs">chinmay@mac: ~/AnveshakAI</div>
            </div>

            {/* Terminal Body */}
            <div className="p-6 text-gray-300 space-y-2 min-h-[400px] max-h-[500px] overflow-y-auto custom-scrollbar">
                {lines.map((line, i) => (
                    <div key={i} className="animate-fadeIn">
                        {line.type === 'command' ? (
                            <div className="flex gap-2">
                                <span className="text-green-400 font-bold">➜</span>
                                <span className="text-blue-400 font-bold">{line.prompt}</span>
                                <span className="text-gray-100">{line.text}</span>
                            </div>
                        ) : (
                            <div className={`${line.color || 'text-gray-400'} whitespace-pre-wrap font-mono`}>
                                {line.html ? <pre className="font-mono leading-none">{line.html}</pre> : line.text}
                            </div>
                        )}
                    </div>
                ))}

                {/* Typing Cursor */}
                <div className="flex gap-2 items-center">
                    <span className="text-green-400 font-bold">➜</span>
                    <span className="text-blue-400 font-bold">~/AnveshakAI/cli</span>
                    <span className="w-2.5 h-5 bg-gray-500 animate-pulse"></span>
                </div>
            </div>
        </div>
    );
};

export default Documentation;
