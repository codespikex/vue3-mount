import {defineConfig} from "vite"
import vue            from "@vitejs/plugin-vue"
import dts            from "vite-plugin-dts"
import banner         from "vite-plugin-banner"
import {resolve}      from "path"
import pkg            from "./package.json"

const bannerContent = `
/**
 * name: ${pkg.name}
 * version: v${pkg.version}
 * description: ${pkg.description}
 * author: ${pkg.author}
 * homepage: ${pkg.homepage}
 */
`

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            "~": resolve(__dirname, "src"),
            "play": resolve(__dirname, "play")
        }
    },
    plugins: [
        vue(),
        dts({
            cleanVueFileName: true,
            staticImport: true
        }),
        banner(bannerContent)
    ],
    build: {
        rollupOptions: {
            treeshake: false,
            external: ["vue"],
            output: {
                globals: {
                    vue: "Vue"
                },
                exports: "named"
            }
        },
        lib: {
            entry: "src/index.ts",
            name: "Vue3Mount",
            fileName: (format) => `vue3-mount.${format}.js`
        },
        emptyOutDir: true
    }
})
