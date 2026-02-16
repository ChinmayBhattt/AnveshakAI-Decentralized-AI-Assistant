import React from 'react';
import Header from './Header';
import WelcomeHero from './WelcomeHero';
import CapabilitiesSection from './CapabilitiesSection';
import TechSpecs from './TechSpecs';
import Footer from './Footer';

const WelcomePage = ({
  userPrincipal,
  onConnect,
  onDisconnect,
  onGetStarted,
  onShowDocumentation,
  onShowPrivacy,
  onShowTerms,
  onShowContact,
  onShowApiReference,
  onShowCliGuide
}) => {
  return (
    <div className="min-h-screen bg-white">
      <Header
        userPrincipal={userPrincipal}
        onConnect={onConnect}
        onDisconnect={onDisconnect}
      />

      <main>
        <WelcomeHero onGetStarted={onGetStarted} />
        <CapabilitiesSection />
        <TechSpecs />
      </main>

      <Footer
        onShowDocumentation={onShowDocumentation}
        onShowPrivacy={onShowPrivacy}
        onShowTerms={onShowTerms}
        onShowContact={onShowContact}
        onShowApiReference={onShowApiReference}
        onShowCliGuide={onShowCliGuide}
      />
    </div>
  );
};

export default WelcomePage;
