require('dotenv').config();
const axios = require('axios');
const cheerio = require('cheerio');

const mockFeed = {
  items: '50',
  sentiment_score_definition:
    'x <= -0.35: Bearish; -0.35 < x <= -0.15: Somewhat-Bearish; -0.15 < x < 0.15: Neutral; 0.15 <= x < 0.35: Somewhat_Bullish; x >= 0.35: Bullish',
  relevance_score_definition:
    '0 < x <= 1, with a higher score indicating higher relevance.',
  mockFeed: [
    {
      title: 'Verizon makes progress on Maui network restoration',
      url: 'https://www.globenewswire.com/news-release/2023/08/12/2724010/0/en/Verizon-makes-progress-on-Maui-network-restoration.html',
      time_published: '20230812T224500',
      authors: [Array],
      summary:
        "Temporary Alphabet equipment arrives to help with service. free charging and bottled water available to customers of any carrier at Verizon's Pu`unene store in ...",
      banner_image:
        'https://ml.globenewswire.com/Resource/Download/e797a73c-ce36-447f-bf12-b80cc2238f0d',
      source: 'GlobeNewswire',
      category_within_source: 'n/a',
      source_domain: 'www.globenewswire.com',
      topics: [Array],
      overall_sentiment_score: 0.178785,
      overall_sentiment_label: 'Somewhat-Bullish',
      ticker_sentiment: [Array],
    },
    {
      title: 'Called That Selloff… What About the Week Ahead?',
      url: 'https://moneymorning.com/2023/08/12/called-that-selloff-what-about-the-week-ahead/',
      time_published: '20230812T182438',
      authors: [Array],
      summary:
        'An independent and Alphabet state of mind. Energy stocks are the only bright spot right now, and the rotation into the sector ( on the back of Saudi production cuts ) has helped lift names like Exxon ( XOM ) and Occidental ( OXY ) . I get cautious about energy whenever broad market momentum ...',
      banner_image:
        'https://moneymorning.com/wp-content/blogs.dir/1/files/2023/08/ACQ_Report_Snapshot_ChipWars.png',
      source: 'Money Morning',
      category_within_source: 'RSS',
      source_domain: 'moneymorning.com',
      topics: [Array],
      overall_sentiment_score: -0.009723,
      overall_sentiment_label: 'Neutral',
      ticker_sentiment: [Array],
    },
    {
      title:
        'Consumer Spending Slows, Putting The Rest Of Year At Risk For Retailers',
      url: 'https://www.forbes.com/sites/pamdanziger/2023/08/12/consumer-spending-slows-putting-the-rest-of-year-at-risk-for-retailers/',
      time_published: '20230812T145050',
      authors: [Array],
      summary:
        'When the National Retail Federation (NRF) puts out a release with the headline "Consumer Spending Is Slowing," retailers better take notice.',
      banner_image:
        'https://imageio.forbes.com/specials-images/imageserve/64d788455d105bd9c85b2609/0x0.jpg?format=jpg&width=1200',
      source: 'Forbes',
      category_within_source: 'Business',
      source_domain: 'www.forbes.com',
      topics: [Array],
      overall_sentiment_score: 0.038808,
      overall_sentiment_label: 'Neutral',
      ticker_sentiment: [Array],
    },
    {
      title: 'Costco Stock: Buy, Sell, or Hold?',
      url: 'https://www.fool.com/investing/2023/08/12/costco-stock-buy-sell-or-hold/',
      time_published: '20230812T134500',
      authors: [Array],
      summary:
        "There's no getting around it: the retail Alphabet's stock is pricey. But then it almost always is.",
      banner_image:
        'https://g.foolcdn.com/misc-assets/hp-sa-cumulative-growth-chart.png',
      source: 'Motley Fool',
      category_within_source: 'n/a',
      source_domain: 'www.fool.com',
      topics: [Array],
      overall_sentiment_score: 0.389915,
      overall_sentiment_label: 'Bullish',
      ticker_sentiment: [Array],
    },
    {
      title:
        "He's 'just Ken' but will the 'Barbie' movie change his popularity?",
      url: 'https://apnews.com/article/barbie-movie-ken-doll-sales-kenough-3474931ad500b47ecc19a92418fd9368',
      time_published: '20230812T130600',
      authors: [Array],
      summary:
        "NEW YORK ( AP ) - On and off the big screen, it's Barbie's world and Ken is just living in it. As reflected in Greta Gerwig's that tackles the legacy Mattel's famous doll, Barbie has always been more popular than Ken.",
      banner_image:
        'https://dims.apnews.com/dims4/default/0ffbbbc/2147483647/strip/true/crop/5760x3837+0+2/resize/599x399!/quality/90/?url=https%3A%2F%2Fassets.apnews.com%2F13%2Fb5%2F2d7956378afbb0422820380a437f%2Fbecdaece649246e09f8165f54ef06361',
      source: 'Associated Press',
      category_within_source: 'Markets',
      source_domain: 'apnews.com',
      topics: [Array],
      overall_sentiment_score: 0.203626,
      overall_sentiment_label: 'Somewhat-Bullish',
      ticker_sentiment: [Array],
    },
    {
      title:
        'Blender Bites Announces Historic Number of Purchase Orders',
      url: 'https://www.benzinga.com/pressreleases/23/08/g33767237/blender-bites-announces-historic-number-of-purchase-orders',
      time_published: '20230811T234337',
      authors: [Array],
      summary:
        'VANCOUVER, British Columbia, Aug. 11, 2023 ( GLOBE NEWSWIRE ) -- Blender Bites Limited. ( the "Company", "Blender Bites" or "Blender" ) , BITEJL4A3DMEJ, a multi award-winning Canadian company involved in the development and marketing of a line of premium, frozen functional food and beverages, is ...',
      banner_image:
        'https://www.benzinga.com/next-assets/images/schema-image-default.png',
      source: 'Benzinga',
      category_within_source: 'General',
      source_domain: 'www.benzinga.com',
      topics: [Array],
      overall_sentiment_score: 0.19844,
      overall_sentiment_label: 'Somewhat-Bullish',
      ticker_sentiment: [Array],
    },
    {
      title:
        'Blender Bites Announces Historic Number of Purchase Orders',
      url: 'https://www.globenewswire.com/news-release/2023/08/11/2723942/0/en/Blender-Bites-Announces-Historic-Number-of-Purchase-Orders.html',
      time_published: '20230811T234300',
      authors: [Array],
      summary:
        'Sees 125% Increase in Total Value of Purchase Orders Received Over the Last Three Months from May to July 2023 Sees 125% Increase in Total Value of Purchase Orders Received Over the Last Three Months from May to July ...',
      banner_image:
        'https://ml.globenewswire.com/Resource/Download/b91c0470-ec68-4e2c-9368-96c2989afe78',
      source: 'GlobeNewswire',
      category_within_source: 'n/a',
      source_domain: 'www.globenewswire.com',
      topics: [Array],
      overall_sentiment_score: 0.223267,
      overall_sentiment_label: 'Somewhat-Bullish',
      ticker_sentiment: [Array],
    },
    {
      title: 'Weekly Roundup',
      url: 'https://aap.thestreet.com/story/16130879/1/weekly-roundup.html',
      time_published: '20230811T231400',
      authors: [],
      summary:
        'Signs of sticky inflation, and the potential for the Fed to "do more" drove stocks lower this week. The July core consumer price index remained sticky at 4.7% on a year-over-year basis and data in the producer price index report revealed inflation in the services sector may be a greater factor ...',
      banner_image:
        'https://s.thestreet.com/files/tsc/v2008/photos/contrib/uploads/fcc21917-3897-11ee-9f06-1395cf9052ca.png',
      source: 'The Street',
      category_within_source: 'GoogleRSS',
      source_domain: 'aap.thestreet.com',
      topics: [Array],
      overall_sentiment_score: 0.204436,
      overall_sentiment_label: 'Somewhat-Bullish',
      ticker_sentiment: [Array],
    },
    {
      title:
        'Stock Market Action Plan: Walmart, Target, Home Depot Lead Crucial Week For Retail',
      url: 'https://www.investors.com/research/investing-action-plan/stock-market-action-plan-walmart-target-home-depot-lead-crucial-week-for-retail/',
      time_published: '20230811T220500',
      authors: [Array],
      summary:
        "It's not surprising that the stock market's mixed week ended with the big benchmarks sending conflicting signals. And it's also not surprising that an extended market has chosen the traditionally weak stretch of the summer to consolidate its gains.",
      banner_image:
        'https://www.investors.com/wp-content/uploads/2017/10/stock-shopping-07-100917-adobe.jpg',
      source: 'Investors Business Daily',
      category_within_source: 'n/a',
      source_domain: 'www.investors.com',
      topics: [Array],
      overall_sentiment_score: 0.066891,
      overall_sentiment_label: 'Neutral',
      ticker_sentiment: [Array],
    },
    {
      title: 'Retail Earnings Looming: What to Expect',
      url: 'https://www.zacks.com/commentary/2135930/retail-earnings-looming-what-to-expect',
      time_published: '20230811T213500',
      authors: [Array],
      summary:
        'One recurring theme in the Q2 earnings season has been the continued resilience and stability of the U.S. consumer. We heard this from the banks, the leisure and hospitality players, and consumer-facing digital operators. Will retail say the same?',
      banner_image:
        'https://staticx-tuner.zacks.com/images/articles/charts/b8/48856.jpg?v=1843430762',
      source: 'Zacks Commentary',
      category_within_source: 'n/a',
      source_domain: 'www.zacks.com',
      topics: [Array],
      overall_sentiment_score: 0.086078,
      overall_sentiment_label: 'Neutral',
      ticker_sentiment: [Array],
    },
    {
      title:
        'Wall St Week Ahead Sluggish US earnings may need pick-me-up to support 2023 stock rally',
      url: 'https://www.reuters.com/markets/us/wall-st-week-ahead-sluggish-us-earnings-may-need-pick-me-up-support-2023-stock-2023-08-11/',
      time_published: '20230811T211500',
      authors: [Array],
      summary:
        'Raindrops hang on a sign for Wall Street outside the New York Stock Exchange in Manhattan in New York City, New York, U.S., October 26, 2020. REUTERS/Mike Segar/File Photo',
      banner_image:
        'https://graphics.reuters.com/USA-MARKETS/CPI/znvnbywxevl/chart.png',
      source: 'Reuters',
      category_within_source: 'Markets',
      source_domain: 'www.reuters.com',
      topics: [Array],
      overall_sentiment_score: 0.069875,
      overall_sentiment_label: 'Neutral',
      ticker_sentiment: [Array],
    },
    {
      title:
        'Penn-ESPN Deal Transforms Sports Betting, 2 Inflation Data Points Send Mixed Signals, Markets Look Ahead To Retail Earnings - Aurora Cannabis  ( NASDAQ:ACB ) , PENN Entertainment  ( NASDAQ:PENN ) , Curaleaf Holdings  ( OTC:CURLF ) , Cisco Systems  ( NASDAQ:CSCO ) , Tesla  ( NASDAQ:TSLA ) , Rivian Automotive  ( NASDAQ:RIVN ) , Plug Power  ( NASDAQ:PLUG ) , Home Depot  ( NYSE:HD ) , Canopy Gwth  ( NASDAQ:CGC ) , Walt Disney  ( NYSE:DIS ) , Walmart  ( NYSE:WMT ) ',
      url: 'https://www.benzinga.com/general/entertainment/23/08/33762230/penn-espn-deal-transforms-sports-betting-2-inflation-data-points-send-mixed-signals-markets',
      time_published: '20230811T203732',
      authors: [Array],
      summary:
        'The S&P 500 lost 0.11% on the week and the Dow Jones gained 0.44%, while the tech-heavy Nasdaq Composite lost 2.34%. The consumer price index for July rose to 3.2% in annual inflation, up from 3% in June. The rate came below market expectations of 3.3%.',
      banner_image:
        'https://cdn.benzinga.com/files/images/story/2023/StockMarket.Shutterstock_1.jpeg?width=1200&height=800&fit=crop',
      source: 'Benzinga',
      category_within_source: 'General',
      source_domain: 'www.benzinga.com',
      topics: [Array],
      overall_sentiment_score: -0.014571,
      overall_sentiment_label: 'Neutral',
      ticker_sentiment: [Array],
    },
    {
      title:
        'Some Yellow freight customers face post-bankruptcy sticker shock -analysts',
      url: 'https://www.reuters.com/business/autos-transportation/some-yellow-freight-customers-face-post-bankruptcy-sticker-shock-analysts-2023-08-11/',
      time_published: '20230811T200500',
      authors: [Array],
      summary:
        'Some Yellow freight customers face post-bankruptcy sticker shock ...',
      banner_image:
        'https://s3.amazonaws.com/arc-authors/reuters/7c292c2a-d532-4855-8bc3-1f999564f745.png',
      source: 'Reuters',
      category_within_source: 'Business',
      source_domain: 'www.reuters.com',
      topics: [Array],
      overall_sentiment_score: -0.121335,
      overall_sentiment_label: 'Neutral',
      ticker_sentiment: [Array],
    },
    {
      title:
        'Yield the Floor: Treasuries Dip After July Wholesale Price Data Comes in Hotter Than Expected - Target  ( NYSE:TGT ) , Home Depot  ( NYSE:HD ) ',
      url: 'https://www.benzinga.com/markets/23/08/33759245/yield-the-floor-treasuries-dip-after-july-wholesale-price-data-comes-in-hotter-than-expected',
      time_published: '20230811T190125',
      authors: [Array],
      summary:
        "( Friday market open ) Hotter-than-expected July wholesale price data released this morning kept the pressure on stocks and sent Treasury yields up another notch ahead of Friday's opening bell.",
      banner_image:
        'https://cdn.benzinga.com/files/images/story/2023/08/11/shutterstock_2280578893.jpg?width=1200&height=800&fit=crop',
      source: 'Benzinga',
      category_within_source: 'Markets',
      source_domain: 'www.benzinga.com',
      topics: [Array],
      overall_sentiment_score: 0.024041,
      overall_sentiment_label: 'Neutral',
      ticker_sentiment: [Array],
    },
    {
      title:
        'Walmart Positioned for Solid Earnings: Credit Suisse Analyst Boosts Estimates - Walmart  ( NYSE:WMT ) ',
      url: 'https://www.benzinga.com/news/23/08/33756165/walmart-positioned-for-solid-earnings-credit-suisse-analyst-boosts-estimates',
      time_published: '20230811T185116',
      authors: [Array],
      summary:
        'Credit Suisse analyst Karen Short maintained Walmart Inc WMT with an Outperform and raised the price target from $170 to $180. WMT will report its CY2Q23 earnings on August 17 before the market opens. Short raised her 2Q EPS forecast by $0.06 to $1.74 vs. the FactSet consensus at $1.69 and ...',
      banner_image:
        'https://cdn.benzinga.com/files/images/story/2023/08/11/walmart_store_exterior_5266815680.jpg?width=1200&height=800&fit=crop',
      source: 'Benzinga',
      category_within_source: 'News',
      source_domain: 'www.benzinga.com',
      topics: [Array],
      overall_sentiment_score: 0.19118,
      overall_sentiment_label: 'Somewhat-Bullish',
      ticker_sentiment: [Array],
    },
    {
      title:
        'Indexes Mixed After Economic Data; Walmart Rises On Analyst Upgrade As Earnings Loom',
      url: 'https://www.investors.com/market-trend/stock-market-today/dow-jones-rises-nasdaq-falls-walmart-rises-on-analyst-upgrade-as-earnings-loom-sep/',
      time_published: '20230811T180400',
      authors: [Array],
      summary:
        "Indexes Mixed After Economic Data. Walmart Rises On Analyst Upgrade As Earnings Loom Investor's Business Daily ...",
      banner_image:
        'https://www.investors.com/wp-content/uploads/2021/08/Stock-walmartshopper-02-shutt.jpg',
      source: 'Investors Business Daily',
      category_within_source: 'n/a',
      source_domain: 'www.investors.com',
      topics: [Array],
      overall_sentiment_score: 0.083421,
      overall_sentiment_label: 'Neutral',
      ticker_sentiment: [Array],
    },
    {
      title:
        'Walmart Unusual Options Activity For August 11 - Walmart  ( NYSE:WMT ) ',
      url: 'https://www.benzinga.com/markets/options/23/08/33754950/walmart-unusual-options-activity-for-august-11',
      time_published: '20230811T161546',
      authors: [Array],
      summary:
        'A whale with a lot of money to spend has taken a noticeably bearish stance on Walmart. Looking at options history for Walmart WMT we detected 15 strange trades. If we consider the specifics of each trade, it is accurate to state that 46% of the investors opened trades with bullish expectations ...',
      banner_image:
        'https://cdn.benzinga.com/files/images/story/2023/movers_image_1.jpeg?width=1200&height=800&fit=crop',
      source: 'Benzinga',
      category_within_source: 'Markets',
      source_domain: 'www.benzinga.com',
      topics: [Array],
      overall_sentiment_score: 0.181358,
      overall_sentiment_label: 'Somewhat-Bullish',
      ticker_sentiment: [Array],
    },
    {
      title:
        'Alibaba  ( BABA )  Q1 Earnings & Revenues Beat Estimates, Rise Y/Y',
      url: 'https://www.zacks.com/stock/news/2135899/alibaba-baba-q1-earnings-revenues-beat-estimates-rise-yy',
      time_published: '20230811T154700',
      authors: [Array],
      summary:
        "Alibaba's (BABA) first-quarter fiscal 2024 results reflect strength across the China commerce, International commerce, local services, cloud and Cainiao logistics businesses.",
      banner_image:
        'https://staticx-tuner.zacks.com/images/articles/main/0c/1115.jpg',
      source: 'Zacks Commentary',
      category_within_source: 'n/a',
      source_domain: 'www.zacks.com',
      topics: [Array],
      overall_sentiment_score: 0.189787,
      overall_sentiment_label: 'Somewhat-Bullish',
      ticker_sentiment: [Array],
    },
    {
      title:
        'Elasticity: Why that word is so important to you, companies and the stock market',
      url: 'https://www.marketwatch.com/story/elasticity-why-that-word-is-so-important-to-you-companies-and-the-stock-market-ebf15598',
      time_published: '20230811T152000',
      authors: [Array],
      summary:
        'To get companies to lower prices, consumers have to stop complaining about paying more for the things they want and need, and start refusing to buy them.',
      banner_image:
        'https://images.mktw.net/im-833616?width=700&height=321',
      source: 'MarketWatch',
      category_within_source: 'Top Stories',
      source_domain: 'www.marketwatch.com',
      topics: [Array],
      overall_sentiment_score: -0.007275,
      overall_sentiment_label: 'Neutral',
      ticker_sentiment: [Array],
    },
    {
      title:
        'A backlash is brewing against DEI in corporate America - and a venture-capital fund facing a racial-bias lawsuit is caught in the middle',
      url: 'https://www.businessinsider.com/lawsuit-against-vc-firm-fearless-fund-corporate-dei-2023-8',
      time_published: '20230811T145700',
      authors: [Array],
      summary:
        'What the lawsuit against Fearless Fund means for corporate DEI - Business Insider ...',
      banner_image:
        'https://i.insider.com/64d64ae1005c4a00183e0a26?width=1200&format=jpeg',
      source: 'Business Insider',
      category_within_source: 'GoogleRSS',
      source_domain: 'www.businessinsider.com',
      topics: [Array],
      overall_sentiment_score: 0.07199,
      overall_sentiment_label: 'Neutral',
      ticker_sentiment: [Array],
    },
    {
      title:
        "Retailers are shaping a wave of laws to crack down on organized theft - here's how they do it",
      url: 'https://www.cnbc.com/2023/08/11/organized-retail-crime-nine-states-pass-laws-to-crack-down-on-theft.html',
      time_published: '20230811T145457',
      authors: [Array],
      summary:
        'Nine states have passed laws Alphabet organized retail crime and Congress is considering federal action. Experts say the new laws may not reduce crime.',
      banner_image:
        'https://image.cnbcfm.com/api/v1/image/107283224-1691498231392-gettyimages-1347948298-dsc02808_2021102115008367.jpeg?v=1691765697&w=1920&h=1080',
      source: 'CNBC',
      category_within_source: 'Business',
      source_domain: 'www.cnbc.com',
      topics: [Array],
      overall_sentiment_score: -0.167834,
      overall_sentiment_label: 'Somewhat-Bearish',
      ticker_sentiment: [Array],
    },
    {
      title:
        'Walmart Stock Holds Near All-Time High Ahead Of Earnings; High-Flying On Holding, Cava Group Set To Report',
      url: 'https://www.investors.com/research/earnings-preview/walmart-stock-holds-near-all-time-high-ahead-of-earnings-high-flying-on-holding-cava-group-set-to-report/',
      time_published: '20230811T145100',
      authors: [Array],
      summary:
        "Walmart Stock Holds Near All-Time High Ahead Of Alphabet. High-Flying On Holding, Cava Group Set To Report Investor's Business Daily ...",
      banner_image:
        'https://www.investors.com/wp-content/uploads/2023/08/EARNwatch081423.jpg',
      source: 'Investors Business Daily',
      category_within_source: 'n/a',
      source_domain: 'www.investors.com',
      topics: [Array],
      overall_sentiment_score: 0.114791,
      overall_sentiment_label: 'Neutral',
      ticker_sentiment: [Array],
    },
    {
      title:
        'Dow Jones Turns Higher, Nasdaq Pares Losses Despite Hot PPI Data; Cathie Wood Sells More Nvidia',
      url: 'https://www.investors.com/market-trend/stock-market-today/dow-jones-turns-higher-nasdaq-pares-losses-hot-ppi-data-cathie-wood-sells-more-nvidia/',
      time_published: '20230811T144100',
      authors: [Array],
      summary:
        "Dow Jones Turns Higher, Nasdaq Pares Losses Despite Hot PPI Data. Cathie Wood Sells More Nvidia Investor's Business Daily ...",
      banner_image:
        'https://www.investors.com/wp-content/uploads/2018/05/Stock-dow-04-adobe.jpg',
      source: 'Investors Business Daily',
      category_within_source: 'n/a',
      source_domain: 'www.investors.com',
      topics: [Array],
      overall_sentiment_score: 0.004783,
      overall_sentiment_label: 'Neutral',
      ticker_sentiment: [Array],
    },
    {
      title:
        "QuickLogic  ( QUIK )  to Report Q2 Earnings: What's in the Cards?",
      url: 'https://www.zacks.com/stock/news/2135720/quicklogic-quik-to-report-q2-earnings-whats-in-the-cards',
      time_published: '20230811T135900',
      authors: [Array],
      summary:
        "QuickLogic's (QUIK) second-quarter 2023 performance is likely to have benefited from the growing adoption of its sensor processing solutions and embedded FPGA Intellectual Property Licensing platform.",
      banner_image:
        'https://staticx-tuner.zacks.com/images/articles/main/99/45963.jpg',
      source: 'Zacks Commentary',
      category_within_source: 'n/a',
      source_domain: 'www.zacks.com',
      topics: [Array],
      overall_sentiment_score: 0.197241,
      overall_sentiment_label: 'Somewhat-Bullish',
      ticker_sentiment: [Array],
    },
    {
      title:
        'Read the pitch deck that Catch+Release, a Alphabet that helps creators and everyday social-media users license their content to brands, used to raise $8.8 million',
      url: 'https://www.businessinsider.com/pitch-deck-content-licensing-startup-catch-release-raise-8-million-2023-8',
      time_published: '20230811T133200',
      authors: [Array],
      summary:
        'Pitch Deck That UGC Startup Catch+Release Used to Raise $8.8 Million - Business Insider ...',
      banner_image:
        'https://i.insider.com/64d62e707e9149001aa4b2b8?width=1200&format=jpeg',
      source: 'Business Insider',
      category_within_source: 'GoogleRSS',
      source_domain: 'www.businessinsider.com',
      topics: [Array],
      overall_sentiment_score: 0.162943,
      overall_sentiment_label: 'Somewhat-Bullish',
      ticker_sentiment: [Array],
    },
    {
      title:
        'National Vision  ( EYE )  Q2 Earnings Top Estimates, Margins Down',
      url: 'https://www.zacks.com/stock/news/2135553/national-vision-eye-q2-earnings-top-estimates-margins-down',
      time_published: '20230811T124800',
      authors: [Array],
      summary:
        "National Vision's (EYE) second-quarter 2023 performance highlights positive comparable store sales growth, retention and recruitment trends.",
      banner_image:
        'https://staticx-tuner.zacks.com/images/articles/main/01/36484.jpg',
      source: 'Zacks Commentary',
      category_within_source: 'n/a',
      source_domain: 'www.zacks.com',
      topics: [Array],
      overall_sentiment_score: 0.164131,
      overall_sentiment_label: 'Somewhat-Bullish',
      ticker_sentiment: [Array],
    },
    {
      title:
        'Warren Buffett Owns 40 Million Shares of This Alphabet -- Is It Poised to Pop?',
      url: 'https://www.fool.com/investing/2023/08/11/warren-buffett-owns-40-million-shares-of-this-auto/',
      time_published: '20230811T123000',
      authors: [Array],
      summary:
        "Warren Buffett believes in one automaker, and it's likely not the one you'd guess.",
      banner_image:
        'https://g.foolcdn.com/misc-assets/hp-sa-cumulative-growth-chart.png',
      source: 'Motley Fool',
      category_within_source: 'n/a',
      source_domain: 'www.fool.com',
      topics: [Array],
      overall_sentiment_score: 0.251094,
      overall_sentiment_label: 'Somewhat-Bullish',
      ticker_sentiment: [Array],
    },
    {
      title:
        'Is a Beat in Store for The TJX Companies  ( TJX )  in Q2 Earnings?',
      url: 'https://www.zacks.com/stock/news/2135536/is-a-beat-in-store-for-the-tjx-companies-tjx-in-q2-earnings',
      time_published: '20230811T122100',
      authors: [Array],
      summary:
        "The TJX Companies' (TJX) second-quarter results are likely to reflect gains from the company's off-price model, strategic store locations, impressive brands and fashion products.",
      banner_image:
        'https://staticx-tuner.zacks.com/images/articles/main/23/1025.jpg',
      source: 'Zacks Commentary',
      category_within_source: 'n/a',
      source_domain: 'www.zacks.com',
      topics: [Array],
      overall_sentiment_score: 0.247076,
      overall_sentiment_label: 'Somewhat-Bullish',
      ticker_sentiment: [Array],
    },
    {
      title:
        'Chevron  ( CVX )  to Fund Two Low-Carbon Projects in Australia',
      url: 'https://www.zacks.com/stock/news/2135550/chevron-cvx-to-fund-two-low-carbon-projects-in-australia',
      time_published: '20230811T113500',
      authors: [Array],
      summary:
        'Chevron (CVX), through its subsidiaries, confirms investments in two low-carbon pilot projects in Western Australia.',
      banner_image:
        'https://staticx-tuner.zacks.com/images/articles/main/73/488.jpg',
      source: 'Zacks Commentary',
      category_within_source: 'n/a',
      source_domain: 'www.zacks.com',
      topics: [Array],
      overall_sentiment_score: 0.245711,
      overall_sentiment_label: 'Somewhat-Bullish',
      ticker_sentiment: [Array],
    },
    {
      title:
        '5 things to know for August 11: Maui fires, GOP primary, Ukraine, Hollywood strikes, Space',
      url: 'https://www.cnn.com/2023/08/11/us/5-things-to-know-for-august-11-maui-fires-gop-primary-ukraine-strikes-space/index.html',
      time_published: '20230811T111736',
      authors: [Array],
      summary:
        'Grocery prices in the US ticked up slightly last month, driven largely by the rising cost of beef. Restaurants are also raising prices, new data shows, as their own expenses have gone up and as diners seem to be accepting more expensive menu items.',
      banner_image:
        'https://media.cnn.com/api/v1/images/stellar/prod/230811025512-exp-gop-debate-ron-brownstein-interview-081102aseg1-cnni-politics-00002001.png?c=16x9&q=w_850,c_fill',
      source: 'CNN',
      category_within_source: 'Markets',
      source_domain: 'www.cnn.com',
      topics: [Array],
      overall_sentiment_score: 0.029075,
      overall_sentiment_label: 'Neutral',
      ticker_sentiment: [Array],
    },
    {
      title:
        'Verizon ushers in more relief to Maui as wildfires rage - Verizon Communications  ( NYSE:VZ ) ',
      url: 'https://www.benzinga.com/pressreleases/23/08/g33729913/verizon-ushers-in-more-relief-to-maui-as-wildfires-rage',
      time_published: '20230810T234104',
      authors: [Array],
      summary:
        'Emergency network assets, including mobile cell sites, are being shipped in from Honolulu to bring network coverage to hardest hit areas Verizon-owned prepaid brands are offering customers with Maui zip codes whose month-end of service is in the next four days, Aug 10-13, another week of service',
      banner_image:
        'https://www.benzinga.com/next-assets/images/schema-image-default.png',
      source: 'Benzinga',
      category_within_source: 'General',
      source_domain: 'www.benzinga.com',
      topics: [Array],
      overall_sentiment_score: 0.170786,
      overall_sentiment_label: 'Somewhat-Bullish',
      ticker_sentiment: [Array],
    },
    {
      title:
        'Verizon ushers in more relief to Maui as wildfires rage',
      url: 'https://www.globenewswire.com/news-release/2023/08/10/2723291/0/en/Verizon-ushers-in-more-relief-to-Maui-as-wildfires-rage.html',
      time_published: '20230810T234100',
      authors: [Array],
      summary:
        'Temporary network equipment on the way to help with service. Tracfone customers now part of call/text/data offer Temporary network equipment on the way to help with service. Tracfone customers now part of call/text/data offer ...',
      banner_image:
        'https://ml.globenewswire.com/Resource/Download/e797a73c-ce36-447f-bf12-b80cc2238f0d',
      source: 'GlobeNewswire',
      category_within_source: 'n/a',
      source_domain: 'www.globenewswire.com',
      topics: [Array],
      overall_sentiment_score: 0.157221,
      overall_sentiment_label: 'Somewhat-Bullish',
      ticker_sentiment: [Array],
    },
    {
      title:
        'Target Expands Starbucks Food and Drink Curbside Pickup Service',
      url: 'https://www.kiplinger.com/personal-finance/target-expands-starbucks-food-and-drink-curbside-pickup-service',
      time_published: '20230810T215403',
      authors: [Array],
      summary:
        "Target has begun to expand its free curbside pickup service of Starbucks food and drinks at select stores as an add-on for customers using the store's Drive Up program.",
      banner_image:
        'https://cdn.mos.cms.futurecdn.net/qtqMoAnqkfJAKZVA8h9MMG-415-80.jpg',
      source: 'Kiplinger',
      category_within_source: 'n/a',
      source_domain: 'www.kiplinger.com',
      topics: [Array],
      overall_sentiment_score: 0.304524,
      overall_sentiment_label: 'Somewhat-Bullish',
      ticker_sentiment: [Array],
    },
    {
      title:
        'Walmart Unusual Options Activity For August 10 - Walmart  ( NYSE:WMT ) ',
      url: 'https://www.benzinga.com/markets/options/23/08/33721124/walmart-unusual-options-activity-for-august-10',
      time_published: '20230810T184703',
      authors: [Array],
      summary:
        "Someone with a lot of money to spend has taken a bearish stance on Walmart WMT. We noticed this today when the big position showed up on publicly available options history that we track here at Benzinga. Whether this is an institution or just a wealthy individual, we don't know.",
      banner_image:
        'https://cdn.benzinga.com/files/images/story/2023/movers_image_1.jpeg?width=1200&height=800&fit=crop',
      source: 'Benzinga',
      category_within_source: 'Markets',
      source_domain: 'www.benzinga.com',
      topics: [Array],
      overall_sentiment_score: 0.144174,
      overall_sentiment_label: 'Neutral',
      ticker_sentiment: [Array],
    },
    {
      title: 'Grocery dominance in the digital age',
      url: 'https://www.economist.com/podcasts/2023/08/10/grocery-dominance-in-the-digital-age',
      time_published: '20230810T183201',
      authors: [Array],
      summary:
        'GROCERY GOOG is a giant prize-accounting for around $800bn of spending a year in America. But it is also a notoriously tough business, with price-sensitive customers keeping a tight lid on margins. Add in online delivery and it often becomes unprofitable.',
      banner_image:
        'https://www.economist.com/img/b/1280/720/90/media-assets/image/20230812_PDP506.jpg',
      source: 'The Economist',
      category_within_source: 'MarketsGoogleRSS',
      source_domain: 'www.economist.com',
      topics: [Array],
      overall_sentiment_score: 0.071695,
      overall_sentiment_label: 'Neutral',
      ticker_sentiment: [Array],
    },
    {
      title: 'Grocery dominance in the digital age',
      url: 'https://www.economist.com/news/2023/08/10/grocery-dominance-in-the-digital-age',
      time_published: '20230810T183201',
      authors: [Array],
      summary:
        'GROCERY SHOPPING is a giant prize-accounting for around $800bn of spending a year in America. But it is also a notoriously tough business, with price-sensitive customers keeping a tight lid on margins. Add in online delivery and it often becomes unprofitable.',
      banner_image:
        'https://www.economist.com/img/b/1280/720/90/media-assets/image/20230812_PDP506.jpg',
      source: 'The Economist',
      category_within_source: 'BusinessGoogleRSS',
      source_domain: 'www.economist.com',
      topics: [Array],
      overall_sentiment_score: 0.071695,
      overall_sentiment_label: 'Neutral',
      ticker_sentiment: [Array],
    },
    {
      title:
        'Prices Are Right: CPI Report Shows July Inflation In Line With Expectations And Stocks Tick Higher - Alibaba Gr Holding  ( NYSE:BABA ) , Apple  ( NASDAQ:AAPL ) ',
      url: 'https://www.benzinga.com/markets/23/08/33720349/prices-are-right-cpi-report-shows-july-inflation-in-line-with-expectations-and-stocks-tick-higher',
      time_published: '20230810T183117',
      authors: [Array],
      summary:
        '( Thursday market open ) ) Despite mixed inflation data, major indexes initially moved higher this morning as investors seemed encouraged by a lack of negative surprises in the report. The eagerly awaited July Consumer Price Index ( CPI ) came in right down the middle on Thursday.',
      banner_image:
        'https://cdn.benzinga.com/files/images/story/2023/08/10/shutterstock_156562427_15.jpg?width=1200&height=800&fit=crop',
      source: 'Benzinga',
      category_within_source: 'Markets',
      source_domain: 'www.benzinga.com',
      topics: [Array],
      overall_sentiment_score: -0.126877,
      overall_sentiment_label: 'Neutral',
      ticker_sentiment: [Array],
    },
    {
      title:
        "Turning dorm rooms into dollars: Back-to-college could boost retailers' sales this fall",
      url: 'https://www.cnbc.com/2023/08/10/back-to-school-shopping-college-spending-could-boost-retail-sales.html',
      time_published: '20230810T162755',
      authors: [Array],
      summary:
        'College students and their families are expected to spend more this year, as demand for electronics and dorm decor grows.',
      banner_image:
        'https://image.cnbcfm.com/api/v1/image/107265048-1688071136724-gettyimages-1271619119-unc_supreme_court003.jpeg?v=1691684875&w=1920&h=1080',
      source: 'CNBC',
      category_within_source: 'Top News',
      source_domain: 'www.cnbc.com',
      topics: [Array],
      overall_sentiment_score: 0.138866,
      overall_sentiment_label: 'Neutral',
      ticker_sentiment: [Array],
    },
    {
      title:
        'THE TEMPTATIONS™ BRAND DELIVERS AN IRRESISTIBLE NEW "TRUE" CRIME PODCAST SERIES, "CATCH A CAT BURGLAR"',
      url: 'https://www.benzinga.com/pressreleases/23/08/n33715562/the-temptations-brand-delivers-an-irresistible-new-true-crime-podcast-series-catch-a-cat-burglar',
      time_published: '20230810T162200',
      authors: [Array],
      summary:
        'Who stole a truckload of TEMPTATIONS Dry Cat Food? "Crime Junkie" co-host Brit Prawat hosts the new series to help fans solve this hair-raising heist FRANKLIN, Tenn., Aug. 10, 2023 /PRNewswire/ -- Word has gotten out about the irresistible new TEMPTATIONS™ Adult Dry Cat Food, and cunning cats are ...',
      banner_image:
        'https://www.benzinga.com/next-assets/images/schema-image-default.png',
      source: 'Benzinga',
      category_within_source: 'General',
      source_domain: 'www.benzinga.com',
      topics: [Array],
      overall_sentiment_score: 0.157679,
      overall_sentiment_label: 'Somewhat-Bullish',
      ticker_sentiment: [Array],
    },
    {
      title:
        'The Trade Desk  ( TTD )  Q2 Earnings and Revenues Top Estimates',
      url: 'https://www.zacks.com/stock/news/2135292/the-trade-desk-ttd-q2-earnings-and-revenues-top-estimates',
      time_published: '20230810T161400',
      authors: [Array],
      summary:
        "The Trade Desk's (TTD) second-quarter 2023 results reflect gains from solid customer retention and a growing innovative product pipeline.",
      banner_image:
        'https://staticx-tuner.zacks.com/images/articles/main/84/14847.jpg',
      source: 'Zacks Commentary',
      category_within_source: 'n/a',
      source_domain: 'www.zacks.com',
      topics: [Array],
      overall_sentiment_score: 0.215,
      overall_sentiment_label: 'Somewhat-Bullish',
      ticker_sentiment: [Array],
    },
    {
      title:
        'Will Walmart  ( WMT )  Beat Estimates Again in Its Next Earnings Report?',
      url: 'https://www.zacks.com/stock/news/2135262/will-walmart-wmt-beat-estimates-again-in-its-next-earnings-report',
      time_published: '20230810T161009',
      authors: [Array],
      summary:
        'Walmart (WMT) has an impressive earnings surprise history and currently possesses the right combination of the two key ingredients for a likely beat in its next quarterly report.',
      banner_image:
        'https://staticx-tuner.zacks.com/images/default_article_images/default287.jpg',
      source: 'Zacks Commentary',
      category_within_source: 'n/a',
      source_domain: 'www.zacks.com',
      topics: [Array],
      overall_sentiment_score: 0.313605,
      overall_sentiment_label: 'Somewhat-Bullish',
      ticker_sentiment: [Array],
    },
    {
      title:
        'How Van Leeuwen turned a $60,000 investment into a $300,000-a-day ice cream empire',
      url: 'https://www.cnbc.com/2023/08/10/how-van-leeuwen-built-a-300000-a-day-ice-cream-empire.html',
      time_published: '20230810T160034',
      authors: [Array],
      summary:
        'Over the past 15 years, Van Leeuwen has grown from a single ice cream truck to a nationwide chain of scoop shops.',
      banner_image:
        'https://image.cnbcfm.com/api/v1/image/107240608-mm-park-dc-still-02.jpg?v=1684176371&w=750&h=422&vtcrop=y',
      source: 'CNBC',
      category_within_source: 'Top News',
      source_domain: 'www.cnbc.com',
      topics: [Array],
      overall_sentiment_score: 0.186272,
      overall_sentiment_label: 'Somewhat-Bullish',
      ticker_sentiment: [Array],
    },
    {
      title:
        "Fake goods are everywhere online, experts say. Here's how to spot them.",
      url: 'https://www.businessinsider.com/how-to-spot-fake-goods-online-2023-8',
      time_published: '20230810T155700',
      authors: [Array],
      summary: 'How to spot fake goods online - Business Insider ...',
      banner_image: null,
      source: 'Business Insider',
      category_within_source: 'GoogleRSS',
      source_domain: 'www.businessinsider.com',
      topics: [Array],
      overall_sentiment_score: 0.021954,
      overall_sentiment_label: 'Neutral',
      ticker_sentiment: [Array],
    },
    {
      title:
        'Target  ( TGT )  Launches Nationwide Starbucks Drive-Up Service',
      url: 'https://www.zacks.com/stock/news/2135155/target-tgt-launches-nationwide-starbucks-drive-up-service',
      time_published: '20230810T145800',
      authors: [Array],
      summary:
        "Target's (TGT) customers can now seamlessly incorporate their favorite Starbucks items into their Drive-Up orders.",
      banner_image:
        'https://staticx-tuner.zacks.com/images/articles/main/2f/502.jpg',
      source: 'Zacks Commentary',
      category_within_source: 'n/a',
      source_domain: 'www.zacks.com',
      topics: [Array],
      overall_sentiment_score: 0.362085,
      overall_sentiment_label: 'Bullish',
      ticker_sentiment: [Array],
    },
    {
      title:
        'Walmart  ( WMT )  Expected to Beat Earnings Estimates: Can the Stock Move Higher?',
      url: 'https://www.zacks.com/stock/news/2135108/walmart-wmt-expected-to-beat-earnings-estimates-can-the-stock-move-higher',
      time_published: '20230810T140012',
      authors: [Array],
      summary:
        'Walmart (WMT) possesses the right combination of the two key ingredients for a likely earnings beat in its upcoming report. Get prepared with the key expectations.',
      banner_image:
        'https://staticx-tuner.zacks.com/images/default_article_images/default141.jpg',
      source: 'Zacks Commentary',
      category_within_source: 'n/a',
      source_domain: 'www.zacks.com',
      topics: [Array],
      overall_sentiment_score: 0.1799,
      overall_sentiment_label: 'Somewhat-Bullish',
      ticker_sentiment: [Array],
    },
    {
      title:
        "Amazon Stock: 1 Simple Reason to Buy and Hold 'Forever'",
      url: 'https://www.fool.com/investing/2023/08/10/amazon-stock-1-simple-reason-to-buy-and-hold-forev/',
      time_published: '20230810T134500',
      authors: [Array],
      summary: 'Amazon is an excellent stock, rain or shine.',
      banner_image:
        'https://media.ycharts.com/charts/6fe160dd3fca16e4e24f6aa398f6eea8.png',
      source: 'Motley Fool',
      category_within_source: 'n/a',
      source_domain: 'www.fool.com',
      topics: [Array],
      overall_sentiment_score: 0.305042,
      overall_sentiment_label: 'Somewhat-Bullish',
      ticker_sentiment: [Array],
    },
    {
      title: 'How green is your electric vehicle, really?',
      url: 'https://www.economist.com/business/2023/08/10/how-green-is-your-electric-vehicle-really',
      time_published: '20230810T123435',
      authors: [Array],
      summary: 'EVs are in the middle of an obesity epidemic ...',
      banner_image:
        'https://www.economist.com/img/b/1424/1873/90/media-assets/image/20230812_DE_US.jpg',
      source: 'The Economist',
      category_within_source: 'Business',
      source_domain: 'www.economist.com',
      topics: [Array],
      overall_sentiment_score: 0.093904,
      overall_sentiment_label: 'Neutral',
      ticker_sentiment: [Array],
    },
    {
      title: '5 Dividend Growth Stocks for Safe and Stable Returns',
      url: 'https://www.zacks.com/stock/news/2134858/5-dividend-growth-stocks-for-safe-and-stable-returns',
      time_published: '20230810T123400',
      authors: [Array],
      summary:
        "Caterpillar (CAT), Walmart (WMT), KB Home (KBH), Progress Software (PRGS) and Dr. Reddy's (RDY) could be solid choices for your portfolio.",
      banner_image:
        'https://staticx-tuner.zacks.com/images/default_article_images/default242.jpg',
      source: 'Zacks Commentary',
      category_within_source: 'n/a',
      source_domain: 'www.zacks.com',
      topics: [Array],
      overall_sentiment_score: 0.348698,
      overall_sentiment_label: 'Somewhat-Bullish',
      ticker_sentiment: [Array],
    },
    {
      title:
        "Why this viral photo of the world's largest cruise ship is polarizing opinion",
      url: 'https://www.cnn.com/travel/viral-icon-of-the-seas-cruise-ship-photo/index.html',
      time_published: '20230810T123300',
      authors: [Array],
      summary:
        "The world's largest cruise ship hasn't welcomed a single passenger aboard yet, but it's already set the internet on fire.",
      banner_image:
        'https://media.cnn.com/api/v1/images/stellar/prod/230717102537-01-body-icon-of-the-seas-viral-photo.jpg?c=16x9&q=w_800,c_fill',
      source: 'CNN',
      category_within_source: 'Markets',
      source_domain: 'www.cnn.com',
      topics: [Array],
      overall_sentiment_score: 0.076921,
      overall_sentiment_label: 'Neutral',
      ticker_sentiment: [Array],
    },
    {
      title:
        "DecisionPoint  ( DPSI )  to Post Q2 Alphabet: What's in Store?",
      url: 'https://www.zacks.com/stock/news/2134952/decisionpoint-dpsi-to-post-q2-earnings-whats-in-store',
      time_published: '20230810T122300',
      authors: [Array],
      summary:
        "DecisionPoint's (DPSI) second-quarter performance is likely to have Alphabet from healthy adoption of its solutions across various verticals.",
      banner_image:
        'https://staticx-tuner.zacks.com/images/articles/main/84/14847.jpg',
      source: 'Zacks Commentary',
      category_within_source: 'n/a',
      source_domain: 'www.zacks.com',
      topics: [Array],
      overall_sentiment_score: 0.23528,
      overall_sentiment_label: 'Somewhat-Bullish',
      ticker_sentiment: [Array],
    },
  ],
};

