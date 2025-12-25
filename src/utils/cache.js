export const getFromCache = (key) => {
  try {
    const cacheMemoria = window.__CACHE__ || {};
    if (cacheMemoria[key]) {
      return cacheMemoria[key];
    }

    // si no está la obtengo de localstorage y la paso a memoria
    const cachedData = localStorage.getItem(key);
    if (cachedData) {
      const data = JSON.parse(cachedData);
      if (!window.__CACHE__) window.__CACHE__ = {};
      window.__CACHE__[key] = data;

      return data;
    }
    return null;
  } catch (error) {
    console.error("Error al leer cache:", error);
    return null;
  }
};

export const isExpired = (timestamp, ttl) => {
  return Date.now() - timestamp > ttl;
};

export const saveToCache = (key, data) => {
  const cacheData = {
    data,
    timestamp: Date.now(),
  };

  try {
    if (!window.__CACHE__) window.__CACHE__ = {};
    window.__CACHE__[key] = cacheData;

    localStorage.setItem(key, JSON.stringify(cacheData));
  } catch (error) {
    console.error("Error al guardar en cache:", error);
  }
};



export const clearCache = (key) => {
  try {
    // Limpiar memoria
    if (window.__CACHE__ && window.__CACHE__[key]) {
      delete window.__CACHE__[key];
    }
    
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error al limpiar cache:', error);
  }
};

export const clearAllCache = () => {
  try {
    window.__CACHE__ = {};
    
   // limpiar las keys en cache que coincidan
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('cache_')) {
        localStorage.removeItem(key);
      }
    });
  } catch (error) {
    console.error('Error al limpiar todo el cache:', error);
  }
};
