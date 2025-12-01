(function (window) {
    window.codewikidb = [
        {
            id: 'react',
            title: { en: 'React', ar: 'رياكت' },
            keywords: ['react', 'jsx', 'component', 'library', 'ui'],
            content: {
                en: 'React is a JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called "components".',
                ar: 'React هي مكتبة جافا سكريبت لبناء واجهات المستخدم. تسمح لك بتكوين واجهات معقدة من قطع صغيرة ومنعزلة من الكود تسمى "المكونات".'
            },
            words: [
                { "JavaScript": "javascript" },
                { "components": "react-component" },
                { "library": "library" }
            ],
            parents_ids: [],
            siblings: [],
            sort: 1
        },
        {
            id: 'react-hooks',
            title: { en: 'Hooks', ar: 'الخطافات (Hooks)' },
            keywords: ['hook', 'hooks', 'functional component'],
            content: {
                en: 'Hooks are functions that let you "hook into" React state and lifecycle features from function components.',
                ar: 'الخطافات (Hooks) هي دوال تسمح لك "بالتعلق" بميزات الحالة ودورة الحياة في React من داخل مكونات الدوال.'
            },
            words: [
                { "React": "react" },
                { "state": "state" },
                { "lifecycle": "lifecycle" }
            ],
            parents_ids: ['react'],
            siblings: [
                { id: 'react-component', title: { en: 'Components', ar: 'المكونات' } }
            ],
            sort: 1
        },
        {
            id: 'react-usestate',
            title: { en: 'useState', ar: 'useState' },
            keywords: ['useState', 'state', 'hook'],
            content: {
                en: 'useState is a Hook that lets you add React state to function components.',
                ar: 'useState هو Hook يسمح لك بإضافة حالة React إلى مكونات الدوال.'
            },
            words: [
                { "React": "react" },
                { "Hook": "react-hooks" },
                { "function components": "react-component" }
            ],
            parents_ids: ['react', 'react-hooks'],
            siblings: [
                { id: 'react-useeffect', title: { en: 'useEffect', ar: 'useEffect' } }
            ],
            sort: 2
        },
        {
            id: 'react-useeffect',
            title: { en: 'useEffect', ar: 'useEffect' },
            keywords: ['useEffect', 'effect', 'lifecycle'],
            content: {
                en: 'useEffect is a Hook in React that lets you perform side effects in function components.',
                ar: 'useEffect هو Hook في React يسمح لك بتنفيذ التأثيرات الجانبية في مكونات الدوال.'
            },
            words: [
                { "React": "react" },
                { "Hook": "react-hooks" },
                { "side effects": "side-effects" }
            ],
            parents_ids: ['react', 'react-hooks'],
            siblings: [
                { id: 'react-usestate', title: { en: 'useState', ar: 'useState' } }
            ],
            sort: 3
        },
        {
            id: 'vue',
            title: { en: 'Vue.js', ar: 'Vue.js' },
            keywords: ['vue', 'template', 'directive', 'framework'],
            content: {
                en: 'Vue.js is a progressive JavaScript framework for building user interfaces.',
                ar: 'Vue.js هو إطار عمل جافا سكريبت تقدمي لبناء واجهات المستخدم.'
            },
            words: [
                { "JavaScript": "javascript" },
                { "framework": "framework" }
            ],
            parents_ids: [],
            siblings: [
                { id: 'react', title: { en: 'React', ar: 'رياكت' } },
                { id: 'jquery', title: { en: 'jQuery', ar: 'jQuery' } }
            ],
            sort: 2
        },
        {
            id: 'jquery',
            title: { en: 'jQuery', ar: 'jQuery' },
            keywords: ['jquery', '$', 'selector', 'dom'],
            content: {
                en: 'jQuery is a fast, small, and feature-rich JavaScript library. It makes things like HTML document traversal and manipulation much simpler.',
                ar: 'jQuery هي مكتبة جافا سكريبت سريعة وصغيرة وغنية بالميزات. تجعل أشياء مثل اجتياز مستند HTML ومعالجته أسهل بكثير.'
            },
            words: [
                { "JavaScript": "javascript" },
                { "HTML": "html" }
            ],
            parents_ids: [],
            siblings: [
                { id: 'react', title: { en: 'React', ar: 'رياكت' } },
                { id: 'vue', title: { en: 'Vue.js', ar: 'Vue.js' } }
            ],
            sort: 3
        }
    ];
})(window);
