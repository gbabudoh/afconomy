import { LucideIcon, Activity, Leaf, Building2 } from "lucide-react";

export interface ResearchReport {
  id: string;
  title: string;
  category: string;
  date: string;
  summary: string;
  fullContent: string;
  icon: LucideIcon;
}

export const researchReports: ResearchReport[] = [
  {
    id: "res-1",
    title: "Digital Economy Growth in Sub-Saharan Africa",
    category: "Technology",
    date: "Dec 2024",
    summary: "An in-depth look at how mobile connectivity and digital infrastructure are driving a new era of economic growth across the continent.",
    icon: Activity,
    fullContent: `
      # Digital Economy Growth in Sub-Saharan Africa
      
      Sub-Saharan Africa is currently witnessing an unprecedented expansion in its digital economy. This growth is predominantly driven by high mobile penetration rates and significant investments in subsea fiber-optic cables.
      
      ## Key Findings:
      - **Mobile Connectivity**: Mobile broadband coverage has increased by 30% over the last five years, bringing millions into the formal digital economy.
      - **Venture Capital**: Fintech continues to attract the lion's share of regional VC funding, with Lagos, Nairobi, and Cape Town emerging as global tech hubs.
      - **E-government**: Several nations are digitizing public services, significantly reducing corruption and improving fiscal transparency.
      
      ## Future Outlook:
      The integration of AI and high-speed 5G networks is expected to contribute an additional $180 billion to the continent's GDP by 2030.
    `
  },
  {
    id: "res-2",
    title: "Agricultural Productivity and Food Security Trends",
    category: "Agriculture",
    date: "Nov 2024",
    summary: "Analyzing the shift towards precision farming and value-added processing as tools for ensuring long-term food security.",
    icon: Leaf,
    fullContent: `
      # Agricultural Productivity and Food Security Trends
      
      Agriculture remains the backbone of most African economies. However, the sector is undergoing a massive transformation as farmers adopt climate-smart technologies.
      
      ## Sector Highlights:
      - **Agri-Tech Adoption**: The use of drones for crop monitoring and IoT sensors for soil analysis has increased productivity in the East African region by 25%.
      - **Irrigation Infrastructure**: Large-scale irrigation projects in North and West Africa are reducing reliance on rain-fed agriculture.
      - **Supply Chain Integration**: New digital marketplaces are connecting smallholder farmers directly to urban consumers, reducing post-harvest losses.
      
      ## Challenges:
      Climate change remains the primary threat, requiring more resilient seed varieties and advanced weather forecasting systems.
    `
  },
  {
    id: "res-3",
    title: "Infrastructure Investment and Economic Development",
    category: "Infrastructure",
    date: "Nov 2024",
    summary: "Evaluating the impact of major transport corridors and energy projects on regional trade integration.",
    icon: Building2,
    fullContent: `
      # Infrastructure Investment and Economic Development
      
      Infrastructure development is the key catalyst for the African Continental Free Trade Area (AfCFTA). Current investments are focused on creating seamless cross-border corridors.
      
      ## Strategic Projects:
      - **Power Generation**: The completion of several major hydro and solar projects is beginning to close the energy gap in Central and Southern Africa.
      - **Transport Corridors**: The expansion of deep-water ports and modernized rail networks is slashing transit times between landlocked countries and global markets.
      - **Urbanization**: Planned 'smart cities' are being designed to manage the continent's rapid urban growth and provide sustainable living environments.
      
      ## Investment Gaps:
      Despite the progress, an estimated $100 billion annual funding gap remains, necessitating increased Private-Public Partnerships (PPPs).
    `
  }
];
