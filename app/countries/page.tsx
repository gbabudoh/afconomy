"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe, Search, TrendingUp, TrendingDown, Users, DollarSign,
  ChevronRight, Zap, MapPin, X,
} from "lucide-react";

interface Country {
  code: string;
  name: string;
  flag: string;
  region: string;
  capital: string;
  currency: string;
  gdp: string;
  gdpGrowth: string;
  gdpGrowthPositive: boolean;
  population: string;
  inflation: string;
  interestRate: string;
  rating: string;
  ratingTier: "strong" | "moderate" | "weak";
  description: string;
}

const COUNTRIES: Country[] = [
  // ── North Africa ──────────────────────────────────────────────────────────
  { code: "DZA", name: "Algeria",               flag: "🇩🇿", region: "North Africa",    capital: "Algiers",        currency: "DZD", gdp: "$239B",  gdpGrowth: "+3.8%", gdpGrowthPositive: true,  population: "45M",   inflation: "7.2%",  interestRate: "3.00%",  rating: "NR",   ratingTier: "moderate", description: "North Africa's second-largest economy, a major natural gas exporter pursuing diversification beyond hydrocarbons." },
  { code: "EGY", name: "Egypt",                 flag: "🇪🇬", region: "North Africa",    capital: "Cairo",          currency: "EGP", gdp: "$395B",  gdpGrowth: "+3.8%", gdpGrowthPositive: true,  population: "106M",  inflation: "29.5%", interestRate: "27.25%", rating: "B",    ratingTier: "weak",     description: "A strategic crossroads economy with significant tourism, Suez Canal revenues, and a growing industrial base." },
  { code: "LBY", name: "Libya",                 flag: "🇱🇾", region: "North Africa",    capital: "Tripoli",        currency: "LYD", gdp: "$41B",   gdpGrowth: "+10.0%",gdpGrowthPositive: true,  population: "7M",    inflation: "5.0%",  interestRate: "3.00%",  rating: "NR",   ratingTier: "weak",     description: "A major oil-rich nation rebuilding its economy amid political transition, holding Africa's largest proven oil reserves." },
  { code: "MAR", name: "Morocco",               flag: "🇲🇦", region: "North Africa",    capital: "Rabat",          currency: "MAD", gdp: "$142B",  gdpGrowth: "+3.4%", gdpGrowthPositive: true,  population: "37M",   inflation: "2.8%",  interestRate: "3.00%",  rating: "BB+",  ratingTier: "strong",   description: "A stable North African gateway with a diversified economy spanning phosphates, tourism, and renewable energy." },
  { code: "SDN", name: "Sudan",                 flag: "🇸🇩", region: "North Africa",    capital: "Khartoum",       currency: "SDG", gdp: "$30B",   gdpGrowth: "-2.5%", gdpGrowthPositive: false, population: "46M",   inflation: "256%",  interestRate: "17.00%", rating: "NR",   ratingTier: "weak",     description: "A nation rich in agricultural potential and mineral resources, navigating a complex political and economic transition." },
  { code: "TUN", name: "Tunisia",               flag: "🇹🇳", region: "North Africa",    capital: "Tunis",          currency: "TND", gdp: "$47B",   gdpGrowth: "+1.8%", gdpGrowthPositive: true,  population: "12M",   inflation: "7.9%",  interestRate: "8.00%",  rating: "Caa1", ratingTier: "weak",     description: "A Mediterranean-facing economy with a skilled workforce, balancing IMF-supported reforms against social pressures." },

  // ── West Africa ───────────────────────────────────────────────────────────
  { code: "BEN", name: "Benin",                 flag: "🇧🇯", region: "West Africa",     capital: "Porto-Novo",     currency: "XOF", gdp: "$17B",   gdpGrowth: "+6.4%", gdpGrowthPositive: true,  population: "13M",   inflation: "2.8%",  interestRate: "3.50%",  rating: "B+",   ratingTier: "moderate", description: "A fast-growing West African frontier market with strong cotton exports and a pivotal transit role for landlocked neighbours." },
  { code: "BFA", name: "Burkina Faso",          flag: "🇧🇫", region: "West Africa",     capital: "Ouagadougou",    currency: "XOF", gdp: "$19B",   gdpGrowth: "+3.6%", gdpGrowthPositive: true,  population: "22M",   inflation: "3.5%",  interestRate: "3.50%",  rating: "CCC",  ratingTier: "weak",     description: "A landlocked agricultural economy facing security challenges, with gold mining as its leading export earner." },
  { code: "CPV", name: "Cape Verde",            flag: "🇨🇻", region: "West Africa",     capital: "Praia",          currency: "CVE", gdp: "$2.3B",  gdpGrowth: "+5.0%", gdpGrowthPositive: true,  population: "600K",  inflation: "4.1%",  interestRate: "1.50%",  rating: "B",    ratingTier: "weak",     description: "A small island nation with a thriving tourism economy, strong governance credentials, and an Atlantic gateway position." },
  { code: "GMB", name: "Gambia",                flag: "🇬🇲", region: "West Africa",     capital: "Banjul",         currency: "GMD", gdp: "$2.2B",  gdpGrowth: "+5.3%", gdpGrowthPositive: true,  population: "2.6M",  inflation: "17.2%", interestRate: "16.00%", rating: "NR",   ratingTier: "weak",     description: "West Africa's smallest country, reliant on tourism, remittances, and agriculture in its quest for economic resilience." },
  { code: "GHA", name: "Ghana",                 flag: "🇬🇭", region: "West Africa",     capital: "Accra",          currency: "GHS", gdp: "$75B",   gdpGrowth: "+2.9%", gdpGrowthPositive: true,  population: "33M",   inflation: "20.9%", interestRate: "29.00%", rating: "SD",   ratingTier: "weak",     description: "A resource-rich democracy with gold, cocoa, and oil exports, undergoing IMF-backed structural economic adjustment." },
  { code: "GIN", name: "Guinea",                flag: "🇬🇳", region: "West Africa",     capital: "Conakry",        currency: "GNF", gdp: "$16B",   gdpGrowth: "+5.6%", gdpGrowthPositive: true,  population: "13M",   inflation: "10.5%", interestRate: "12.50%", rating: "NR",   ratingTier: "weak",     description: "Home to the world's largest bauxite reserves, Guinea is transforming mineral wealth into broad-based economic growth." },
  { code: "GNB", name: "Guinea-Bissau",         flag: "🇬🇼", region: "West Africa",     capital: "Bissau",         currency: "XOF", gdp: "$1.7B",  gdpGrowth: "+4.5%", gdpGrowthPositive: true,  population: "2.1M",  inflation: "3.8%",  interestRate: "3.50%",  rating: "NR",   ratingTier: "weak",     description: "A small cashew-exporting economy with vast untapped offshore oil potential and growing donor-backed development." },
  { code: "CIV", name: "Ivory Coast",           flag: "🇨🇮", region: "West Africa",     capital: "Yamoussoukro",   currency: "XOF", gdp: "$73B",   gdpGrowth: "+6.8%", gdpGrowthPositive: true,  population: "27M",   inflation: "4.2%",  interestRate: "3.50%",  rating: "BB-",  ratingTier: "moderate", description: "The world's leading cocoa producer and a West African economic anchor with robust infrastructure investment." },
  { code: "LBR", name: "Liberia",               flag: "🇱🇷", region: "West Africa",     capital: "Monrovia",       currency: "LRD", gdp: "$3.9B",  gdpGrowth: "+4.8%", gdpGrowthPositive: true,  population: "5.4M",  inflation: "8.5%",  interestRate: "20.00%", rating: "NR",   ratingTier: "weak",     description: "A post-conflict economy rebuilding around iron ore, rubber, and timber, with a growing services and reform agenda." },
  { code: "MLI", name: "Mali",                  flag: "🇲🇱", region: "West Africa",     capital: "Bamako",         currency: "XOF", gdp: "$19B",   gdpGrowth: "+3.2%", gdpGrowthPositive: true,  population: "22M",   inflation: "4.2%",  interestRate: "3.50%",  rating: "NR",   ratingTier: "weak",     description: "One of Africa's largest gold producers, navigating political transition while sustaining agricultural and mineral exports." },
  { code: "MRT", name: "Mauritania",            flag: "🇲🇷", region: "West Africa",     capital: "Nouakchott",     currency: "MRU", gdp: "$10B",   gdpGrowth: "+4.6%", gdpGrowthPositive: true,  population: "4.6M",  inflation: "4.9%",  interestRate: "8.00%",  rating: "NR",   ratingTier: "weak",     description: "A frontier market positioned for growth thanks to offshore gas discoveries set to transform its economic landscape." },
  { code: "NER", name: "Niger",                 flag: "🇳🇪", region: "West Africa",     capital: "Niamey",         currency: "XOF", gdp: "$16B",   gdpGrowth: "+6.9%", gdpGrowthPositive: true,  population: "25M",   inflation: "3.8%",  interestRate: "3.50%",  rating: "NR",   ratingTier: "weak",     description: "A landlocked Sahelian nation with significant uranium, gold, and oil deposits driving emerging economic ambitions." },
  { code: "NGA", name: "Nigeria",               flag: "🇳🇬", region: "West Africa",     capital: "Abuja",          currency: "NGN", gdp: "$477B",  gdpGrowth: "+3.2%", gdpGrowthPositive: true,  population: "223M",  inflation: "31.7%", interestRate: "27.50%", rating: "B-",   ratingTier: "weak",     description: "Africa's largest economy and most populous nation, a major oil producer with a rapidly growing tech ecosystem." },
  { code: "SEN", name: "Senegal",               flag: "🇸🇳", region: "West Africa",     capital: "Dakar",          currency: "XOF", gdp: "$31B",   gdpGrowth: "+7.1%", gdpGrowthPositive: true,  population: "17M",   inflation: "4.5%",  interestRate: "3.50%",  rating: "B+",   ratingTier: "moderate", description: "A newly minted oil and gas producer experiencing an economic renaissance driven by major offshore discoveries." },
  { code: "SLE", name: "Sierra Leone",          flag: "🇸🇱", region: "West Africa",     capital: "Freetown",       currency: "SLL", gdp: "$4.2B",  gdpGrowth: "+3.9%", gdpGrowthPositive: true,  population: "8.4M",  inflation: "40.0%", interestRate: "21.50%", rating: "NR",   ratingTier: "weak",     description: "A post-war frontier economy with mineral riches in diamonds, rutile, and iron ore rebuilding for sustainable growth." },
  { code: "TGO", name: "Togo",                  flag: "🇹🇬", region: "West Africa",     capital: "Lomé",           currency: "XOF", gdp: "$9.7B",  gdpGrowth: "+5.9%", gdpGrowthPositive: true,  population: "8.9M",  inflation: "4.0%",  interestRate: "3.50%",  rating: "B",    ratingTier: "weak",     description: "A regional transit hub and phosphate exporter emerging as a West African logistics and banking services centre." },

  // ── East Africa ────────────────────────────────────────────────────────────
  { code: "BDI", name: "Burundi",               flag: "🇧🇮", region: "East Africa",     capital: "Gitega",         currency: "BIF", gdp: "$2.8B",  gdpGrowth: "+3.1%", gdpGrowthPositive: true,  population: "12M",   inflation: "18.5%", interestRate: "16.00%", rating: "NR",   ratingTier: "weak",     description: "One of the world's most densely populated nations, focused on agricultural diversification and coffee export earnings." },
  { code: "COM", name: "Comoros",               flag: "🇰🇲", region: "East Africa",     capital: "Moroni",         currency: "KMF", gdp: "$1.4B",  gdpGrowth: "+2.5%", gdpGrowthPositive: true,  population: "900K",  inflation: "1.5%",  interestRate: "1.93%",  rating: "NR",   ratingTier: "weak",     description: "A small Indian Ocean archipelago economy driven by remittances, vanilla exports, and emerging blue economy potential." },
  { code: "DJI", name: "Djibouti",              flag: "🇩🇯", region: "East Africa",     capital: "Djibouti City",  currency: "DJF", gdp: "$4.1B",  gdpGrowth: "+6.0%", gdpGrowthPositive: true,  population: "1.1M",  inflation: "2.8%",  interestRate: "10.87%", rating: "NR",   ratingTier: "moderate", description: "A strategic Horn of Africa port economy and regional logistics hub on one of the world's busiest shipping lanes." },
  { code: "ERI", name: "Eritrea",               flag: "🇪🇷", region: "East Africa",     capital: "Asmara",         currency: "ERN", gdp: "$2.1B",  gdpGrowth: "+2.0%", gdpGrowthPositive: true,  population: "3.6M",  inflation: "6.5%",  interestRate: "6.50%",  rating: "NR",   ratingTier: "weak",     description: "A nation with significant gold and potash mineral potential, gradually opening to foreign investment after decades of isolation." },
  { code: "ETH", name: "Ethiopia",              flag: "🇪🇹", region: "East Africa",     capital: "Addis Ababa",    currency: "ETB", gdp: "$156B",  gdpGrowth: "+7.2%", gdpGrowthPositive: true,  population: "126M",  inflation: "22.1%", interestRate: "7.00%",  rating: "CCC",  ratingTier: "weak",     description: "One of the world's fastest-growing economies, driven by public investment, manufacturing, and services expansion." },
  { code: "KEN", name: "Kenya",                 flag: "🇰🇪", region: "East Africa",     capital: "Nairobi",        currency: "KES", gdp: "$118B",  gdpGrowth: "+5.4%", gdpGrowthPositive: true,  population: "55M",   inflation: "6.3%",  interestRate: "13.00%", rating: "B",    ratingTier: "weak",     description: "East Africa's economic powerhouse and a pan-African fintech leader, home to the M-Pesa mobile money revolution." },
  { code: "MDG", name: "Madagascar",            flag: "🇲🇬", region: "East Africa",     capital: "Antananarivo",   currency: "MGA", gdp: "$14B",   gdpGrowth: "+4.2%", gdpGrowthPositive: true,  population: "28M",   inflation: "8.1%",  interestRate: "9.50%",  rating: "NR",   ratingTier: "weak",     description: "An island nation with extraordinary biodiversity and mineral wealth in chromite, cobalt, and ilmenite attracting growing investment." },
  { code: "MWI", name: "Malawi",                flag: "🇲🇼", region: "East Africa",     capital: "Lilongwe",       currency: "MWK", gdp: "$12B",   gdpGrowth: "+1.5%", gdpGrowthPositive: true,  population: "20M",   inflation: "28.5%", interestRate: "26.00%", rating: "NR",   ratingTier: "weak",     description: "A landlocked agricultural economy with tobacco as its main export, striving to diversify into mining and manufacturing." },
  { code: "MUS", name: "Mauritius",             flag: "🇲🇺", region: "East Africa",     capital: "Port Louis",     currency: "MUR", gdp: "$14B",   gdpGrowth: "+6.0%", gdpGrowthPositive: true,  population: "1.3M",  inflation: "4.0%",  interestRate: "4.50%",  rating: "Baa2", ratingTier: "strong",   description: "Africa's most competitive economy and a premier financial services hub, renowned for governance, innovation, and quality of life." },
  { code: "MOZ", name: "Mozambique",            flag: "🇲🇿", region: "East Africa",     capital: "Maputo",         currency: "MZN", gdp: "$18B",   gdpGrowth: "+4.5%", gdpGrowthPositive: true,  population: "33M",   inflation: "6.9%",  interestRate: "14.75%", rating: "CCC",  ratingTier: "weak",     description: "A rising LNG exporter with vast natural gas reserves poised to fundamentally transform its economic trajectory." },
  { code: "RWA", name: "Rwanda",                flag: "🇷🇼", region: "East Africa",     capital: "Kigali",         currency: "RWF", gdp: "$14B",   gdpGrowth: "+7.5%", gdpGrowthPositive: true,  population: "14M",   inflation: "5.2%",  interestRate: "7.00%",  rating: "B+",   ratingTier: "moderate", description: "Africa's Singapore — a global model of governance, innovation, and rapid post-conflict economic transformation." },
  { code: "SYC", name: "Seychelles",            flag: "🇸🇨", region: "East Africa",     capital: "Victoria",       currency: "SCR", gdp: "$2.0B",  gdpGrowth: "+5.5%", gdpGrowthPositive: true,  population: "100K",  inflation: "3.0%",  interestRate: "4.00%",  rating: "B+",   ratingTier: "moderate", description: "An Indian Ocean island economy with one of Africa's highest per-capita incomes, anchored by luxury tourism and a growing blue economy." },
  { code: "SOM", name: "Somalia",               flag: "🇸🇴", region: "East Africa",     capital: "Mogadishu",      currency: "SOS", gdp: "$8.3B",  gdpGrowth: "+3.0%", gdpGrowthPositive: true,  population: "17M",   inflation: "4.5%",  interestRate: "8.00%",  rating: "NR",   ratingTier: "weak",     description: "A frontier economy rebuilding institutions after decades of conflict, leveraging its coastline, livestock, and diaspora remittances." },
  { code: "SSD", name: "South Sudan",           flag: "🇸🇸", region: "East Africa",     capital: "Juba",           currency: "SSP", gdp: "$4.6B",  gdpGrowth: "+0.5%", gdpGrowthPositive: true,  population: "11M",   inflation: "45.0%", interestRate: "15.00%", rating: "NR",   ratingTier: "weak",     description: "The world's youngest nation, rich in oil resources, working to build institutions and diversify from petroleum dependency." },
  { code: "TZA", name: "Tanzania",              flag: "🇹🇿", region: "East Africa",     capital: "Dodoma",         currency: "TZS", gdp: "$85B",   gdpGrowth: "+5.1%", gdpGrowthPositive: true,  population: "65M",   inflation: "4.8%",  interestRate: "6.00%",  rating: "B+",   ratingTier: "moderate", description: "A resource-abundant East African economy with strong agricultural, mining, tourism, and natural gas export sectors." },
  { code: "UGA", name: "Uganda",                flag: "🇺🇬", region: "East Africa",     capital: "Kampala",        currency: "UGX", gdp: "$49B",   gdpGrowth: "+5.9%", gdpGrowthPositive: true,  population: "48M",   inflation: "3.7%",  interestRate: "10.25%", rating: "B+",   ratingTier: "moderate", description: "An emerging oil producer with strong agricultural exports and a rapidly growing technology and services sector." },
  { code: "ZMB", name: "Zambia",                flag: "🇿🇲", region: "East Africa",     capital: "Lusaka",         currency: "ZMW", gdp: "$29B",   gdpGrowth: "+3.2%", gdpGrowthPositive: true,  population: "20M",   inflation: "12.5%", interestRate: "13.50%", rating: "CCC",  ratingTier: "weak",     description: "The world's eighth-largest copper producer, completing debt restructuring and rebuilding macroeconomic stability." },
  { code: "ZWE", name: "Zimbabwe",              flag: "🇿🇼", region: "East Africa",     capital: "Harare",         currency: "ZWG", gdp: "$26B",   gdpGrowth: "+3.5%", gdpGrowthPositive: true,  population: "16M",   inflation: "47.6%", interestRate: "130.00%",rating: "NR",   ratingTier: "weak",     description: "A resilient economy with vast mineral deposits in platinum, gold, and lithium, rebuilding credibility with a new currency framework." },

  // ── Central Africa ─────────────────────────────────────────────────────────
  { code: "CMR", name: "Cameroon",              flag: "🇨🇲", region: "Central Africa",  capital: "Yaoundé",        currency: "XAF", gdp: "$47B",   gdpGrowth: "+3.8%", gdpGrowthPositive: true,  population: "28M",   inflation: "5.5%",  interestRate: "5.00%",  rating: "B",    ratingTier: "weak",     description: "Central Africa's largest economy and a key oil, cocoa, and timber producer at the crossroads of the continent's growth story." },
  { code: "CAF", name: "Central African Rep.",  flag: "🇨🇫", region: "Central Africa",  capital: "Bangui",         currency: "XAF", gdp: "$2.6B",  gdpGrowth: "+1.0%", gdpGrowthPositive: true,  population: "5.4M",  inflation: "4.6%",  interestRate: "5.00%",  rating: "NR",   ratingTier: "weak",     description: "A nation rich in diamonds, gold, and uranium seeking economic stability through resource development and regional integration." },
  { code: "TCD", name: "Chad",                  flag: "🇹🇩", region: "Central Africa",  capital: "N'Djamena",      currency: "XAF", gdp: "$12B",   gdpGrowth: "+3.9%", gdpGrowthPositive: true,  population: "17M",   inflation: "6.4%",  interestRate: "5.00%",  rating: "NR",   ratingTier: "weak",     description: "A landlocked Saharan economy with oil exports as its primary revenue, diversifying into livestock and agricultural trade." },
  { code: "COG", name: "Republic of Congo",     flag: "🇨🇬", region: "Central Africa",  capital: "Brazzaville",    currency: "XAF", gdp: "$15B",   gdpGrowth: "+2.8%", gdpGrowthPositive: true,  population: "6.1M",  inflation: "3.9%",  interestRate: "5.00%",  rating: "Caa2", ratingTier: "weak",     description: "An oil-dependent economy with significant timber and mineral reserves, engaged in post-debt restructuring fiscal reform." },
  { code: "COD", name: "DR Congo",              flag: "🇨🇩", region: "Central Africa",  capital: "Kinshasa",       currency: "CDF", gdp: "$65B",   gdpGrowth: "+6.2%", gdpGrowthPositive: true,  population: "100M",  inflation: "20.8%", interestRate: "11.00%", rating: "NR",   ratingTier: "weak",     description: "The world's largest cobalt producer and home to vast mineral wealth in copper, coltan, and gold driving the global clean energy transition." },
  { code: "GNQ", name: "Equatorial Guinea",     flag: "🇬🇶", region: "Central Africa",  capital: "Malabo",         currency: "XAF", gdp: "$11B",   gdpGrowth: "-3.0%", gdpGrowthPositive: false, population: "1.5M",  inflation: "4.8%",  interestRate: "5.00%",  rating: "NR",   ratingTier: "weak",     description: "Sub-Saharan Africa's third-largest oil producer, managing declining oil output while building a post-hydrocarbon economic vision." },
  { code: "GAB", name: "Gabon",                 flag: "🇬🇦", region: "Central Africa",  capital: "Libreville",     currency: "XAF", gdp: "$20B",   gdpGrowth: "+2.5%", gdpGrowthPositive: true,  population: "2.3M",  inflation: "3.3%",  interestRate: "5.00%",  rating: "B-",   ratingTier: "weak",     description: "An upper-middle-income oil exporter with the world's second-largest manganese reserves, transitioning toward a diversified economy." },
  { code: "STP", name: "São Tomé & Príncipe",   flag: "🇸🇹", region: "Central Africa",  capital: "São Tomé",       currency: "STN", gdp: "$0.7B",  gdpGrowth: "+2.7%", gdpGrowthPositive: true,  population: "230K",  inflation: "18.0%", interestRate: "10.00%", rating: "NR",   ratingTier: "weak",     description: "A small island nation with offshore oil potential, growing cocoa exports, and eco-tourism ambitions in the Gulf of Guinea." },

  // ── Southern Africa ────────────────────────────────────────────────────────
  { code: "AGO", name: "Angola",                flag: "🇦🇴", region: "Southern Africa", capital: "Luanda",         currency: "AOA", gdp: "$84B",   gdpGrowth: "+1.1%", gdpGrowthPositive: true,  population: "36M",   inflation: "22.3%", interestRate: "19.50%", rating: "B-",   ratingTier: "weak",     description: "Sub-Saharan Africa's second-largest oil producer, diversifying from petroleum into agriculture, mining, and services." },
  { code: "BWA", name: "Botswana",              flag: "🇧🇼", region: "Southern Africa", capital: "Gaborone",       currency: "BWP", gdp: "$19B",   gdpGrowth: "+3.7%", gdpGrowthPositive: true,  population: "2.6M",  inflation: "5.8%",  interestRate: "2.65%",  rating: "BBB+", ratingTier: "strong",   description: "Africa's longest-running economic success story, transforming diamond wealth into one of the continent's most stable and developed economies." },
  { code: "SWZ", name: "Eswatini",              flag: "🇸🇿", region: "Southern Africa", capital: "Mbabane",        currency: "SZL", gdp: "$4.7B",  gdpGrowth: "+2.0%", gdpGrowthPositive: true,  population: "1.2M",  inflation: "4.6%",  interestRate: "7.50%",  rating: "NR",   ratingTier: "weak",     description: "A small landlocked kingdom with a manufacturing and agricultural base, deepening economic integration with Southern Africa." },
  { code: "LSO", name: "Lesotho",               flag: "🇱🇸", region: "Southern Africa", capital: "Maseru",         currency: "LSL", gdp: "$2.9B",  gdpGrowth: "+2.1%", gdpGrowthPositive: true,  population: "2.2M",  inflation: "6.4%",  interestRate: "7.75%",  rating: "NR",   ratingTier: "weak",     description: "A mountainous kingdom exporting water, diamonds, and textiles, known for the Lesotho Highlands Water Project." },
  { code: "NAM", name: "Namibia",               flag: "🇳🇦", region: "Southern Africa", capital: "Windhoek",       currency: "NAD", gdp: "$13B",   gdpGrowth: "+4.2%", gdpGrowthPositive: true,  population: "2.7M",  inflation: "5.4%",  interestRate: "7.75%",  rating: "BB",   ratingTier: "moderate", description: "A minerals powerhouse with major uranium, diamond, and green hydrogen ambitions, and one of Africa's most stable governance environments." },
  { code: "ZAF", name: "South Africa",          flag: "🇿🇦", region: "Southern Africa", capital: "Pretoria",       currency: "ZAR", gdp: "$373B",  gdpGrowth: "+0.6%", gdpGrowthPositive: true,  population: "60M",   inflation: "3.2%",  interestRate: "8.25%",  rating: "BB-",  ratingTier: "moderate", description: "The continent's most industrialised economy, a global hub for mining and finance with Africa's deepest capital markets." },
];

