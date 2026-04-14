/**
 * Siglas e abreviações que devem permanecer em maiúscula
 */
const UPPERCASE_WORDS = new Set([
  "USB",
  "PC",
  "HD",
  "SSD",
  "HDD",
  "RGB",
  "LED",
  "LCD",
  "HDMI",
  "VGA",
  "DVI",
  "DDR",
  "DDR3",
  "DDR4",
  "DDR5",
  "RAM",
  "CPU",
  "GPU",
  "AMD",
  "NVMe",
  "SATA",
  "WiFi",
  "Wi-Fi",
  "LAN",
  "WAN",
  "IP",
  "TB",
  "GB",
  "MB",
  "KB",
  "GHz",
  "MHz",
  "FHD",
  "UHD",
  "QHD",
  "IPS",
  "TN",
  "VA",
  "OLED",
  "AMOLED",
  "EDP",
  "EDT",
  "EDC",
  "EAU",
  "ML",
  "TV",
  "DVD",
  "CD",
  "FM",
  "AM",
  "ABS",
  "AC",
  "DC",
  "RPM",
  "AWG",
  "DB",
  "BT",
  "NFC",
  "GPS",
  "OTG",
  "PD",
  "QC",
  "UPS",
  "ATX",
  "ITX",
  "SFX",
  "PSU",
  "AIO",
  "TPM",
  "BIOS",
  "UEFI",
  "RJ45",
  "P2",
  "P10",
  "XLR",
  "RCA",
  "TWS",
  "ANC",
  "AAC",
  "SBC",
  "LDAC",
  "iOS",
  "II",
  "III",
  "IV",
  "VI",
  "VII",
  "VIII",
  "IX",
  "XI",
  "XII",
]);

/**
 * Preposições e artigos em português que ficam em minúscula (exceto início de frase)
 */
const LOWERCASE_WORDS = new Set([
  "de",
  "do",
  "da",
  "dos",
  "das",
  "para",
  "com",
  "sem",
  "por",
  "em",
  "no",
  "na",
  "nos",
  "nas",
  "ao",
  "aos",
  "à",
  "às",
  "um",
  "uma",
  "uns",
  "umas",
  "o",
  "a",
  "os",
  "as",
  "e",
  "ou",
]);

/**
 * Converte texto em CAIXA ALTA ou minúsculo para Title Case legível.
 *
 * - Mantém siglas conhecidas em maiúscula (USB, PC, SSD, etc.)
 * - Mantém preposições em minúscula (exceto no início)
 * - Preserva números e versões (2.0, 3.0, 5G, etc.)
 *
 * @example
 * toTitleCase("ADAPTADOR BLUETOOTH 5.0 USB 2.0/3.0 PC/NOTE")
 * // → "Adaptador Bluetooth 5.0 USB 2.0/3.0 PC/Note"
 *
 * toTitleCase("PERFUME IMPORTADO EAU DE PARFUM 100ML")
 * // → "Perfume Importado Eau de Parfum 100ML"
 */
export function toTitleCase(text: string): string {
  if (!text) return text;

  return text
    .split(" ")
    .map((word, index) => {
      // Preservar palavras que contêm "/" processando cada parte
      if (word.includes("/")) {
        return word
          .split("/")
          .map((part) => convertWord(part, index))
          .join("/");
      }

      return convertWord(word, index);
    })
    .join(" ");
}

function convertWord(word: string, index: number): string {
  if (!word) return word;

  const upper = word.toUpperCase();

  // Verificar se é uma sigla conhecida (case-insensitive)
  if (UPPERCASE_WORDS.has(upper)) {
    // Retornar na forma canônica da sigla
    for (const acronym of UPPERCASE_WORDS) {
      if (acronym.toUpperCase() === upper) return acronym;
    }
  }

  // Preservar palavras que são majoritariamente números/versões (ex: "5.0", "100ML", "3G", "5G")
  if (/^\d/.test(word)) return word.toUpperCase();

  const lower = word.toLowerCase();

  // Preposições em minúscula (exceto se for a primeira palavra)
  if (index > 0 && LOWERCASE_WORDS.has(lower)) {
    return lower;
  }

  // Capitalizar: primeira letra maiúscula, resto minúscula
  return lower.charAt(0).toUpperCase() + lower.slice(1);
}
