import { NextRequest, NextResponse } from 'next/server';
import { fetchAfricanEconomicNews, fetchNewsByCountry } from '@/lib/api/news';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const country = searchParams.get('country');
  const pageSize = parseInt(searchParams.get('pageSize') || '20');
  const page = parseInt(searchParams.get('page') || '1');
  const sortBy = (searchParams.get('sortBy') || 'publishedAt') as 'publishedAt' | 'relevancy' | 'popularity';

  try {
    let articles;

    if (country) {
      // Fetch news for specific country
      articles = await fetchNewsByCountry(country, pageSize);
    } else {
      // Fetch general African economic news
      articles = await fetchAfricanEconomicNews(pageSize, page, sortBy);
    }

    return NextResponse.json({
      success: true,
      articles,
      pagination: {
        page,
        pageSize,
        total: articles.length
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('News API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch news',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { countries, categories, keywords, dateRange } = body;

    // This would be for advanced news filtering
    // For now, return general news with filters applied client-side
    const articles = await fetchAfricanEconomicNews(50, 1, 'publishedAt');
    
    let filteredArticles = articles;

    // Apply country filter
    if (countries && Array.isArray(countries) && countries.length > 0) {
      filteredArticles = filteredArticles.filter(article => 
        countries.some(country => 
          article.title.toLowerCase().includes(country.toLowerCase()) ||
          article.description.toLowerCase().includes(country.toLowerCase())
        )
      );
    }

    // Apply category filter
    if (categories && Array.isArray(categories) && categories.length > 0) {
      filteredArticles = filteredArticles.filter(article => 
        categories.includes(article.category)
      );
    }

    // Apply keyword filter
    if (keywords && Array.isArray(keywords) && keywords.length > 0) {
      filteredArticles = filteredArticles.filter(article => 
        keywords.some(keyword => 
          article.title.toLowerCase().includes(keyword.toLowerCase()) ||
          article.description.toLowerCase().includes(keyword.toLowerCase())
        )
      );
    }

    // Apply date range filter
    if (dateRange && dateRange.start && dateRange.end) {
      const startDate = new Date(dateRange.start);
      const endDate = new Date(dateRange.end);
      
      filteredArticles = filteredArticles.filter(article => {
        const articleDate = new Date(article.publishedAt);
        return articleDate >= startDate && articleDate <= endDate;
      });
    }

    return NextResponse.json({
      success: true,
      articles: filteredArticles,
      filters: {
        countries,
        categories,
        keywords,
        dateRange
      },
      total: filteredArticles.length,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Advanced news filtering error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to filter news',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}