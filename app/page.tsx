import LayoutTopCache from './layout-top-cache'
import LayoutFuncCache from './layout-func-cache'

export default function Page() {
  return (
    <>
      <LayoutTopCache>
        <p>ファイルトップキャッシュ適用中の子要素</p>
      </LayoutTopCache>

      <LayoutFuncCache>
        <p>関数内キャッシュ適用中の子要素</p>
      </LayoutFuncCache>
    </>
  )
}
