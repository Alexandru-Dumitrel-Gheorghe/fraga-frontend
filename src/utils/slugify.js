// src/utils/slugify.js
export const slugify = (str) => {
  return str
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, ""); // Entfernt alle nicht-alphanumerischen Zeichen außer Bindestrichen
};
