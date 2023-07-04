import { defineConfig } from "vitepress";
const containerMdExtend = require("./plugins/md/index.js");

// https://vitepress.dev/reference/site-config
export default defineConfig({
    lang: "jp",
    title: "Lecture Template Project",
    description: "Lecture Site Template",
    markdown: {
        lineNumbers: true,
        config: (md) => {
            md.use(
                require("markdown-it-container"),
                "spoiler",
                containerMdExtend(md)
            );
        },
    },
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: "Home", link: "/" },
            { text: "Examples", link: "/markdown-examples" },
        ],

        sidebar: [
            {
                text: "Examples",
                items: [
                    { text: "Markdown Examples", link: "/markdown-examples" },
                    { text: "Runtime API Examples", link: "/api-examples" },
                ],
            },
        ],

        socialLinks: [
            { icon: "github", link: "https://github.com/vuejs/vitepress" },
        ],

        lastUpdated: {
            text: "Updated at",
            formatOptions: {
                dateStyle: "full",
                timeStyle: "medium",
            },
        },
    },
});