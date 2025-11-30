(function () {
    'use strict';

    // ============================================================
    // EXAMPLES Data - Combined Examples
    // ============================================================

    window.EXAMPLES = [
        // 1. Counter Example (Original)
        {
            id: 'counter',
            title: {
                en: 'Counter Example',
                ar: 'مثال العداد'
            },
            description: {
                en: 'A simple counter application demonstrating state management',
                ar: 'تطبيق عداد بسيط يوضح إدارة الحالة'
            },
            readme: {
                en: `# Counter Example\n\n## Overview\nA simple counter application that demonstrates state management across different JavaScript frameworks and Mishkah DSL.`,
                ar: `# مثال العداد\n\n## نظرة عامة\nتطبيق عداد بسيط يوضح إدارة الحالة عبر أطر عمل JavaScript المختلفة و Mishkah DSL.`
            },
            code: {
                vanilla: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Vanilla JS Counter</title>
  <style>
    body { display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; font-family: system-ui; background: #f0f0f0; }
    .container { text-align: center; background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
    .count { font-size: 4rem; font-weight: bold; color: #0066cc; margin: 1rem 0; }
    button { padding: 0.75rem 2rem; font-size: 1.1rem; background: #0066cc; color: white; border: none; border-radius: 4px; cursor: pointer; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Vanilla JS Counter</h1>
    <div class="count" id="count">0</div>
    <button id="btn">Increment</button>
  </div>
  <script>
    let count = 0;
    const display = document.getElementById('count');
    document.getElementById('btn').addEventListener('click', () => {
      count++;
      display.textContent = count;
    });
  </script>
</body>
</html>`,
                jquery: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>jQuery Counter</title>
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
  <style>
    body { display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; font-family: system-ui; background: #f0f0f0; }
    .container { text-align: center; background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
    .count { font-size: 4rem; font-weight: bold; color: #0066cc; margin: 1rem 0; }
    button { padding: 0.75rem 2rem; font-size: 1.1rem; background: #0066cc; color: white; border: none; border-radius: 4px; cursor: pointer; }
  </style>
</head>
<body>
  <div class="container">
    <h1>jQuery Counter</h1>
    <div class="count" id="count">0</div>
    <button id="btn">Increment</button>
  </div>
  <script>
    $(document).ready(function() {
      let count = 0;
      $('#btn').click(function() {
        count++;
        $('#count').text(count);
      });
    });
  </script>
</body>
</html>`,
                vue: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Vue.js Counter</title>
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  <style>
    body { display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; font-family: system-ui; background: #f0f0f0; }
    .container { text-align: center; background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
    .count { font-size: 4rem; font-weight: bold; color: #42b983; margin: 1rem 0; }
    button { padding: 0.75rem 2rem; font-size: 1.1rem; background: #42b983; color: white; border: none; border-radius: 4px; cursor: pointer; }
  </style>
</head>
<body>
  <div id="app">
    <div class="container">
      <h1>Vue.js Counter</h1>
      <div class="count">{{ count }}</div>
      <button @click="count++">Increment</button>
    </div>
  </div>
  <script>
    const { createApp, ref } = Vue;
    createApp({
      setup() {
        const count = ref(0);
        return { count };
      }
    }).mount('#app');
  </script>
</body>
</html>`,
                react: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>React Counter</title>
  <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <style>
    body { display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; font-family: system-ui; background: #f0f0f0; }
    .container { text-align: center; background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
    .count { font-size: 4rem; font-weight: bold; color: #61dafb; margin: 1rem 0; }
    button { padding: 0.75rem 2rem; font-size: 1.1rem; background: #61dafb; color: #333; border: none; border-radius: 4px; cursor: pointer; }
  </style>
</head>
<body>
  <div id="root"></div>
  <script type="text/babel">
    function Counter() {
      const [count, setCount] = React.useState(0);
      return (
        <div className="container">
          <h1>React Counter</h1>
          <div className="count">{count}</div>
          <button onClick={() => setCount(count + 1)}>Increment</button>
        </div>
      );
    }
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(<Counter />);
  </script>
</body>
</html>`,
                'mishkah-dsl': `// Mishkah DSL Counter
const database = { count: 0 };
const orders = {
  'inc': { on: ['click'], gkeys: ['inc'], handler: (e, ctx) => ctx.setState(s => ({...s, count: s.count + 1})) }
};
function App(db) {
  const D = Mishkah.DSL;
  return D.Containers.Div({ attrs: { style: 'text-align: center; padding: 2rem;' } }, [
    D.Text.H1({}, ['Mishkah Counter']),
    D.Text.H2({ attrs: { style: 'font-size: 4rem; color: #2aa5a0;' } }, [String(db.count)]),
    D.Forms.Button({ attrs: { 'data-m-gkey': 'inc', style: 'padding: 1rem 2rem; font-size: 1.2rem;' } }, ['Increment'])
  ]);
}
const app = Mishkah.app.createApp(database, orders);
Mishkah.app.setBody(App);
app.mount('#app');`,
                'mishkah-htmlx': `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <script src="../lib/mishkah.js" data-htmlx data-ui></script>
</head>
<body>
  <div id="app"></div>
  <template id="main">
    <script type="application/json" data-m-path="data">{"count": 0}</script>
    <div style="text-align: center; padding: 2rem;">
      <h1>Mishkah HTMLx</h1>
      <h2 style="font-size: 4rem; color: #2aa5a0;">{state.data.count}</h2>
      <button onclick="inc(event, ctx)" style="padding: 1rem 2rem; font-size: 1.2rem;">Increment</button>
    </div>
    <script>
      function inc(e, ctx) { ctx.setState(s => { s.data.count++; return s; }); }
    </script>
  </template>
</body>
</html>`
            }
        },

        // 2. CPS Challenge Example (New)
        {
            id: 'cps-challenge',
            title: {
                en: 'CPS Challenge',
                ar: 'تحدي النقرات'
            },
            description: {
                en: 'Test your clicking speed! A game to measure Clicks Per Second.',
                ar: 'اختبر سرعتك في النقر! لعبة لقياس عدد النقرات في الثانية.'
            },
            readme: {
                en: `# CPS Challenge (Clicks Per Second)\n\n## Overview\nA fun mini-game to test how fast you can click in a given time.\n\n## Features\n- ⏱️ **Timer**: Set your challenge duration.\n- 👆 **Clicker**: Smash the button!\n- 🏆 **Score**: Calculates your CPS automatically.\n- 🚫 **Anti-Cheat**: Button disabled when not running.`,
                ar: `# تحدي النقرات (CPS)\n\n## نظرة عامة\nلعبة ممتعة لاختبار سرعة النقر لديك في وقت محدد.\n\n## المميزات\n- ⏱️ **المؤقت**: حدد مدة التحدي.\n- 👆 **الزر**: اضغط بأقصى سرعة!\n- 🏆 **النتيجة**: يحسب معدل النقرات في الثانية تلقائياً.\n- 🚫 **منع الغش**: الزر معطل عندما لا يكون التحدي نشطاً.`
            },
            code: {
                'mishkah-dsl': `// ==========================================
// ⚡ تحدي النقرات (CPS Counter) - Mishkah DSL
// ==========================================

// 1. الحالة (State)
const database = {
  countdown: 0,
  clicks: 0,
  isRunning: false,
  countdownInput: 10,
  cps: null,
  totalTime: 0
};

// 2. الأوامر (Orders)
const orders = {
  'start.challenge': {
    on: ['click'],
    gkeys: ['start-btn'],
    handler: (e, ctx) => {
      const inputEl = document.querySelector('[data-m-gkey="time-input"]');
      const val = inputEl ? parseInt(inputEl.value) : 10;
      
      ctx.setState(s => ({
        ...s,
        countdown: val,
        totalTime: val,
        clicks: 0,
        isRunning: true,
        cps: null
      }));

      const interval = setInterval(() => {
        ctx.setState(s => {
          if (s.countdown <= 1) {
            clearInterval(interval);
            return { ...s, countdown: 0, isRunning: false };
          }
          return { ...s, countdown: s.countdown - 1 };
        });
      }, 1000);
    }
  },

  'register.click': {
    on: ['click'],
    gkeys: ['click-btn'],
    handler: (e, ctx) => {
      ctx.setState(s => {
        if (s.isRunning && s.countdown > 0) {
          return { ...s, clicks: s.clicks + 1 };
        }
        return s;
      });
    }
  },

  'reset.challenge': {
    on: ['click'],
    gkeys: ['reset-btn'],
    handler: (e, ctx) => {
      ctx.setState(s => {
        let cpsValue = null;
        if (s.clicks > 0 && s.totalTime > 0) {
          const timeUsed = s.totalTime - s.countdown;
          cpsValue = timeUsed > 0 ? (s.clicks / timeUsed).toFixed(2) : 0;
        }
        return {
          ...s,
          countdown: 0,
          clicks: 0,
          isRunning: false,
          cps: cpsValue,
          totalTime: 0
        };
      });
    }
  },
  
  'input.change': {
    on: ['input'],
    gkeys: ['time-input'],
    handler: (e, ctx) => {
       const val = parseInt(e.target.value) || 0;
       ctx.setState(s => ({...s, countdownInput: val}));
    }
  }
};

// 3. الواجهة (UI)
function App(db) {
  const D = Mishkah.DSL;
  
  const cardStyle = "background: white; padding: 2rem; border-radius: 1rem; box-shadow: 0 10px 25px rgba(0,0,0,0.1); max-width: 500px; margin: 2rem auto; font-family: 'Segoe UI', sans-serif; text-align: center;";
  const titleStyle = "color: #4f46e5; font-size: 2rem; margin-bottom: 0.5rem; font-weight: bold;";
  const statBoxStyle = "background: #f3f4f6; padding: 1rem; border-radius: 0.5rem; margin: 1rem 0;";
  const btnStyle = "padding: 0.75rem 1.5rem; border: none; border-radius: 0.5rem; font-weight: bold; cursor: pointer; color: white; transition: transform 0.2s;";
  const inputStyle = "padding: 0.5rem; border: 2px solid #e5e7eb; border-radius: 0.5rem; width: 100px; text-align: center; font-size: 1.2rem; margin-left: 0.5rem;";

  return D.Containers.Div({ attrs: { style: cardStyle } }, [
    
    D.Text.H1({ attrs: { style: titleStyle } }, ['⚡ تحدي النقرات']),
    D.Text.P({ attrs: { style: "color: #6b7280; margin-bottom: 2rem;" } }, ['اختبر سرعتك في النقر!']),

    D.Containers.Div({ attrs: { style: "display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;" } }, [
      D.Containers.Div({ attrs: { style: statBoxStyle } }, [
        D.Text.P({ attrs: { style: "color: #6b7280; font-size: 0.9rem;" } }, ['⏱️ الوقت المتبقي']),
        D.Text.H2({ attrs: { style: \`font-size: 2.5rem; margin: 0.5rem 0; color: \${db.countdown <= 3 && db.countdown > 0 ? '#ef4444' : '#10b981'};\` } }, [String(db.countdown)])
      ]),
      D.Containers.Div({ attrs: { style: statBoxStyle } }, [
        D.Text.P({ attrs: { style: "color: #6b7280; font-size: 0.9rem;" } }, ['👆 النقرات']),
        D.Text.H2({ attrs: { style: "font-size: 2.5rem; margin: 0.5rem 0; color: #4f46e5;" } }, [String(db.clicks)])
      ])
    ]),

    D.Containers.Div({ attrs: { style: "margin: 2rem 0;" } }, [
      D.Forms.Label({}, ['⏰ المدة (ثواني): ']),
      D.Inputs.Input({
        attrs: {
          type: 'number',
          value: String(db.countdownInput),
          'data-m-gkey': 'time-input',
          style: inputStyle,
          disabled: db.isRunning
        }
      })
    ]),

    D.Containers.Div({ attrs: { style: "display: grid; gap: 1rem;" } }, [
      D.Forms.Button({
        attrs: {
          'data-m-gkey': 'start-btn',
          style: \`\${btnStyle} background: \${db.isRunning ? '#9ca3af' : '#10b981'}; width: 100%;\`,
          disabled: db.isRunning
        }
      }, ['🚀 ابدأ التحدي']),

      D.Forms.Button({
        attrs: {
          'data-m-gkey': 'click-btn',
          style: \`\${btnStyle} background: \${!db.isRunning ? '#9ca3af' : '#3b82f6'}; width: 100%; transform: scale(\${db.isRunning ? 1 : 0.98});\`,
          disabled: !db.isRunning
        }
      }, ['👆 اضغط هنا بسرعة!']),

      D.Forms.Button({
        attrs: {
          'data-m-gkey': 'reset-btn',
          style: \`\${btnStyle} background: #ef4444; width: 100%;\`
        }
      }, ['🔄 إعادة تعيين'])
    ]),

    db.cps !== null ? D.Containers.Div({ 
      attrs: { style: "margin-top: 2rem; padding: 1rem; border: 2px solid #f59e0b; border-radius: 1rem; background: #fffbeb; animation: fadeIn 0.5s;" } 
    }, [
      D.Text.H3({ attrs: { style: "color: #b45309; margin: 0;" } }, ['🏆 النتيجة النهائية']),
      D.Text.H1({ attrs: { style: "color: #d97706; font-size: 3rem; margin: 0.5rem 0;" } }, [String(db.cps)]),
      D.Text.P({ attrs: { style: "color: #b45309;" } }, ['نقرة / ثانية'])
    ]) : null

  ]);
}

const app = Mishkah.app.createApp(database, orders);
Mishkah.app.setBody(App);
app.mount('#app');`,

                vanilla: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Vanilla JS CPS</title>
  <style>
    body { font-family: 'Segoe UI', sans-serif; display: flex; justify-content: center; min-height: 100vh; background: #f0f0f0; margin: 0; }
    .card { background: white; padding: 2rem; border-radius: 1rem; box-shadow: 0 10px 25px rgba(0,0,0,0.1); max-width: 500px; width: 100%; text-align: center; margin: 2rem; }
    .stats { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin: 1rem 0; }
    .stat-box { background: #f3f4f6; padding: 1rem; border-radius: 0.5rem; }
    .btn { padding: 0.75rem 1.5rem; border: none; border-radius: 0.5rem; font-weight: bold; cursor: pointer; color: white; width: 100%; margin-bottom: 0.5rem; }
    .btn-start { background: #10b981; }
    .btn-click { background: #3b82f6; }
    .btn-reset { background: #ef4444; }
    .btn:disabled { background: #9ca3af; cursor: not-allowed; }
  </style>
</head>
<body>
  <div class="card">
    <h1 style="color: #4f46e5;">⚡ CPS Challenge</h1>
    <div class="stats">
      <div class="stat-box">
        <p>Time</p>
        <h2 id="time" style="font-size: 2.5rem; margin: 0.5rem 0;">10</h2>
      </div>
      <div class="stat-box">
        <p>Clicks</p>
        <h2 id="clicks" style="font-size: 2.5rem; margin: 0.5rem 0; color: #4f46e5;">0</h2>
      </div>
    </div>
    <div style="margin: 1rem 0;">
      <label>Duration: <input type="number" id="duration" value="10" style="padding: 0.5rem; width: 60px;"></label>
    </div>
    <button id="startBtn" class="btn btn-start">🚀 Start</button>
    <button id="clickBtn" class="btn btn-click" disabled>👆 Click Me!</button>
    <button id="resetBtn" class="btn btn-reset">🔄 Reset</button>
    <div id="result" style="display: none; margin-top: 1rem; padding: 1rem; background: #fffbeb; border-radius: 0.5rem;">
      <h3>Score</h3>
      <h1 id="cps" style="color: #d97706;">0</h1>
      <p>CPS</p>
    </div>
  </div>
  <script>
    let clicks = 0;
    let timeLeft = 0;
    let isRunning = false;
    let interval;
    let totalTime = 10;

    const timeEl = document.getElementById('time');
    const clicksEl = document.getElementById('clicks');
    const startBtn = document.getElementById('startBtn');
    const clickBtn = document.getElementById('clickBtn');
    const resetBtn = document.getElementById('resetBtn');
    const durationInput = document.getElementById('duration');
    const resultEl = document.getElementById('result');
    const cpsEl = document.getElementById('cps');

    startBtn.onclick = () => {
      totalTime = parseInt(durationInput.value) || 10;
      timeLeft = totalTime;
      clicks = 0;
      isRunning = true;
      
      timeEl.textContent = timeLeft;
      clicksEl.textContent = clicks;
      resultEl.style.display = 'none';
      
      startBtn.disabled = true;
      clickBtn.disabled = false;
      durationInput.disabled = true;

      interval = setInterval(() => {
        timeLeft--;
        timeEl.textContent = timeLeft;
        if (timeLeft <= 0) {
          endGame();
        }
      }, 1000);
    };

    clickBtn.onclick = () => {
      if (isRunning) {
        clicks++;
        clicksEl.textContent = clicks;
      }
    };

    resetBtn.onclick = () => {
      clearInterval(interval);
      isRunning = false;
      timeLeft = 0;
      clicks = 0;
      timeEl.textContent = 0;
      clicksEl.textContent = 0;
      startBtn.disabled = false;
      clickBtn.disabled = true;
      durationInput.disabled = false;
      resultEl.style.display = 'none';
    };

    function endGame() {
      clearInterval(interval);
      isRunning = false;
      clickBtn.disabled = true;
      startBtn.disabled = false;
      durationInput.disabled = false;
      
      const cps = (clicks / totalTime).toFixed(2);
      cpsEl.textContent = cps;
      resultEl.style.display = 'block';
    }
  </script>
</body>
</html>`,

                jquery: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>jQuery CPS</title>
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
  <style>
    body { font-family: 'Segoe UI', sans-serif; display: flex; justify-content: center; min-height: 100vh; background: #f0f0f0; margin: 0; }
    .card { background: white; padding: 2rem; border-radius: 1rem; box-shadow: 0 10px 25px rgba(0,0,0,0.1); max-width: 500px; width: 100%; text-align: center; margin: 2rem; }
    .stats { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin: 1rem 0; }
    .stat-box { background: #f3f4f6; padding: 1rem; border-radius: 0.5rem; }
    .btn { padding: 0.75rem 1.5rem; border: none; border-radius: 0.5rem; font-weight: bold; cursor: pointer; color: white; width: 100%; margin-bottom: 0.5rem; }
    .btn-start { background: #10b981; }
    .btn-click { background: #3b82f6; }
    .btn-reset { background: #ef4444; }
    .btn:disabled { background: #9ca3af; cursor: not-allowed; }
  </style>
</head>
<body>
  <div class="card">
    <h1 style="color: #4f46e5;">⚡ jQuery CPS</h1>
    <div class="stats">
      <div class="stat-box">
        <p>Time</p>
        <h2 id="time">10</h2>
      </div>
      <div class="stat-box">
        <p>Clicks</p>
        <h2 id="clicks" style="color: #4f46e5;">0</h2>
      </div>
    </div>
    <div style="margin: 1rem 0;">
      <label>Duration: <input type="number" id="duration" value="10" style="padding: 0.5rem; width: 60px;"></label>
    </div>
    <button id="startBtn" class="btn btn-start">🚀 Start</button>
    <button id="clickBtn" class="btn btn-click" disabled>👆 Click Me!</button>
    <button id="resetBtn" class="btn btn-reset">🔄 Reset</button>
    <div id="result" style="display: none; margin-top: 1rem; padding: 1rem; background: #fffbeb; border-radius: 0.5rem;">
      <h3>Score</h3>
      <h1 id="cps" style="color: #d97706;">0</h1>
    </div>
  </div>
  <script>
    $(document).ready(function() {
      let clicks = 0;
      let timeLeft = 0;
      let isRunning = false;
      let interval;
      let totalTime = 10;

      $('#startBtn').click(function() {
        totalTime = parseInt($('#duration').val()) || 10;
        timeLeft = totalTime;
        clicks = 0;
        isRunning = true;
        
        $('#time').text(timeLeft);
        $('#clicks').text(clicks);
        $('#result').hide();
        
        $(this).prop('disabled', true);
        $('#clickBtn').prop('disabled', false);
        $('#duration').prop('disabled', true);

        interval = setInterval(() => {
          timeLeft--;
          $('#time').text(timeLeft);
          if (timeLeft <= 0) {
            clearInterval(interval);
            isRunning = false;
            $('#clickBtn').prop('disabled', true);
            $('#startBtn').prop('disabled', false);
            $('#duration').prop('disabled', false);
            
            const cps = (clicks / totalTime).toFixed(2);
            $('#cps').text(cps);
            $('#result').show();
          }
        }, 1000);
      });

      $('#clickBtn').click(function() {
        if (isRunning) {
          clicks++;
          $('#clicks').text(clicks);
        }
      });

      $('#resetBtn').click(function() {
        clearInterval(interval);
        isRunning = false;
        clicks = 0;
        $('#time').text(0);
        $('#clicks').text(0);
        $('#startBtn').prop('disabled', false);
        $('#clickBtn').prop('disabled', true);
        $('#duration').prop('disabled', false);
        $('#result').hide();
      });
    });
  </script>
</body>
</html>`,

                vue: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Vue CPS</title>
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  <style>
    body { font-family: 'Segoe UI', sans-serif; display: flex; justify-content: center; min-height: 100vh; background: #f0f0f0; margin: 0; }
    .card { background: white; padding: 2rem; border-radius: 1rem; box-shadow: 0 10px 25px rgba(0,0,0,0.1); max-width: 500px; width: 100%; text-align: center; margin: 2rem; }
    .stats { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin: 1rem 0; }
    .stat-box { background: #f3f4f6; padding: 1rem; border-radius: 0.5rem; }
    .btn { padding: 0.75rem 1.5rem; border: none; border-radius: 0.5rem; font-weight: bold; cursor: pointer; color: white; width: 100%; margin-bottom: 0.5rem; }
    .btn-start { background: #10b981; }
    .btn-click { background: #3b82f6; }
    .btn-reset { background: #ef4444; }
    .btn:disabled { background: #9ca3af; cursor: not-allowed; }
  </style>
</head>
<body>
  <div id="app">
    <div class="card">
      <h1 style="color: #42b983;">⚡ Vue CPS</h1>
      <div class="stats">
        <div class="stat-box">
          <p>Time</p>
          <h2 style="font-size: 2.5rem; margin: 0.5rem 0;">{{ timeLeft }}</h2>
        </div>
        <div class="stat-box">
          <p>Clicks</p>
          <h2 style="font-size: 2.5rem; margin: 0.5rem 0; color: #42b983;">{{ clicks }}</h2>
        </div>
      </div>
      <div style="margin: 1rem 0;">
        <label>Duration: <input type="number" v-model="duration" :disabled="isRunning" style="padding: 0.5rem; width: 60px;"></label>
      </div>
      <button @click="start" :disabled="isRunning" class="btn btn-start">🚀 Start</button>
      <button @click="click" :disabled="!isRunning" class="btn btn-click">👆 Click Me!</button>
      <button @click="reset" class="btn btn-reset">🔄 Reset</button>
      <div v-if="cps !== null" style="margin-top: 1rem; padding: 1rem; background: #fffbeb; border-radius: 0.5rem;">
        <h3>Score</h3>
        <h1 style="color: #d97706;">{{ cps }}</h1>
      </div>
    </div>
  </div>
  <script>
    const { createApp, ref } = Vue;
    createApp({
      setup() {
        const clicks = ref(0);
        const timeLeft = ref(10);
        const duration = ref(10);
        const isRunning = ref(false);
        const cps = ref(null);
        let interval;

        const start = () => {
          clicks.value = 0;
          timeLeft.value = duration.value;
          isRunning.value = true;
          cps.value = null;
          
          interval = setInterval(() => {
            timeLeft.value--;
            if (timeLeft.value <= 0) {
              clearInterval(interval);
              isRunning.value = false;
              cps.value = (clicks.value / duration.value).toFixed(2);
            }
          }, 1000);
        };

        const click = () => {
          if (isRunning.value) clicks.value++;
        };

        const reset = () => {
          clearInterval(interval);
          isRunning.value = false;
          clicks.value = 0;
          timeLeft.value = 0;
          cps.value = null;
        };

        return { clicks, timeLeft, duration, isRunning, cps, start, click, reset };
      }
    }).mount('#app');
  </script>
</body>
</html>`,

                react: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>React CPS</title>
  <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <style>
    body { font-family: 'Segoe UI', sans-serif; display: flex; justify-content: center; min-height: 100vh; background: #f0f0f0; margin: 0; }
    .card { background: white; padding: 2rem; border-radius: 1rem; box-shadow: 0 10px 25px rgba(0,0,0,0.1); max-width: 500px; width: 100%; text-align: center; margin: 2rem; }
    .stats { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin: 1rem 0; }
    .stat-box { background: #f3f4f6; padding: 1rem; border-radius: 0.5rem; }
    .btn { padding: 0.75rem 1.5rem; border: none; border-radius: 0.5rem; font-weight: bold; cursor: pointer; color: white; width: 100%; margin-bottom: 0.5rem; }
    .btn-start { background: #10b981; }
    .btn-click { background: #3b82f6; }
    .btn-reset { background: #ef4444; }
    .btn:disabled { background: #9ca3af; cursor: not-allowed; }
  </style>
</head>
<body>
  <div id="root"></div>
  <script type="text/babel">
    function App() {
      const [clicks, setClicks] = React.useState(0);
      const [timeLeft, setTimeLeft] = React.useState(10);
      const [duration, setDuration] = React.useState(10);
      const [isRunning, setIsRunning] = React.useState(false);
      const [cps, setCps] = React.useState(null);
      const intervalRef = React.useRef(null);

      const start = () => {
        setClicks(0);
        setTimeLeft(duration);
        setIsRunning(true);
        setCps(null);
        
        intervalRef.current = setInterval(() => {
          setTimeLeft(prev => {
            if (prev <= 1) {
              clearInterval(intervalRef.current);
              setIsRunning(false);
              setCps((clicks / duration).toFixed(2)); // Note: clicks here is stale, logic simplified for demo
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      };
      
      // Fix for stale closure in interval
      React.useEffect(() => {
        if (!isRunning && clicks > 0 && timeLeft === 0) {
           setCps((clicks / duration).toFixed(2));
        }
      }, [isRunning, timeLeft]);

      const click = () => {
        if (isRunning) setClicks(c => c + 1);
      };

      const reset = () => {
        clearInterval(intervalRef.current);
        setIsRunning(false);
        setClicks(0);
        setTimeLeft(0);
        setCps(null);
      };

      return (
        <div className="card">
          <h1 style={{color: '#61dafb'}}>⚡ React CPS</h1>
          <div className="stats">
            <div className="stat-box">
              <p>Time</p>
              <h2 style={{fontSize: '2.5rem', margin: '0.5rem 0'}}>{timeLeft}</h2>
            </div>
            <div className="stat-box">
              <p>Clicks</p>
              <h2 style={{fontSize: '2.5rem', margin: '0.5rem 0', color: '#61dafb'}}>{clicks}</h2>
            </div>
          </div>
          <div style={{margin: '1rem 0'}}>
            <label>Duration: <input type="number" value={duration} onChange={e => setDuration(Number(e.target.value))} disabled={isRunning} style={{padding: '0.5rem', width: '60px'}} /></label>
          </div>
          <button onClick={start} disabled={isRunning} className="btn btn-start">🚀 Start</button>
          <button onClick={click} disabled={!isRunning} className="btn btn-click">👆 Click Me!</button>
          <button onClick={reset} className="btn btn-reset">🔄 Reset</button>
          {cps !== null && (
            <div style={{marginTop: '1rem', padding: '1rem', background: '#fffbeb', borderRadius: '0.5rem'}}>
              <h3>Score</h3>
              <h1 style={{color: '#d97706'}}>{cps}</h1>
            </div>
          )}
        </div>
      );
    }
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(<App />);
  </script>
</body>
</html>`,

                'mishkah-htmlx': `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <script src="../lib/mishkah.js" data-htmlx data-ui></script>
  <style>
    body { font-family: 'Segoe UI'; display: flex; justify-content: center; min-height: 100vh; background: #f0f0f0; }
    .card { background: white; padding: 2rem; border-radius: 1rem; box-shadow: 0 10px 25px rgba(0,0,0,0.1); max-width: 500px; width: 100%; text-align: center; margin: 2rem; }
    .btn { padding: 0.75rem 1.5rem; border: none; border-radius: 0.5rem; font-weight: bold; cursor: pointer; color: white; width: 100%; margin-bottom: 0.5rem; }
  </style>
</head>
<body>
  <div id="app"></div>
  <template id="main">
    <script type="application/json" data-m-path="data">
      {"clicks": 0, "time": 10, "running": false, "cps": null}
    </script>
    <div class="card">
      <h1>⚡ HTMLx CPS</h1>
      <h2>Time: {state.data.time} | Clicks: {state.data.clicks}</h2>
      <button onclick="start(event, ctx)" class="btn" style="background: #10b981;">Start</button>
      <button onclick="click(event, ctx)" class="btn" style="background: #3b82f6;">Click!</button>
      <div data-m-if="state.data.cps">Score: {state.data.cps}</div>
    </div>
    <script>
      function start(e, ctx) {
        ctx.setState(s => ({...s, running: true, clicks: 0, time: 10}));
        let t = 10;
        const i = setInterval(() => {
          t--;
          ctx.setState(s => ({...s, time: t}));
          if(t<=0) {
            clearInterval(i);
            ctx.setState(s => ({...s, running: false, cps: (s.data.clicks/10).toFixed(2)}));
          }
        }, 1000);
      }
      function click(e, ctx) {
        ctx.setState(s => { if(s.data.running) s.data.clicks++; return s; });
      }
    </script>
  </template>
</body>
</html>`
            }
        }
    ];

    // Framework mapping
    window.FRAMEWORKS = {
        vanilla: { name: { en: 'Vanilla JS', ar: 'JavaScript النقي' }, lang: 'html' },
        jquery: { name: { en: 'jQuery', ar: 'jQuery' }, lang: 'html' },
        vue: { name: { en: 'Vue.js', ar: 'Vue.js' }, lang: 'html' },
        react: { name: { en: 'React', ar: 'React' }, lang: 'html' },
        'mishkah-dsl': { name: { en: 'Mishkah DSL', ar: 'Mishkah DSL' }, lang: 'javascript' },
        'mishkah-htmlx': { name: { en: 'Mishkah HTMLx', ar: 'Mishkah HTMLx' }, lang: 'html' }
    };

    console.log('✅ Examples loaded:', window.EXAMPLES.length, 'examples');
})();
