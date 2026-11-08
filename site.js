/* 案件だけの動き：エンドウ歯科（sp-25）
 * 1. 縦KV の写真の切り替え（参考の出だし：流線形の枠の中で写真が切り替わり、1枚ずつゆっくり大きくなる）
 * ページ送り（swipe.js）には触らない */
(() => {
  const imgs = [...document.querySelectorAll('.kv__img')];
  if (imgs.length < 2 || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  let now = 0;
  setInterval(() => {
    imgs[now].classList.remove('is-now');
    now = (now + 1) % imgs.length;
    imgs[now].classList.add('is-now');
  }, 4800);
})();
