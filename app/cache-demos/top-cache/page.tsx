import { getServerTime } from "@/cache-demos/lib/getTime";
import Link from "next/link";

// このページはデフォルトで静的にレンダリングされます。
// ビルド時に一度だけサーバー時間が取得され、その結果がキャッシュされます。

export default async function Page() {
  const time = await getServerTime();

  return (
    <div>
      <h1>トップレベルキャッシュ (Full Route Cache)</h1>
      <p>このページの時間は、ビルド時に一度だけ生成されたものです。</p>
      <p>ブラウザをリフレッシュしても、時間は更新されません。</p>
      <p style={{ fontWeight: "bold", fontSize: "1.2rem", color: "blue" }}>
        サーバー時間: {time}
      </p>
      <Link href="/" style={{ fontSize: "1.2rem", color: "blue" }}>
        トップページに戻る
      </Link>
    </div>
  );
}
