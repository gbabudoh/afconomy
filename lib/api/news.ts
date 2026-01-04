// News API integration for African economic news
export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  content: string;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  source: {
    id: string | null;
    name: string;
  };
  category: 'Macro' | 'Financial' | 'Trade' | 'Policy';
  countryCode?: string;
}

export interface NewsAPIResponse {
  status: string;
  totalResults: number;
  articles: NewsArticle[];
}

const NEWS_API_KEY = process.env.NEWS_API_KEY;
const NEWS_API_URL = 'https://newsapi.org/v2/everything';

// African countries for news filtering
const AFRICAN_COUNTRIES = [
  'Nigeria', 'South Africa', 'Egypt', 'Kenya', 'Ghana', 'Morocco', 'Ethiopia',
  'Algeria', 'Tunisia', 'Libya', 'Sudan', 'Uganda', 'Tanzania', 'Rwanda',
  'Botswana', 'Zambia', 'Zimbabwe', 'Mozambique', 'Angola', 'Cameroon',
  'Senegal', 'Mali', 'Burkina Faso', 'Niger', 'Chad', 'Ivory Coast'
];

// Economic keywords for filtering relevant news
const ECONOMIC_KEYWORDS = [
  'economy', 'GDP', 'inflation', 'currency', 'trade', 'investment', 'banking',
  'finance', 'market', 'stock exchange', 'central bank', 'monetary policy',
  'fiscal policy', 'debt', 'budget', 'export', 'import', 'AfCFTA', 'IMF',
  'World Bank', 'African Development Bank'
];

export async function fetchAfricanEconomicNews(
  pageSize: number = 20,
  page: number = 1,
  sortBy: 'publishedAt' | 'relevancy' | 'popularity' = 'publishedAt'
): Promise<NewsArticle[]> {
  if (!NEWS_API_KEY || NEWS_API_KEY === 'your_key_here' || NEWS_API_KEY === '') {
    console.log('NEWS_API_KEY not configured, returning enhanced mock data');
    return getEnhancedMockNews();
  }

  try {
    // Create search query for African economic news
    const countryQuery = AFRICAN_COUNTRIES.join(' OR ');
    const keywordQuery = ECONOMIC_KEYWORDS.join(' OR ');
    const query = `(${countryQuery}) AND (${keywordQuery})`;

    const params = new URLSearchParams({
      q: query,
      language: 'en',
      sortBy,
      pageSize: pageSize.toString(),
      page: page.toString(),
      domains: 'reuters.com,bloomberg.com,ft.com,bbc.com,cnn.com,aljazeera.com,africanews.com'
    });

    const response = await fetch(`${NEWS_API_URL}?${params}`, {
      headers: {
        'X-API-Key': NEWS_API_KEY,
        'User-Agent': 'Afconomy/1.0'
      }
    });

    if (!response.ok) {
      if (response.status === 401) {
        console.warn('News API: Invalid API key, falling back to mock data');
        return getEnhancedMockNews();
      }
      throw new Error(`News API error: ${response.status}`);
    }

    const data: NewsAPIResponse = await response.json();
    
    return data.articles.map(article => ({
      ...article,
      id: generateArticleId(article),
      category: categorizeArticle(article),
      countryCode: extractCountryCode(article)
    }));

  } catch (error) {
    console.error('Failed to fetch African economic news:', error);
    return getEnhancedMockNews();
  }
}

