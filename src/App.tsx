import React from 'react';
import { BackgroundEffect } from './components/BackgroundEffect';
import { HeaderControls } from './components/HeaderControls';
import { ProposalFlow } from './components/ProposalFlow';

export default function App() {
  return (
    <BackgroundEffect>
      <HeaderControls />
      <main className="w-full pt-16 pb-10">
        <ProposalFlow />
      </main>
    </BackgroundEffect>
  );
}
