/* eslint-disable react-hooks/exhaustive-deps */
import LoadingScreen from './components/ui/loading-screen';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { Content } from './Content'
import { endpoint } from './utils/constant';
import { useEffect, useMemo, useState } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import "@solana/wallet-adapter-react-ui/styles.css"

function App() {

  const networkEndpoint = endpoint;

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter()
    ],
    [networkEndpoint]
  );

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  })

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <ConnectionProvider endpoint={networkEndpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <Content />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

export default App;
