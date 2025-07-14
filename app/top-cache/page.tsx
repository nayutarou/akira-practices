import { getServerTime } from "@/lib/getTime";

export default async function Page() {
  const time = await getServerTime();

  return (
    <div>
      <p>Top Cache ページ</p>
      <p>サーバー時間: {time}</p>
    </div>
  );
}
