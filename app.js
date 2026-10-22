const state = {
    currentPage: 'home',
    user: { name: 'Пайдаланушы', avatar: 'Osman' },
    tasks: JSON.parse(localStorage.getItem('nexora_tasks')) || [],
    goals: JSON.parse(localStorage.getItem('nexora_goals')) || [],
    settings: JSON.parse(localStorage.getItem('nexora_settings')) || { theme: 'dark', lang: 'kk' }
};

const App = {
    init() {
        this.render();
    },

    navigate(page) {
        state.currentPage = page;
        this.render();
    },

    render() {
        const root = document.getElementById('app');
        root.innerHTML = `
            <div class="min-h-screen pb-24">
                ${this.renderHeader()}
                <main class="p-6 page-transition">
                    ${this.renderPage()}
                </main>
                ${this.renderNavigation()}
            </div>
        `;
        lucide.createIcons();
    },

    renderHeader() {
        return `
            <header class="flex justify-between items-center p-6">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-gradient-to-br from-[#A78BFA] to-[#648BFF] rounded-xl flex items-center justify-center neon-glow">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                        </svg>
                    </div>
                    <h1 class="text-xl font-bold tracking-tight">NEXORA</h1>
                </div>
                <div class="flex gap-4">
                    <button class="p-2 glass-card w-10 h-10 flex items-center justify-center">
                        <i data-lucide="bell" class="w-5 h-5"></i>
                    </button>
                    <div class="w-10 h-10 rounded-full bg-slate-700 border-2 border-[#A78BFA] overflow-hidden cursor-pointer">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=${state.user.avatar}" alt="User">
                    </div>
                </div>
            </header>
        `;
    },

    renderPage() {
        switch(state.currentPage) {
            case 'home': return this.renderHome();
            case 'ai': return this.renderPlaceholder('AI Assistant', 'bot');
            case 'tasks': return this.renderPlaceholder('Smart Tasks', 'list-todo');
            case 'studio': return this.renderPlaceholder('Creative Studio', 'palette');
            case 'profile': return this.renderPlaceholder('Профиль', 'user');
            default: return this.renderHome();
        }
    },

    renderHome() {
        return `
            <div class="space-y-8">
                <section class="space-y-2">
                    <h2 class="text-3xl font-bold">Қош келдің, <span class="text-[#A78BFA]">${state.user.name}!</span></h2>
                    <p class="text-[#929BB5]">Идеяларыңды жүзеге асыр. Ойыңды жоспарға айналдыр.</p>
                </section>

                <div class="glass-card p-6 relative overflow-hidden group">
                    <div class="relative z-10">
                        <h3 class="text-xl font-semibold mb-2">Мақсатыңа жақындай түс</h3>
                        <p class="text-sm text-[#929BB5] mb-4">Бүгінгі жетістіктеріңді бақылап, алға жылжы.</p>
                        <button class="px-4 py-2 bg-[#A78BFA] text-white rounded-lg font-medium hover:opacity-90 transition-all">
                            Бастау
                        </button>
                    </div>
                    <div class="absolute -right-10 -bottom-10 w-40 h-40 bg-[#A78BFA] opacity-10 blur-3xl rounded-full group-hover:opacity-20 transition-opacity"></div>
                </div>

                <div class="grid grid-cols-2 gap-4">
                    ${this.featureCard('AI Assistant', 'Ақылды көмекші', 'sparkles', 'ai')}
                    ${this.featureCard('Smart Tasks', 'Тапсырмалар', 'check-circle', 'tasks')}
                    ${this.featureCard('Creative Studio', 'Шығармашылық', 'palette', 'studio')}
                    ${this.featureCard('My Goals', 'Мақсаттар', 'target', 'goals')}
                </div>
            </div>
        `;
    },

    featureCard(title, desc, icon, page) {
        return `
            <div onclick="App.navigate('${page}')" class="glass-card p-4 flex flex-col gap-3 cursor-pointer active:scale-95 transition-transform">
                <div class="w-10 h-10 rounded-lg bg-[#191E30] flex items-center justify-center text-[#A78BFA]">
                    <i data-lucide="${icon}" class="w-6 h-6"></i>
                </div>
                <div>
                    <h4 class="font-semibold text-sm">${title}</h4>
                    <p class="text-xs text-[#929BB5]">${desc}</p>
                </div>
            </div>
        `;
    },

    renderPlaceholder(title, icon) {
        return `
            <div class="flex flex-col items-center justify-center py-20 text-center space-y-4">
                <div class="w-20 h-20 rounded-full bg-[#191E30] flex items-center justify-center text-[#A78BFA] neon-glow">
                    <i data-lucide="${icon}" class="w-10 h-10"></i>
                </div>
                <h2 class="text-2xl font-bold">${title}</h2>
                <p class="text-[#929BB5]">Бұл бөлім әлі дайындалып жатыр...</p>
            </div>
        `;
    },

    renderNavigation() {
        const navItems = [
            { id: 'home', label: 'Басты', icon: 'home' },
            { id: 'ai', label: 'AI', icon: 'bot' },
            { id: 'tasks', label: 'Тапсырма', icon: 'list-todo' },
            { id: 'studio', label: 'Studio', icon: 'layout' },
            { id: 'profile', label: 'Профиль', icon: 'user' },
        ];

        return `
            <nav class="fixed bottom-6 left-6 right-6 h-16 glass-card flex items-center justify-around px-2 neon-glow z-50">
                ${navItems.map(item => `
                    <button onclick="App.navigate('${item.id}')" class="flex flex-col items-center gap-1 ${state.currentPage === item.id ? 'nav-active' : 'text-[#929BB5]'} transition-colors">
                        <i data-lucide="${item.icon}" class="w-5 h-5"></i>
                        <span class="text-[10px] font-medium">${item.label}</span>
                    </button>
                `).join('')}
            </nav>
        `;
    }
};

window.App = App;
window.onload = () => App.init();