// 大正製薬 おなかの脂肪対策タブレットPREMIUM LP 機能

// ページのスムーススクロール
function scrollToSurvey() {
    document.getElementById('survey').scrollIntoView({
        behavior: 'smooth'
    });
}

// アンケートフォームの処理
document.addEventListener('DOMContentLoaded', function() {
    const surveyForm = document.getElementById('surveyForm');
    
    if (surveyForm) {
        surveyForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // アンケート回答の収集
            const answers = collectSurveyAnswers();
            
            // 診断結果の生成と表示
            const result = generateDiagnosisResult(answers);
            showResults(result);
            
            // 結果セクションにスムーズスクロール
            setTimeout(() => {
                document.getElementById('results').scrollIntoView({
                    behavior: 'smooth'
                });
            }, 300);
        });
    }
    
    // CTAボタンのクリックイベント
    const ctaButtons = document.querySelectorAll('.main-cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 実際の実装では購入ページに遷移
            alert('お申し込みページに遷移します。\n\n初回限定価格980円（税込）で始められます！');
        });
    });
    
    // アニメーション効果の追加
    addScrollAnimations();
});

// アンケート回答を収集する関数
function collectSurveyAnswers() {
    const answers = {
        q1: [], // 複数選択可
        q2: null,
        q3: null,
        q4: null
    };
    
    // 設問1（複数選択）
    const q1Checkboxes = document.querySelectorAll('input[name="q1"]:checked');
    q1Checkboxes.forEach(checkbox => {
        answers.q1.push(checkbox.value);
    });
    
    // 設問2-4（単一選択）
    const q2Radio = document.querySelector('input[name="q2"]:checked');
    if (q2Radio) answers.q2 = q2Radio.value;
    
    const q3Radio = document.querySelector('input[name="q3"]:checked');
    if (q3Radio) answers.q3 = q3Radio.value;
    
    const q4Radio = document.querySelector('input[name="q4"]:checked');
    if (q4Radio) answers.q4 = q4Radio.value;
    
    return answers;
}

// 診断結果を生成する関数
function generateDiagnosisResult(answers) {
    let resultText = '';
    let recommendations = [];
    
    // 設問1の分析
    if (answers.q1.includes('belly_fat') || answers.q1.includes('weight_gain')) {
        recommendations.push('お腹の脂肪対策');
        resultText += 'あなたはお腹周りの脂肪にお悩みをお持ちですね。';
    }
    
    if (answers.q1.includes('metabolic_syndrome')) {
        recommendations.push('メタボ対策');
        resultText += 'メタボリックシンドローム予備軍とのことで、健康管理が重要ですね。';
    }
    
    if (answers.q1.includes('slow_metabolism')) {
        recommendations.push('代謝サポート');
        resultText += '年齢とともに感じる代謝の変化にお悩みですね。';
    }
    
    // 設問2の分析
    if (answers.q2 === 'carbs' || answers.q2 === 'fats' || answers.q2 === 'both') {
        recommendations.push('食事の糖・脂肪対策');
        resultText += '食事の糖質や脂質を気にされているあなたには、食事の糖・脂肪の吸収を抑える機能が役立ちます。';
    }
    
    // 設問3の分析
    if (answers.q3 === 'nothing') {
        resultText += 'まずは手軽に始められる健康サポートから始めてみませんか？';
    } else if (answers.q3 === 'supplements') {
        resultText += '既にサプリメントをお使いということで、健康意識が高い方ですね。より効果的な製品をお探しでしたら、';
    }
    
    // 設問4の分析
    if (answers.q4 === 'scientific_evidence' || answers.q4 === 'trusted_brand') {
        resultText += '科学的根拠と信頼性を重視されるあなたには、大正製薬の機能性表示食品が最適です。';
    }
    
    // デフォルトメッセージ
    if (resultText === '') {
        resultText = 'あなたの健康状態とライフスタイルを分析した結果、';
    }
    
    resultText += '\n\n大正製薬の「おなかの脂肪対策タブレットPREMIUM」が、あなたのお悩み解決をサポートします。';
    
    return {
        text: resultText,
        recommendations: recommendations
    };
}

// 結果を表示する関数
function showResults(result) {
    const resultsSection = document.getElementById('results');
    const resultText = document.getElementById('resultText');
    
    if (resultText) {
        // 結果テキストを段落ごとに分けて表示
        const paragraphs = result.text.split('\n\n');
        resultText.innerHTML = paragraphs.map(p => `<p>${p}</p>`).join('');
    }
    
    // 結果セクションを表示
    resultsSection.style.display = 'block';
    resultsSection.classList.add('fade-in');
}

// スクロールアニメーションを追加する関数
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
    const animateElements = document.querySelectorAll('.feature-card, .evidence-item, .pricing-card');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// フォームバリデーション
function validateSurveyForm() {
    const q2Checked = document.querySelector('input[name="q2"]:checked');
    const q3Checked = document.querySelector('input[name="q3"]:checked');
    const q4Checked = document.querySelector('input[name="q4"]:checked');
    
    if (!q2Checked || !q3Checked || !q4Checked) {
        alert('すべての質問にお答えください。');
        return false;
    }
    
    return true;
}

// 購入ボタンのクリック処理
function handlePurchaseClick() {
    // Google Analytics やその他のトラッキングコードをここに追加
    
    // 実際の実装では決済ページに遷移
    const confirmMessage = `
大正製薬「おなかの脂肪対策タブレットPREMIUM」

初回限定価格：980円（税込）
通常価格：4,320円（税込）→77%OFF

✓ 送料無料
✓ 回数縛りなし
✓ いつでも解約可能

お申し込みページに進みますか？
    `;
    
    if (confirm(confirmMessage)) {
        // 実際のお申し込みページのURL
        window.location.href = '#purchase';
    }
}