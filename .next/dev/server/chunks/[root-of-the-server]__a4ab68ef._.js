module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/app/lib/prisma.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "prisma",
    ()=>prisma
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs, [project]/node_modules/@prisma/client)");
;
const globalForPrisma = globalThis;
const prisma = globalForPrisma.prisma || new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["PrismaClient"]();
if ("TURBOPACK compile-time truthy", 1) globalForPrisma.prisma = prisma;
}),
"[project]/app/api/products/[category]/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/prisma.ts [app-route] (ecmascript)");
;
;
const VALID_CATEGORIES = {
    "skin-body": "SKIN_BODY",
    haircare: "HAIRCARE",
    makeup: "MAKEUP",
    food: "FOOD",
    cleaning: "CLEANING",
    fragrance: "FRAGRANCE",
    household: "HOUSEHOLD"
};
async function GET(request, { params }) {
    try {
        const { category } = await params;
        const categoryEnum = VALID_CATEGORIES[category];
        if (!categoryEnum) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: `Invalid category. Valid: ${Object.keys(VALID_CATEGORIES).join(", ")}`
            }, {
                status: 400
            });
        }
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("userId");
        const brand = searchParams.get("brand");
        const products = await __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].product.findMany({
            where: {
                category: categoryEnum,
                isActive: true,
                ...brand && {
                    brand: {
                        equals: brand,
                        mode: "insensitive"
                    }
                }
            },
            orderBy: {
                createdAt: "desc"
            }
        });
        if (!userId) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                products
            });
        }
        const userAilments = await __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].userAilment.findMany({
            where: {
                userId,
                ailmentId: {
                    not: null
                }
            },
            include: {
                ailment: {
                    include: {
                        flaggedIngredients: true
                    }
                }
            }
        });
        const userPreferences = await __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].userPreference.findMany({
            where: {
                userId
            },
            include: {
                preference: true
            }
        });
        const productsWithScan = products.map((product)=>{
            const flaggedIngredients = [];
            const allProductItems = [
                ...product.ingredients.map((i)=>({
                        name: i,
                        from: "ingredients"
                    })),
                ...(product.packaging || []).map((p)=>({
                        name: p,
                        from: "packaging"
                    }))
            ];
            for (const ua of userAilments){
                if (!ua.ailment) continue;
                for (const fi of ua.ailment.flaggedIngredients){
                    const match = allProductItems.find((item)=>item.name.toLowerCase().includes(fi.name.toLowerCase()) || fi.name.toLowerCase().includes(item.name.toLowerCase()));
                    if (match) {
                        flaggedIngredients.push({
                            ingredient: fi.name,
                            reason: fi.reason,
                            source: "ailment",
                            sourceName: ua.ailment.name,
                            flaggedFrom: match.from
                        });
                    }
                }
            }
            for (const up of userPreferences){
                if (!up.preference) continue;
                const prefName = up.preference.name.toLowerCase();
                const match = allProductItems.find((item)=>item.name.toLowerCase().includes(prefName) || prefName.includes(item.name.toLowerCase()));
                if (match) {
                    flaggedIngredients.push({
                        ingredient: match.name,
                        reason: up.preference.description,
                        source: "preference",
                        sourceName: up.preference.name,
                        flaggedFrom: match.from
                    });
                }
            }
            return {
                ...product,
                isRecommended: flaggedIngredients.length === 0,
                flaggedIngredients
            };
        });
        const alternatives = productsWithScan.filter((p)=>p.isRecommended).map(({ flaggedIngredients: _, isRecommended: __, ...product })=>product);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            products: productsWithScan,
            alternatives
        });
    } catch (error) {
        console.error("Error fetching products:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Failed to fetch products"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__a4ab68ef._.js.map