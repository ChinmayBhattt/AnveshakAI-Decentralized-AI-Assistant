import React, { useState, useEffect, useRef } from 'react';

// ─── Animated Terminal Component ─────────────────────────────────────────
const TerminalEmulator = () => {
    const [lines, setLines] = useState([]);
    const [showCursor, setShowCursor] = useState(true);
    const termRef = useRef(null);

    useEffect(() => {
        const steps = [
            { delay: 400, line: { type: 'command', prompt: '~', text: 'git clone https://github.com/ChinmayBhattt/AnveshakAI-Decentralized-AI-Assistant.git' } },
            { delay: 800, line: { type: 'output', text: "Cloning into 'AnveshakAI-Decentralized-AI-Assistant'...", color: 'text-gray-500' } },
            { delay: 600, line: { type: 'output', text: 'remote: Enumerating objects: 142, done.', color: 'text-gray-500' } },
            { delay: 600, line: { type: 'output', text: 'remote: Total 142 (delta 35), reused 112 (delta 22)', color: 'text-gray-500' } },
            { delay: 400, line: { type: 'output', text: 'Receiving objects: 100% (142/142), 1.23 MiB | 5.12 MiB/s, done.', color: 'text-green-400' } },
            { delay: 300, line: { type: 'command', prompt: '~', text: 'cd AnveshakAI-Decentralized-AI-Assistant/cli' } },
            { delay: 500, line: { type: 'command', prompt: '~/AnveshakAI/cli', text: 'npm install' } },
            { delay: 400, line: { type: 'output', text: 'npm warn deprecated inflight@1.0.6', color: 'text-yellow-500' } },
            { delay: 800, line: { type: 'output', text: 'added 245 packages, and audited 246 packages in 3s', color: 'text-green-400' } },
            { delay: 400, line: { type: 'output', text: '42 packages are looking for funding — run `npm fund` for details', color: 'text-gray-500' } },
            { delay: 500, line: { type: 'command', prompt: '~/AnveshakAI/cli', text: 'npm start' } },
            { delay: 300, line: { type: 'output', text: '', color: 'text-cyan-400' } },
            {
                delay: 200, line: {
                    type: 'ascii', text: `     _                          _           _    
    / \\    _ ____   _____  ___| |__   __ _| | __
   / _ \\  | '_ \\ \\ / / _ \\/ __| '_ \\ / _\` | |/ /
  / ___ \\ | | | \\ V /  __/\\__ \\ | | | (_| |   < 
 /_/   \\_\\|_| |_|\\_/ \\___||___/_| |_|\\__,_|_|\\_\\`, color: 'text-cyan-400'
                }
            },
            { delay: 400, line: { type: 'output', text: '', color: 'text-cyan-400' } },
            { delay: 200, line: { type: 'output', text: '   ⚡ Welcome to AnveshakAI — CLI Edition', color: 'text-white font-bold' } },
            { delay: 200, line: { type: 'output', text: '   🔒 Privacy-first • 🌐 Decentralized • 🧠 Gemini Powered', color: 'text-gray-400' } },
            { delay: 400, line: { type: 'output', text: '', color: 'text-cyan-400' } },
            { delay: 300, line: { type: 'output', text: '? Enter your Gemini API Key: ****************************', color: 'text-white' } },
            { delay: 500, line: { type: 'output', text: '✔ API Key validated successfully!', color: 'text-green-400' } },
            { delay: 300, line: { type: 'output', text: '? Select a Gemini Model: › gemini-2.5-flash', color: 'text-white' } },
            { delay: 500, line: { type: 'output', text: '✔ Connected to gemini-2.5-flash', color: 'text-green-400' } },
            { delay: 300, line: { type: 'output', text: '', color: 'text-cyan-400' } },
            { delay: 200, line: { type: 'output', text: '╭────────────────────────────────────╮', color: 'text-cyan-400' } },
            { delay: 100, line: { type: 'output', text: '│  🚀 Ready! Type your query below  │', color: 'text-cyan-400' } },
            { delay: 100, line: { type: 'output', text: '╰────────────────────────────────────╯', color: 'text-cyan-400' } },
            { delay: 400, line: { type: 'output', text: '', color: 'text-cyan-400' } },
            { delay: 300, line: { type: 'prompt', text: 'You › What is the Internet Computer Protocol?' } },
            { delay: 800, line: { type: 'output', text: '🤖 The Internet Computer Protocol (ICP) is a blockchain network...', color: 'text-gray-300' } },
        ];

        let mounted = true;
        const timeouts = [];

        let totalDelay = 0;
        steps.forEach((step, i) => {
            totalDelay += step.delay;
            const t = setTimeout(() => {
                if (!mounted) return;
                setLines(prev => [...prev, step.line]);
            }, totalDelay);
            timeouts.push(t);
        });

        return () => {
            mounted = false;
            timeouts.forEach(clearTimeout);
        };
    }, []);

    // Auto-scroll
    useEffect(() => {
        if (termRef.current) {
            termRef.current.scrollTop = termRef.current.scrollHeight;
        }
    }, [lines]);

    const renderLine = (line, i) => {
        if (line.type === 'command') {
            return (
                <div key={i} className="flex gap-2 animate-slideIn">
                    <span className="text-green-400 font-bold shrink-0">➜</span>
                    <span className="text-blue-400 font-bold shrink-0">{line.prompt}</span>
                    <span className="text-gray-100">{line.text}</span>
                </div>
            );
        }
        if (line.type === 'ascii') {
            return (
                <pre key={i} className={`${line.color} leading-none text-[10px] sm:text-xs animate-slideIn`}>
                    {line.text}
                </pre>
            );
        }
        if (line.type === 'prompt') {
            return (
                <div key={i} className="flex gap-2 animate-slideIn">
                    <span className="text-purple-400 font-bold shrink-0">{line.text.split(' › ')[0]} ›</span>
                    <span className="text-white">{line.text.split(' › ')[1]}</span>
                </div>
            );
        }
        return (
            <div key={i} className={`${line.color || 'text-gray-400'} whitespace-pre-wrap animate-slideIn`}>
                {line.text}
            </div>
        );
    };

    return (
        <div className="w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-[0_0_80px_rgba(34,211,238,0.1)] border border-gray-800/60 bg-[#0a0a0f]">
            {/* Title Bar */}
            <div className="bg-[#12121a] px-4 py-2.5 flex items-center border-b border-gray-800/60">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                    <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                </div>
                <div className="flex-1 text-center">
                    <span className="text-gray-500 text-xs font-mono">AnveshakAI CLI</span>
                </div>
                <div className="text-gray-600 text-xs">⌘ BETA</div>
            </div>

            {/* Terminal Body */}
            <div ref={termRef} className="p-5 font-mono text-sm space-y-1.5 min-h-[350px] max-h-[450px] overflow-y-auto" style={{ scrollBehavior: 'smooth' }}>
                {lines.map(renderLine)}

                {/* Blinking Cursor */}
                <div className="flex gap-2 items-center mt-2">
                    <span className="text-green-400 font-bold">➜</span>
                    <span className="text-blue-400 font-bold">~/AnveshakAI/cli</span>
                    <span className="w-2 h-5 bg-gray-400 animate-pulse rounded-sm" />
                </div>
            </div>
        </div>
    );
};

