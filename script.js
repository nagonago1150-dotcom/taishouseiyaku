// 大正製薬 アンケートLP - 3ステップ質問形式

// 回答を保存する配列
let answers = [];

// 次の質問に遷移する関数
function nextQuestion(screenNumber) {
    // 現在のアクティブ画面を非表示
    const currentScreen = document.querySelector('.question-screen.active, .loading-screen.active');
    const nextScreen = document.getElementById(`screen${screenNumber}`);
    
    if (currentScreen && nextScreen) {
        // 即座に切り替え
        currentScreen.classList.remove('active');
        nextScreen.classList.add('active');
    }
}

// ローディング画面を表示する関数
function showLoading() {
    // 現在の画面を非表示
    const currentScreen = document.querySelector('.question-screen.active');
    const loadingScreen = document.getElementById('loadingScreen');
    
    if (currentScreen && loadingScreen) {
        // 即座に切り替え
        currentScreen.classList.remove('active');
        loadingScreen.classList.add('active');
        
        // 2秒後に大正製薬の公式販売LPにリダイレクト
        setTimeout(() => {
            window.location.href = 'https://www.taisho-direct.jp/simages/lp/KTP_con_af.html';
        }, 2000);
    }
}

// ページ読み込み時の初期化
document.addEventListener('DOMContentLoaded', function() {
    // 最初の画面以外を非表示にする
    const allScreens = document.querySelectorAll('.question-screen, .loading-screen');
    allScreens.forEach((screen, index) => {
        if (index !== 0) {
            screen.classList.remove('active');
        }
    });
    
    // アニメーション効果の追加
    addScrollAnimations();
});

// スクロールアニメーションを追加する関数（簡略化）
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // アニメーション対象の要素を観察
    const animateElements = document.querySelectorAll('.question-container, .loading-container');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}