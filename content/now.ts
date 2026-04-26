export type NowItem = { label: string; body: string }

export const now = {
  updated: "April 2026",
  items: [
    {
      label: "working on",
      body: "Vortexa v2 — integrasi model prediksi angin dengan data BMKG, dan merapikan dashboard yang sebelumnya dibuat buru-buru menjelang kompetisi.",
    },
    {
      label: "learning",
      body: "State-space models (S4, Mamba) untuk time-series sensor, dan embedded Rust sebagai alternatif untuk firmware yang lebih aman.",
    },
    {
      label: "reading",
      body: "Designing Data-Intensive Applications (Kleppmann), dan paper-paper soal edge ML deployment di perangkat konsumsi rendah.",
    },
    {
      label: "building",
      body: "Sistem monitoring kualitas air untuk tambak ikan lokal di Bali — masih di tahap riset lapangan, belum prototype.",
    },
    {
      label: "not doing",
      body: "Side project baru. Saya mencoba disiplin untuk menyelesaikan yang sudah ada sebelum memulai yang baru — sulit tapi penting.",
    },
  ] satisfies NowItem[],
}
