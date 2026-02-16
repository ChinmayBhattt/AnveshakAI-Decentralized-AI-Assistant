import React, { useState, useEffect } from 'react';
import { backend } from 'declarations/backend';
import WelcomePage from './components/WelcomePage';
import ChatInterface from './components/ChatInterface';
import Documentation from './components/Documentation';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import ContactUs from './components/ContactUs';
import ApiReference from './components/ApiReference';
import CliGuide from './components/CliGuide';

const App = () => {
  // View state
  const [currentView, setCurrentView] = useState('welcome'); // 'welcome', 'chat', 'documentation', 'privacy', 'terms', 'contact'

  const [chat, setChat] = useState([
    {
      system: {
        content: "🌐 Welcome to your ICP-Native Anveshak AI! I'm powered by the Internet Computer with Internet Identity authentication, cycles-based payments, and on-chain storage. Your original chatting experience is preserved while adding Web3 capabilities. What would you like to explore today?",
        provider: "system"
      }
    }
  ]);

  // Original state variables
  const [selectedProvider, setSelectedProvider] = useState('gemini');
  const [assistantType, setAssistantType] = useState('casual');
  const [availableProviders, setAvailableProviders] = useState(['gemini']);

  // New ICP-native state variables
  const [userPrincipal, setUserPrincipal] = useState(null);
  const [storeOnChain, setStoreOnChain] = useState(false);
  const [userDashboard, setUserDashboard] = useState(null);
  const [icpMode, setIcpMode] = useState(false);

  useEffect(() => {
    loadInitialData();
    // Simulate Internet Identity connection
    const mockPrincipal = `rdmx6-jaaaa-aaaah-qcaiq-cai`;
    setUserPrincipal(mockPrincipal);
    loadUserDashboard();
  }, []);

  const loadInitialData = async () => {
    try {
      const providers = await backend.get_available_providers();
      setAvailableProviders(providers.length > 0 ? providers : ['gemini']);
    } catch (error) {
      console.log('Could not load providers:', error);
    }
  };

  const loadUserDashboard = async () => {
    if (!userPrincipal) return;

    try {
      const dashboardResult = await backend.get_user_dashboard(userPrincipal);
      if (dashboardResult.Ok) {
        setUserDashboard(dashboardResult.Ok);
      }
    } catch (error) {
      console.log('Could not load user dashboard:', error);
    }
  };

  // Handler functions for the new UI
  const handleConnect = () => {
    // Simulate Internet Identity connection
    const mockPrincipal = `rdmx6-jaaaa-aaaah-qcaiq-cai`;
    setUserPrincipal(mockPrincipal);
    loadUserDashboard();
  };

  const handleDisconnect = () => {
    setUserPrincipal(null);
    setUserDashboard(null);
  };

  const handleGetStarted = () => {
    setCurrentView('chat');
  };

  const handleShowDocumentation = () => {
    setCurrentView('documentation');
  };

  const handleShowPrivacy = () => {
    setCurrentView('privacy');
  };

  const handleShowTerms = () => {
    setCurrentView('terms');
  };

  const handleShowContact = () => {
    setCurrentView('contact');
  };

  const handleShowApiReference = () => {
    setCurrentView('api-reference');
  };

  const handleShowCliGuide = () => {
    setCurrentView('cli-guide');
  };

  const handleBackToWelcome = () => {
    setCurrentView('welcome');
  };

  // Render the appropriate view
  if (currentView === 'welcome') {
    return (
      <WelcomePage
        userPrincipal={userPrincipal}
        onConnect={handleConnect}
        onDisconnect={handleDisconnect}
        onGetStarted={handleGetStarted}
        onShowDocumentation={handleShowDocumentation}
        onShowPrivacy={handleShowPrivacy}
        onShowTerms={handleShowTerms}
        onShowContact={handleShowContact}
        onShowApiReference={handleShowApiReference}
        onShowCliGuide={handleShowCliGuide}
      />
    );
  }

  if (currentView === 'documentation') {
    return (
      <Documentation onBack={handleBackToWelcome} />
    );
  }

  if (currentView === 'privacy') {
    return (
      <PrivacyPolicy onBack={handleBackToWelcome} />
    );
  }

  if (currentView === 'terms') {
    return (
      <TermsOfService onBack={handleBackToWelcome} />
    );
  }



  if (currentView === 'api-reference') {
    return (
      <ApiReference onBack={handleBackToWelcome} />
    );
  }

  if (currentView === 'cli-guide') {
    return (
      <CliGuide onBack={handleBackToWelcome} />
    );
  }

  if (currentView === 'contact') {
    return (
      <ContactUs onBack={handleBackToWelcome} />
    );
  }

  return (
    <ChatInterface
      userPrincipal={userPrincipal}
      onBackToWelcome={handleBackToWelcome}
      initialChat={chat}
      selectedProvider={selectedProvider}
      assistantType={assistantType}
      storeOnChain={storeOnChain}
      icpMode={icpMode}
    />
  );
};

export default App;
