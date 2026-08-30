import { createContext, useContext, useState } from 'react';

const IDEContext = createContext(null);

export function IDEProvider({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <IDEContext.Provider value={{ sidebarOpen, setSidebarOpen, mobileOpen, setMobileOpen }}>
      {children}
    </IDEContext.Provider>
  );
}

export function useIDE() {
  return useContext(IDEContext);
}
