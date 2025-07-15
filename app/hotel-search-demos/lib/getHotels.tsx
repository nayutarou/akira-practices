"use server";

// APIから返されるホテル情報の型定義
interface Hotel {
  hotelName: string; // ホテル名
  hotelSpecial: string; // ホテルの特徴
  hotelMinCharge: number | null; // 最低料金
  address1: string; // 住所（都道府県）
  address2: string; // 住所（市区町村以下）
  reviewAverage: number | null; // レビュー平均点
  hotelImageUrl: string; // ホテル画像のURL
  hotelInformationUrl: string; // ホテルの詳細情報URL
}

// APIから返されるページネーション情報の型定義
interface PagingInfo {
  page: number; // 現在のページ番号
  pageCount: number; // 総ページ数
  recordCount: number; // 全体の件数
}

// getHotelData関数が返すオブジェクトの型定義
interface HotelAPIResponse {
  hotels: Hotel[];
  pagingInfo: PagingInfo;
}

// 楽天APIのレスポンス構造に合わせた型定義
interface RakutenHotelBasicInfo {
  hotelName: string;
  hotelSpecial: string;
  hotelMinCharge: number | null;
  address1: string;
  address2: string;
  reviewAverage: number | null;
  hotelImageUrl: string;
  hotelInformationUrl: string;
}

interface RakutenHotelItem {
  hotel: [{
    hotelBasicInfo: RakutenHotelBasicInfo;
  }];
}

interface RakutenAPIResponse {
  hotels: RakutenHotelItem[];
  pagingInfo: {
    page: number;
    pageCount: number;
    recordCount: number;
  };
}

/**
 * 楽天トラベルAPIを叩いてホテル情報を取得する関数
 * @param keyword 検索キーワード
 * @param page ページ番号
 * @param sort 並び替えの基準 (楽天APIのsortパラメータに直接渡す値)
 * @returns ホテル情報の配列とページネーション情報
 */
export async function getHotelData(keyword: string, page: number = 1, sort: string = ''): Promise<HotelAPIResponse> {
  const appId = process.env.RAKUTEN_TRAVEL_API_APP_ID;
  if (!appId) {
    throw new Error("Rakuten Travel API Application ID is not set.");
  }

  // 1ページあたり10件のデータを取得し、ページ番号を指定できるようにする
  let url = `https://app.rakuten.co.jp/services/api/Travel/KeywordHotelSearch/20170426?format=json&keyword=${keyword}&applicationId=${appId}&hits=10&page=${page}`;

  // 並び替えパラメータが指定されている場合、URLに追加
  // 楽天トラベルAPIのsortパラメータは 'standard', '+roomCharge', '-roomCharge' のみ
  if (sort) {
    url += `&sort=${sort}`;
  }

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Failed to fetch hotel data: ${res.statusText}`);
    }
    const data: RakutenAPIResponse = await res.json(); // ここで型を適用

    // ホテル情報が見つからない場合は、空の配列と初期化されたページ情報を返す
    if (!data.hotels || data.hotels.length === 0) {
      return { hotels: [], pagingInfo: { page: 1, pageCount: 0, recordCount: 0 } };
    }

    // APIからのネストされたレスポンスを、扱いやすいフラットな構造に変換する
    const hotels: Hotel[] = data.hotels.map((item: RakutenHotelItem) => {
      const info = item.hotel[0].hotelBasicInfo;
      return {
        hotelName: info.hotelName,
        hotelSpecial: info.hotelSpecial,
        hotelMinCharge: info.hotelMinCharge,
        address1: info.address1,
        address2: info.address2,
        reviewAverage: info.reviewAverage,
        // サムネイル画像(`_s.jpg`)を、より大きなサイズの画像(`_l.jpg`)に置換する
        hotelImageUrl: info.hotelImageUrl.replace('_s.jpg', '_l.jpg'),
        hotelInformationUrl: info.hotelInformationUrl,
      };
    });

    // APIから返されたページネーション情報を格納する
    const pagingInfo: PagingInfo = {
      page: data.pagingInfo.page,
      pageCount: data.pagingInfo.pageCount,
      recordCount: data.pagingInfo.recordCount,
    };

    return { hotels, pagingInfo };

  } catch (error) {
    console.error("Error fetching hotel data:", error);
    throw error;
  }
}