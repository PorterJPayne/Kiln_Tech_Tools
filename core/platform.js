// =========================
// PLATFORM CORE
// =========================

const Platform = {

  init() {
    console.log("Kiln Tech Platform Initialized");
  },

  navigate(page) {
    window.location.href = page;
  },

  createId() {
    return crypto.randomUUID();
  }

};

Platform.init();