// ─── Copy Button Component ───────────────────────────────────────────────
const CopyCommand = ({ command, label }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(command);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex items-center justify-between p-3 bg-[#0a0a0f] rounded-lg border border-gray-800/60 group hover:border-cyan-900/50 transition-all duration-300">
            <div className="flex items-center gap-3">
                <span className="text-green-400 text-xs">$</span>
                <code className="text-gray-300 text-sm">{label || command}</code>
            </div>
            <button
                onClick={handleCopy}
                className="text-gray-600 hover:text-cyan-400 transition-colors ml-4 shrink-0"
                title="Copy"
            >
                {copied ? (
                    <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                ) : (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                )}
            </button>
        </div>
    );
};

// ─── Main CLI Guide Page ─────────────────────────────────────────────────
const CliGuide = ({ onBack }) => {
    const [scrollY, setScrollY] = useState(0);
    const [activeTab, setActiveTab] = useState('one-liner');

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        // Could add toast notification here
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-[#08080d] text-white font-sans overflow-x-hidden">

            {/* ── CSS Animations ───────────────────────────────────────── */}
            <style>{`
                @keyframes slideIn {
                    from { opacity: 0; transform: translateY(8px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-slideIn {
                    animation: slideIn 0.3s ease-out forwards;
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }
                .animate-float { animation: float 6s ease-in-out infinite; }
                @keyframes glow {
                    0%, 100% { box-shadow: 0 0 20px rgba(34,211,238,0.1); }
                    50% { box-shadow: 0 0 40px rgba(34,211,238,0.2); }
                }
                .animate-glow { animation: glow 3s ease-in-out infinite; }
                @keyframes gradientMove {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                .gradient-animate {
                    background-size: 200% 200%;
                    animation: gradientMove 5s ease infinite;
                }
                .radial-bg {
                    background: radial-gradient(ellipse 80% 50% at 50% -20%, rgba(34,211,238,0.12), transparent);
                }
            `}</style>

            {/* ── Nav Bar ──────────────────────────────────────────────── */}
            <nav className={`fixed w-full z-50 transition-all duration-300 ${scrollY > 50 ? 'bg-[#08080d]/90 backdrop-blur-xl border-b border-gray-800/50' : 'bg-transparent'}`}>
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <button onClick={onBack} className="flex items-center gap-2 group">
                        <div className="w-8 h-8 bg-gradient-to-tr from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-shadow">
                            <span className="text-black font-bold text-sm">A</span>
                        </div>
                        <span className="text-white font-bold text-lg tracking-tight">AnveshakAI</span>
                    </button>
                    <div className="flex items-center gap-4">
                        <a href="https://github.com/ChinmayBhattt/AnveshakAI-Decentralized-AI-Assistant" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors text-sm">
                            GitHub ↗
                        </a>
                        <button onClick={onBack} className="text-sm text-gray-400 hover:text-white transition-colors">
                            ← Back
                        </button>
                    </div>
                </div>
            </nav>

            {/* ── Hero Section ─────────────────────────────────────────── */}
            <section className="relative pt-32 pb-20 radial-bg">
                {/* Floating orbs */}
                <div className="absolute top-20 left-1/4 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl animate-float" />
                <div className="absolute top-40 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />

                <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-8">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                        <span className="text-cyan-400 text-xs font-semibold tracking-wide uppercase">CLI Tool — Open Source</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
                        <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 text-transparent bg-clip-text">AnveshakAI</span>
                        <br />
                        <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text gradient-animate">
                            in your Terminal.
                        </span>
                    </h1>

                    <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                        The AI that respects your privacy. Ask questions, get answers — powered by Google Gemini, running from your command line. No cloud. No tracking. Just intelligence.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                        <a
                            href="https://github.com/ChinmayBhattt/AnveshakAI-Decentralized-AI-Assistant"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 hover:-translate-y-0.5"
                        >
                            Get Started →
                        </a>
                        <a
                            href="https://github.com/ChinmayBhattt/AnveshakAI-Decentralized-AI-Assistant"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-3.5 border border-gray-700 text-gray-300 font-semibold rounded-xl hover:border-gray-500 hover:text-white transition-all duration-300"
                        >
                            ⭐ Star on GitHub
                        </a>
                    </div>
                </div>
            </section>

            {/* ── Quick Start Terminal ──────────────────────────────────── */}
            <section className="pb-24 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-2 mb-6">
                        <span className="text-red-400 text-lg">›</span>
                        <h2 className="text-2xl font-bold text-white">Quick Start</h2>
                    </div>

                    {/* Install Tabs Section */}
                    <div className="mb-8 animate-glow rounded-2xl">
                        <TerminalEmulator />
                    </div>

                    {/* Copy Commands */}
                    {/* ── Install Tabs Component ────────────────────────────────── */}
                    <div className="max-w-4xl mx-auto mb-12">
                        <div className="bg-[#0e0e14] border border-gray-800/60 rounded-2xl overflow-hidden shadow-2xl">
                            {/* Tab Header */}
                            <div className="flex flex-col md:flex-row items-center justify-between px-4 py-3 border-b border-gray-800/60 bg-[#0a0a0f] gap-4">
                                <div className="flex items-center gap-6 w-full md:w-auto overflow-x-auto">
                                    <div className="flex gap-2 shrink-0">
                                        <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                                        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                                        <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                                    </div>

                                    <div className="flex items-center gap-1 bg-[#12121a] p-1 rounded-lg border border-gray-800/60">
                                        <button
                                            onClick={() => setActiveTab('one-liner')}
                                            className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${activeTab === 'one-liner' ? 'bg-cyan-500 text-black shadow-[0_0_10px_rgba(6,182,212,0.5)]' : 'text-gray-400 hover:text-white'}`}
                                        >
                                            One-liner
                                        </button>
                                        <button
                                            onClick={() => setActiveTab('npm')}
                                            className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${activeTab === 'npm' ? 'bg-cyan-500 text-black shadow-[0_0_10px_rgba(6,182,212,0.5)]' : 'text-gray-400 hover:text-white'}`}
                                        >
                                            npm
                                        </button>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 text-xs font-mono shrink-0">
                                    <span className="text-gray-500">macOS/Linux <span className="text-red-400 cursor-pointer hover:underline">change</span></span>
                                    <span className="px-2 py-1 rounded bg-[#1c1c24] border border-gray-800 text-gray-400">β BETA</span>
                                </div>
                            </div>

                            {/* Tab Content */}
                            <div className="p-6 md:p-8 bg-[#0a0a0f] relative group">
                                <div className="font-mono text-sm md:text-base">
                                    <div className="text-gray-500 mb-4 select-none">
                                        # {activeTab === 'one-liner' ? 'Works everywhere. Installs everything. You\'re welcome. 🦞' : 'Install globally via NPM. Requires Node.js. 📦'}
                                    </div>
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="flex items-center gap-3 text-gray-300 overflow-x-auto whitespace-nowrap pb-2 md:pb-0 scrollbar-hide">
                                            <span className="text-red-400">$</span>
                                            <span className="text-cyan-400">
                                                {activeTab === 'one-liner' ? 'curl' : 'npm'}
                                            </span>
                                            <span>
                                                {activeTab === 'one-liner' ? '-fsSL https://anveshak-ai.vercel.app/install.sh | bash' : 'install -g anveshakai'}
                                            </span>
                                        </div>
                                        <button
                                            onClick={() => copyToClipboard(activeTab === 'one-liner' ? 'curl -fsSL https://anveshak-ai.vercel.app/install.sh | bash' : 'npm install -g anveshakai')}
                                            className="p-2 rounded-lg bg-[#1c1c24] border border-gray-800 hover:border-cyan-500/50 hover:bg-[#252530] transition-all text-gray-400 hover:text-cyan-400 shrink-0"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <p className="text-center text-gray-500 text-sm mt-6 font-mono">
                            Works on macOS, Windows & Linux. {activeTab === 'one-liner' ? 'The one-liner installs Node.js and everything else for you.' : 'Requires existing Node.js installation.'}
                        </p>
                    </div>

                    <p className="text-center text-gray-500 text-sm mt-4">
                        Works on macOS, Windows & Linux. Requires Node.js v18+.
                        <br />
                        <span className="text-xs opacity-50">Note: For NPM install, the package must be published to the registry.</span>
                    </p>
                </div>
            </section>

            {/* ── What It Does Section ─────────────────────────────────── */}
            <section className="py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center gap-2 mb-10">
                        <span className="text-red-400 text-lg">›</span>
                        <h2 className="text-2xl font-bold text-white">What It Does</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {[
                            { icon: '🏠', title: 'Runs on Your Machine', desc: 'Mac, Windows, or Linux. Your data stays local — private by default.' },
                            { icon: '🧠', title: 'Gemini Powered', desc: 'Choose from gemini-2.5-flash, gemini-1.5-pro, and more. Always the latest models.' },
                            { icon: '🔒', title: 'Privacy First', desc: 'API key stored locally. No telemetry. No cloud logging. Zero tracking.' },
                            { icon: '⚡', title: 'Instant Setup', desc: '3 commands. Clone, install, run. You\'re chatting with AI in under 60 seconds.' },
                            { icon: '🎨', title: 'Beautiful Terminal UI', desc: 'ASCII art, colored output, markdown rendering. Not your average CLI.' },
                            { icon: '🔧', title: 'Open Source', desc: 'MIT Licensed. Fork it, modify it, make it yours. Full transparency.' },
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="group p-6 rounded-2xl border border-gray-800/60 bg-[#0e0e14] hover:border-cyan-900/50 hover:bg-[#101018] transition-all duration-300"
                            >
                                <div className="text-3xl mb-4">{item.icon}</div>
                                <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Works With Section ───────────────────────────────────── */}
            <section className="py-16 px-6 border-t border-gray-800/40">
                <div className="max-w-6xl mx-auto text-center">
                    <div className="flex items-center justify-center gap-2 mb-8">
                        <span className="text-red-400 text-lg">›</span>
                        <h2 className="text-2xl font-bold text-white">Powered By</h2>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-4">
                        {['Google Gemini', 'Hackers Unity', 'Internet Computer Protocol (ICP)', 'Trainzex AI'].map((name, i) => (
                            <span key={i} className="px-5 py-2.5 rounded-full bg-[#0e0e14] border border-gray-800/60 text-gray-400 text-sm font-medium hover:border-cyan-900/50 hover:text-gray-300 transition-all duration-300 cursor-default">
                                {name}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Requirements Section ──────────────────────────────────── */}
            <section className="py-20 px-6 border-t border-gray-800/40">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-2 mb-8">
                        <span className="text-red-400 text-lg">›</span>
                        <h2 className="text-2xl font-bold text-white">Requirements</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        <div className="p-6 rounded-2xl border border-gray-800/60 bg-[#0e0e14]">
                            <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center mb-4">
                                <span className="text-green-400 text-xl">⬢</span>
                            </div>
                            <h3 className="text-white font-bold mb-1">Node.js v18+</h3>
                            <p className="text-gray-500 text-sm">JavaScript runtime environment</p>
                        </div>
                        <div className="p-6 rounded-2xl border border-gray-800/60 bg-[#0e0e14]">
                            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4">
                                <span className="text-blue-400 text-xl">🔑</span>
                            </div>
                            <h3 className="text-white font-bold mb-1">Gemini API Key</h3>
                            <p className="text-gray-500 text-sm">Free from Google AI Studio</p>
                        </div>
                        <div className="p-6 rounded-2xl border border-gray-800/60 bg-[#0e0e14]">
                            <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4">
                                <span className="text-purple-400 text-xl">🌐</span>
                            </div>
                            <h3 className="text-white font-bold mb-1">Internet</h3>
                            <p className="text-gray-500 text-sm">For API calls — no local LLM needed</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── CTA Footer ───────────────────────────────────────────── */}
            <section className="py-20 px-6 border-t border-gray-800/40">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
                        Ready to try it?
                    </h2>
                    <p className="text-gray-500 mb-8 text-lg">
                        Three commands. Under 60 seconds. No BS.
                    </p>

                    <div className="inline-flex items-center gap-3 px-6 py-3 bg-[#0e0e14] border border-gray-800/60 rounded-xl font-mono text-sm">
                        <span className="text-green-400">$</span>
                        <span className="text-gray-300">curl -fsSL https://anveshak-ai.vercel.app/install.sh | bash</span>
                    </div>
                </div>
            </section>

            {/* ── Bottom Footer ─────────────────────────────────────────── */}
            <footer className="py-8 px-6 border-t border-gray-800/40">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4 text-gray-500 text-sm">
                        <a href="https://github.com/ChinmayBhattt/AnveshakAI-Decentralized-AI-Assistant" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">GitHub</a>
                        <span>·</span>
                        <a href="https://discord.com/invite/xcNNqdDhce" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">Discord</a>
                        <span>·</span>
                        <a href="https://x.com/Hackers_Unity" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">Twitter</a>
                    </div>
                    <p className="text-gray-600 text-sm">
                        Powered by <span className="text-gray-400"></span> <a href="https://github.com/Hackers-Unity" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">Hackers Unity</a>.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default CliGuide;
