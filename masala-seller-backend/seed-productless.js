'use strict';

const db = require('./src/models'); // adjust path if needed
const { Op } = require('sequelize');

const now = () => new Date();

const products = [
    {
        name: "Turmeric Powder (Haldi) - Everyday",
        productCode: "MASAL-TURM-050",
        categoryName: "Basic Spice Powders",
        subCategoryName: "Turmeric Powder (Haldi)",
        description: "Fine, bright turmeric powder for daily cooking.",
        variants: [
            { variant_code: "TURM50-1", pack_weight: 50, uomCode: "GM", net_content: "50g", barcode: "8902000000001" },
            { variant_code: "TURM100-1", pack_weight: 100, uomCode: "GM", net_content: "100g", barcode: "8902000000002" }
        ]
    },
    {
        name: "Red Chilli Powder - Kashmiri",
        productCode: "MASAL-RCHL-050",
        categoryName: "Basic Spice Powders",
        subCategoryName: "Red Chilli Powder (Lal Mirch)",
        description: "Mild heat, vibrant red colour — ideal for gravies.",
        variants: [
            { variant_code: "RCHL50-1", pack_weight: 50, uomCode: "GM", net_content: "50g", barcode: "8902000000003" },
            { variant_code: "RCHL100-1", pack_weight: 100, uomCode: "GM", net_content: "100g", barcode: "8902000000004" }
        ]
    }
];

async function seedProductsAndVariants({ truncateFirst = false } = {}) {
    try {
        console.log('🌶️  Seeding Products and ProductVariants...');

        if (truncateFirst) {
            console.log('🧹 Truncating product & variant tables (restart identity)...');
            await db.ProductVariant.destroy({ where: {}, truncate: true, cascade: true, restartIdentity: true });
            await db.Product.destroy({ where: {}, truncate: true, cascade: true, restartIdentity: true });
        }

        // build caches for uoms and categories/subcategories
        const uomRows = await db.Uom.findAll();
        const uomByCode = uomRows.reduce((acc, u) => (acc[u.code] = u, acc), {});

        // fetch all categories and subcategories (we will map by name)
        const categories = await db.Category.findAll();
        const subcategories = await db.SubCategory.findAll();

        const catByName = categories.reduce((acc, c) => (acc[c.name] = c, acc), {});
        // map subcategories by name + categoryId for safety
        const subByComposite = {};
        subcategories.forEach(s => {
            subByComposite[`${s.name}||${s.categoryId}`] = s;
            // also map plain name (fallback)
            if (!subByComposite[s.name]) subByComposite[s.name] = s;
        });

        for (const p of products) {
            const category = catByName[p.categoryName];
            if (!category) {
                console.warn(`⚠️ Category not found for product "${p.name}" - skipping`);
                continue;
            }

            const subKey = `${p.subCategoryName}||${category.id}`;
            const subcategory = subByComposite[subKey] || subByComposite[p.subCategoryName];

            if (!subcategory) {
                console.warn(`⚠️ SubCategory "${p.subCategoryName}" not found for category "${p.categoryName}" — skipping product "${p.name}"`);
                continue;
            }

            // create product
            const [product] = await db.Product.findOrCreate({
                where: { productCode: p.productCode },
                defaults: {
                    name: p.name,
                    productCode: p.productCode,
                    categoryId: category.id,
                    subCategoryId: subcategory.id,
                    description: p.description,
                    isActive: true,
                    createdAt: now(),
                    updatedAt: now()
                }
            });

            // create variants
            for (const v of p.variants) {
                const uom = uomByCode[v.uomCode];
                if (!uom) {
                    console.warn(`  ⚠️ UOM "${v.uomCode}" not found for variant "${v.variant_code}" of product "${p.name}". Skipping this variant.`);
                    continue;
                }

                // ensure unique variant_code per table
                const [variant] = await db.ProductVariant.findOrCreate({
                    where: { variant_code: v.variant_code },
                    defaults: {
                        variant_code: v.variant_code,
                        productId: product.id,
                        uomId: uom.id,
                        pack_weight: v.pack_weight,
                        barcode: v.barcode,
                        net_content: v.net_content,
                        isActive: true,
                        createdAt: now(),
                        updatedAt: now()
                    }
                });
            }

            console.log(`✅ Seeded product: ${p.name} (code: ${p.productCode})`);
        }

        console.log('🎉 Products & variants seeding complete.');
    } catch (err) {
        console.error('❌ Error while seeding products & variants:', err);
        throw err;
    } finally {
        // close connection if exists
        if (db.sequelize && typeof db.sequelize.close === 'function') {
            await db.sequelize.close();
        }
    }
}

// run when executed directly
if (require.main === module) {
    seedProductsAndVariants({ truncateFirst: true })
        .then(() => {
            console.log('Done.');
            process.exit(0);
        })
        .catch(e => {
            console.error(e);
            process.exit(1);
        });
}

module.exports = { seedProductsAndVariants };
