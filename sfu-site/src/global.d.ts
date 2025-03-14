interface VK {
    init: (params: { apiId: string | number }) => void;
    Auth: {
      login: (
        callback: (response: any) => void,
        params: { scope: string }
      ) => void;
    };
  }
  
  interface Window {
    VK: VK;
  }