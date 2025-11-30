'use strict';

// Wait for all dependencies to load
function initMishkahLab() {
    if (!window.Mishkah || !window.Mishkah.app || !window.Mishkah.UI || !window.Mishkah.UI.CodeMirror || !window.EXAMPLES) {
        setTimeout(initMishkahLab, 50);
        return;
    }
    startApp();
}

function startApp() {
    const M = window.Mishkah;
    const D = M.DSL;
    const MDB = window.MishkahIndexedDB;
    const EXAMPLES = window.EXAMPLES;
    const FRAMEWORKS = window.FRAMEWORKS;
    // Initialize IndexedDB
    const dbAdapter = MDB.createAdapter({
        dbName: 'mishkah-lab',
        version: 1,
        fallback: 'memory' // لو IndexedDB مش متاح
    });
    // ============================================================
    // 1. i18n Dictionary
    // ============================================================
    const I18N_DICT = {
        'app.title': { ar: 'مختبر مشكاة', en: 'Mishkah Lab' },
        'examples': { ar: 'الأمثلة', en: 'Examples' },
        'frameworks': { ar: 'الأطر', en: 'Frameworks' },
        'readme': { ar: 'الشرح', en: 'README' },
        'code': { ar: 'الكود', en: 'Code' },
        'preview': { ar: 'المعاينة', en: 'Preview' },
        'run': { ar: 'تشغيل', en: 'Run' },
        'add_example': { ar: 'إضافة مثال', en: 'Add Example' },
        'edit_example': { ar: 'تعديل مثال', en: 'Edit Example' },
        'delete_example': { ar: 'حذف مثال', en: 'Delete Example' },
        'download_json': { ar: 'تصدير JSON', en: 'Download JSON' },
        'import_json': { ar: 'استيراد JSON', en: 'Import JSON' },
        'example_title': { ar: 'عنوان المثال', en: 'Example Title' },
        'example_description': { ar: 'الوصف', en: 'Description' },
        'save': { ar: 'حفظ', en: 'Save' },
        'cancel': { ar: 'إلغاء', en: 'Cancel' }
    };

    // ============================================================
    // 2. Initial State
    // ============================================================
    const database = {
        env: {
            theme: localStorage.getItem('theme') || 'dark',
            lang: localStorage.getItem('lang') || 'ar',
            dir: localStorage.getItem('lang') === 'en' ? 'ltr' : 'rtl'
        },
        i18n: {
            dict: I18N_DICT
        },
        activeExample: 'counter',
        activeFramework: 'vanilla',
        code: EXAMPLES[0].code.vanilla,
        previewSrc: EXAMPLES[0].code.vanilla,
        showReadme: false
    };

    // ============================================================
    // 3. Helper Functions
    // ============================================================

    function t(key, db) {
        return db.i18n?.dict[key]?.[db.env.lang] || key;
    }

    function generatePreview(framework, code) {
        if (framework === 'mishkah-dsl') {
            return `<!DOCTYPE html>
<html>
<head>
    <script src="../lib/mishkah.js" data-ui></script>
    <link rel="stylesheet" href="https://cdn.tailwindcss.com">
</head>
<body>
    <div id="app"></div>
    <script>
        window.addEventListener('load', function() {
            try {
                ${code}
            } catch(e) {
                document.body.innerHTML += '<pre style="color:red">' + e.toString() + '</pre>';
            }
        });
    </script>
</body>
</html>`;
        }
        return code;
    }

    // ============================================================
    // 4. Event Handlers
    // ============================================================
    const orders = {
        'example.add': {
            on: ['click'],
            gkeys: ['add-example-btn'],
            handler: (e, ctx) => {
                ctx.setState(s => ({ ...s, showModal: true, modalMode: 'add' }));
            }
        },

        'example.edit': {
            on: ['click'],
            gkeys: ['edit-example-btn'],
            handler: (e, ctx) => {
                ctx.setState(s => ({ ...s, showModal: true, modalMode: 'edit' }));
            }
        },

        'modal.close': {
            on: ['click'],
            gkeys: ['close-modal-btn'],
            handler: (e, ctx) => {
                ctx.setState(s => ({ ...s, showModal: false }));
            }
        },

        'example.save': {
            on: ['click'],
            gkeys: ['save-example-btn'],
            handler: async (e, ctx) => {
                const formData = {
                    id: Date.now().toString(),
                    title: {
                        ar: document.getElementById('title-ar').value,
                        en: document.getElementById('title-en').value
                    },
                    description: {
                        ar: document.getElementById('desc-ar').value,
                        en: document.getElementById('desc-en').value
                    },
                    readme: {
                        ar: document.getElementById('readme-ar').value,
                        en: document.getElementById('readme-en').value
                    },
                    code: {
                        vanilla: document.getElementById('code-vanilla').value,
                        jquery: document.getElementById('code-jquery').value,
                        vue: document.getElementById('code-vue').value,
                        react: document.getElementById('code-react').value,
                        'mishkah-dsl': document.getElementById('code-mishkah-dsl').value,
                        'mishkah-htmlx': document.getElementById('code-mishkah-htmlx').value
                    }
                };

                // Save to IndexedDB
                await dbAdapter.save('examples', formData);

                // Reload examples
                const saved = await dbAdapter.load('examples');
                const allExamples = [...EXAMPLES, ...(saved?.data || [])];

                ctx.setState(s => ({
                    ...s,
                    showModal: false,
                    examples: allExamples
                }));
            }
        },

        'json.download': {
            on: ['click'],
            gkeys: ['download-json-btn'],
            handler: async (e, ctx) => {
                const saved = await dbAdapter.load('examples');
                const jsonData = JSON.stringify(saved?.data || [], null, 2);
                const blob = new Blob([jsonData], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'mishk ah-lab-examples.json';
                a.click();
                URL.revokeObjectURL(url);
            }
        },

        'json.import': {
            on: ['click'],
            gkeys: ['import-json-btn'],
            handler: (e, ctx) => {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = '.json';
                input.onchange = async (e) => {
                    const file = e.target.files[0];
                    const text = await file.text();
                    const data = JSON.parse(text);
                    await dbAdapter.save('examples', data);
                    const allExamples = [...EXAMPLES, ...data];
                    ctx.setState(s => ({ ...s, examples: allExamples }));
                };
                input.click();
            }
        },
        'example.switch': {
            on: ['click'],
            gkeys: ['ex-btn'],
            handler: (e, ctx) => {
                const exampleId = e.target.closest('button').dataset.exampleId;
                const example = EXAMPLES.find(ex => ex.id === exampleId);
                if (!example) return;

                const framework = ctx.getState().activeFramework;
                const code = example.code[framework] || '';

                ctx.setState(s => ({
                    ...s,
                    activeExample: exampleId,
                    code: code,
                    previewSrc: generatePreview(framework, code),
                    showReadme: false
                }));

                // Recreate CodeMirror with new code

            }
        },

        'framework.switch': {
            on: ['click'],
            gkeys: ['fw-btn'],
            handler: (e, ctx) => {
                const framework = e.target.closest('button').dataset.framework;
                const exampleId = ctx.getState().activeExample;
                const example = EXAMPLES.find(ex => ex.id === exampleId);
                if (!example) return;

                const code = example.code[framework] || '';
                const lang = FRAMEWORKS[framework]?.lang || 'html';

                ctx.setState(s => ({
                    ...s,
                    activeFramework: framework,
                    code: code,
                    previewSrc: generatePreview(framework, code)
                }));
                setTimeout(() => {
                    const container = document.getElementById('editor');
                    if (container) {
                        //  container.innerHTML = '';
                        M.UI.CodeMirror({
                            id: 'editor',
                            value: code,
                            lang: lang,
                            theme: 'dracula',
                            height: '100%',
                            style: 'height: -webkit-fill-available;'
                        });
                    }
                }, 100);
            }
        },

        'code.run': {
            on: ['click'],
            gkeys: ['run-btn'],
            handler: (e, ctx) => {
                const state = ctx.getState();

                // Get current code from CodeMirror instance
                const editorInstance = M.UI.CodeMirror.getInstance('editor');
                const currentCode = editorInstance ? editorInstance.getValue() : state.code;

                // Update state with current code AND preview
                const preview = generatePreview(state.activeFramework, currentCode);
                ctx.setState(s => ({
                    ...s,
                    code: currentCode,  // ← Save current code to state
                    previewSrc: preview
                }));
            }
        },
        'readme.toggle': {
            on: ['click'],
            gkeys: ['readme-btn'],
            handler: (e, ctx) => {
                const currentState = ctx.getState();
                const newShowReadme = !currentState.showReadme;

                ctx.setState(s => ({ ...s, showReadme: newShowReadme }));
                console.log("newShowReadme", newShowReadme);
                // Update innerHTML after re-render
                if (newShowReadme) {
                    setTimeout(() => {
                        const viewer = document.getElementById('readme-viewer');
                        if (viewer) {
                            const example = EXAMPLES.find(ex => ex.id === currentState.activeExample);
                            const readme = example?.readme[currentState.env.lang] || '';
                            viewer.innerHTML = marked?.parse ? marked.parse(readme) : `<pre>${readme}</pre>`;
                        }
                    }, 100);
                }
            }
        },

        'theme.switch': {
            on: ['click'],
            gkeys: ['theme-btn'],
            handler: (e, ctx) => {
                const state = ctx.getState();
                const newTheme = state.env.theme === 'dark' ? 'light' : 'dark';
                document.documentElement.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);
                ctx.setState(s => ({
                    ...s,
                    env: { ...s.env, theme: newTheme }
                }));
            }
        },

        'lang.switch': {
            on: ['click'],
            gkeys: ['lang-btn'],
            handler: (e, ctx) => {
                const state = ctx.getState();
                const newLang = state.env.lang === 'ar' ? 'en' : 'ar';
                const newDir = newLang === 'ar' ? 'rtl' : 'ltr';
                document.documentElement.setAttribute('lang', newLang);
                document.documentElement.setAttribute('dir', newDir);
                localStorage.setItem('lang', newLang);
                ctx.setState(s => ({
                    ...s,
                    env: { ...s.env, lang: newLang, dir: newDir }
                }));
            }
        }
    };

    // ============================================================
    // 5. UI Components
    // ============================================================

    function Sidebar(db) {
        return D.Containers.Div({
            attrs: {
                class: 'w-64 flex-shrink-0 overflow-auto',
                style: 'background: var(--card); border-right: 1px solid var(--border); height: 100vh;'
            }
        }, [
            D.Containers.Div({
                attrs: {
                    class: 'p-4',
                    style: 'background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%); color: white;'
                }
            }, [
                D.Text.H1({
                    attrs: { class: 'text-2xl font-bold' }
                }, [t('app.title', db)])
            ]),

            D.Containers.Div({
                attrs: { class: 'p-4' }
            }, [
                D.Text.H2({
                    attrs: {
                        class: 'text-sm font-bold mb-2 uppercase',
                        style: 'color: var(--muted-foreground);'
                    }
                }, [t('examples', db)]),
                ...EXAMPLES.map(example => {
                    const isActive = example.id === db.activeExample;
                    return D.Forms.Button({
                        attrs: {
                            'data-m-gkey': 'ex-btn',
                            'data-example-id': example.id,
                            class: `w-full text-left px-3 py-2 rounded mb-1 transition-colors ${isActive ? 'font-bold' : ''}`,
                            style: isActive
                                ? 'background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%); color: white;'
                                : 'background: var(--muted); color: var(--foreground);'
                        }
                    }, [example.title[db.env.lang]]);
                })
            ]),

            D.Containers.Div({
                attrs: { class: 'p-4' }
            }, [
                D.Text.H2({
                    attrs: {
                        class: 'text-sm font-bold mb-2 uppercase',
                        style: 'color: var(--muted-foreground);'
                    }
                }, [t('frameworks', db)]),
                ...Object.keys(FRAMEWORKS).map(fw => {
                    const isActive = fw === db.activeFramework;
                    return D.Forms.Button({
                        attrs: {
                            'data-m-gkey': 'fw-btn',
                            'data-framework': fw,
                            class: `w-full text-left px-3 py-2 rounded mb-1 transition-colors ${isActive ? 'font-bold' : ''}`,
                            style: isActive
                                ? 'background: var(--primary); color: white;'
                                : 'background: transparent; color: var(--foreground);'
                        }
                    }, [FRAMEWORKS[fw].name[db.env.lang]]);
                })
            ]),// بعد frameworks section
            D.Containers.Div({
                attrs: {
                    class: 'p-4',
                    style: 'border-top: 1px solid var(--border);'
                }
            }, [
                D.Text.H2({
                    attrs: {
                        class: 'text-sm font-bold mb-2 uppercase',
                        style: 'color: var(--muted-foreground);'
                    }
                }, [t('examples', db) + ' ' + (db.env.lang === 'ar' ? 'الإدارة' : 'Management')]),

                D.Forms.Button({
                    attrs: {
                        'data-m-gkey': 'add-example-btn',
                        class: 'w-full px-3 py-2 mb-2 rounded font-bold text-white',
                        style: 'background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);'
                    }
                }, ['➕ ' + t('add_example', db)]),

                D.Forms.Button({
                    attrs: {
                        'data-m-gkey': 'edit-example-btn',
                        class: 'w-full px-3 py-2 mb-2 rounded',
                        style: 'background: var(--muted); color: var(--foreground);'
                    }
                }, ['✏️ ' + t('edit_example', db)]),

                D.Forms.Button({
                    attrs: {
                        'data-m-gkey': 'download-json-btn',
                        class: 'w-full px-3 py-2 mb-2 rounded',
                        style: 'background: var(--muted); color: var(--foreground);'
                    }
                }, ['⬇️ ' + t('download_json', db)]),

                D.Forms.Button({
                    attrs: {
                        'data-m-gkey': 'import-json-btn',
                        class: 'w-full px-3 py-2 rounded',
                        style: 'background: var(--muted); color: var(--foreground);'
                    }
                }, ['⬆️ ' + t('import_json', db)])
            ]),

            D.Containers.Div({
                attrs: {
                    class: 'p-4',
                    style: 'border-top: 1px solid var(--border);'
                }
            }, [
                D.Forms.Button({
                    attrs: {
                        'data-m-gkey': 'theme-btn',
                        class: 'w-full px-3 py-2 rounded mb-2 font-medium',
                        style: 'background: var(--muted); color: var(--foreground);'
                    }
                }, [db.env.theme === 'dark' ? '☀️ ' + (db.env.lang === 'ar' ? 'فاتح' : 'Light') : '🌙 ' + (db.env.lang === 'ar' ? 'داكن' : 'Dark')]),
                D.Forms.Button({
                    attrs: {
                        'data-m-gkey': 'lang-btn',
                        class: 'w-full px-3 py-2 rounded font-medium',
                        style: 'background: var(--muted); color: var(--foreground);'
                    }
                }, [db.env.lang === 'ar' ? '🌐 English' : '🌐 عربي'])
            ])
        ]);
    }

    function Toolbar(db) {
        return D.Containers.Div({
            attrs: {
                class: 'flex items-center justify-between px-4 py-2',
                style: 'background: var(--card); border-bottom: 1px solid var(--border); height: 3.5rem;'
            }
        }, [
            D.Text.H2({
                attrs: {
                    class: 'text-lg font-bold',
                    style: 'color: var(--foreground);'
                }
            }, [
                EXAMPLES.find(ex => ex.id === db.activeExample)?.title[db.env.lang] || ''
            ]),
            D.Containers.Div({
                attrs: { class: 'flex gap-2' }
            }, [
                D.Forms.Button({
                    attrs: {
                        'data-m-gkey': 'readme-btn',
                        class: 'px-4 py-2 rounded font-medium transition-colors',
                        style: db.showReadme
                            ? 'background: var(--accent); color: white;'
                            : 'background: var(--muted); color: var(--foreground);'
                    }
                }, [t('readme', db)]),
                D.Forms.Button({
                    attrs: {
                        'data-m-gkey': 'run-btn',
                        class: 'px-6 py-2 rounded font-bold text-white transition-all',
                        style: 'background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);'
                    }
                }, ['▶ ' + t('run', db)])
            ])
        ]);
    }

    function EditorPane(db) {
        return D.Containers.Div({
            attrs: {
                class: 'flex-1 overflow-auto',
                style: 'height: calc(100vh - 3.5rem);'
            }
        }, [
            M.UI.CodeMirror({
                id: 'editor',
                value: db.code,
                lang: FRAMEWORKS[db.activeFramework]?.lang || 'html',
                theme: 'dracula',
                height: '100%',
                style: 'height: -webkit-fill-available;'
            })
        ]);
    }

    function PreviewPane(db) {
        console.log("db", db);
        // If README is shown, display it here instead of preview
        console.log("db.showReadme", db.showReadme);
        if (db.showReadme) {
            //  const example = EXAMPLES.find(ex => ex.id === db.activeExample);
            // const readme = example?.readme[db.env.lang] || '';
            //  const htmlContent = marked?.parse ? marked.parse(readme) : `<pre>${readme}</pre>`;

            return D.Containers.Div({
                attrs: {
                    class: 'flex-1 overflow-auto p-8',
                    style: 'height: calc(100vh - 3.5rem); background: var(--background); border-left: 1px solid var(--border);'
                }
            }, [
                D.Containers.Div({
                    attrs: {
                        id: "readme-viewer",
                        key: "readme",
                        class: 'prose max-w-4xl mx-auto',
                        style: 'color: var(--foreground);'
                    }
                })
            ]);
        }

        // Otherwise show preview iframe
        return D.Containers.Div({
            attrs: {
                class: 'flex-1 overflow-auto',
                style: 'height: calc(100vh - 3.5rem); background: white; border-left: 1px solid var(--border);'
            }
        }, [
            D.Media.Iframe({
                attrs: {
                    srcdoc: db.previewSrc,
                    class: 'w-full border-none',
                    style: 'min-height: 100%; height: 100%;',
                    sandbox: 'allow-scripts allow-modals allow-same-origin'
                }
            })
        ]);
    }

    function MainLayout(db) {
        return D.Containers.Div({
            attrs: {
                class: 'flex w-screen overflow-hidden',
                style: 'height: 100vh; background: var(--background);'
            }
        }, [
            Sidebar(db),
            D.Containers.Div({
                attrs: { class: 'flex-1 flex flex-col min-w-0' }
            }, [
                Toolbar(db),
                D.Containers.Div({
                    attrs: { class: 'flex-1 flex' }
                }, [
                    EditorPane(db),
                    PreviewPane(db)
                ])
            ])
        ]);
    }

    // ============================================================
    // 6. Mount App
    // ============================================================
    const app = M.app.createApp(database, orders);
    M.app.setBody(MainLayout);
    app.mount('#app');

    console.log('✅ Mishkah Lab started successfully');
}

// Start initialization
initMishkahLab();