const REGIONS = ["All", "West Africa", "East Africa", "North Africa", "Southern Africa", "Central Africa"];

const RATING_STYLES = {
  strong:   { badge: "bg-emerald-50 text-emerald-700 border-emerald-200/80", dot: "bg-emerald-500" },
  moderate: { badge: "bg-amber-50 text-amber-700 border-amber-200/80",      dot: "bg-amber-400"   },
  weak:     { badge: "bg-red-50 text-red-600 border-red-200/80",             dot: "bg-red-400"     },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function CountriesPage() {
  const [search, setSearch]   = useState("");
  const [region, setRegion]   = useState("All");

  const filtered = useMemo(() => COUNTRIES.filter((c) => {
    const q = search.toLowerCase();
    const matchSearch = !search
      || c.name.toLowerCase().includes(q)
      || c.code.toLowerCase().includes(q)
      || c.capital.toLowerCase().includes(q);
    return matchSearch && (region === "All" || c.region === region);
  }), [search, region]);

  return (
    <div className="min-h-screen bg-[#f5f5f7]">

      {/* ── Sticky page header ───────────────────────────────────── */}
      <div className="bg-white/95 backdrop-blur-xl border-b border-black/[0.06] sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">

          {/* Title + live badge */}
          <div className="flex items-center justify-between gap-4 pt-6 pb-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse shrink-0" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Live Intelligence</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-black leading-none">
                African Economy Profiles
              </h1>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-emerald-50 border border-emerald-200 shrink-0">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">Live</span>
            </div>
          </div>

          {/* Summary stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pb-4">
            {[
              { label: "Markets",    value: `${COUNTRIES.length}`, icon: Globe,      color: "text-primary",    iconBg: "bg-primary/8"  },
              { label: "Avg Growth", value: "4.8%",                icon: TrendingUp, color: "text-emerald-600",iconBg: "bg-emerald-50" },
              { label: "Population", value: "1.5B+",               icon: Users,      color: "text-blue-600",   iconBg: "bg-blue-50"    },
              { label: "Total GDP",  value: "$3.1T",               icon: DollarSign, color: "text-violet-600", iconBg: "bg-violet-50"  },
            ].map(({ label, value, icon: Icon, color, iconBg }) => (
              <div key={label} className="flex items-center gap-2.5 bg-black/[0.025] rounded-2xl px-3.5 py-2.5">
                <div className={`p-1.5 rounded-xl ${iconBg} shrink-0`}>
                  <Icon className={`h-3.5 w-3.5 ${color}`} />
                </div>
                <div className="min-w-0">
                  <p className="text-[8.5px] font-black text-black/35 uppercase tracking-wider leading-none mb-0.5 truncate">{label}</p>
                  <p className={`text-base font-black ${color} leading-none`}>{value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-2.5 pb-3 items-start sm:items-center">
            {/* Search */}
            <div className="relative w-full sm:w-64 shrink-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-black/30 pointer-events-none" />
              <input
                type="text"
                placeholder="Country or capital…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-9 pl-9 pr-8 rounded-xl bg-black/[0.04] border border-transparent focus:border-primary/25 focus:bg-white focus:shadow-sm text-sm text-black placeholder:text-black/30 outline-none transition-all"
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-black/8 transition-colors">
                  <X className="h-3 w-3 text-black/40" />
                </button>
              )}
            </div>

            {/* Region pills */}
            <div className="flex gap-1.5 flex-wrap">
              {REGIONS.map((r) => (
                <button
                  key={r}
                  onClick={() => setRegion(r)}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-bold transition-all duration-200 ${
                    region === r
                      ? "bg-black text-white"
                      : "bg-black/[0.04] text-black/50 hover:bg-black/[0.08] hover:text-black/70"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>

            <p className="sm:ml-auto text-[11px] text-black/30 font-semibold whitespace-nowrap shrink-0">
              {filtered.length} / {COUNTRIES.length}
            </p>
          </div>
        </div>
      </div>

      {/* ── Country grid ─────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-6">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={region + search}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4"
            transition={{ staggerChildren: 0.04 }}
          >
            {filtered.map((country) => {
              const rs = RATING_STYLES[country.ratingTier];
              return (
                <motion.div key={country.code} variants={cardVariants} layout>
                  <Link href={`/countries/${country.code}`}>
                    <article className="group relative bg-white rounded-3xl border border-black/[0.06] hover:border-primary/20 hover:shadow-xl hover:shadow-primary/[0.07] transition-all duration-300 overflow-hidden cursor-pointer h-full">

                      {/* Subtle top accent on hover */}
                      <div className="absolute inset-x-0 top-0 h-[2px] bg-linear-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Flag watermark */}
                      <span className="absolute top-4 right-5 text-[72px] leading-none select-none pointer-events-none opacity-[0.055] group-hover:opacity-[0.1] transition-opacity duration-300">
                        {country.flag}
                      </span>

                      <div className="relative p-5">
                        {/* ── Card header ── */}
                        <div className="flex items-start gap-3 mb-3.5">
                          <span className="text-3xl leading-none shrink-0 mt-0.5">{country.flag}</span>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-[15px] font-black text-black group-hover:text-primary transition-colors leading-tight truncate">
                              {country.name}
                            </h3>
                            <div className="flex items-center gap-1 mt-0.5">
                              <MapPin className="h-2.5 w-2.5 text-black/25 shrink-0" />
                              <span className="text-[10px] text-black/40 font-medium">{country.capital}</span>
                              <span className="text-[10px] text-black/20 mx-0.5">·</span>
                              <span className="text-[10px] text-black/30 font-medium truncate">{country.region}</span>
                            </div>
                          </div>
                          {/* Rating badge */}
                          <span className={`shrink-0 flex items-center gap-1.5 px-2 py-1 rounded-lg border text-[10px] font-black ${rs.badge}`}>
                            <span className={`h-1.5 w-1.5 rounded-full ${rs.dot} shrink-0`} />
                            {country.rating}
                          </span>
                        </div>

                        {/* Description */}
                        <p className="text-[11px] text-black/45 leading-relaxed line-clamp-2 mb-4 min-h-[2.75rem]">
                          {country.description}
                        </p>

                        {/* Divider */}
                        <div className="h-px bg-black/[0.05] mb-3.5" />

                        {/* ── Metrics 2×2 ── */}
                        <div className="grid grid-cols-2 gap-2 mb-3.5">
                          {/* GDP with growth */}
                          <div className="bg-black/[0.025] rounded-xl px-3 py-2.5">
                            <p className="text-[8px] font-black text-black/35 uppercase tracking-wider mb-1">GDP</p>
                            <div className="flex items-baseline gap-1.5">
                              <span className="text-sm font-black text-black">{country.gdp}</span>
                              <span className={`text-[9px] font-bold flex items-center gap-0.5 ${country.gdpGrowthPositive ? "text-emerald-600" : "text-red-500"}`}>
                                {country.gdpGrowthPositive
                                  ? <TrendingUp className="h-2.5 w-2.5 shrink-0" />
                                  : <TrendingDown className="h-2.5 w-2.5 shrink-0" />
                                }
                                {country.gdpGrowth}
                              </span>
                            </div>
                          </div>

                          <div className="bg-black/[0.025] rounded-xl px-3 py-2.5">
                            <p className="text-[8px] font-black text-black/35 uppercase tracking-wider mb-1">Inflation</p>
                            <span className="text-sm font-black text-black">{country.inflation}</span>
                          </div>

                          <div className="bg-black/[0.025] rounded-xl px-3 py-2.5">
                            <p className="text-[8px] font-black text-black/35 uppercase tracking-wider mb-1">Policy Rate</p>
                            <span className="text-sm font-black text-black">{country.interestRate}</span>
                          </div>

                          <div className="bg-black/[0.025] rounded-xl px-3 py-2.5">
                            <p className="text-[8px] font-black text-black/35 uppercase tracking-wider mb-1">Population</p>
                            <span className="text-sm font-black text-black">{country.population}</span>
                          </div>
                        </div>

                        {/* ── Card footer ── */}
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1 text-[9px] font-black text-primary bg-primary/6 border border-primary/10 px-2.5 py-1 rounded-full">
                            <Zap className="h-2.5 w-2.5" />
                            {country.currency}
                          </span>
                          <span className="text-[10px] font-bold text-black/25 group-hover:text-primary transition-colors flex items-center gap-0.5">
                            View Profile
                            <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Empty state */}
        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-24"
          >
            <div className="h-16 w-16 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-center mx-auto mb-4">
              <Globe className="h-8 w-8 text-primary/30" />
            </div>
            <p className="font-black text-black text-lg">No markets found</p>
            <p className="text-sm text-black/40 mt-1">Try adjusting your search or region filter</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
