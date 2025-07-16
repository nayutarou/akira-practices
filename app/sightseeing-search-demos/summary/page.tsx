
import Link from 'next/link';

const SummaryPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Sightseeing Search Demos</h1>
      <p className="mb-8">
        このセクションでは、Google Places API を利用した観光地検索アプリケーションの構築方法をデモンストレーションします。
      </p>
      <Link href="/sightseeing-search-demos/sightseeing-app">
        <a className="text-blue-500 hover:underline">Go to App</a>
      </Link>
    </div>
  );
};

export default SummaryPage;
