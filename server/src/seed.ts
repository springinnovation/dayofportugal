import bcrypt from "bcryptjs";
import pool, { query } from "./db.js";

const annualEvents = [
  {
    title: "RI Day of Portugal Parade",
    description: "A vibrant parade through the streets celebrating Portuguese American pride, culture, and heritage with floats, music, and community spirit.",
    date_display: "June",
    location: "Providence, RI",
    category: "parade",
  },
  {
    title: "RI Day of Portugal Festival",
    description: "The main festival featuring live entertainment, Portuguese food vendors, traditional music, and family-friendly activities.",
    date_display: "June",
    location: "India Point Park, Providence",
    category: "festival",
  },
  {
    title: "Feira de Gastronomia e Folclore",
    description: "A celebration of Portuguese cuisine and folklore, featuring traditional dishes, folk dancing, and cultural performances.",
    date_display: "Summer",
    location: "Rhode Island",
    category: "festival",
  },
  {
    title: "Golf Tournament",
    description: "Annual charity golf tournament supporting the organization's scholarship fund and community programs.",
    date_display: "Summer",
    location: "Rhode Island",
    category: "sport",
  },
  {
    title: "5K Road Race",
    description: "Community road race bringing together runners of all levels to celebrate Portuguese American heritage through fitness.",
    date_display: "June",
    location: "Providence, RI",
    category: "sport",
  },
  {
    title: "Miss Dia de Portugal RI",
    description: "Annual pageant celebrating Portuguese American young women who embody the culture, traditions, and community values.",
    date_display: "Spring",
    location: "Rhode Island",
    category: "ceremony",
  },
  {
    title: "Trap Shooting",
    description: "Competitive trap shooting event bringing the community together for a day of sport and camaraderie.",
    date_display: "Summer",
    location: "Rhode Island",
    category: "sport",
  },
  {
    title: "Fishing Tournament",
    description: "Celebrating the Portuguese maritime tradition with a community fishing tournament for all skill levels.",
    date_display: "Summer",
    location: "Rhode Island",
    category: "sport",
  },
  {
    title: "Veteran's Memorial",
    description: "A solemn ceremony honoring Portuguese American veterans who have served in the United States Armed Forces.",
    date_display: "June",
    location: "Rhode Island",
    category: "ceremony",
  },
];

async function seed() {
  try {
    // Seed events
    for (let i = 0; i < annualEvents.length; i++) {
      const e = annualEvents[i];
      await query(
        `INSERT INTO events (title, description, date_display, location, category, is_annual, is_published, sort_order)
         VALUES ($1, $2, $3, $4, $5, true, true, $6)
         ON CONFLICT DO NOTHING`,
        [e.title, e.description, e.date_display, e.location, e.category, i]
      );
    }
    console.log(`Seeded ${annualEvents.length} events.`);

    // Seed admin user
    const password = process.env.ADMIN_DEFAULT_PASSWORD || "RIDayAdmin2026!";
    const hash = await bcrypt.hash(password, 12);
    await query(
      `INSERT INTO admin_users (username, password_hash)
       VALUES ($1, $2)
       ON CONFLICT (username) DO NOTHING`,
      ["admin", hash]
    );
    console.log("Seeded admin user (username: admin).");
  } catch (err) {
    console.error("Seed failed:", err);
  } finally {
    await pool.end();
  }
}

seed();
