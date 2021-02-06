// import coinTest from "./javascript/coinTest.js"
// window.coinTest = coinTest;

const {loadModule} = window["vue3-sfc-loader"];




const sfcLoaderOptions =
    {
        moduleCache:
            {
                vue: Vue
            },

        async getFile(url)
        {
            const res = await fetch(url);
            if (!res.ok)
            {
                throw Object.assign(new Error(url + " " + res.statusText), {res});
            }
            return await res.text();
        },

        addStyle(textContent)
        {
            const style = Object.assign(document.createElement("style"), {textContent});
            const ref = document.head.getElementsByTagName("style")[0] || null;
            document.head.insertBefore(style, ref);
        },
    };






const app = Vue.createApp({template: `<app></app>`});

app.component("app", Vue.defineAsyncComponent(() => loadModule("./App.vue", sfcLoaderOptions)));
app.mount("#app");