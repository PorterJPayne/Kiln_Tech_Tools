const STORAGE_PREFIX = "kiln_";

function saveData(key, data) {
  localStorage.setItem(
    STORAGE_PREFIX + key,
    JSON.stringify(data)
  );
}

function loadData(key, fallback = []) {
  const raw = localStorage.getItem(STORAGE_PREFIX + key);

  if (!raw) return fallback;

  try {
    return JSON.parse(raw);
  } catch (err) {
    console.error("Storage parse error:", err);
    return fallback;
  }
}

function removeData(key) {
  localStorage.removeItem(STORAGE_PREFIX + key);
}