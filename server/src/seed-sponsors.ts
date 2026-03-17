import pool, { query } from "./db.js";

const sponsors = [
  {
    name: "LusoPress TV",
    website_url: "https://lusopress.tv/",
    logo_url: "https://static.wixstatic.com/media/26bbab_cdf33d887c574c579b2a3410c69369ef~mv2.png/v1/fill/w_420,h_138,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/26bbab_cdf33d887c574c579b2a3410c69369ef~mv2.png",
  },
  {
    name: "Navigant Credit Union",
    website_url: "https://navigantcu.org/",
    logo_url: "https://static.wixstatic.com/media/26bbab_aa96271785f94767bed5d26f639616b5~mv2.jpg/v1/fill/w_470,h_193,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/26bbab_aa96271785f94767bed5d26f639616b5~mv2.jpg",
  },
  {
    name: "John Medeiros Jewelry",
    website_url: "https://www.johnmedeiros.com/",
    logo_url: "https://static.wixstatic.com/media/26bbab_6840f74dad2c462dbabb2375be5b7886~mv2.webp/v1/fill/w_382,h_121,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/26bbab_6840f74dad2c462dbabb2375be5b7886~mv2.webp",
  },
  {
    name: "Evaton",
    website_url: "https://evaton.com/",
    logo_url: "https://static.wixstatic.com/media/26bbab_54606ec5ea704f17926481e7122cbb64~mv2.png/v1/fill/w_412,h_97,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/26bbab_54606ec5ea704f17926481e7122cbb64~mv2.png",
  },
  {
    name: "IPMA",
    website_url: "https://ipmaawards.com/",
    logo_url: "https://static.wixstatic.com/media/9c9fdc_a1b64bc27af24421b5329763bc943318~mv2.jpeg/v1/fill/w_300,h_193,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/IPMA_Logo_Primary_Black.jpeg",
  },
  {
    name: "Gonsalves Foods",
    website_url: "http://www.gonsalvesfoods.com/",
    logo_url: "https://static.wixstatic.com/media/9c9fdc_36d4ce9770524454a1622b9e6ecb2362~mv2.jpeg/v1/fill/w_293,h_89,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/8086ca_bec12a01a82848a5abf6e3c6bd2b5d95_mv2.jpeg",
  },
  {
    name: "Portuguese Times",
    website_url: "https://portuguesetimes.com/",
    logo_url: "https://static.wixstatic.com/media/9c9fdc_b13b278a8eab4f02b5c56e244831d679~mv2.jpeg/v1/fill/w_299,h_104,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/l.jpeg",
  },
  {
    name: "WJFD Radio",
    website_url: "https://wjfd.com/",
    logo_url: "https://static.wixstatic.com/media/9c9fdc_b8c377d7f0f64fdfaf07dab2ecb2570e~mv2.jpeg/v1/fill/w_253,h_253,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/9c9fdc_b8c377d7f0f64fdfaf07dab2ecb2570e~mv2.jpeg",
  },
  {
    name: "Radio Voz Emigrante",
    website_url: "https://rvde.org/",
    logo_url: "https://static.wixstatic.com/media/9c9fdc_0a04f3577a9f44a1bc46de3014f3d8c6~mv2.jpeg/v1/fill/w_253,h_168,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Radio%20Voz%20Emigrante_logo.jpeg",
  },
  {
    name: "The Portuguese Channel",
    website_url: "https://www.facebook.com/theportuguesechannel.tv/",
    logo_url: "https://static.wixstatic.com/media/9c9fdc_789a8cd59f8541669070c0036f6649eb~mv2.jpeg/v1/fill/w_271,h_147,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/9c9fdc_789a8cd59f8541669070c0036f6649eb~mv2.jpeg",
  },
  {
    name: "Spain Restaurant",
    website_url: "https://www.spaincranston.com/",
    logo_url: "https://static.wixstatic.com/media/26bbab_ca9e448e83574d76a11347df5b584871~mv2.png/v1/fill/w_323,h_115,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/26bbab_ca9e448e83574d76a11347df5b584871~mv2.png",
  },
  {
    name: "The Capital Grille",
    website_url: "https://www.thecapitalgrille.com/home",
    logo_url: "https://static.wixstatic.com/media/9c9fdc_a487c18576bc45f9b4fc58553925974a~mv2.jpeg/v1/fill/w_277,h_138,al_c,lg_1,q_80,enc_avif,quality_auto/ac3d4d_16fe83a47c3844aaa95247b2d1607176_mv2.jpeg",
  },
  {
    name: "Taunton Avenue Bakery",
    website_url: "https://www.facebook.com/www.TAUNTONAVENUEBAKERY/",
    logo_url: "https://static.wixstatic.com/media/9c9fdc_108d8385f5b644e5becb7b3c67effb1e~mv2.jpeg/v1/fill/w_223,h_203,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/691-1.jpeg",
  },
  {
    name: "Medina Construction",
    website_url: null,
    logo_url: "https://static.wixstatic.com/media/9c9fdc_2bcd1e29d3384319aba6fbaaa8b2f98e~mv2.jpeg/v1/fill/w_238,h_174,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Medina_Construction.jpeg",
  },
  {
    name: "O Jornal",
    website_url: "https://www.heraldnews.com/ojornal/",
    logo_url: "https://static.wixstatic.com/media/9c9fdc_aff70ae5a7c74d4aa5931dbaff4707b6~mv2.jpeg/v1/fill/w_323,h_97,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/9c9fdc_aff70ae5a7c74d4aa5931dbaff4707b6~mv2.jpeg",
  },
  {
    name: "Rui Pereira & Sons",
    website_url: null,
    logo_url: "https://static.wixstatic.com/media/9c9fdc_9042d9a0ff364b118f60a582722b5592~mv2.jpeg/v1/fill/w_191,h_165,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/8086ca_ee5aec19ccff44eba2d458988eab8d0c_mv2.jpeg",
  },
  {
    name: "Aveleda",
    website_url: "https://www.aveleda.com/en",
    logo_url: "https://static.wixstatic.com/media/9c9fdc_860e1261b95147848c8b425c82c0765a~mv2.jpeg/v1/fill/w_309,h_156,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/9c9fdc_860e1261b95147848c8b425c82c0765a~mv2.jpeg",
  },
  {
    name: "Metro Fire New England",
    website_url: "http://www.metrofirene.com/",
    logo_url: "https://static.wixstatic.com/media/9c9fdc_5a3d24c4ada64431b0013de3e631f558~mv2.jpeg/v1/fill/w_226,h_232,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202023-04-17%20225540.jpeg",
  },
  {
    name: "Clube Juventude Lusitana",
    website_url: "https://www.facebook.com/LusitanaClub/",
    logo_url: "https://static.wixstatic.com/media/26bbab_da3c31e2db444062a609f94b8ef02d57~mv2.jpg/v1/fill/w_198,h_199,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/26bbab_da3c31e2db444062a609f94b8ef02d57~mv2.jpg",
  },
  {
    name: "Club Madeira",
    website_url: "https://www.facebook.com/ClubMadeira/",
    logo_url: "https://static.wixstatic.com/media/26bbab_803909d75fed47a6825c9d1d39aa09c1~mv2.jpg/v1/fill/w_274,h_143,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/26bbab_803909d75fed47a6825c9d1d39aa09c1~mv2.jpg",
  },
  {
    name: "NELN Inc",
    website_url: "https://nelninc.com/",
    logo_url: "https://static.wixstatic.com/media/26bbab_978a3e3e5fb54f4783d6f311386100c5~mv2.png/v1/fill/w_286,h_174,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/26bbab_978a3e3e5fb54f4783d6f311386100c5~mv2.png",
  },
  {
    name: "Signature Printers",
    website_url: "https://signatureprinters.com/",
    logo_url: "https://static.wixstatic.com/media/9c9fdc_4c38d37023f2421cadbd0e392cfaf3d8~mv2.jpeg/v1/fill/w_318,h_147,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Signatue%20Printing.jpeg",
  },
  {
    name: "Herdade do Esporão",
    website_url: "https://www.esporao.com/pt-pt/sobre/herdade-do-esporao/",
    logo_url: "https://static.wixstatic.com/media/9c9fdc_ca5f88e6a90a444bb33d4bbebb512633~mv2.jpeg/v1/fill/w_399,h_174,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/9c9fdc_ca5f88e6a90a444bb33d4bbebb512633~mv2.jpeg",
  },
  {
    name: "Portuguese American Club",
    website_url: null,
    logo_url: "https://static.wixstatic.com/media/26bbab_d4bd84bc4acc47289ae237ec65b3f203~mv2.png/v1/fill/w_239,h_223,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/26bbab_d4bd84bc4acc47289ae237ec65b3f203~mv2.png",
  },
  {
    name: "União Beneficente Portuguesa",
    website_url: "https://www.facebook.com/grupoamigos.daterceira/",
    logo_url: "https://static.wixstatic.com/media/26bbab_4e5cfeda615e4ac58992fdc9755480f1~mv2.jpg/v1/fill/w_185,h_185,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/26bbab_4e5cfeda615e4ac58992fdc9755480f1~mv2.jpg",
  },
  {
    name: "Cranston Portuguese Club",
    website_url: "https://www.facebook.com/cranstonportugueseclub/",
    logo_url: "https://static.wixstatic.com/media/26bbab_0c1495621b1042409ae7b2d8bb36e85d~mv2.jpg/v1/fill/w_226,h_180,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/26bbab_0c1495621b1042409ae7b2d8bb36e85d~mv2.jpg",
  },
  {
    name: "Clube Social Português of Pawtucket",
    website_url: "https://www.portuguesesocialclubpawtucketri.com/",
    logo_url: "https://static.wixstatic.com/media/26bbab_eaa3bb4b6f05471b898688d577062424~mv2.jpg/v1/fill/w_210,h_170,al_c,lg_1,q_80,enc_avif,quality_auto/26bbab_eaa3bb4b6f05471b898688d577062424~mv2.jpg",
  },
  {
    name: "Grupo Amigos da Terceira",
    website_url: "https://www.facebook.com/grupoamigos.daterceira/",
    logo_url: "https://static.wixstatic.com/media/26bbab_327d47ed3b234f6ea79d6363ff80e8e5~mv2.jpg/v1/fill/w_274,h_143,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/26bbab_327d47ed3b234f6ea79d6363ff80e8e5~mv2.jpg",
  },
];

async function seedSponsors() {
  try {
    for (let i = 0; i < sponsors.length; i++) {
      const s = sponsors[i];
      await query(
        `INSERT INTO sponsors (name, logo_url, website_url, tier, is_published, sort_order)
         VALUES ($1, $2, $3, 'supporter', true, $4)
         ON CONFLICT DO NOTHING`,
        [s.name, s.logo_url, s.website_url, i]
      );
    }
    console.log(`Seeded ${sponsors.length} sponsors.`);
  } catch (err) {
    console.error("Sponsor seed failed:", err);
  } finally {
    await pool.end();
  }
}

seedSponsors();
