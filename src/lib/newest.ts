// アプリ・ゲームの一覧を「公開した日(published)の新しい順」に並べる(2026-10-27 ノブさんの指示)。
// 配列のどこに書いても、並びは自動で決まる。同じ日なら、配列に書いた順。
export function newestFirst<T extends { published: string }>(items: T[]): T[] {
  return items
    .map((item, order) => ({ item, order }))
    .sort((a, b) =>
      a.item.published === b.item.published
        ? a.order - b.order
        : a.item.published < b.item.published
          ? 1
          : -1,
    )
    .map(({ item }) => item);
}
