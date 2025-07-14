import LayoutTopCache from './top-cache/layout-top-cache';
import LayoutFuncCache from './func-cache/layout-func-cache';
import { getServerTime } from "@/lib/getTime";
import Link from 'next/link';

export default function Page() {
  return (
    <>
      <LayoutTopCache>
        <p>ファイルトップキャッシュ適用中の子要素</p>
        <p>サーバー時間: {getServerTime()}</p>
      </LayoutTopCache> 

      <LayoutFuncCache>
        <p>関数内キャッシュ適用中の子要素</p>
        <p>サーバー時間 : {getServerTime()}</p>
      </LayoutFuncCache>

      <Link href="/func-cache">Func Cache パージへ</Link>

    </>
  );
}
