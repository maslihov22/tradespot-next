(function () {
  if (typeof window === "undefined") return;
  if (window.Telegram?.WebApp?.initDataUnsafe?.user) return;

  const params = new URLSearchParams(window.location.search);
  const startParam = params.get("startapp") || params.get("tgWebAppStartParam") || "";

  const user = {
    id: 7812459031,
    first_name: "Carlos",
    last_name: "Mendoza",
    username: "carlos_trade_92",
    language_code: "es",
    is_premium: true,
    photo_url: "",
  };

  window.Telegram = {
    WebApp: {
      initData:
        "query_id=mock&user=" +
        encodeURIComponent(JSON.stringify(user)) +
        "&auth_date=1717260450&hash=mock",
      initDataUnsafe: {
        query_id: "mock",
        user,
        auth_date: 1717260450,
        hash: "mock",
        start_param: startParam,
      },
      version: "8.0",
      platform: "ios",
      colorScheme: "dark",
      themeParams: {
        bg_color: "#080a0d",
        text_color: "#eef3f7",
        button_color: "#f4c84a",
        button_text_color: "#181a20",
      },
      safeAreaInset: { top: 0, right: 0, bottom: 0, left: 0 },
      contentSafeAreaInset: { top: 0, right: 0, bottom: 0, left: 0 },
      ready() {},
      expand() {},
      disableVerticalSwipes() {},
      requestFullscreen() {},
      setBackgroundColor() {},
      setHeaderColor() {},
      setBottomBarColor() {},
      isVersionAtLeast() { return true; },
      onEvent() {},
      offEvent() {},
    },
  };
})();
