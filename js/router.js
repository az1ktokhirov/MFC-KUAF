// Hash-based Router
class Router {
    constructor() {
        this.routes = {};
        this.currentPage = null;
        this.init();
    }

    init() {
        window.addEventListener('hashchange', () => this.handleRoute());
        window.addEventListener('load', () => this.handleRoute());
    }

    register(path, handler) {
        this.routes[path] = handler;
    }

    handleRoute() {
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/81bb555f-7f80-490a-9e3e-910f552edadf',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'router.js:18',message:'handleRoute called',data:{hash:window.location.hash,readyState:document.readyState},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
        // #endregion
        
        // Get hash and normalize: empty → '/'
        let hash = window.location.hash.slice(1);
        if (!hash) {
            hash = '/';
        }
        
        // Strip query parameters for route matching (e.g., /player?id=ST → /player)
        const routeKey = hash.split('?')[0];
        
        // Normalize '/' to 'home' for route lookup
        const normalizedRoute = routeKey === '/' ? 'home' : routeKey;
        
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/81bb555f-7f80-490a-9e3e-910f552edadf',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'router.js:30',message:'Route normalization',data:{hash,routeKey,normalizedRoute,registeredRoutes:Object.keys(this.routes)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
        // #endregion
        
        // Try to find handler for the route
        let handler = this.routes[normalizedRoute];
        
        // Check for dynamic routes (e.g., player/1, tv/1)
        if (!handler) {
            const match = routeKey.match(/^(player|tv)\/(\d+)/);
            if (match) {
                handler = this.routes[match[1]];
            }
        }

        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/81bb555f-7f80-490a-9e3e-910f552edadf',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'router.js:40',message:'Handler lookup',data:{normalizedRoute,handlerFound:!!handler,handlerType:typeof handler},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
        // #endregion

        const appContent = document.getElementById('app-content');
        
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/81bb555f-7f80-490a-9e3e-910f552edadf',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'router.js:44',message:'Container lookup',data:{appContentFound:!!appContent,containerId:'app-content'},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
        // #endregion

        if (handler) {
            // #region agent log
            fetch('http://127.0.0.1:7242/ingest/81bb555f-7f80-490a-9e3e-910f552edadf',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'router.js:47',message:'Calling handler',data:{handlerType:typeof handler},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
            // #endregion
            
            // Call handler without await - render immediately
            const result = typeof handler === 'function' ? handler() : handler;
            
            // #region agent log
            fetch('http://127.0.0.1:7242/ingest/81bb555f-7f80-490a-9e3e-910f552edadf',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'router.js:50',message:'Handler result',data:{resultType:typeof result,isPromise:result && typeof result.then === 'function',resultLength:result ? (typeof result === 'string' ? result.length : 'not-string') : 'null'},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
            // #endregion
            
            // If result is a Promise, handle it asynchronously without blocking
            if (result && typeof result.then === 'function') {
                // #region agent log
                fetch('http://127.0.0.1:7242/ingest/81bb555f-7f80-490a-9e3e-910f552edadf',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'router.js:54',message:'Promise detected, setting up handlers',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
                // #endregion
                
                // Handle promise resolution in background
                result.then(html => {
                    // #region agent log
                    fetch('http://127.0.0.1:7242/ingest/81bb555f-7f80-490a-9e3e-910f552edadf',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'router.js:58',message:'Promise resolved',data:{htmlType:typeof html,htmlLength:html ? (typeof html === 'string' ? html.length : 'not-string') : 'null',appContentExists:!!appContent},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
                    // #endregion
                    
                    if (appContent && html) {
                        appContent.innerHTML = html;
                        // #region agent log
                        fetch('http://127.0.0.1:7242/ingest/81bb555f-7f80-490a-9e3e-910f552edadf',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'router.js:61',message:'HTML injected successfully',data:{injectedLength:appContent.innerHTML.length},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
                        // #endregion
                    }
                }).catch(error => {
                    // #region agent log
                    fetch('http://127.0.0.1:7242/ingest/81bb555f-7f80-490a-9e3e-910f552edadf',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'router.js:65',message:'Promise rejected',data:{errorMessage:error.message,errorStack:error.stack},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'G'})}).catch(()=>{});
                    // #endregion
                    
                    console.error('Route error:', error);
                    if (appContent) {
                        appContent.innerHTML = '<div class="page active"><div class="container"><h1>Error loading page</h1></div></div>';
                    }
                });
            } else {
                // Synchronous result - render immediately
                // #region agent log
                fetch('http://127.0.0.1:7242/ingest/81bb555f-7f80-490a-9e3e-910f552edadf',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'router.js:72',message:'Synchronous result path',data:{resultExists:!!result,appContentExists:!!appContent},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
                // #endregion
                
                if (appContent && result) {
                    appContent.innerHTML = result;
                    // #region agent log
                    fetch('http://127.0.0.1:7242/ingest/81bb555f-7f80-490a-9e3e-910f552edadf',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'router.js:75',message:'Synchronous HTML injected',data:{injectedLength:appContent.innerHTML.length},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
                    // #endregion
                }
            }
        } else {
            // #region agent log
            fetch('http://127.0.0.1:7242/ingest/81bb555f-7f80-490a-9e3e-910f552edadf',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'router.js:80',message:'No handler found, using home fallback',data:{normalizedRoute,homeHandlerExists:!!this.routes['home']},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
            // #endregion
            
            // Render home page for unknown routes (default fallback)
            const homeHandler = this.routes['home'];
            if (homeHandler && appContent) {
                const result = typeof homeHandler === 'function' ? homeHandler() : homeHandler;
                
                // Handle promise if async
                if (result && typeof result.then === 'function') {
                    result.then(html => {
                        if (html) {
                            appContent.innerHTML = html;
                        }
                    }).catch(error => {
                        console.error('Route error:', error);
                    });
                } else if (result) {
                    appContent.innerHTML = result;
                }
            }
        }
    }

    navigate(path) {
        window.location.hash = path;
    }
}

const router = new Router();
export { router };

