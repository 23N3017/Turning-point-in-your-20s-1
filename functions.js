const menuIcon = document.querySelector('.menu-icon'); // メニューアイコン
const menu = document.querySelector('.menu'); // メニューリスト

// アイコンをクリックしたときにメニューの表示を切り替え
menuIcon.addEventListener('click', () => {
    menu.classList.toggle('open'); // "open" クラスの付け外しで表示を制御
});

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
    if (window.pageYOffset >= navbar.offsetTop) {
        navbar.classList.add("sticky");
    } else {
        navbar.classList.remove("sticky");
    }
});

document.querySelectorAll('.menu a').forEach(link => {
  link.addEventListener('click', function (event) {
    event.preventDefault(); // デフォルトの動作（ジャンプ）を無効化
    const targetId = this.getAttribute('href'); // リンク先IDを取得
    const targetElement = document.querySelector(targetId); // 対応する要素を取得

    if (targetElement) {
      // スムーズスクロール処理
      window.scrollTo({
        top: targetElement.offsetTop - 70, // セクションの位置まで移動（ヘッダーの高さを考慮）
        behavior: 'smooth', // スムーズスクロール
      });
    }
  });
});

const spanWrapText = (target) => {
    const nodes = [...target.childNodes];
    let returnText = '';
  
    for (const node of nodes) {
      if (node.nodeType == 3) {
        //テキストの場合
        const text = node.textContent.replace(/\r?\n/g, ''); //改行削除
        const splitText = text.split(''); // 1文字ずつ分割
        for (const char of splitText) {
          returnText += `<span>${char}</span>`; // spanタグで挟む
        }
      } else {
        returnText += node.outerHTML; // テキスト以外
      }
    }
    return returnText;
  };


  
  const bubbles = [...document.querySelectorAll('.bubble')];
for (const bubble of bubbles) {
    const wrapper = bubble.closest('.bubble-wrapper');
    bubble.innerHTML = spanWrapText(bubble);
  
    bubble.spans = bubble.querySelectorAll('span');
  
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: bubble,
        start: 'top 80%',
      },
    });
  
    if (wrapper.classList.contains('question')) {
      // 質問の場合: 吹き出しが出現 → テキストが1文字ずつ表示
      tl.from(bubble, {
        opacity: 0,
        y: '10%',
      }).from(bubble.spans, {
        opacity: 0,
        duration: 0.01,
        stagger: 0.02, // 1文字ずつ表示
      });
    } else if (wrapper.classList.contains('answer')) {
      // アンサーの場合: 吹き出しが出現 → 全テキスト一括表示
      tl.from(bubble, {
        opacity: 0,
        y: '10%',
      }).to(bubble.spans, {
        opacity: 1, 
        duration: 0.001, // 一括で表示
      });
    }
}