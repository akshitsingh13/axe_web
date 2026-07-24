// src/utils/assetPath.js

export function publicAsset(path) {
  return `${import.meta.env.BASE_URL}${path}`;
}
