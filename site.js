/* 案件だけの動き：エンドウ歯科（sp-25）
 * 1. 縦KV の写真の切り替え（参考の出だし：流線形の枠の中で写真が切り替わり、1枚ずつゆっくり大きくなる）
 *    消えていく写真は大きくなった所のまま薄くする（is-prev）。外すと一瞬で元の大きさに戻り、カクッと見えた（11/08 りょうさんの指摘）
 * 2. 年間休日の数字を 0 から数え上げる（p7。ページに入るたびに）
 * ページ送り（swipe.js）には触らない */
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const imgs = [...document.querySelectorAll('.kv__img')];
  if (imgs.length > 1 && !reduce) {
    let now = 0;
    setInterval(() => {
      const prev = imgs[now];
      prev.classList.add('is-prev');
      prev.classList.remove('is-now');
      setTimeout(() => prev.classList.remove('is-prev'), 1600);
      now = (now + 1) % imgs.length;
      imgs[now].classList.add('is-now');
    }, 4800);
  }

  const big = document.querySelector('.env__big');
  const num = big && big.querySelector('.env__num');
  if (num && !reduce) {
    const goal = Number(num.textContent) || 0;
    let raf = 0;
    const count = () => {
      cancelAnimationFrame(raf);
      const t0 = performance.now(); const dur = 1200;
      const step = (t) => {
        const k = Math.min(1, (t - t0) / dur);
        num.textContent = String(Math.round(goal * (1 - Math.pow(1 - k, 3))));
        if (k < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    };
    new MutationObserver(() => { if (big.classList.contains('is-on')) count(); else { cancelAnimationFrame(raf); num.textContent = String(goal); } })
      .observe(big, { attributes: true, attributeFilter: ['class'] });
  }
})();