export async function fetchNewsByCountry(
  countryName: string,
  pageSize: number = 10
): Promise<NewsArticle[]> {
  if (!NEWS_API_KEY || NEWS_API_KEY === 'your_key_here' || NEWS_API_KEY === '') {
    return getEnhancedMockNews().filter(article => 
      article.title.toLowerCase().includes(countryName.toLowerCase()) ||
      article.description.toLowerCase().includes(countryName.toLowerCase())
    );
  }

  try {
    const keywordQuery = ECONOMIC_KEYWORDS.join(' OR ');
    const query = `${countryName} AND (${keywordQuery})`;

    const params = new URLSearchParams({
      q: query,
      language: 'en',
      sortBy: 'publishedAt',
      pageSize: pageSize.toString()
    });

    const response = await fetch(`${NEWS_API_URL}?${params}`, {
      headers: {
        'X-API-Key': NEWS_API_KEY,
        'User-Agent': 'Afconomy/1.0'
      }
    });

    if (!response.ok) {
      if (response.status === 401) {
        console.warn('News API: Invalid API key for country search, falling back to mock data');
        return getEnhancedMockNews().filter(article => 
          article.title.toLowerCase().includes(countryName.toLowerCase()) ||
          article.description.toLowerCase().includes(countryName.toLowerCase())
        );
      }
      throw new Error(`News API error: ${response.status}`);
    }

    const data: NewsAPIResponse = await response.json();
    
    return data.articles.map(article => ({
      ...article,
      id: generateArticleId(article),
      category: categorizeArticle(article),
      countryCode: extractCountryCode(article)
    }));

  } catch (error) {
    console.error(`Failed to fetch news for ${countryName}:`, error);
    return getEnhancedMockNews().filter(article => 
      article.title.toLowerCase().includes(countryName.toLowerCase()) ||
      article.description.toLowerCase().includes(countryName.toLowerCase())
    );
  }
}

// Helper functions
function generateArticleId(article: NewsArticle): string {
  return `${article.source.name}-${Date.parse(article.publishedAt)}-${article.title.slice(0, 20).replace(/\s+/g, '-')}`;
}

function categorizeArticle(article: NewsArticle): 'Macro' | 'Financial' | 'Trade' | 'Policy' {
  const content = `${article.title} ${article.description}`.toLowerCase();
  
  if (content.includes('trade') || content.includes('export') || content.includes('import') || content.includes('afcfta')) {
    return 'Trade';
  }
  if (content.includes('policy') || content.includes('government') || content.includes('regulation')) {
    return 'Policy';
  }
  if (content.includes('bank') || content.includes('finance') || content.includes('market') || content.includes('stock')) {
    return 'Financial';
  }
  return 'Macro';
}

function extractCountryCode(article: NewsArticle): string | undefined {
  const content = `${article.title} ${article.description}`.toLowerCase();
  
  const countryMap: Record<string, string> = {
    'nigeria': 'NGA', 'south africa': 'ZAF', 'egypt': 'EGY', 'kenya': 'KEN',
    'ghana': 'GHA', 'morocco': 'MAR', 'ethiopia': 'ETH', 'algeria': 'DZA',
    'tunisia': 'TUN', 'libya': 'LBY', 'sudan': 'SDN', 'uganda': 'UGA',
    'tanzania': 'TZA', 'rwanda': 'RWA', 'botswana': 'BWA', 'zambia': 'ZMB'
  };

  for (const [country, code] of Object.entries(countryMap)) {
    if (content.includes(country)) {
      return code;
    }
  }

  return undefined;
}

