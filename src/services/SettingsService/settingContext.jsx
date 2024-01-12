import React, { createContext, useContext, useState, useEffect } from 'react';

const SettingsContext = createContext({
  darkMode: false,
  notifications: true,
  email: '',
  username: '',
  trustedDevices: [],
  toggleDarkMode: () => {},
  toggleNotifications: () => {},
  updateEmail: () => {},
  updateUsername: () => {},
  addTrustedDevice: () => {},
  removeTrustedDevice: () => {},
});

export const useSettings = () => {
  return useContext(SettingsContext);
};

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    darkMode: false,
    notifications: true,
    email: '',
    username: '',
    trustedDevices: [],
  });
  const [themeColor, setThemeColor] = useState('#2196f3');

  const [activeDevices, setActiveDevices] = useState([
    { name: 'Johns`s Desktop', isActive: true },
    { name: 'Ellie`s Desktop', isActive: true },
    { name: 'Bob`s laptop', isActive: true },
    
  ]);

  useEffect(() => {
    // Fetch any necessary data from the server or perform other initializations
  }, []);

  const toggleDarkMode = () => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      darkMode: !prevSettings.darkMode,
    }));
  };

  const toggleNotifications = () => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      notifications: !prevSettings.notifications,
    }));
  };

  const updateEmail = (newEmail) => {
    setSettings((prevSettings) => ({ ...prevSettings, email: newEmail }));
  };

  const updateUsername = (newUsername) => {
    setSettings((prevSettings) => ({ ...prevSettings, username: newUsername }));
  };

  const addTrustedDevice = (device) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      trustedDevices: [...prevSettings.trustedDevices, device],
    }));
  };

  const removeTrustedDevice = (device) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      trustedDevices: prevSettings.trustedDevices.filter((d) => d !== device),
    }));
  };
  const addRandomActiveSession = () => {
    const newDeviceName = `Device ${activeDevices.length + 1}`;
    const newSession = { name: newDeviceName, isActive: true };
    setActiveDevices((prevActiveDevices) => [...prevActiveDevices, newSession]);
  };

  const logoutFromSession = (device) => {
    setActiveDevices((prevActiveDevices) =>
      prevActiveDevices.map((d) =>
        d.name === device.name ? { ...d, isActive: false } : d
      )
    );
  };


  return (
    <SettingsContext.Provider
      value={{
        ...settings,
        toggleDarkMode,
        toggleNotifications,
        updateEmail,
        updateUsername,
        addTrustedDevice,
        removeTrustedDevice,
        activeDevices,
        addRandomActiveSession,
        logoutFromSession,
        themeColor, // Include themeColor in the context
        setThemeColor, // Include setThemeColor in the context
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