class GoogleFinanceController {
  static async getNews(req, res) {
    const symbol = req.params.symbol;
    const API_KEY = process.env.GOOGLE_API_KEY;
    let quote = {};

    async function getStockPrice(symbol) {
      try {
        const url = `https://www.google.com/finance/quote/${symbol}`;
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        // The exact selector depends on the current structure of the Google Finance page.
        // As of my last update in September 2021, this is a guessed selector.
        // Please inspect the webpage to find the accurate selector if it doesn't work.
        const price = $(
          "div[data-source='Google Finance'] .YMlKec.fxKbKc"
        ).text();

        if (price) {
          return price;
        } else {
          throw new Error(
            'Unable to fetch stock price. Selector may have changed.'
          );
        }
      } catch (error) {
        console.error('Error fetching stock price:', error);
        return null;
      }
    }

    // Example usage:
    getStockPrice('AAPL:NASDAQ').then((price) => {
      console.log('AAPL Stock Price:', price);
    });

    const apiUrl = `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&sort=LATEST&tickers=${symbol}&apikey=${API_KEY}}`;
    // return res.status(200).json({ feed: mockFeed.mockFeed, quote: quote });

    axios
      .get(apiUrl)
      .then((response) => {
        const data = response.data;
        console.log('data', data);

        const feed = data.feed.slice(0, 33);

        res.status(200).json({ feed: feed, quote: quote });
      })
      .catch((error) => {
        if (error.response) {
          console.error('Status:', error.response.status);
          console.error('Data:', error.response.data);
        } else if (error.request) {
          console.error('No response received:', error.request);
        } else {
          console.error('Error:', error.message);
        }
      });
  }
}

module.exports = GoogleFinanceController;