// Enhanced fallback mock data when API is unavailable
function getEnhancedMockNews(): NewsArticle[] {
  const now = new Date();
  const getRecentDate = (hoursAgo: number) => 
    new Date(now.getTime() - hoursAgo * 60 * 60 * 1000).toISOString();

  return [
    {
      id: 'mock-1',
      title: 'African Central Banks Coordinate Monetary Policy Response to Global Inflation',
      description: 'Major African central banks announce coordinated approach to address regional inflation pressures while maintaining growth momentum.',
      content: 'Central banks across Africa are implementing synchronized monetary policies to combat inflation while supporting economic growth. The coordinated response includes measured interest rate adjustments and enhanced regional cooperation.',
      url: '#',
      urlToImage: null,
      publishedAt: getRecentDate(2),
      source: { id: null, name: 'African Business' },
      category: 'Policy'
    },
    {
      id: 'mock-2',
      title: 'Nigeria\'s Naira Strengthens Following CBN Market Intervention',
      description: 'The Nigerian naira gains ground against major currencies after central bank market intervention and improved oil revenues.',
      content: 'The Central Bank of Nigeria\'s latest intervention in the foreign exchange market has resulted in naira appreciation. Improved oil revenues and increased foreign investment are supporting the currency.',
      url: '#',
      urlToImage: null,
      publishedAt: getRecentDate(4),
      source: { id: null, name: 'Reuters Africa' },
      category: 'Financial',
      countryCode: 'NGA'
    },
    {
      id: 'mock-3',
      title: 'South Africa\'s GDP Growth Exceeds Expectations in Q4 2025',
      description: 'South African economy shows resilience with stronger than expected growth driven by mining and manufacturing sectors.',
      content: 'South Africa\'s economy demonstrated unexpected strength in the fourth quarter, with GDP growth surpassing analyst expectations. The mining sector led the recovery alongside improved manufacturing output.',
      url: '#',
      urlToImage: null,
      publishedAt: getRecentDate(6),
      source: { id: null, name: 'Bloomberg Africa' },
      category: 'Macro',
      countryCode: 'ZAF'
    },
    {
      id: 'mock-4',
      title: 'AfCFTA Trade Volume Reaches Record High as Barriers Continue to Fall',
      description: 'Intra-African trade under the Continental Free Trade Area reaches unprecedented levels as member states reduce tariffs and streamline customs.',
      content: 'The African Continental Free Trade Area continues to deliver results with record-breaking trade volumes. Reduced tariffs and improved customs procedures are facilitating increased commerce between African nations.',
      url: '#',
      urlToImage: null,
      publishedAt: getRecentDate(8),
      source: { id: null, name: 'African Development Bank' },
      category: 'Trade'
    },
    {
      id: 'mock-5',
      title: 'Kenya\'s Tech Sector Attracts $2.1B in Foreign Investment',
      description: 'Kenya\'s technology sector continues to attract significant foreign investment, positioning Nairobi as a major African tech hub.',
      content: 'Kenya\'s thriving technology ecosystem has attracted over $2.1 billion in foreign investment this year. The growth is driven by fintech innovations, mobile banking solutions, and digital infrastructure development.',
      url: '#',
      urlToImage: null,
      publishedAt: getRecentDate(12),
      source: { id: null, name: 'TechCrunch Africa' },
      category: 'Financial',
      countryCode: 'KEN'
    },
    {
      id: 'mock-6',
      title: 'Egypt Launches $5B Green Bond Program for Renewable Energy',
      description: 'Egyptian government announces major green bond issuance to fund renewable energy projects and climate adaptation initiatives.',
      content: 'Egypt has launched a $5 billion green bond program aimed at financing renewable energy projects and climate resilience infrastructure. The initiative is part of the country\'s commitment to sustainable development.',
      url: '#',
      urlToImage: null,
      publishedAt: getRecentDate(16),
      source: { id: null, name: 'Financial Times Africa' },
      category: 'Policy',
      countryCode: 'EGY'
    },
    {
      id: 'mock-7',
      title: 'Ghana\'s Cocoa Sector Modernization Boosts Export Revenues',
      description: 'Ghana\'s cocoa industry modernization program shows positive results with increased export revenues and improved farmer incomes.',
      content: 'Ghana\'s comprehensive cocoa sector modernization has resulted in higher export revenues and improved livelihoods for farmers. New processing facilities and quality improvements are driving the success.',
      url: '#',
      urlToImage: null,
      publishedAt: getRecentDate(20),
      source: { id: null, name: 'Cocoa Post' },
      category: 'Trade',
      countryCode: 'GHA'
    },
    {
      id: 'mock-8',
      title: 'Morocco\'s Renewable Energy Capacity Reaches 4GW Milestone',
      description: 'Morocco achieves significant milestone in renewable energy development with total capacity reaching 4 gigawatts.',
      content: 'Morocco has reached a major milestone in its renewable energy transition with total capacity now exceeding 4 gigawatts. The achievement positions Morocco as a leader in African renewable energy development.',
      url: '#',
      urlToImage: null,
      publishedAt: getRecentDate(24),
      source: { id: null, name: 'Energy Africa' },
      category: 'Policy',
      countryCode: 'MAR'
    }
  ];
}

// Fallback mock data when API is unavailable (legacy function for compatibility)
function getMockNews(): NewsArticle[] {
  return getEnhancedMockNews().slice(0, 2);
}